import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './Layout/MainLayout.jsx'
import Home from './Home/Home'
import Login from './components/Login/Login'
import AuthProvider from './Provider/AuthProvider'
import Register from './components/Register/Register'
import Blogs from './components/Blogs/Blogs'
import Details from './components/Details/Details'
import About from './components/About/About'
import PrivateRoute from './PrivateRote/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
      {
        path: '/details',
        element: <PrivateRoute>
          <Details></Details>
        </PrivateRoute>
      },
      {
        path: '/about',
        element: <About></About>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthProvider >
  </React.StrictMode>

)
