import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function MyPosts() {
  const [post, setPost] = useState([]);
  const columns = [
      {
          name: 'Title',
          selector: row => row.post_title,
          sortable: true
      },
      {
          name: 'Date',
          selector: row => moment(row.date).format('DD.MM.YYYY'),
          sortable: true
      },
      {
          name: 'Creation',
          selector: row => row.post_creation,
          sortable: true
      },
      {
          name: 'Type',
          selector: row => row.post_type,
          sortable: true
      },
      {
          name: 'Content',
          selector: (row) => <ReactMarkdown>{row.post_content}</ReactMarkdown>,
          sortable: true
      }
  ]

  useEffect(() => {
    const fetchPosts = () => {
        axios.get('http://localhost:3001/backend/posts')
        .then(response => {
            setPost(response.data);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }

    fetchPosts()
  }, []); 


  // useEffect(() => {

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/backend/posts');
  //       setPost(response.data);
  //     } catch (error) {
  //       console.error('Error fetching post:', error);
  //     };
  //   }

  //   fetchPosts()

  //   const interval = setInterval(fetchPosts, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
      <div className='container'>
        <h2>Your posts</h2>
        <Link className = "btn btn-light" to="/new-post">Create new post</Link>
          <DataTable
                columns={columns}
                data={post}
                selectableRows
                fixedHeader
                pagination>
          </DataTable>
      </div>
  );
}

export default MyPosts;