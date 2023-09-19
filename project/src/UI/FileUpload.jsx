import React from 'react';

function FileUpload({file, setFile}) {

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    return (
        <div
        className="File-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        >
        {file ? (
            <div>
            <p className="form-label">File uploaded: {file.name}</p>
            <p className="form-label">Size: {file.size} bytes</p>
            </div>
        ) : (
            <>
            <label htmlFor="file-input" className="form-label fileUpload">
                    <p className="form-label">Click here to select a file or drag and drop</p>
            </label>
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
            />
            </>
        )}
        </div>
    );
}

export default FileUpload;
