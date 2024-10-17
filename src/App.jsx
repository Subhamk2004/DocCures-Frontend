import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import AllDoctors from "./pages/AllDoctors"
import Router from "./Router"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import LoadDoctor from "./pages/LoadDoctor"
import AllAppointments from "./pages/AllAppointments"

function App() {

  let router = createBrowserRouter([
    {
      path: '/',
      element: <Router />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'allDoctors',
          element: <AllDoctors />,
        },
        {
          path: 'allDoctors/:speciality',
          element: <AllDoctors />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'editProfile',
          element: <EditProfile />
        },
        {
          path: 'bookAppointment/:id',
          element: <LoadDoctor />
        },
        {
          path:'allAppointments',
          element: <AllAppointments />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
