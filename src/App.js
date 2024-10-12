import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Layout from './Components/Layout/Layout'
import UserContextProvider from './Components/Context/userContext';
import { Toaster } from 'react-hot-toast';


let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {path:"/Home", element:<Home/>},
    {index:true , element:<Login/>},
  ] }
])







function App() {
  return<> 
  <UserContextProvider>
  <RouterProvider router={routes}></RouterProvider>  
  <Toaster />
    </UserContextProvider> 
  

  </>

}

export default App;
