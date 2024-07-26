import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/navbar';
import useCreateFolder from '../hooks/useCreateFolder';
import useGetFileFolders from '../hooks/useGetFileFolders';
import useUploadFile from '../hooks/useUploadFile';
import { FaFolderOpen } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { resetSearch } from '../store/slices/searchSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const [newFolder, setNewFolder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(null);
  const inputRef = useRef(null);
  const { createFolder } = useCreateFolder();
  const { getFileFolders, fileFolders, renameItem, deleteItem } = useGetFileFolders();
  const { isUploadAllowed, uploadFile } = useUploadFile();
  const [folderStructure, setFoldersStructure] = useState([{ _id: null, name: "Home" }]);
  const { results } = useSelector((state) => state.search);

  const parentFolder = folderStructure[folderStructure.length - 1];

  const handleDoubleClick = (elem) => {
    if (elem.type === "folder") {
      setFoldersStructure([...folderStructure, elem]);
    } else {
      window.open(elem.link, '_blank');
    }
  };

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id
      });
      getFileFolders(parentFolder._id);
      setShowCreateFolder(false);
      setNewFolder("");
    }
  };

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.slice(0, clickIdx + 1);
    setFoldersStructure(newFolderStructure);
    dispatch(resetSearch());
  };

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({ file: file[0], parentId: parentFolder._id });
      getFileFolders(parentFolder._id);
    } else {
      alert("Upload is already in progress. Please wait...");
    }
  };

  const handleOptions = (id) => {
    setOptionsVisible((prev) => (prev === id ? null : id));
  };

  const handleRename = (id) => {
    setEditingId(id);
    const item = fileFolders.find((elem) => elem._id === id);
    if (item) {
      setNewName(item.name);
    }
  };

  const handleRenameSubmit = async () => {
    if (newName.length > 0) {
      await renameItem(editingId, newName);
      getFileFolders(parentFolder._id);
      setEditingId(null);
      setNewName("");
    }
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    getFileFolders(parentFolder._id);
    setOptionsVisible(null);
  };

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [parentFolder]);

  const displayedItems = results.length > 0 ? results : fileFolders;

  return (
    <>
      <Navbar items={fileFolders} />
      <div className="homepage-main-container">
        <div className="buttons">
          <button onClick={handleAllowCreateFolder} className='file-create'>Create Folder</button>
          <input className="file-create" ref={inputRef} type="file" onChange={handleFileUpload} />
        </div>

        <div className="create-folder-container">
          {showCreateFolder && (
            <div className='create-folder'>
              <input type="text" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
              <button onClick={handleCreateFolder} className='yes-no'>Yes</button>
              <button onClick={() => setShowCreateFolder(false)} className='yes-no'>No</button>
            </div>
          )}
        </div>

        <ul className="folder-list">
          {folderStructure.map((elem, idx) => (
            <>
            <li key={idx} onClick={() => handleBackClick(idx)}>
            {elem.name} 
            </li>
            <p>/</p>
            </>
          ))}
        </ul>

        <div className="get-file-folders">
          {displayedItems.map((elem) => (
            <div
              key={elem._id}
              className={`file-folder ${editingId === elem._id ? "expanded" : ""}`}
              onDoubleClick={() => handleDoubleClick(elem)}
            >
              <div className="file-folder-content">
                {elem.type === "folder" && <FaFolderOpen />}
                {editingId === elem._id ? (
                  <div className={`rename-input ${editingId === elem._id ? "visible" : ""}`}>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={handleRenameSubmit}
                      autoFocus
                    />
                    <button onClick={handleRenameSubmit}>Submit</button>
                  </div>
                ) : (
                  <p className="file-name">{elem.name}</p>
                )}
                <MdEdit
                  className="options-icon"
                  onClick={() => handleOptions(elem._id)}
                />
              </div>
              {optionsVisible === elem._id && (
                <div className="options-menu visible">
                  <button onClick={() => handleRename(elem._id)}>Rename</button>
                  <button onClick={() => handleDelete(elem._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
