const FileFolderModel = require("../model/fileSchema");
const cloudinary = require("../config/cloudinary");


const getFileFolders = async (req, res) => {
    const { _id } = req.user;
    const { parentId } = req.body;
    try {
        const fileFolders = await FileFolderModel.find({ userId: _id, parentId });
        res.status(200).json({ status: "success", message: "Folders fetched successfully", data: { fileFolders } });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Internal Server Error" });
    }
}

const renameFileFolder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const fileFolder = await FileFolderModel.findById(id);

        if (!fileFolder) {
            return res.status(404).json({ success: false, message: 'File or folder not found' });
        }

        fileFolder.name = name;
        await fileFolder.save();

        res.status(200).json({ success: true, message: 'Renamed successfully', data: fileFolder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteFileFolder = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const fileFolder = await FileFolderModel.findById(id);

        if (!fileFolder) {
            return res.status(404).json({ success: false, message: 'File or folder not found' });
        }

        if (fileFolder.type === 'folder') {
            await FileFolderModel.deleteOne({ _id: id }); 
        }

        if (fileFolder.type === 'file') {
            const { result } = await cloudinary.uploader
                .destroy(fileFolder.metaData.cloudinary.public_id)
    
            console.log(result)
            if (result== 'ok') {
                await FileFolderModel.deleteOne({ _id: id });
            }
        }




        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getFileFolders,
    renameFileFolder,
    deleteFileFolder
};
