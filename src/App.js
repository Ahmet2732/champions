import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './Components/Layout/Layout'
import UserContextProvider from './Components/Context/userContext';
import { Toaster } from 'react-hot-toast';

import Dashboard from './Components/dashboard/dashboard';
import Courses from './Components/course/course';

import CourseList from './Components/courseList/courseList';
import Login from './Components/Login/Login.service';

let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<Login/>},
    {path:"/dashboard",element:<Dashboard/>},
    {path:"/Course",element:<Courses/>},
    {path:"/CourseList",element:<CourseList/>}
  ] }
])







function App() {


  return<> 
  
  <UserContextProvider>


  <RouterProvider router={routes}>

    </RouterProvider>  
  <Toaster />

    </UserContextProvider> 
  

  </>

}

export default App;
