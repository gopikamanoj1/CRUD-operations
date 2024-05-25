import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUser.css'; // Import your CSS file for styling




function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/admin/edit_user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/admin/edit_user/${id}`, userData);
      navigate('/admin/adminDashboard');
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" 
            value={userData.email || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Add other form fields for additional
         user properties as needed */}

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUser;
