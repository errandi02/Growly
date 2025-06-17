"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Pencil, MapPin, Briefcase, GraduationCap, Plus, MessageSquare, Share2, PlusCircle, X, BookmarkPlus, ThumbsUp, MailOpen, User, Info, BookOpen, Book, IdCard, UserMinus, UserPlus } from "lucide-react"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
interface Usuario {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  titulo_profesional: string;
  acerca_de: string;
  birth_date: string;               // asumes que viene en formato ISO (ej. "2023-05-01T00:00:00.000Z")
  url_imagen_perfil: string;
  url_imagen_cabecera: string;
  ciudad: string;
  pais: string;
  telefono: string;
  sitio_web: string;
  configuracion_privacidad: string; // si fuese un enum o booleano, ajústalo según tu backend
  contador_conexiones: number;
  isMentor: number;
}
interface Mentoria {
  id: string;
  especializacion: string;
  descripcion: string;
}

export default function PerfilBody() {
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
      const idUserToken = id;
      const currUserId = id;
      const formatDate = (dateStr: string | number | Date) => {
        const d = new Date(dateStr);
        return d.toLocaleString("es-ES", { month: "short", year: "numeric" });
      };
      const formatDateTime = (dateStr: string | number | Date) => {
        const d = new Date(dateStr);
        return d.toLocaleString("es-ES", {
          day:   "2-digit",   // día con dos dígitos
          month: "short",     // mes abreviado (ej. “may.”)
          year:  "numeric",   // año completo
          hour:   "2-digit",  // hora en formato 24 h
          minute: "2-digit",  // minutos con dos dígitos
          // second: "2-digit", // segundos, opcional
          hour12: false       // fuerza 24 h en algunos entornos
        });
      };
      
      const getDateRange = (start: string | number | Date, end: string | number | Date, inProgress: any) => {
        const from = formatDate(start);
        const to = inProgress ? "actualidad" : formatDate(end);
        return `${from} - ${to}`;
      };
  

    const { idUsuario } = useParams<{ idUsuario: string }>();

    const [ubicacion, setUbicacion] = useState("");  
    const [email, setEmail] = useState("");
    const [acerca_de, setAcercaDe] = useState("");

    //Experiencias
    const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
    const [educaciones, setEducaciones] = useState<Educacion[]>([]);
    const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [usuario, setUsuario] = useState<Usuario>();
    const [mentoriaInfo, setMentoriaInfo] = useState<Mentoria>();
    const [idSeguidores, setIdSeguidores] = useState<number[]>([]);

    useEffect(() => {
      if (!idUserToken) return;
  
      axios
        .get<{ following: number }[]>(`http://localhost:8080/following/${idUserToken}`)
        .then(res => {
          if (res.status === 200) {
            // Extraemos todos los IDs en un array de números
            const todosLosIds: number[] = res.data.map(seg => seg.following);
            setIdSeguidores(todosLosIds);

          
          } else {
            console.error('Status inesperado al traer following:', res.status);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }, [idUsuario]); // se volverá a ejecutar si cambia idUsuario
// Cambia la firma para recibir string (o undefined)
const handleFollow = async (userIdRaw?: string) => {
  // 1) Validamos y convertimos
  if (!userIdRaw) {
    console.error("No hay ID de usuario");
    return;
  }
  const userId = Number(userIdRaw);
  if (!Number.isInteger(userId)) {
    console.error("ID inválido:", userIdRaw);
    return;
  }

  try {
    if (isFollowing(userId)) {
      await axios.delete(
        `http://localhost:8080/unfollow/${idUserToken}/${userId}`
      );
      setIdSeguidores(prev => prev.filter(id => id !== userId));
    } else {
      
      await axios.post(`http://localhost:8080/follow`, {
        follower: idUserToken,
        following: userId
      }).catch(err => {
          console.error(err)
      });
      const idNum = Number(idUsuario);
      setIdSeguidores(prev => [...prev, idNum]);
      console.log(idSeguidores)
    }
  } catch (err) {
    console.error("Error al (de)seguir:", err);
  }
};
 
    const isFollowing = (userId: number) =>
    idSeguidores.includes(userId)

    //console.log(isFollowing(idUserToken));
    console.log(idSeguidores)
        useEffect(() => {
        // Si idUsuario no está definido, no hacemos nada
        if (!idUsuario) return;
      
        // Petición para obtener los datos del usuario
        axios.get(`http://localhost:8080/user/${idUsuario}`)
          .then(res => {
            if (res.status === 200) {
              setUsuario(res.data);
              setAcercaDe(res.data.acerca_de);
              setUbicacion(res.data.ciudad +", "+ res.data.pais)
            } else {
              throw new Error("No se pudo obtener el usuario");
            }
          })
          .catch(err => {
            console.error("Error al cargar datos de usuario:", err);
           // setError("No se pudieron cargar los datos del usuario.");
          });

          axios.get<Experiencia[]>(`http://localhost:8080/experience/${idUsuario}`)
          .then(res => {
            setExperiencias(res.data);  // res.data ya es un Experiencia[]
    
          }).catch(err => {
            console.error("No hay experiencia:", err);
           // setError("No se pudieron cargar los datos del usuario.");
          });

          axios.get<Educacion[]>(`http://localhost:8080/educacion/${idUsuario}`)
          .then(res => {
            setEducaciones(res.data);  // res.data ya es un Experiencia[]
    
          }).catch(err => {
            console.error("No hay experiencia:", err);
           // setError("No se pudieron cargar los datos del usuario.");
          });

          axios.get<Habilidad[]>(`http://localhost:8080/habilidad/${idUsuario}`)
          .then(res => {
            setHabilidades(res.data);  // res.data ya es un Habilidad[]
    
          }).catch(err => {
            console.error("No hay experiencia:", err);
           // setError("No se pudieron cargar los datos del usuario.");
          });
          axios.get<Post[]>(`http://localhost:8080/myPosts?id=${idUsuario}`)
          .then(res => {
            // Ordenar de más reciente a más antiguo
            const sortedPosts = res.data.sort((a, b) => 
              new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime()
            );
            setPosts(sortedPosts);
            
          })
          .catch(err => {
            console.error("No hay Posts:", err);
            // setError("No se pudieron cargar los datos del usuario.");
          });
          axios.get<Mentoria>(`http://localhost:8080/mentor/${idUsuario}`)
          .then(res => {
            // Ordenar de más reciente a más antiguo
              setMentoriaInfo(res.data[0]);
              
          })
          .catch(err => {
            console.error("No hay Posts:", err);
            // setError("No se pudieron cargar los datos del usuario.");
          });
        


      }, [idUsuario]); // El useEffect se ejecuta cuando el id cambia

      const [authorMap, setAuthorMap] = useState<Record<number, {
        name: string;
        surname: string;
        profesion: string;
        urlImagenPerfil?: string;
      }>>({});
  // Efecto que carga autores según posts.autor
  useEffect(() => {
    const autorIds = Array.from(new Set(posts.map(p => p.autor)));
    if (!autorIds.length) return;

    Promise.all(
      autorIds.map(idAutor =>
        axios.get(`http://localhost:8080/user/${idAutor}`)
      )
    )
    .then(resps => {
      const mapa: typeof authorMap = {};
      resps.forEach(r => {
        const u = r.data;
        mapa[u.id] = {
          name: u.name,
          surname: u.surname,
          profesion: u.titulo_profesional,
          urlImagenPerfil: u.url_imagen_perfil,
        };
      });
      setAuthorMap(mapa);
    })
    .catch(err => console.error("Error cargando autores:", err));
  }, [posts]);



  // Editar Acerca De
  const [isEditableAcercaDe, setIsEditableAcercaDe] = useState(false);
  const handleEditAcercaDe = () => {
    setIsEditableAcercaDe(true);
  };
  const handleChangeAcercaDe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAcercaDe(e.target.value); 
  };
  const handleSaveAcercaDe = () => {
    setIsEditableAcercaDe(false); // Desactiva el modo de edición
    //Mi UPDATE
    axios.put(`http://localhost:8080/user/acerca_de/${idUsuario}`, {
        id: idUsuario,
        acerca_de: acerca_de,

    })
      .then(res => {
        if (res.status === 200) {
          // Opcional: mostrar notificación de éxito
          console.log('Acerca de actualizado correctamente');
        } else {
          throw new Error('Respuesta inesperada del servidor');
        }
      })
      .catch(err => {
        console.error('Error al actualizar “Acerca de”:', err);
        // Opcional: volver a habilitar el modo edición para reintentar
        setIsEditableAcercaDe(true);
      });
      window.location.reload();
};

//EXPERIENCIA
interface Experiencia {
  id: number;
  usuario_id: number;
  nombre_empresa: string;
  url_logo_empresa: string;
  puesto: string;
  tipo_empleo: string;
  fecha_inicio: string;  // o Date si luego parseas
  fecha_fin: string;     // idem
  en_curso: number;      // 0 ó 1
  ubicacion: string;
  descripcion: string;
  creado_en: string;
  actualizado_en: string;
}
const navigate = useNavigate();

const handleAdd = () => {
  // Aquí podrías abrir un modal, redirigir a un formulario, etc.
  //console.log("Abrir formulario para añadir experiencia");
  navigate(`/experiencia/${idUsuario}`);
};

//CHANGE EXPERIENCIA
const [isEditingExp, setIsEditingExp] = useState(false);
  // 2. Al clicar el lápiz de “Experiencia destacada” toggleamos el flag
  const handleToggleEdit = () => {
    setIsEditingExp(prev => !prev);
  };

  const [idExperiencia, setIdExperiencia] = useState(0);

  // 3. Handler para cada lápiz individual (recibe id de la experiencia)
  const handleEditOne = (idExperiencia: any) => {
    console.log("Editar experiencia con id:", idExperiencia);
    navigate(`/experiencia/edit/${idExperiencia}`);
  };

const handleChangeExperiencia = () => {
  console.log("Cambia Experiencia.")
};
const handleDeleteOne = (idExp: number) => {
    // Opción: pedir confirmación al usuario
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta experiencia?')) {
      return;
    }
  
    axios.delete(`http://localhost:8080/experiencia/delete/${idExp}`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log('Usuario eliminado correctamente');
          navigate(0);
        } else {
          throw new Error(`Respuesta inesperada: ${res.status}`);
        }
      })
      .catch(err => {
        console.error('Error al eliminar el usuario:', err);
      });

};

//Educacion
interface Educacion {
  id: number;
  usuario_id: number;
  nombre_institucion: string;
  url_logo_institucion: string;
  grado: string;
  campo_estudio: string;
  fecha_inicio: string;  // o Date si luego parseas
  fecha_fin: string;     // idem
  descripcion: string;
  creado_en: string;
  actualizado_en: string;
}

const handleAddEducacion = () => {
  // Aquí podrías abrir un modal, redirigir a un formulario, etc.
  console.log("Abrir formulario para añadir educacion");
  navigate(`/educacion/${idUsuario}`);
};

const [isEditingEdu, setIsEditingEdu] = useState(false);
const handleToggleEditEducacion = () => {
  setIsEditingEdu(prev => !prev);
};

const handleDeleteOneEdu = (idEdu: number) => {
  // Opción: pedir confirmación al usuario
  if (!window.confirm('¿Estás seguro de que quieres eliminar esta educación?')) {
    return;
  }

  axios.delete(`http://localhost:8080/educacion/delete/${idEdu}`)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        console.log('Usuario eliminado correctamente');
        navigate(0);
      } else {
        throw new Error(`Respuesta inesperada: ${res.status}`);
      }
    })
    .catch(err => {
      console.error('Error al eliminar el usuario:', err);
    });

};

const handleEditOneEdu = (idEducacion: any) => {
  console.log("Editar educacion con id:", idEducacion);
  navigate(`/educacion/edit/${idEducacion}`);
};

//Habilidad
interface Habilidad {
  id: number;
  usuario_id: number;
  nombre: string;
}
const handleAddHabilidad = () => {
  // Aquí podrías abrir un modal, redirigir a un formulario, etc.
  console.log("Abrir formulario para añadir habilidad");
    navigate(`/habilidad/${idUsuario}`);
};
const [isEditingHab, setIsEditingHab] = useState(false);
const handleToggleEditHabilidad = () => {
  setIsEditingHab(prev => !prev);
};
const handleDeleteOneHab = (idHab: number) => {
  // Opción: pedir confirmación al usuario
  if (!window.confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) {
    return;
  }

  axios.delete(`http://localhost:8080/habilidad/delete/${idHab}`)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        console.log('Habilidad eliminado correctamente');
        navigate(0);
      } else {
        throw new Error(`Respuesta inesperada: ${res.status}`);
      }
    })
    .catch(err => {
      console.error('Error al eliminar el habilidad:', err);
    });

};

//Posts
interface Post {
  id:number;
  autor: number;
  contenido: string;
  fecha_publicacion: Date;
  imagen: string;
  likes: string;
  comentarios: string;
  compartidos: string;
  etiquetas: string;
  url: string;
  visibilidad: string;
  hashtags: string;
  localizacion: string;
  archivo_adjunto: string;
  estado: string;

}

const handleMeGusta = () => {
  console.log("Me gusta");
};

const handleGoHome = () => {
  navigate('/home');
};


  return (
    <div className="max-w-4xl mx-auto mt-2">
      {/* Portada y foto de perfil */}
      <Card className=" shadow-sm overflow-hidden" style={{background:'#f1fff4', borderColor: '#A1D9B7' }}>
      <div
  className="h-48 bg-gradient-to-r from-[#2D6A4F] to-[#A1D9B7]"
  style={{
    backgroundImage: `url('https://picsum.photos/1200/300?random=${Math.floor(Math.random()*10000)}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  
>
  {/*  
  <div className="flex justify-end p-4">
    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white cursor-pointer">
      <Pencil className="h-4 w-4 mr-1" />
      Editar portada
    </Button>
  </div>
  */}
</div>


        <CardContent className="p-0" >
          <div className="relative px-6 pb-6">
            <Avatar className="h-32 w-32 absolute -top-16 border-4 border-white">
              <AvatarImage src="https://github.com/shadcn.png" alt="Tu perfil" />
              <AvatarFallback className="text-2xl bg-[#A1D9B7]">TU</AvatarFallback>
            </Avatar>

            <div className="flex justify-end pt-4 mb-16">
              <div className="flex gap-2">
                {usuario?.id != idUserToken && (
                <Link to={`/chat/${idUsuario}`}>
                <Button  className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white cursor-pointer">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Mensaje
                </Button></Link>
                )}
{usuario?.id !== idUserToken ? (
  
    <button
      onClick={() => handleFollow(idUsuario)}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
        isFollowing(Number(idUsuario))
          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
          : "bg-[#2D6A4F] hover:bg-[#1A4031] text-white"
      }`}
    >
      {isFollowing(Number(idUsuario)) ? (
        <>
          <UserMinus size={14} />
          Siguiendo
        </>
      ) : (
        <>
          <UserPlus size={14} />
          Seguir
        </>
      )}
    </button>
 
) : (
  <div className="h-4 w-4 mr-3 mt-2">
    <IdCard color="#2D6A4F" />
  </div>
)}

                {usuario?.isMentor==0 && usuario.id == idUserToken && (
                <Link to={`/mentor/${idUsuario}`}>
                <Button className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white cursor-pointer">
                  <User className="h-4 w-4 mr-1" />
                  ¿Eres mentor?
                </Button>
                </Link>)}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{usuario?.name} {usuario?.surname}</h1>
                  <p className="text-lg text-gray-700">
                    {usuario?.titulo_profesional}
                  </p>

                  <div className="flex items-center gap-1 text-gray-600 mt-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    
                    {ubicacion != null  && ubicacion.trim() !== '' && ubicacion.trim() !== ','&& ubicacion.trim() !== 'null, null' ? (
                    <span>
                        {ubicacion}
                    </span>
                    ) : (
                    <div className="text-gray-500 italic">Sin ubicación</div>
                    )}
                    <span className="mx-1">•</span>
                    <a href="#" className="text-[#2D6A4F] hover:underline">
                      {email}
                    </a>
                  </div>

                  {/* <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-[#A1D9B7] text-[#2D6A4F] hover:bg-[#8BC7A1]">500+ contactos</Badge>
                  </div> */}
                </div>


              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas de contenido */}
      <Tabs defaultValue="sobre-mi" className="mt-4">
        <TabsList className="bg-[#A1D9B7]/20 border-color:black">
          <TabsTrigger value="sobre-mi" className="data-[state=active]:bg-[#A1D9B7]/40 data-[state=active]:text-white cursor-pointer">
            Sobre mí
          </TabsTrigger>
          <TabsTrigger value="publicaciones" className="data-[state=active]:bg-[#A1D9B7]/40 data-[state=active]:text-white cursor-pointer">
            Publicaciones
          </TabsTrigger>
          <TabsTrigger value="habilidades" className="data-[state=active]:bg-[#A1D9B7]/40 data-[state=active]:text-white cursor-pointer">
            Habilidades
          </TabsTrigger>
          {usuario?.isMentor == 1 &&(
          <TabsTrigger value="mentor" className="data-[state=active]:bg-[#A1D9B7]/40 data-[state=active]:text-white cursor-pointer">
            Mentor
          </TabsTrigger>)}
        </TabsList>

        <TabsContent value="sobre-mi">
        <Card className=" shadow-sm" style={{background:'#f1fff4', borderColor: '#A1D9B7' }}>
  <CardContent className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Acerca de</h2>
      {currUserId == idUsuario &&(
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer" 
        onClick={handleEditAcercaDe}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      )}
    </div>
    
    {isEditableAcercaDe ? (
  <div>
    <textarea
      value={acerca_de} // El valor del texto en el textarea es el estado de "acerca_de"
      onChange={handleChangeAcercaDe} // Aquí manejamos los cambios en el textarea
      className="w-full p-2 border border-gray-300 rounded-md"
    />
    <Button 
      onClick={handleSaveAcercaDe} // Aquí guardamos los cambios y salimos del modo de edición
      className="mt-2 text-white bg-[#2D6A4F] hover:bg-[#4C9B6A] cursor-pointer"
    >
      OK
    </Button>
  </div>
) : (
  // MODO LECTURA: primero checamos si usuario.acerca_de es null o cadena vacía
  usuario?.acerca_de && usuario.acerca_de.trim() !== "" ? (
    <p className="text-gray-700">
      {usuario.acerca_de}
    </p>
  ) : (
    <p className="text-gray-500 italic">
      {/* Texto alternativo si no hay nada en "acerca_de" */}
      No hay descripción disponible.
    </p>
  )
)}

  </CardContent>
</Card>

{experiencias.length > 0 ? (
        <Card
          className=" shadow-sm mt-4"
          style={{background:'#f1fff4', borderColor: '#A1D9B7' }}
        >
          <CardContent className="p-6">
            {/* Header único */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Experiencia destacada</h2>
               {currUserId == idUsuario &&( 
               <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                  onClick={handleToggleEdit}  // si este es para “editar modo”
                  aria-label="Editar experiencias"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                  onClick={handleAdd}      // si este botón es para “añadir”
                  aria-label="Añadir experiencia"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              
              </div>
              )}
            </div>


            {/* Aquí iteras cada experiencia */}
            {experiencias.map((exp) => (
              <div key={exp.id} className="flex items-start gap-4 mb-6 last:mb-0">
                <div className="mt-1">
                  <Briefcase className="h-10 w-10 text-[#2D6A4F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{exp.puesto}</h3>
                  <p className="text-sm text-gray-600">
                    {exp.nombre_empresa} · {exp.tipo_empleo}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getDateRange(
                      exp.fecha_inicio,
                      exp.fecha_fin,
                      exp.en_curso === 1
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{exp.ubicacion}</p>
                  <p className="mt-2 text-gray-700">{exp.descripcion}</p>
                </div>

                {/* 4. Si estamos en modo editar, mostramos el lápiz junto a cada experiencia */}
                {isEditingExp && (
                  <div className="flex space-x-1">
                  {/* Botón de borrar */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-600/20 cursor-pointer"
                    onClick={() => handleDeleteOne(exp.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {/* Botón de editar */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                    onClick={() => handleEditOne(exp.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>


                </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card
          className="shadow-sm mt-4 flex flex-col items-center justify-center"
          style={{ background:'#f1fff4', borderColor: "#A1D9B7" }}
        >
          <CardContent className="p-6 text-center">
            <PlusCircle className="h-12 w-12 mx-auto mb-4 text-[#2D6A4F]" />
            <h2 className="text-lg font-medium mb-2">
              No hay datos de experiencia
            </h2>   
            {currUserId == idUsuario &&(
              <div className="">
            <p className="text-sm text-gray-700 mb-4">
              Añade tu primera experiencia para que aparezca aquí.
            </p>
         
            <Button
              onClick={handleAdd}
              className="bg-[#2D6A4F] text-white hover:bg-[#1F4E37] cursor-pointer"
            >
              Añadir experiencia
            </Button>
            </div>
            )}
          </CardContent>
        </Card>
      )}
   
        {educaciones.length > 0 ? (
          <Card className=" shadow-sm mt-4" style={{background:'#f1fff4', borderColor: '#A1D9B7' }}>
            <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Educación</h2>
              {currUserId == idUsuario &&(
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                  onClick={handleToggleEditEducacion}  // si este es para “editar modo”
                  aria-label="Editar experiencias"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                  onClick={handleAddEducacion}      // si este botón es para “añadir”
                  aria-label="Añadir educacion"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              )}
            </div>
            {educaciones.map((edu) =>  (
              <div  key={edu.id} className="flex mb-2 items-start gap-4 last:mb-0">
                  <div className="mt-1">
                    <GraduationCap className="h-10 w-10 text-[#2D6A4F]" />
                  </div>
                  <div>
                    <h3 className="font-medium">{edu.nombre_institucion}</h3>
                    <p className="text-sm text-gray-600">{edu.grado}</p>
                    <p className="text-sm text-gray-600">{getDateRange(
                      edu.fecha_inicio,
                      edu.fecha_fin,
                      false
                    )}</p>
                    <p className="text-sm text-gray-600">{edu.descripcion}</p>
                  </div>
                  {isEditingEdu && (
                  <div className="flex space-x-1 ml-auto">
                    {/* Botón de borrar */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-600/20 cursor-pointer"
                      onClick={() => handleDeleteOneEdu(edu.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {/* Botón de editar */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                      onClick={() => handleEditOneEdu(edu.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>


                </div>
                )}
              </div>



              ))}
            </CardContent>
          </Card>
        ) : (

          <Card
          className=" shadow-sm mt-4 flex flex-col items-center justify-center"
          style={{ background:'#f1fff4', borderColor: "#A1D9B7" }}
        >
          <CardContent className="p-6 text-center">
            <PlusCircle className="h-12 w-12 mx-auto mb-4 text-[#2D6A4F]" />
           
            <h2 className="text-lg font-medium mb-2">
              No hay datos de educación
            </h2> 
            {currUserId == idUsuario &&(
              <div className="">
            <p className="text-sm text-gray-700 mb-4">
              Añade tu primera educación para que aparezca aquí.
            </p>
            <Button
              onClick={handleAddEducacion}
              className="bg-[#2D6A4F] text-white hover:bg-[#1F4E37] cursor-pointer"
            >
              Añadir educación
            </Button>
            </div>
            )}
          </CardContent>
        </Card>

        )}
        </TabsContent>

        <TabsContent value="publicaciones">
        {currUserId == idUsuario &&(
          <div className="flex justify-end mr-2 mb-2" >
        <Button onClick={handleGoHome} className="bg-[#2D6A4F] hover:bg-[#1A4031] text-white cursor-pointer ">
        <MailOpen /> Crear Post
    </Button>
        </div>
        )}
      {posts.length > 0 ? (
        posts.map(post => {
          const author = authorMap[post.autor];
          return (
            <Card
              key={post.id}
              className="mb-4"
              style={{background:'#f1fff4', borderColor: '#A1D9B7' }}
            >
              <CardHeader className="flex flex-row items-start gap-4 p-4">
                <Avatar className="h-10 w-10">
                  {author?.urlImagenPerfil
                    ? <AvatarImage src={author.urlImagenPerfil} />
                    : <AvatarFallback>
                        {author
                          ? `${author.name.charAt(0)}${author.surname.charAt(0)}`
                          : '…'
                        }
                      </AvatarFallback>
                  }
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        to={`/profile/${post.autor}`}
                        className="font-semibold hover:underline"
                      >
                        {author
                          ? `${author.name} ${author.surname}`
                          : 'Cargando…'}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {author?.profesion}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(post.fecha_publicacion)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Book className="h-4 w-4" />
                      <span className="sr-only">Guardar</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <p>{post.contenido}</p>
                {post.imagen && (
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={post.imagen}
                      alt="Contenido del post"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Card className=" shadow-sm" style={{background:'#f1fff4',  borderColor: '#A1D9B7' }}>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mis publicaciones</h2>
            <div className="bg-[#A1D9B7]/10 p-8 rounded-lg text-center">
              <p className="text-gray-600">Aún no se ha realizado ninguna publicación</p>
              {currUserId === idUsuario && (
                <Button onClick={handleGoHome} className="mt-4 bg-[#2D6A4F] hover:bg-[#1A4031] text-white">
                  Crear publicación
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
        </TabsContent>




        <TabsContent value="habilidades">
          <Card className="shadow-sm" style={{background:'#f1fff4', borderColor: '#A1D9B7' }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Habilidades</h2>
                {currUserId == idUsuario &&(
                <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                      onClick={handleToggleEditHabilidad}  // si este es para “editar modo”
                      aria-label="Editar experiencias"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#2D6A4F] hover:bg-[#4C9B6A]/20 cursor-pointer"
                      onClick={handleAddHabilidad}      // si este botón es para “añadir”
                      aria-label="Añadir educacion"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                </div>
                )}
              </div>
              {habilidades.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {habilidades.map((hab) => (
    <div
      key={hab.id}
      className="border rounded-lg p-3 hover:bg-[#A1D9B7]/10"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{hab.nombre}</h3>
        {isEditingHab && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-600/20 cursor-pointer"
            onClick={() => handleDeleteOneHab(hab.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  ))}
</div>

              ):(

                <CardContent className="p-6 text-center">
                  <PlusCircle className="h-12 w-12 mx-auto mb-4 text-[#2D6A4F]" />
                  <h2 className="text-lg font-medium mb-2">
                    No hay datos de habilidades
                  </h2>
                  {currUserId == idUsuario &&(
                  <p className="text-sm text-gray-700 mb-4">
                    Añade tu primera habilidad para que aparezca aquí.
                  </p>
                  )}
                </CardContent>
             
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentor">
      <Card className="border-none shadow-sm" style={{ backgroundColor: '#A1D9B7', borderColor: '#A1D9B7' }}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Información de Mentorías</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Especialización */}
            <div className="flex flex-col border rounded-lg p-4 hover:bg-[#A1D9B7]/20 transition">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-gray-700 mr-2" />
                <h3 className="text-lg font-medium">Especialización</h3>
              </div>
              <p className="text-base text-gray-800">{mentoriaInfo?.especializacion || 'No especificada'}</p>
            </div>

            {/* Descripción */}
            <div className="flex flex-col border rounded-lg p-4 hover:bg-[#A1D9B7]/20 transition">
              <div className="flex items-center mb-2">
                <Info className="w-5 h-5 text-gray-700 mr-2" />
                <h3 className="text-lg font-medium">Descripción</h3>
              </div>
              <p className="text-base text-gray-800">{mentoriaInfo?.descripcion || 'No disponible'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>



      </Tabs>
    </div>
  )
}
