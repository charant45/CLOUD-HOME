import { useSelector } from "react-redux";

const useCreateFolder = () =>{

    const {token} = useSelector((e) => e.auth);


    const createFolder = async ({name, parentId}) => {
        try {

            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/folder/create`, {
                method: "POST",
                body: JSON.stringify({name, parentId}),
                headers: {
                    "content-Type": "application/json",
                    authorization: "Bearer " + token,
                }
            });

            const data = await res.json();
            console.log(data);
        alert(data.message);
        }
        catch (e) {
            console.log(e.message);
            alert("Error: " + e.message);
        }
    }
    return {createFolder};
};

export default useCreateFolder;