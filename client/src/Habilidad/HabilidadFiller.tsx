import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Briefcase, Building, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

export default function HabilidadFiller() {

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

  


    const [nombre, setNombre] = useState("");


 // Esta hace el envío del formulario 
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Montamos el payload
    const payload = {
        usuario_id: idUsuario,
        nombre: nombre,
      };

      try {
      const response = await axios.post('http://localhost:8080/habilidad', payload);
        
        
        if (response.status == 200) {
         // Redirige al perfil tras guardar
            navigate(`/perfil/${idUsuario}`);
        }else{
            console.error('Habilidad Error');
      }
  

        
      } catch (error) {
        console.error("No se pudo guardar la habilidad:", error);
        // Aquí podrías mostrar un toast o similar
      }

  }
  return (
    <div className="max-w-3xl mx-auto py-30 px-4">
      <div className="mb-6">
        <Link to={`/perfil/${idUsuario}`} className="inline-flex items-center text-[#2D6A4F] hover:text-[#1A4031]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al perfil
        </Link>
        <h1 className="text-2xl font-bold mt-2">Añadir habilidad</h1>
        <p className="text-gray-600">Completa los detalles de tu habilidad</p>
      </div>

      <Card className="border-none shadow-sm" style={{ backgroundColor: "#A1D9B7", borderColor: "#A1D9B7" }}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="puesto" className="text-base font-medium">
                Nombre de Habilidad <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="puesto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Experto en React y NodeJS"
                  className="pl-10 bg-white"
                  required
                />
              </div>
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
              Guardar Habilidad
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
