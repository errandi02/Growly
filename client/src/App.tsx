import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import FrontPage from './FrontPage/FrontPage';
import './App.css'
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import Perfil from './Perfil/Perfil';
import { useState, useEffect } from 'react';
import axios from "axios";
import Experiencia from './Experiencia/Experiencia';
import ExperienciaChange from './Experiencia/ExperienciaChange';
import EducacionEdit from './Educacion/EducacionEdit';
import Educacion from './Educacion/Educacion';
import Habilidad from './Habilidad/Habilidad';
import EditarPerfil from './Perfil/EditarPerfil';
import Marketplace from './Marketplace/Marketplace';
import Project from './Marketplace/Project';
import MyProjects from './Marketplace/MyProjects';
import MyFaveProjects from './Marketplace/MyFaveProjects';
import Chatbot from './Chatbot/Chatbot';
import InvestedProject from './Marketplace/InvestedProject';
import CreateProject from './Marketplace/CreateProject';
import WhatWeDoPage from './FrontPage/Whatwedo';
import AboutUsPage from './FrontPage/AboutUs';
import Problema from './Problema/Problema';
import Solucion from './Solucion/Solucion';
import Roadmap from './RoadMap.tsx/Roadmap';
import TeamMember from './TeamMember/TeamMember';
import Actualizacion from './Actualizacion/Actualizacion';
import Comunidad from './Comunidad/Comunidad';
import Mentor from './Perfil/Mentor';
import Messages from './Messages/Messages';
import MyMessages from './Messages/MyMessages';
function App() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/");
  }

  useEffect (() =>{
    fetchAPI();
  })


  return (
    <div className="App">
      <Routes>
        {/* Rutas con layout (Header y Footer) */}
       
        <Route element={<Layout />}>
          <Route path="/" element={<FrontPage />} />
          <Route path="/que-hacemos" element={<WhatWeDoPage/>}></Route>
          <Route path="/sobre-nosotros" element={<AboutUsPage/>}></Route>
        </Route>
    
        {/* Ruta sin layout */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Home />}></Route>
        <Route path="/perfil/:idUsuario" element={<Perfil />}></Route>
        <Route path="/experiencia/:idUsuario" element={<Experiencia />}></Route>
        <Route path="/experiencia/edit/:idExperiencia" element={<ExperienciaChange />}></Route>
        <Route path="/educacion/edit/:idEducacion" element={<EducacionEdit />}></Route>
        <Route path="/educacion/:idUsuario" element={<Educacion />}></Route>
        <Route path="/habilidad/:idUsuario" element={<Habilidad />}></Route>
        <Route path="/perfil/editar/:idUsuario" element={<EditarPerfil />}></Route>
        <Route path="/marketplace" element={<Marketplace />}></Route>
        <Route path="/proyecto/:idProyecto" element={<Project/>}></Route>
        <Route path="/marketplace/destacados" element={<MyFaveProjects/>}></Route>
        <Route path="/myprojects" element={<MyProjects/>}></Route>
        <Route path="/chatbot" element={<Chatbot/>}></Route>
        <Route path="/inversiones" element={<InvestedProject/>}></Route>
        <Route path="/createproject" element={<CreateProject/>}></Route>
        <Route path="/add/problema/:idProyecto" element={<Problema/>}></Route>
        <Route path="/add/solucion/:idProyecto" element={<Solucion/>}></Route>
        <Route path="/add/roadmap/:idProyecto" element={<Roadmap/>}></Route>
        <Route path="/add/team/:idProyecto" element={<TeamMember/>}></Route>
        <Route path="/add/actualizacion/:idProyecto" element={<Actualizacion/>}></Route>
        <Route path="/comunidad" element={<Comunidad/>}></Route>
        <Route path="/mentor/:idUsuario" element={<Mentor/>}></Route>
        <Route path="/chat/:idUsuario" element={<Messages/>}></Route>
        <Route path="/mensajes" element={<MyMessages/>}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
