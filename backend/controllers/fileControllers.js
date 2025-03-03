const cloudinary = require("../config/cloudinary");
const FileFolderModel = require("../model/fileSchema");
const fsPromises = require("fs/promises");


const createFileDocumentInMongoDB = async (req, res) => {
    try {
        const data = req.file;
        const { parentId } = req.body;


        const { _id } = req.user;


        const file = await FileFolderModel.create({
            name: data.originalname,
            userId: _id,
            type: "file",
            parentId: parentId === "null" ? undefined : parentId,
            metaData: { multer: data },
        });


        res.status(201);
        res.json({
            status: "in-progress",
            data: {
                file: file,
            },
        });


        return file;
    } catch (err) {
        console.log("------------------------");
        console.log(err);
        console.log("------------------------");
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        });
        return false;
    }
};

const uploadFileToCloudinary = async (req, file) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI, {
            resource_type: "auto",
            folder: `Cloud-Home/${file.userId}/${file.parentId}`, // Corrected folder path
            timeout: 60000,
        });

        try {
            await FileFolderModel.findByIdAndUpdate(file._id, {
                link: result.secure_url || result.url,
                "metaData.cloudinary": result,
            });

            return true;
        } catch (err) {
            console.log("---------------------------------");
            console.log("❌❌❌❌ File UPDATE Error ❌❌❌❌");
            console.log(err);
            console.log("---------------------------------");
            return false;
        }
    } catch (err) {
        console.log("---------------------------------");
        console.log("❌❌❌❌ Cloudinary Error ❌❌❌❌");
        console.log(err);
        console.log("---------------------------------");
        return false;
    }
};

const createFile = async (req, res) => {
    try {
    const documentCreated = await createFileDocumentInMongoDB(req, res);
    if (documentCreated) {
        const isFileUploadedToCloudinary = await uploadFileToCloudinary(
        req,
        documentCreated
        );
        if (isFileUploadedToCloudinary) {
          // deleteFileFromServer(documentCreated);
        }
    }
    } catch (err) {
    console.log("------------------------");
    console.log(err);
    console.log("------------------------");
    res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
    });
    }
};

module.exports = { createFile };