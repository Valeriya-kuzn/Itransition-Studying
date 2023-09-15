import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DataTable from 'react-data-table-component';

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
          selector: row => row.date,
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
          selector: row => row.post_content,
          sortable: true
      }
  ]

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/backend/posts');
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      };
    }

    fetchPosts()

    const interval = setInterval(fetchPosts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className='container'>
          <DataTable
                columns={columns}
                data={post}
                selectableRows
                fixedHeader
                pagination>
          </DataTable>
      </div>
      // <div key='posts-key'>
      //     <h2>Your posts</h2>
      //     <div>
      //         <ul class="myreviws-buttons">
      //             <li><button type="button" className = "btn btn-light" onclick="">Open</button></li>
      //             <li><button type="button" className = "btn btn-light" onclick="">Edit</button></li>
      //             <li><button type="button" className = "btn btn-light" onclick="">Delete</button></li>
      //         </ul>
      //     </div>
      //     <div className="table-responsive">
      //         <table>
      //             <thead>
      //                 <tr>
      //                     <th><input type="checkbox" id="allCheckbox" name="allCheckbox" value="value"/></th>
      //                     <th>Title</th>
      //                     <th>Date</th>
      //                     <th>Creation</th>
      //                     <th>Type</th>
      //                     <th>Content</th>
      //                 </tr>
      //             </thead>
      //             <tbody>
      //                 {post.map(item => 
      //                     <tr key={item.id}>
      //                         <td><input type="checkbox" id={`postCheckbox-${item.id}`} name={`postCheckbox-${item.id}`} value={item.id}/></td>
      //                         <td>{item.post_title}</td>
      //                         <td>{moment(item.date).format('DD.MM.YYYY')}</td>
      //                         <td>{item.post_creation}</td>
      //                         <td>{item.post_type}</td>
      //                         <td>{item.post_content}</td>
      //                     </tr>
      //                 )}
      //             </tbody>
      //         </table>
      //     </div>
      // </div>
  );
}

export default MyPosts;