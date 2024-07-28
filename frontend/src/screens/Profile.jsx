import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const ProfilePage = () => {
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState('/default-profile-pic.jpg'); // Default profile picture
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
   
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);

   
    const fetchUser = async () => {
      if (storedEmail) {
        try {
          const response = await axios.get(`http://localhost:8080/api/user?email=${storedEmail}`);
          const userData = response.data;
        console.log(userData)
          setUsername(userData.username);
          
          // Load saved profile picture from local storage if available
          const storedPic = localStorage.getItem('profilePic');
          if (storedPic) {
            setProfilePic(storedPic);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadPhoto = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePic = reader.result;
        setProfilePic(newProfilePic);
        localStorage.setItem('profilePic', newProfilePic);

      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePic('/default-profile.jpg'); // Reset to default
    localStorage.removeItem('profilePic'); // Remove from local storage

  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put('http://localhost:8080/api/updateProfile', {
        username,
        profilePic,
      });

      // Optionally refresh the user data
      const response = await axios.get(`http://localhost:8080/api/user?email=${email}`);
      const userData = response.data;
      console.log(userData)
      setUsername(userData.username);
      setProfilePic(userData.profilePic);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-pic">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-pic-img"
          />
          <div className="profile-pic-actions">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadPhoto}>Upload</button>
            {profilePic !== '/default-profile-pic.jpg' && (
              <button onClick={handleRemovePhoto}>Remove</button>
            )}
          </div>
        </div>
        <div className="profile-info">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
