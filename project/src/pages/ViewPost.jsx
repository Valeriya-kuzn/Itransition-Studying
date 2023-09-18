import React from 'react';

function ViewPost(props) {
    const post = props.location.state.post;
    return <h2 className = 'container' key='post-key'>Post Page</h2>;
}

export default ViewPost;