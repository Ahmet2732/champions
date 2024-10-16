import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './Components/Login/Login'
import Layout from './Components/Layout/Layout'
import UserContextProvider from './Components/Context/userContext';
import { Toaster } from 'react-hot-toast';

import Dashboard from './Components/dashboard/dashboard';


let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<Login/>},
    {path:"/dashboard",element:<Dashboard/>}
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
