import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { tableStyle } from '../UI/tableStyle';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [filteredText, setFilteredText] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [isDeleteAble, setIsDeleteAble] = useState(true)
    const columns = [
        {
            name: 'Title',
            maxWidth: "200px",
            selector: row => row.post_title,
            sortable: true,
            filter: 'text',
            filterValue: filteredText
        },
        {
            name: 'Date',
            maxWidth: "130px",
            selector: row => moment(row.date).format('DD.MM.YYYY'),
            sortable: true
        },
        {
            name: 'Creation',
            maxWidth: "200px",
            selector: row => row.post_creation,
            sortable: true
        },
        {
            name: 'Type',
            maxWidth: "130px",
            selector: row => row.post_type,
            sortable: true
        },
        {
            name: 'Content',
            maxWidth: "440px",
            selector: (row) => <ReactMarkdown className='tablePost'>{row.post_content}</ReactMarkdown>,
            sortable: true
        },
        {
            name: 'Actions',
            maxWidth: "130px",
            selector: (row) => (
                <div>
                    <Link className="btn btn-primary ml-2" to={`/view-post/${row.post_id}`} state={{post : row}}>
                    Open
                    </Link>
                    <Link className="btn btn-secondary ml-2" to={`/edit-post/${row.post_id}`} state={{post : row}}>
                    Edit
                    </Link>
                </div>
            ),
            allowOverflow: true,
            button: true
        },
    ]

    const handleFilterChange = (e) => {
        const newPosts = posts.filter(row => {
            return row.post_title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredText(newPosts);
    }; 

    const fetchPosts = () => {
        axios.get('https://course-project-e5ui.onrender.com/backend/myposts')
        .then(response => {
            setPosts(response.data);
            setFilteredText(response.data);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }
    
    useEffect(() => {
        fetchPosts()
    }, []);

    const deleteSelectedPosts = () => {
        axios
            .delete('https://course-project-e5ui.onrender.com/backend/posts/delete', {
                data: { postIds: selectedPosts },
            })
            .then((response) => {
                fetchPosts();
            })
            .catch((error) => {
                console.error('Error deleting posts:', error);
            });
        setSelectedPosts([]);
    };
    

    return (
        <div className='container'>
            <h2>Your posts</h2>
            <div className='profileButtons'>
                <Link
                    className="btn btn-light" 
                    to="/new-post" 
                    title='Click to create new post'>
                        Create new post
                </Link>
                <button 
                    className="btn btn-danger"
                    onClick={deleteSelectedPosts}
                    title='Click to delete selected posts'
                    disabled={isDeleteAble}>
                    Delete
                </button>
                <input
                    type="text"
                    onChange={handleFilterChange}
                    placeholder='Search for title'
                />
            </div>
            <DataTable
                customStyles={tableStyle}
                columns={columns}
                data={filteredText}
                selectableRows
                onSelectedRowsChange={({ selectedRows }) => {
                    const selectedPostIds = selectedRows.map((row) => row.post_id);
                    setSelectedPosts(selectedPostIds);
                    setIsDeleteAble(selectedPostIds.length === 0);
                }}
                fixedHeader
                pagination>
            </DataTable>
        </div>
    );
}

export default MyPosts;