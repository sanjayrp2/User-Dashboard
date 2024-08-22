import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/SignUp";
import { RoleContext } from "./Context/RoleContext"; 
import adminRoutes from "./Route/adminRoutes";
import userRoutes from "./Route/userRoutes"
import { useEffect, useState } from "react";
function App() {
  const [role,setRole]=useState(localStorage.getItem('role'))

  useEffect(()=>{
    const storedrole=localStorage.getItem('role')
    if(storedrole){
      setRole(storedrole)
    }
  },[]);

  return (
    <>
    <RoleContext.Provider value={{role , setRole}}>
      <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {role === 'user' && userRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        {role === 'admin' && adminRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={
                route.element
            }
          />
        ))}
        </Routes>
      </Router>
    </RoleContext.Provider>
    
    </>
  );
}

export default App;
