import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetFileFolders = () => {
    const { token } = useSelector((state) => state.auth);

    const [fileFolders, setFileFolders] = useState([]);

    const getFileFolders = async (parentId = null) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder`, {
                method: "POST",
                body: JSON.stringify({ parentId }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            console.log(data.data.fileFolders);
            setFileFolders(data.data.fileFolders);
        } catch (e) {
            console.log(e.message);
        }
    };

    const renameItem = async (id, newName) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: newName }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            console.log(data.message);
            if (data.success) {
                // Refresh the file folders after renaming
                getFileFolders();
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            console.log(data.message);
            if (data.success) {
                // Refresh the file folders after deleting
                getFileFolders();
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return { getFileFolders, fileFolders, renameItem, deleteItem };
};

export default useGetFileFolders;
