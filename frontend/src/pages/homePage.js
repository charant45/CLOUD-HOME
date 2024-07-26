import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/navbar';
import useCreateFolder from '../hooks/useCreateFolder';
import useGetFileFolders from '../hooks/useGetFileFolders';
import useUploadFile from '../hooks/useUploadFile';
import { FaFolderOpen } from "react-icons/fa6";
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

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <>
      <Navbar items={fileFolders} />
      <div 
        style={{
            backgroundImage: "url(https://res.cloudinary.com/dhja9jrwn/image/upload/v1721993928/Cover.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
          >
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={handleAllowCreateFolder}
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Create Folder
            </button>
            <input
              ref={inputRef}
              type="file"
              onChange={handleFileUpload}
              style={{
                ...buttonStyle,
                padding: '8px',
                textAlign: 'center',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            />
          </div>

          {showCreateFolder && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <input
                type="text"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                style={{ padding: '10px', width: '200px', marginBottom: '10px' }}
              />
              <button
                onClick={handleCreateFolder}
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Yes
              </button>
              <button
                onClick={() => setShowCreateFolder(false)}
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                No
              </button>
            </div>
          )}

          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
            {folderStructure.map((elem, idx) => (
              <React.Fragment key={idx}>
                <li onClick={() => handleBackClick(idx)} style={{ cursor: 'pointer', margin: '0 5px' }}>
                  {elem.name}
                </li>
                {idx < folderStructure.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </ul>

          <div style={{ marginTop: '20px' }}>
            {displayedItems.map((elem) => (
              <div
                key={elem._id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  margin: '10px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onDoubleClick={() => handleDoubleClick(elem)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {elem.type === "folder" && <FaFolderOpen />}
                  {editingId === elem._id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={handleRenameSubmit}
                      autoFocus
                      style={{ marginLeft: '10px' }}
                    />
                  ) : (
                    <p style={{ marginLeft: '10px' }}>{elem.name}</p>
                  )}
                </div>
                <div>
                  <MdEdit
                    onClick={() => handleOptions(elem._id)}
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                  />
                  {optionsVisible === elem._id && (
                    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                      <button onClick={() => handleRename(elem._id)} style={buttonStyle}>
                        Rename
                      </button>
                      <button onClick={() => handleDelete(elem._id)} style={buttonStyle}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
