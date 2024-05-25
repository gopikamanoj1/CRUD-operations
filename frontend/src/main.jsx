// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';


import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminApp from './adminApp.jsx';
import AdminLogin from './screens/admin/AdminLogin.jsx';
import AdminPage from './screens/admin/AdminPage.jsx';
import Adminadduser from './screens/admin/Adminadduser.jsx';
import EditUser from './screens/admin/EditUser.jsx';



 

// Create user routes
const userRoutes = (
  <Route path='/' element={<App />}>
    <Route index={true} element={<HomeScreen />} />
    <Route path='/login' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<ProfileScreen />} />
    </Route>
  </Route>
);

const adminRoute = (
  <Route path='/admin' element={<AdminApp />}>
    <Route path='adminDashboard' element={<AdminPage />} />
    <Route index={true} element={<AdminLogin />} />
    <Route path='/admin/adminDashboard/admin/user_create' element={<Adminadduser />} />
    <Route path='/admin/adminDashboard/admin/edit_user/:id' element={<EditUser />} />




  </Route>
)
// Create admin routes


// Combine both user and admin routes
const allRoutes = (
  <>
    {userRoutes}
    {adminRoute}
  </>
);

// Create the router
const   router = createBrowserRouter(createRoutesFromElements(allRoutes));

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
