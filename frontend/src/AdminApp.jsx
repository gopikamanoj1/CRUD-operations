import React from 'react'
import Header from './components/Header'
// import AdminDashboard from './components/AdminDashboard'
import AdminPage from './screens/admin/AdminPage';
import AdminLogin from './screens/admin/AdminLogin';
import { useSelector } from 'react-redux';

import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AdminApp() {
    const { adminInfo } = useSelector((state) => state.auth);

  return (
    <div>
    {/* {
        adminInfo ?( <AdminDashboard/>  ):( <AdminLogin/> )
    } */}

       <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>


    </div>
  )
}

export default AdminApp
