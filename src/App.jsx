import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import AllDoctors from "./pages/AllDoctors"
import Router from "./Router"
import Signup from "./pages/Signup"

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
