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
                    <p>File downloaded: {file.name}</p>
                    <p>Size: {file.size} byte</p>
                </div>
            ) : (
                <p>Move file here</p>
            )}
        </div>
    );
}

export default FileUpload;