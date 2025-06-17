import type React from "react"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Briefcase, Building, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

export default function EducacionFiller() {

          //TOKEN
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
  
    let name = "Nombre de Usuario";
    let profesion = " ";
    let id = 0;
    if (token) {
      try {
        // Decodificar el token y obtener el nombre de usuario
        const decodedToken = jwtDecode(token);
        name = decodedToken.name;
        profesion = decodedToken.profesion;
        id = decodedToken.id;
        //console.log(decodedToken);
        //setId(decodedToken.id);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    const idUsuario = id;
    console.log(idUsuario);
  //-----------ACABA CONFIG DE TOKEN
      


    const navigate = useNavigate();
    const handleExit = () =>{
        navigate(`/perfil/${idUsuario}`);
    }

   
    // —– STATES para cada campo —–
  
    const [grado, setGrado] = useState("");
    const [nombre_institucion, setNombreInstitucion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [descripcion, setDescripcion] = useState("");

    


    
 // Esta hace el envío del formulario 
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
 
    // Montamos el payload
    const payload = {
      //  id : id,
        usuario_id: idUsuario,
        grado: grado,
        nombre_institucion: nombre_institucion,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin, 
        descripcion: descripcion,
      };

      try {
      const response = await axios.post(`http://localhost:8080/educacion`, payload);
        
        
        if (response.status == 200) {
         // Redirige al perfil tras guardar
            navigate(`/perfil/${idUsuario}`);
        }else{
            console.error('Education Error');
        }
  

        
      } catch (error) {
        console.error("No se pudo guardar la educacion:", error);
       
      }

  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to={`/perfil/${idUsuario}`} className="inline-flex items-center text-[#2D6A4F] hover:text-[#1A4031]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al perfil
        </Link>
        <h1 className="text-2xl font-bold mt-2">Añadir educacion</h1>
        <p className="text-gray-600">Completa los detalles de tu experiencia profesional</p>
      </div>

      <Card className="border-none shadow-sm" style={{ backgroundColor: "#A1D9B7", borderColor: "#A1D9B7" }}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="puesto" className="text-base font-medium">
                Grado <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="grado"
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  placeholder="Ej: Grado en Ingeniería Informática"
                  className="pl-10 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nombre_empresa" className="text-base font-medium">
                Nombre de Institución <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="nombre_empresa"
                  value={nombre_institucion}
                  onChange={(e) => setNombreInstitucion(e.target.value)}
                  placeholder="Ej: Universidad De Málaga"
                  className="pl-10 bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha_inicio" className="text-base font-medium">
                  Fecha de inicio <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input id="fecha_inicio" type="date" className="pl-10 bg-white" required  value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}/>
                </div>
              </div>

           
                <div>
                  <Label htmlFor="fecha_fin" className="text-base font-medium">
                    Fecha de finalización <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="fecha_fin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} type="date" className="pl-10 bg-white" />
                  </div>
                </div>
             
            </div>

            <div>
              <Label htmlFor="descripcion" className="text-base font-medium">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe los logros, los conocimientos y las tecnologías que utilizaste..."
                className="mt-1 bg-white min-h-[150px]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleExit}
              className="border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#A1D9B7]/20 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white cursor-pointer">
              Guardar Educación
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
