import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  
  const [searchQuery, setSearchQuery] = useState('');

  const deleteUser = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this user?');

    if (shouldDelete) {
      try {
        await axios.delete(`/api/admin/delete_user/${id}`);
       
        setUserData((prevUserData) => prevUserData.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // const editUser = (id) => {
  //   navigate(`/api/admin/edit_user/${id}`);

  // };

  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/admin/userstable');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Filter user data based on the search query
  const filteredUserData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
        <h1>ADMIN DASHBOARD</h1>
    <br />
      <h3>User Table</h3>
      
      <InputGroup className="mb-5">
        <FormControl
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserData.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteUser(user._id)}>Delete</button>

                <button className='btn btn-dark'>
  <Link to={`/admin/adminDashboard/admin/edit_user/${user._id}`}>Edit User</Link>
</button>


                {/* <button className='btn btn-primary' onClick={() => editUser(user._id)}>Edit</button> */}

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button className='btn btn-dark'>
      <Link to='/admin/adminDashboard/admin/user_create'>Add User</Link>
    </button>
    </div>
  );
};

export default AdminPage;