"use client"

import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Star,
  FileText,
  Share2,
  Heart,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Phone,
  Download,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface Proyecto {
    id: number;
    titulo: string;
    descripcion: string;
    categoria: string;
    imagen_url: string | null;
    recaudado: number;
    meta_financiacion: number;
    inversores: number;
    fecha_fin: string;
}
interface Roadmap {
  id: number;
  Titulo: string;
  Descripcion: string;
  Fecha: string;
  id_proyecto:number;
  
}

interface Problema {
  id: number;
  problema: string;
  id_proyecto:  number;
}
interface Solucion {
  id: number;
  solucion: string;
  solucion_desc: string;
  id_proyecto:  number;
}

interface Actualizacion {
  id: number;
  titulo: string;
  descripcion: string;
  created_at: Date;
  id_proyecto:  number;
}

export default function ProjectDetailPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const  id  = useParams<{ id: string }>();
    const idProyecto = id.idProyecto;
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idUsuarioProj, setIdUsuarioProj] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [imagenUrl, setImagenUrl] = useState(null);
    const [recaudado, setRecaudado] = useState(0);
    const [metaFinanciacion, setMetaFinanciacion] = useState(0);
    const [inversores, setInversores] = useState(0);
    const [fechaFin, setFechaFin] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [es_destacado, setEsDestacado] = useState('');
    const [sitio_web, setSitioWeb] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [sobre_proyecto, setSobreProyecto] = useState('');
    const [inversion_minima, setInversionMinima] = useState('');
    const [retorno_minimo, setRetornoMinimo] = useState('');
    const [retorno_maximo, setRetornoMaximo] = useState('');
    const [plazo_de, setPlazoDe] = useState('');
    const [plazo_hasta, setPlazoHasta] = useState('');
    const [montante, setMontante] = useState(0);
    const [equipo, setEquipo] = useState<Equipo[]>([]);
    const [problemas, setProblemas] = useState<Problema[]>([]);
    const [soluciones, setSoluciones] = useState<Solucion[]>([]);
    const [roadmap, setRoadmap] = useState<Roadmap  []>([]);
    const [actualizaciones, setActualizaciones] = useState<Actualizacion[]>([]);

  const avatarColors = ["#4C9B6A", "#2D6A4F", "#1A4031"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDestacadoOpen, setIsModalDestacadoOpen] = useState(false);
  const [isModalInversionOpen, setIsModalInversionOpen] = useState(false);
  
//TOKEN----------------------------------------------------
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
let idUser;
let role_id = -1;
if (token) {
  try {
    // Decodificar el token y obtener el nombre de usuario
    const decodedToken = jwtDecode(token);
    role_id = decodedToken.role_id;
    idUser = decodedToken.id;   
    
  } catch (error) {
    console.error("Error al decodificar el token", error);
  }
}
const idUsuario = idUser;
//TOKEN ends ----------------------------------------------
    //EXPERIENCIA
interface Equipo {
    proyecto_id: number;
    nombre: string;
    descripcion: string;
    cargo: string;
  }
  useEffect(() => {
    // Petición para obtener los datos del usuario

    axios.get(`http://localhost:8080/proyectofind/${idProyecto}`)
      .then(res => {
        if (res.status === 200) {

           setTitulo(res.data[0].titulo);
           setDescripcion(res.data[0].descripcion);
           setCategoria(res.data[0].categoria);
           setImagenUrl(res.data[0].imagen_url);
           setRecaudado(res.data[0].recaudado);
           setMetaFinanciacion(res.data[0].meta_financiacion);
           setInversores(res.data[0].inversores);
           setIdUsuarioProj(res.data[0].id_usuario);
           setFechaFin(res.data[0].fecha_fin);
           setFechaInicio(res.data[0].fecha_inicio);
           setEsDestacado(res.data[0].es_destacado);
           setSitioWeb(res.data[0].sitio_web);
           setTelefono(res.data[0].telefono);
           setUbicacion(res.data[0].ubicacion);
           setCorreo(res.data[0].correo);
           setSobreProyecto(res.data[0].sobre_proyecto);
           setInversionMinima(res.data[0].inversion_minima);
           setRetornoMinimo(res.data[0].retorno_minimo);
           setRetornoMaximo(res.data[0].retorno_maximo);
           setPlazoDe(res.data[0].plazo_de);
           setPlazoHasta(res.data[0].plazo_hasta);
        } else {
          throw new Error("No se pudo obtener el usuario");
        }
      })
      .catch(err => {
        console.error("Error al cargar datos de usuario:", err);
       // setError("No se pudieron cargar los datos del usuario.");
      });

      axios.get<Equipo[]>(`http://localhost:8080/equipo/${idProyecto}`)
      .then(res => {
        setEquipo(res.data);  // res.data ya es un Experiencia[]
        
      }).catch(err => {
        console.error("No hay equipos:", err);
       // setError("No se pudieron cargar los datos del usuario.");
      });

      axios.get<Problema[]>(`http://localhost:8080/problema/${idProyecto}`)
      .then(res => {
        setProblemas(res.data);  // res.data ya es un Experiencia[]
      }).catch(err => {
        console.error("No hay problemas:", err);
       // setError("No se pudieron cargar los datos del usuario.");
      });

      axios.get<Solucion[]>(`http://localhost:8080/solucion/${idProyecto}`)
      .then(res => {
        setSoluciones(res.data);  // res.data ya es un Solucion[]
      }).catch(err => {
 
        // console.log(err);
  
      });

      axios.get<Roadmap[]>(`http://localhost:8080/roadmap/${idProyecto}`)
      .then(res => {
        setRoadmap(res.data);  // res.data ya es un Experiencia[]
        
      }).catch(err => {
        console.error("No hay problemas:", err);
       // setError("No se pudieron cargar los datos del usuario.");
      });

      axios.get<Actualizacion[]>(`http://localhost:8080/actualizaciones/${idProyecto}`)
      .then(res => {
        setActualizaciones(res.data);  // res.data ya es un Actualizacion[]
        
      }).catch(err => {
        console.error("No hay problemas:", err);
       // setError("No se pudieron cargar los datos del usuario.");
      });
      axios.get(`http://localhost:8080/inversion/${idUsuario}/${idProyecto}`).then(res =>{
        if(res.status==200){
          
          if(res.data==false){
            setIsFavorite(false);
          }else{
            setIsFavorite(true);
          }
        }
        
      }).catch (err => {
        console.error(err);
        })
    }, );

    const calcularPorcentaje = (recaudado: number, meta: number) =>
    meta > 0 ? Math.min(100, Math.floor((recaudado / meta) * 100)) : 0;

    const calcularDiasRestantes = (fecha_fin: string) => {
        const ahora = new Date();
        const fin = new Date(fecha_fin);
        const diffMs = fin.getTime() - ahora.getTime();
        return diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;
      };


      const [isFavorite, setIsFavorite] = useState(false);
      const [loading, setLoading] = useState(false);
      const handleClickInversion = async () => {
        axios.put(`http://localhost:8080/proyectoinvertir/${idProyecto}`, {
          id: idProyecto,
          monto: montante,
      })
        .then(res => {
          if (res.status === 200) {
            console.log('Inversion actualizada correctamente');
            setIsModalInversionOpen(false);
            
          } else {
            throw new Error('Respuesta inesperada del servidor');
          }
        })
        .catch(err => {
          console.error('Error al actualizar “Inversion”:', err);
        });
      }
      const handleClick = async () => {
        const nextState = !isFavorite;
        setLoading(true);
    
        try {
          await axios.post('http://localhost:8080/inversion', {
            idUsuario,      // constante que recibes como prop
            idProyecto,     // constante que recibes como prop
            invertido: nextState,  // o el campo que tu API espere
          });
    
          setIsFavorite(nextState);
        } catch (error) {
          console.error("Inversión duplicada:", error);
        } finally {
          setLoading(false);
        }


      
      };
      function tiempoRelativo(fechaISO: Date) {
        const ahora = new Date();
        const fecha = new Date(fechaISO);
        const diffMs = ahora.getTime() - fecha.getTime();
        const diffSeg = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSeg / 60);
        const diffHrs = Math.floor(diffMin / 60);
        const diffDias = Math.floor(diffHrs / 24);
        if (diffDias >= 7) {
          const semanas = Math.floor(diffDias / 7);
          return semanas === 1 ? "Hace 1 semana" : `Hace ${semanas} semanas`;
        }
        if (diffDias >= 1) {
          return diffDias === 1 ? "Hace 1 día" : `Hace ${diffDias} días`;
        }
        if (diffHrs >= 1) {
          return diffHrs === 1 ? "Hace 1 hora" : `Hace ${diffHrs} horas`;
        }
        if (diffMin >= 1) {
          return diffMin === 1 ? "Hace 1 minuto" : `Hace ${diffMin} minutos`;
        }
        return "Hace unos segundos";
      }  

      async function callChatGPT(body: any): Promise<string> {
        try {
            // Enviar los datos al back
            const response = await axios.post('http://localhost:8080/api/gpt', {messages:body});      
            setTextoAnalisis(response.data);    
            setAnalysisDone(true);
            setLoadingAnalysis(false);  
          return textoAnalisis ?? 'Lo siento, no he podido generar respuesta.'
        } catch (error: any) {
          console.error('Error llamando a tu API local:', error.response ?? error.message)
          return 'Lo siento, ha ocurrido un error al contactar con el servicio local.'
        }
      }

        // Estado de carga y estado de análisis realizado
      const [loadingAnalysis, setLoadingAnalysis] = useState(false);
      const [analysisDone, setAnalysisDone] = useState(false);
      const [textoAnalisis, setTextoAnalisis] = useState('Cargando...');
  const handleClickAnalisis = () => {
    // Al hacer clic, activamos el modo de carga
    setLoadingAnalysis(true);

    // Aquí podrías llamar a tu lógica de análisis (API, cálculo, etc)
    // Simulación con setTimeout para el ejemplo
    setTimeout(() => {
      
      const QueryGPT = 
        "Te voy a pasar los detalles de un proyecto que esta puesto para financiación y quiero que actúes como un analista de riesgos de proyectos y me digas, en un párrafo y no más de 400 caracteres, cuánto de recomendable es invertir en el proyecto punto por punto."+
        " Información del Proyecto (en JSON):"+
        " Titulo del proyecto:" +titulo+
        " Descripción del proyecto:" +descripcion+
        " Meta Financiación:" +metaFinanciacion+
        " Recaudado:" +recaudado+
        " Retorno Minimo: "+retorno_minimo+
        " Retorno Maximo: "+retorno_maximo+
        " Plazo de retorno de: "+plazo_de+
        " Plazo de retorno hasta: "+plazo_hasta+
        " Numero de Inversores" +inversores+
        " Inversion Mínima: "+inversion_minima+
        " Equipo: " +equipo+
        " Problemas que soluciona: " +problemas+
        " Soluciones que plantea: " +soluciones+
        " Roadmap del proyecto: " +roadmap+
        " Últimas Actualizaciones: "+actualizaciones
      ;
      callChatGPT(QueryGPT);
    }, 2000);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link to="/marketplace" className="flex items-center text-[#4C9B6A] hover:text-[#2D6A4F]">
            <ArrowLeft size={20} className="mr-2" />
            Volver al marketplace
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-3 py-1 rounded-full text-sm font-medium">
                      Tecnología
                    </span>

                  </div>
                  <h1 className="text-3xl font-bold mb-2">{titulo}</h1>
                  <p className="text-gray-600 text-lg">
                   {descripcion}
                  </p>
                </div>
                <div className="flex gap-2">
                {role_id === 3 && idUser==idUsuarioProj && (
                <button
                    onClick={() => setIsModalDestacadoOpen(true)}
                    className={`p-2 rounded-lg border hover:bg-green-50 hover:border-green-200 hover:text-green-600 cursor-pointer`}
                  >
                  Destacar                  
                  </button>
                )}
                  {role_id === 2 && (
                  <button
                        onClick={handleClick}
                        disabled={loading}
                        className={`p-2 rounded-lg border cursor-pointer ${
                          isFavorite
                            ? "bg-blue-50 border-blue-200 text-blue-600"
                            : "bg-gray-50 border-gray-200 text-black-600"
                        } hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? "Procesando..." : "He invertido"}
                  </button>
                    )}
                </div>
              </div>
      {/* Modal */}
      {isModalDestacadoOpen && (
  <div
    className="
      fixed inset-0 flex items-center justify-center
      bg-transparent            /* sin color de fondo */
      backdrop-blur-md          /* desenfoque (≈8px) del fondo */
      z-50
    "
    onClick={() => setIsModalDestacadoOpen(false)}
  >

    <div
      className="bg-white rounded-xl p-6 w-full max-w-md relative"
      onClick={e => e.stopPropagation()} // evita que el click en el contenido cierre el modal
    >
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
        onClick={() => setIsModalDestacadoOpen(false)}
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">¿Quieres destacar tu proyecto?</h2>
      
      <p className="mb-4 text-gray-700">
        Para destacar este proyecto, por favor envíe un correo a
        <a
          href={"info@growly.com"}
          className="text-[#2D6A4F] font-semibold hover:underline mx-1"
        >
          info@growly.com
        </a>
        indicando que desea destacar este proyecto y le enviaremos su presupuesto
      </p>


      <button
        onClick={() => setIsModalDestacadoOpen(false)}
        className="w-full bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-2 rounded-lg font-semibold cursor-pointer"
      >
        Cerrar
      </button>
    </div>
  </div>
)}
              {/* Image Gallery */}
              <div className="relative mb-6">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img
                    src={ imagenUrl}
                    alt="EcoTech Solutions"
                    className="w-full h-full object-cover"
                  />
                   {/* Image Next 
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>*/}
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2D6A4F]">{recaudado}€</div>
                  <div className="text-sm text-gray-600">Recaudado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2D6A4F]">{calcularPorcentaje(recaudado, metaFinanciacion)}%</div>
                  <div className="text-sm text-gray-600">Completado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2D6A4F]">{inversores}</div>
                  <div className="text-sm text-gray-600">Inversores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2D6A4F]">{calcularDiasRestantes(fechaFin)}</div>
                  <div className="text-sm text-gray-600">Días restantes</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{recaudado}€ recaudados de {metaFinanciacion}€</span>
                  <span className="text-gray-500">Meta: {metaFinanciacion}€</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#4C9B6A] h-3 rounded-full" style={{ width: calcularPorcentaje(recaudado, metaFinanciacion)+"%" }}></div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8 ">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-1 border-b-2 font-medium cursor-pointer text-sm ${
                      activeTab === "overview"
                        ? "border-[#4C9B6A] text-[#4C9B6A]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Descripción
                  </button>
                  <button
                    onClick={() => setActiveTab("updates")}
                    className={`py-2 px-1 border-b-2 cursor-pointer font-medium text-sm ${
                      activeTab === "updates"
                        ? "border-[#4C9B6A] text-[#4C9B6A]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Actualizaciones
                  </button>
                  </nav>
              </div>
                  {/* Extended Future Version 

                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`py-2 px-1 border-b-2 cursor-pointer font-medium text-sm ${
                      activeTab === "comments"
                        ? "border-[#4C9B6A] text-[#4C9B6A]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Comentarios (24)
                  </button>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={`py-2 px-1 border-b-2 cursor-pointer font-medium text-sm ${
                      activeTab === "documents"
                        ? "border-[#4C9B6A] text-[#4C9B6A]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Documentos
                  </button>
                  */}


              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Sobre el proyecto</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                    {sobre_proyecto && sobre_proyecto.trim() !== '' ? (
                    <a >
                        {sobre_proyecto}
                    </a>
                    ) : (
                    <div className="text-gray-500 italic">No hay información sobre este proyecto</div>
                    )}
                    </p>

                  </div>

                  <div>
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-xl font-bold">Problema que resolvemos</h3>
    {role_id === 3 && idUser==idUsuarioProj && (
    <Link to={`/add/problema/${idProyecto}`}>
    <button
      className="text-sm font-medium bg-[#2D6A4F] hover:bg-[#1A4031] text-white px-3 py-1 rounded cursor-pointer"

    >
      + Problema
    </button>
    </Link>
    )}
  </div>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    {problemas.length === 0 ? (
      <div className="text-gray-500 italic">No hay información</div>
    ) : (
      <div className="space-y-4">
        {problemas.map((miembro, idx) => (
          <div key={`${miembro.id_proyecto}-${idx}`}>
            <li>{miembro.problema}</li>
          </div>
        ))}
      </div>
    )}
  </ul>
</div>

<div className="mt-6">
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-xl font-bold">Nuestra solución</h3>
    {role_id === 3 && idUser==idUsuarioProj && (
    <Link to={`/add/solucion/${idProyecto}`}>
    <button
      className="text-sm font-medium bg-[#2D6A4F] hover:bg-[#1A4031] text-white px-3 py-1 rounded cursor-pointer"
    >
      + Solución
    </button>
    </Link>
    )}
  </div>
  {soluciones.length === 0 ? (
    <div className="text-gray-500 italic">No hay información</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {soluciones.map((miembro, idx) => (
        <div
          key={`${miembro.id_proyecto}-${idx}`}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <h4 className="font-semibold mb-2">{miembro.solucion}</h4>
          <p className="text-sm text-gray-600">{miembro.solucion_desc}</p>
        </div>
      ))}
    </div>
  )}
</div>

<div className="mt-6">
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-xl font-bold">Roadmap del proyecto</h3>
    {role_id === 3 && idUser==idUsuarioProj && (
    <Link to={`/add/roadmap/${idProyecto}`}>
    <button
      className="text-sm font-medium bg-[#2D6A4F] hover:bg-[#1A4031] text-white px-3 py-1 rounded cursor-pointer"
      onClick={() => {
        /* función para añadir un ítem al roadmap */
      }}
    >
      + Roadmap
    </button>
    </Link>
    )}
  </div>
  {roadmap.length === 0 ? (
    <div className="text-gray-500 italic">No hay información sobre el Roadmap</div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      {roadmap.map((miembro, idx) => (
        <div
          key={`${miembro.id_proyecto}-${idx}`}
          className="space-y-4"
        >
          <div className="flex items-start">
            <div className="bg-[#4C9B6A] w-3 h-3 rounded-full mt-2 mr-4"></div>
            <div>
              <h4 className="font-semibold">
                {miembro.Fecha} - {miembro.Titulo}
              </h4>
              <p className="text-sm text-gray-600">{miembro.Descripcion}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

                </div>
              )}

{activeTab === "updates" && (
  <div>
    {/* Contenedor del botón */}
    <div className="flex justify-end mb-4">
    {role_id === 3 && idUser==idUsuarioProj && (
      <Link to={`/add/actualizacion/${idProyecto}`}>
      <button
        className="text-sm font-medium bg-[#2D6A4F] hover:bg-[#1A4031] text-white px-3 py-1 rounded cursor-pointer"
      >
        + Actualización
      </button>
      </Link>
    )}
    </div>

    {/* Listado de actualizaciones */}
    <div className="space-y-6">
      {actualizaciones.length === 0 ? (
        <p className="text-gray-500">No hay actualizaciones todavía.</p>
      ) : (
        actualizaciones.map((act) => (
          <div
            key={act.id}
            className="border-l-4 border-[#4C9B6A] pl-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm text-gray-500">
                {tiempoRelativo(new Date(act.created_at))}
              </span>
            </div>
            <h4 className="font-semibold mb-2">{act.titulo}</h4>
            <p className="text-gray-700">{act.descripcion}</p>
          </div>
        ))
      )}
    </div>
  </div>
)}


              {activeTab === "comments" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">María González</span>
                          <span className="text-sm text-gray-500">Hace 3 horas</span>
                        </div>
                        <p className="text-gray-700">
                          Excelente proyecto. Como propietaria de una pequeña empresa, esto podría ayudarme mucho a
                          reducir costos operativos. ¿Tienen planes para integración con sistemas existentes?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#2D6A4F] rounded-full flex items-center justify-center text-white font-semibold">
                        J
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">Juan Pérez</span>
                          <span className="text-sm text-gray-500">Hace 1 día</span>
                        </div>
                        <p className="text-gray-700">
                          Me parece una solución muy innovadora. ¿Cuál es el tiempo estimado de retorno de la inversión
                          para un hogar promedio?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <textarea
                      placeholder="Escribe tu comentario..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                      rows={3}
                    />
                    <button className="mt-2 bg-[#4C9B6A] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-lg">
                      Publicar comentario
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-[#4C9B6A]" />
                      <div>
                        <h4 className="font-semibold">Plan de Negocio</h4>
                        <p className="text-sm text-gray-500">PDF • 2.5 MB</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#4C9B6A] hover:text-[#2D6A4F]">
                      <Download size={16} />
                      Descargar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-[#4C9B6A]" />
                      <div>
                        <h4 className="font-semibold">Análisis Financiero</h4>
                        <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#4C9B6A] hover:text-[#2D6A4F]">
                      <Download size={16} />
                      Descargar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Play size={24} className="text-[#4C9B6A]" />
                      <div>
                        <h4 className="font-semibold">Video Pitch</h4>
                        <p className="text-sm text-gray-500">MP4 • 5 minutos</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#4C9B6A] hover:text-[#2D6A4F]">
                      <Play size={16} />
                      Reproducir
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
{/* Sidebar */}
<div className="lg:col-span-1">
        {/* Investment Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-4">
          <h3 className="text-xl font-bold mb-4">Invertir en este proyecto</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Inversión mínima:</span>
              <span className="font-semibold">{inversion_minima}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Retorno esperado:</span>
              <span className="font-semibold text-[#4C9B6A]">
                {retorno_minimo}%-{retorno_maximo}% anual
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Plazo:</span>
              <span className="font-semibold">{plazo_de}-{plazo_hasta} años</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-3 rounded-lg font-semibold mb-4 cursor-pointer"
          >
            Invertir ahora
          </button>
          {role_id === 3 && idUser==idUsuarioProj && (
          <button
            onClick={() => setIsModalInversionOpen(true)}
            className="w-full bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-3 rounded-lg font-semibold mb-4 cursor-pointer"
          >
            Nueva Inversión
          </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div
    className="
      fixed inset-0 flex items-center justify-center
      bg-transparent            /* sin color de fondo */
      backdrop-blur-md          /* desenfoque (≈8px) del fondo */
      z-50
    "
    onClick={() => setIsModalOpen(false)}
  >

    <div
      className="bg-white rounded-xl p-6 w-full max-w-md relative"
      onClick={e => e.stopPropagation()} // evita que el click en el contenido cierre el modal
    >
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
        onClick={() => setIsModalOpen(false)}
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">Información de Inversión</h2>
      
      <p className="mb-4 text-gray-700">
        Para invertir en esta empresa, por favor envíe un correo a
        <a
          href={correo}
          className="text-[#2D6A4F] font-semibold hover:underline mx-1"
        >
          {correo}
        </a>
        indicando:
      </p>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>Tus datos personales (nombre completo, DNI/NIE o pasaporte, teléfono).</li>
        <li>El montante concreto a invertir (por ejemplo, 5.000 €) o un rango aproximado (por ejemplo, entre 5.000 € y 10.000 €).</li>
      </ul>

      <button
        onClick={() => setIsModalOpen(false)}
        className="w-full bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-2 rounded-lg font-semibold cursor-pointer"
      >
        Cerrar
      </button>
    </div>
  </div>
)}
      {/* Modal Inversión */}
      {isModalInversionOpen && (
        <div
          className="
            fixed inset-0 flex items-center justify-center
            bg-transparent            /* sin color de fondo */
            backdrop-blur-md          /* desenfoque (≈8px) del fondo */
            z-50
          "
          onClick={() => setIsModalInversionOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // evita que el click en el contenido cierre el modal
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setIsModalInversionOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Añade una nueva inversión
            </h2>



            {/* Campo para recoger el montante de inversión */}
            <div className="mb-6">
              <label htmlFor="montanteInversion" className="block text-gray-700 font-medium mb-2">
                Montante de inversión (€):
              </label>
              <input
                id="montanteInversion"
                type="number"
                value={montante}
                onChange={(e) => setMontante(e.target.value)}
                placeholder="Ej. 5000"
                className="
                  w-full
                  border border-gray-300
                  rounded-lg
                  px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]
                "
              />
            </div>

            {/* Botón de submit */}
            <button
              onClick={handleClickInversion}
              className="
                w-full
                bg-[#2D6A4F]
                hover:bg-[#1A4031]
                text-white
                py-2
                rounded-lg
                font-semibold
                cursor-pointer
                mb-3
              "
            >
              Enviar inversión
            </button>

            {/* Botón de cerrar (opcional, si quieres que además del submit exista un cierre manual) */}
            <button
              onClick={() => setIsModalInversionOpen(false)}
              className="
                w-full
                bg-gray-200
                hover:bg-gray-300
                text-gray-800
                py-2
                rounded-lg
                font-semibold
                cursor-pointer
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

            {/* Team Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Equipo fundador</h2>
                  {role_id === 3 && idUser==idUsuarioProj && (
                  <Link to={`/add/team/${idProyecto}`}>
                    <button className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-2 rounded-lg font-semibold cursor-pointer px-4">
                      + Miembros
                    </button>
                  </Link>
                  )}
              </div>
                    {equipo.length === 0 ? (
                    <p className="text-gray-500 italic">
                        No hay datos del equipo del proyecto.
                    </p>
                    ) : (
                    <div className="space-y-4">
                        {equipo.map((miembro, idx) => (
                        <div
                            key={`${miembro.proyecto_id}-${idx}`}  // ← clave ahora única
                            className="flex items-center gap-3"
                        >
                            <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}
                            >
                            {miembro.nombre.charAt(0)}
                            </div>
                            <div>
                            <h4 className="font-semibold">{miembro.nombre}</h4>
                            <p className="text-sm text-gray-600">{miembro.cargo}</p>
                            <p className="text-xs text-gray-500">{miembro.descripcion}</p>
                            </div>
                        </div>
                        ))}
                    </div>
)}

                </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Contacto</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-[#4C9B6A]" />
                  <a href={sitio_web} >
                  {sitio_web && sitio_web.trim() !== '' ? (
                    <a href={sitio_web} className="text-[#4C9B6A] hover:underline">
                        {sitio_web}
                    </a>
                    ) : (
                    <div className="text-gray-500 italic">No hay datos de sitio web</div>
                    )}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#4C9B6A]" />
                  <a>
                  {correo && correo.trim() !== '' ? (
                    <a className="text-[#4C9B6A] hover:underline">
                        {correo}
                    </a>
                    ) : (
                    <div className="text-gray-500 italic">No hay datos de correo</div>
                    )}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#4C9B6A]" />
                  <span className="text-gray-700">
                  {telefono && telefono.trim() !== '' ? (
                    <a>
                        {telefono}
                    </a>
                    ) : (
                    <div className="text-gray-500 italic">No hay datos del teléfono</div>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#4C9B6A]" />
                  <span className="text-gray-700">
                  {ubicacion && ubicacion.trim() !== '' ? (
                    <a>
                        {ubicacion}
                    </a>
                    ) : (
                    <div className="text-gray-500 italic">No hay datos del ubicación</div>
                    )}
                  </span>
                </div>
              </div>
            </div>
            {/* Analisis Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-5">
      <h3 className="text-xl font-bold mb-4">Asistencia IA Análisis de Riesgo</h3>

      <div className="space-y-3">
        {!analysisDone ? (
          <button
            onClick={handleClickAnalisis}
            className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-2 rounded-lg font-semibold cursor-pointer px-4"
            disabled={loadingAnalysis}
          >
            {loadingAnalysis ? 'Cargando...' : 'Realizar Análisis de Riesgo'}
          </button>
        ) : (
          <p className="text-green-600 font-semibold">{textoAnalisis}</p>
        )}
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  )
}

