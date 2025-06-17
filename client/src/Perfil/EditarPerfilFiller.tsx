import type React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Calendar, Briefcase, MapPin, Phone, Globe } from "lucide-react"
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

export default function EditProfilePage() {

//------------------------------------TOKEN-----------------------------------------------
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
  if (token) {
    try {
      // Decodificar el token y obtener el nombre de usuario
      const decodedToken = jwtDecode(token);
      id = decodedToken.id;

    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  }
  const idUsuario = id;
//------------------------------------TOKEN-----------------------------------------------



  const navigate = useNavigate()
  const [nombreUsuario, setNombreUsuario] = useState("");  
  const [apellidos, setApellidos] = useState("");  
  const [profesion, setProfesion] = useState(Date);  
  const [ciudad, setCiudad] = useState(""); 
  const [pais, setPais] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sitioWeb, setSitioWeb] = useState("");
  const [email, setEmail] = useState("");
  const [acerca_de, setAcercaDe] = useState("");

  useEffect(() => {
    // Si idUsuario no está definido, no hacemos nada
    if (!idUsuario) return;
  
    // Petición para obtener los datos del usuario
    axios.get(`http://localhost:8080/user/${idUsuario}`)
      .then(res => {
        if (res.status === 200) {
          setNombreUsuario(res.data.name);
          setApellidos(res.data.surname);
          setAcercaDe(res.data.acerca_de);
          //setPassword(res.data.password);
          setProfesion(res.data.titulo_profesional);
          setCiudad(res.data.ciudad);
          setPais(res.data.pais);
          setEmail(res.data.email);
          //añade 86 400 000 ms (un día) 
          //-----BUG FIX------
          const fechaPlus = new Date(Date.parse(res.data.birth_date) + 864e5)
          .toISOString()
          .slice(0, 10);
          const isoDate = fechaPlus.split("T")[0];
        
          setNacimiento(isoDate);
          //console.log(nacimiento);
        //   setImagenPerfil(res.data.url_imagen_perfil);
        //   setImagenCabecera(res.data.url_imagen_cabecera);
          setTelefono(res.data.telefono);
          setSitioWeb(res.data.sitio_web);
        //   setConfiguracionPrivacidad(res.data.configuracion_privacidad);
        //   setContadorConexiones(res.data.contador_conexiones);
        } else {
          throw new Error("No se pudo obtener el usuario");
        }
      })
      .catch(err => {
        console.error("Error al cargar datos de usuario:", err);
       // setError("No se pudieron cargar los datos del usuario.");
      });
    }, [idUsuario]); 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
          case "nombre":
            setNombreUsuario(value);
            break;
          case "apellido":
            setApellidos(value);
            break;
          case "tituloProfesional":
            setProfesion(value);
            break;
          case "fechaNacimiento":
            setNacimiento(value);
            break;
          case "ciudad":
            setCiudad(value);
            break;
          case "pais":
            setPais(value);
            break;
          case "telefono":
            setTelefono(value);
            break;
          case "sitioWeb":
            setSitioWeb(value);
            break;
          default:
            break;
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //Mi UPDATE
        axios.put(`http://localhost:8080/user/${idUsuario}`, {
            id: idUsuario,
            name: nombreUsuario,
            surname: apellidos,
             email: email,
             acerca_de : acerca_de,
            // password: password,
            titulo_profesional: profesion,
            birth_date : nacimiento,
            // url_imagen_perfil: url_imagen_perfil,
            // url_imagen_cabecera: url_imagen_cabecera,
            ciudad: ciudad,
            pais: pais,
            telefono: telefono,
            sitio_web: sitioWeb,
        })
          .then(res => {
            if (res.status === 200) {
              navigate(`/perfil/${idUsuario}`);
              console.log('Usuario de actualizado correctamente');
            } else {
              throw new Error('Respuesta inesperada del servidor');
            }
          })
          .catch(err => {
            console.error('Error al actualizar usuario:', err);
          });
};

  const handleGoPerfil = () => {
    navigate(`/perfil/${idUsuario}`);
  };

  return (
<div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to={`/perfil/${idUsuario}`} className="inline-flex items-center text-[#2D6A4F] hover:text-[#1A4031]">
          <ArrowLeft className="h-4 w-4 mr-2"/>
          Volver al perfil
        </Link>
        <h1 className="text-2xl font-bold mt-2">Editar información del perfil</h1>
        <p className="text-gray-600">Actualiza tu información personal</p>
      </div>

      <Card className="border-none shadow-sm" style={{ backgroundColor: "#A1D9B7", borderColor: "#A1D9B7" }}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" className="text-base font-medium">
                  Nombre <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="nombre"
                    value={nombreUsuario}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="pl-10 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="apellido" className="text-base font-medium">
                  Apellido <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="apellido"
                    value={apellidos}
                    onChange={handleInputChange}
                    placeholder="Tu apellido"
                    className="pl-10 bg-white"
                    required
                  />
                </div>
              </div>
            </div>


            <div>
              <Label htmlFor="fechaNacimiento" className="text-base font-medium">
                Fecha de Nacimiento
              </Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={nacimiento}
                  onChange={handleInputChange}
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tituloProfesional" className="text-base font-medium">
                Título Profesional <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="tituloProfesional"
                  value={profesion}
                  onChange={handleInputChange}
                  placeholder="Ej: Desarrollador Senior, Diseñador UX/UI, etc."
                  className="pl-10 bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ciudad" className="text-base font-medium">
                Ciudad
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="ciudad"
                  value={ciudad}
                  onChange={handleInputChange}
                  placeholder="Tu ciudad"
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pais" className="text-base font-medium">
                País
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="pais"
                  value={pais}
                  onChange={handleInputChange}
                  placeholder="Tu país"
                  className="pl-10 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="telefono" className="text-base font-medium">
              Teléfono
            </Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={handleInputChange}
                placeholder="+34 612 345 678"
                className="pl-10 bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="sitioWeb" className="text-base font-medium">
              Sitio Web
            </Label>
            <div className="relative mt-1">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="sitioWeb"
                type="url"
                value={sitioWeb}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com"
                className="pl-10 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoPerfil}
              className="border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#A1D9B7]/20 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white cursor-pointer">
              Guardar cambios
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
