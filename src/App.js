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
import EditCourse from './Components/edit/edit';
import MentorSlider from './Components/recordedCourses/recordedCourses';
import CourseSlider from './Components/recordedCourses/recordedCourses';
import QuizForm from './Components/quiz/quiz';
let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<Login/>},
    {path:"/dashboard",element:<Dashboard/>},
    {path:"/Course",element:<Courses/>},
    {path:"/CourseList",element:<CourseList/>},
    {path:"/edit-course/:id",element:<EditCourse/>},
    {path:"/MentorSlider",element:<MentorSlider/>},
    {path:"/CourseSlider",element:<CourseSlider/>},
    {path:"/QuizForm",element:<QuizForm/>}
  
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
