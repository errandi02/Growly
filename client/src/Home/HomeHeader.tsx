"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Store, Briefcase, Home, MessageSquare, Bot, Search, Users, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo_Growly_SinFondo.png";
import logotext from "../assets/Nombre_Growly.png"
import { jwtDecode } from "jwt-decode";

export default function LinkedInHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [profesion, setProfesion] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };
  // Uso
  const token = getTokenFromCookies();
  let id;
  let role_id;
  if (token) {
    try {
      // Decodificar el token y obtener el nombre de usuario
      const decodedToken = jwtDecode(token);
      
      id = decodedToken.id;   
      const idUsuario = id;
      role_id = decodedToken.role_id;
     
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  }
  const rol = role_id;

  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          setEmail(res.data.email);
          setUserId(res.data.id);
          setProfesion(res.data.profesion);
          //navigate('/login');
          
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
    
  }, [navigate]);
  
  const handleLogout = () => {
    //console.log("handleLogout entra");
     axios.get('http://localhost:8080/logout')
     .then (res => {
      navigate('/')
     }).catch(err => console.log(err));
   }
 
  return (
  <header   className="sticky top-0 z-[9999] w-full border-b"
  style={{ backgroundColor: '#2D6A4F', borderColor: '#2D6A4F' }}  >
      <div className="flex h-18 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 ml-20">
        <Link to="/home" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
        <span className="ml-3 text-xl flex ">
            <img src={logo} alt="" className="w-13 h-13 mr-2" />
            <img src={logotext} alt="" className="w28 h-8 mt-3 mr-3" />
        </span>
        </Link>

        </div>
        <nav className="flex items-center gap-2 md:gap-5 ml-auto mr-20">
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-12 text-white" asChild>
            <Link to="/home">
              <Home className="w-16 h-16" />
              <b>
              <span className="text-l mt-1 ">Inicio</span>
              </b>
            </Link>
          </Button>
          
          
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-12 text-white" asChild>
            <Link to="/marketplace">
              <Store className="h-5 w-5" />
              <b><span className="text-l mt-1">Marketplace</span></b>
            </Link>
          </Button>
       
        {rol === 3 && (
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-12 text-white" asChild>
            <Link to="/myprojects">
              <Briefcase className="h-5 w-5" />
             <b><span className="text-l mt-1">Mis Proyectos</span></b> 
            </Link>
          </Button>
           )}
          {rol === 2   && (
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-12 text-white" asChild>
            <Link to="/inversiones">
              <Briefcase className="h-5 w-5" />
             <b><span className="text-l mt-1">Mis Inversiones</span></b> 
            </Link>
          </Button>
           )}
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-12 text-white" asChild>
            <Link to="/chatbot">
              <Bot className="h-8 w-8" />
              <b>
              <span className="text-l mt-1">ChatBot</span>
              </b>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-10 text-white ml-3" asChild>
            <Link to="/comunidad">
            <Users className="h-5 w-5" />
              <b>
              <span className="text-l mt-1">Amistades</span>
              </b>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center h-auto py-2 px-10 text-white ml-3" asChild>
            <Link to="/mensajes">
            <Mail className="h-5 w-5" />
              <b>
              <span className="text-l mt-1">Mensajes</span>
              </b>
            </Link>
          </Button>
          <div className="ml-10">
      <DropdownMenu>
      <DropdownMenuTrigger style={{  cursor: 'pointer' }} asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" style={{ backgroundColor : '#white' , borderColor: '#black'}}>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link to={`/perfil/${userId}`}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
            
          </DropdownMenuItem>
        </Link>
        <Link to={`/perfil/editar/${userId}`}>
          <DropdownMenuItem className="cursor-pointer">
            Settings
     
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />


        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log out
        
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
              </div>
        </nav>
      </div>
    </header>
  )
}
