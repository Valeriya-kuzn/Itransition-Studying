import React from 'react';

function ProfileData(user) {
  if (!user.user) {
      return <div className = 'container'>Loading...</div>;
  }
  
  return (
      <div className = 'container' key={'profile-page-key'}>
          <h2>Profile</h2>
          <form className='userdata'>
              <label htmlFor="username" className>User name</label>
              <input type="text" value={user.user.user_name} id="username" disabled/>
              <label htmlFor="usermail">Email</label>
              <input type="email" value={user.user.user_email} id="usermail" disabled/>
              <label htmlFor="userid">User ID</label>
              <input type="text" value={user.user.user_id} id="userid" disabled/>
          </form>
      </div>
  );
}

export default ProfileData;