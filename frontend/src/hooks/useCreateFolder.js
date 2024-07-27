import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useCreateFolder = () => {

    const { token } = useSelector((e) => e.auth);


    const createFolder = async ({ name, parentId }) => {
        try {

            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/folder/create`, {
                method: "POST",
                body: JSON.stringify({ name, parentId }),
                headers: {
                    "content-Type": "application/json",
                    authorization: "Bearer " + token,
                }
            });

            const data = await res.json();
            console.log(data);
            toast.error(data.message);
        }
        catch (e) {
            console.log(e.message);
            toast.error("Error: " + e.message);
        }
    }
    return { createFolder };
};

export default useCreateFolder;