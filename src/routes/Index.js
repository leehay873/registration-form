import React from 'react';
import { Routes , Route } from "react-router-dom";
import Home from "../container/Home";
import Login from "../pages/Login";
import Signup from "../pages/signup";
import Dash from "../pages/dashboard";
import Form from "../components/Form"

const Index =()=>{
return(
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dash' element={<Dash/>}/>
        <Route  path='/form' element={<Form/>}/>

    </Routes>
)

}

export default Index;