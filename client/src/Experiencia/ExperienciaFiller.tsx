import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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

export default function ExperienciaFiller() {

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
    const [puesto, setPuesto] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [tipoEmpleo, setTipoEmpleo] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [isCurrentJob, setIsCurrentJob] = useState(false);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [descripcion, setDescripcion] = useState("");

 // Esta hace el envío del formulario 
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Montamos el payload
    const payload = {
        usuario_id: idUsuario,
        puesto,
        nombre_empresa: nombreEmpresa,
        tipo_empleo: tipoEmpleo,
        ubicacion,
        en_curso: isCurrentJob,
        fecha_inicio: fechaInicio,// si está “en curso” quizá no envíes fecha_fin o la envíes nula
        fecha_fin: isCurrentJob ? null : fechaFin,
        descripcion,
      };

      try {
      const response = await axios.post('http://localhost:8080/experience', payload);
        
        
        if (response.status == 200) {
         // Redirige al perfil tras guardar
            navigate(`/perfil/${idUsuario}`);
        }else{
            console.error('Experience Error');
      }
  

        
      } catch (error) {
        console.error("No se pudo guardar la experiencia:", error);
        // Aquí podrías mostrar un toast o similar
      }

  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to={`/perfil/${idUsuario}`} className="inline-flex items-center text-[#2D6A4F] hover:text-[#1A4031]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al perfil
        </Link>
        <h1 className="text-2xl font-bold mt-2">Añadir experiencia</h1>
        <p className="text-gray-600">Completa los detalles de tu experiencia profesional</p>
      </div>

      <Card className="border-none shadow-sm" style={{ backgroundColor: "#A1D9B7", borderColor: "#A1D9B7" }}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="puesto" className="text-base font-medium">
                Puesto <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="puesto"
                  value={puesto}
                  onChange={(e) => setPuesto(e.target.value)}
                  placeholder="Ej: Desarrollador Senior de Proyectos Sostenibles"
                  className="pl-10 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nombre_empresa" className="text-base font-medium">
                Empresa <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="nombre_empresa"
                  value={nombreEmpresa}
                  onChange={(e) => setNombreEmpresa(e.target.value)}
                  placeholder="Ej: Empresa Sostenible S.L."
                  className="pl-10 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tipo_empleo" className="text-base font-medium">
                Tipo de empleo <span className="text-red-500">*</span>
              </Label>
              <Select value={tipoEmpleo}
                onValueChange={(val) => setTipoEmpleo(val)} 
                required>
                <SelectTrigger className="bg-white mt-1">
                  <SelectValue placeholder="Selecciona un tipo de empleo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jornada_completa">Jornada completa</SelectItem>
                  <SelectItem value="media_jornada">Media jornada</SelectItem>
                  <SelectItem value="autonomo">Autónomo</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="contrato_practicas">Contrato en prácticas</SelectItem>
                  <SelectItem value="becario">Becario</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ubicacion" className="text-base font-medium">
                Ubicación
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="ubicacion" placeholder="Ej: Madrid, España" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="pl-10 bg-white" />
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Switch className="cursor-pointer" id="en_curso" checked={isCurrentJob} onCheckedChange={setIsCurrentJob} />
              <Label htmlFor="en_curso" className="cursor-pointer">
                Actualmente trabajo aquí
              </Label>
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

              {!isCurrentJob && (
                <div>
                  <Label htmlFor="fecha_fin" className="text-base font-medium">
                    Fecha de finalización <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="fecha_fin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} type="date" className="pl-10 bg-white" required={!isCurrentJob} />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="descripcion" className="text-base font-medium">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe tus responsabilidades, logros y las tecnologías que utilizaste..."
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
              Guardar experiencia
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
