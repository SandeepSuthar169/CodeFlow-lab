import React, { useEffect } from 'react'
import { Routes, Route, Navigate} from "react-router-dom"
import { Toaster } from "react-hot-toast"

import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SignUpPage from './page/SignUpPage'
import { useAuthStore } from './store/useAuthStrore.js'
import { Loader } from 'lucide-react'
import Layout from "./layout/Layout.jsx"
import AdminRoute from './components/AdminRoute.jsx'
import AddProblem from './page/AddProblem.jsx'
import ProblemPage from './page/ProblemPage.jsx'


const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  // console.log("authUser",authUser);
  // console.log("checkAuth",checkAuth);
  // console.log("isCheckingAuth",isCheckingAuth);
  

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if(isCheckingAuth){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
   <>
    <div className="flex flex-col items-center justify-center">
      <Toaster/> 
      <Routes>
        <Route path="/" element={<Layout/>}>

        <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
        </Route>

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/problem/:id"
          element={authUser ? <ProblemPage /> : <Navigate to={'/login'} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />


        <Route element={<AdminRoute />}>
        <Route 
          path="/add-problem"
          element={<AddProblem />}
        />

        </Route>

      </Routes>
    </div>
   </>
  )
}

export default App