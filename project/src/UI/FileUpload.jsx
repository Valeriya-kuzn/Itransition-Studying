import React from 'react';

function FileUpload({file, setFile}) {

    const handleDrag = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0])
    };

    return (
        <div
            className='File-upload'
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {file ? (
                <div>
                    <p className = "form-label">File downloaded: {file.name}</p>
                    <p className = "form-label">Size: {file.size} byte</p>
                </div>
            ) : (
                <p className = "form-label">Move file here</p>
            )}
        </div>
    );
}

export default FileUpload;