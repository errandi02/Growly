import { useEffect, useState } from "react"
import { Link, data } from "react-router-dom"
import {
  Users,
  UserPlus,
  UserMinus,
  Search,
  Filter,
  Star,
  Award,
  MapPin,
  Briefcase,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  Crown,
  Lightbulb,
  Target,
  ChevronDown,
  Globe,
} from "lucide-react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface User {
  id: number
  name: string
  surname: string
  email: string
  birth_date?: string
  titulo_profesional?: string
  acerca_de?: string
  url_imagen_perfil?: string
  url_imagen_cabecera?: string
  ciudad?: string
  pais?: string
  telefono?: string
  sitio_web?: string
  contador_conexiones: number
  creado_en: string
  actualizado_en: string
  experiencia_id?: number
  role_id: number
  soyMentor: boolean
  // Campos calculados o de relaciones
  seguidores?: number
  siguiendo?: number
  proyectos?: number
  rating?: number
  especialidades?: string[]
  esVerificado?: boolean
}
interface MentorDetail {
  id: number
  id_usuario: number
  especializacion: string
  descripcion: string
}
export default function ComunidadPage() {
  const [activeTab, setActiveTab] = useState("seguidos")
  const [searchTerm, setSearchTerm] = useState("")
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [mentores, setMentores] = useState<User[]>([]);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState<User[]>([]);
  const [idSeguidores, setIdSeguidores] = useState<number[]>([]);
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
  let role_id = -1;
  if (token) {
    try {
      // Decodificar el token y obtener el nombre de usuario
      const decodedToken = jwtDecode(token);
     
      name = decodedToken.name;
      profesion = decodedToken.profesion;
      id = decodedToken.id;
      role_id = decodedToken.role_id;
      //console.log(decodedToken);
      //setId(decodedToken.id);
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  }
const idUsuario = id; 
useEffect(() => {
  axios
    .get<User[]>('http://localhost:8080/user')
    .then(res => {
      // Filtramos el usuario que queremos eliminar
      const usuariosFiltrados = res.data.filter(user => user.id !== idUsuario);
      setUsuarios(usuariosFiltrados);
    })
    .catch(() => {
      console.error('No se encuentran usuarios.');
    });
}, [idUsuario]); // incluimos idUsuario como dependencia si puede cambiar

useEffect(() => {
  const fetchMentoresConEspecialidades = async () => {
    try {
      // 1) Obtener la lista de mentores y filtrar el que queremos excluir
      const { data: todos } = await axios.get<User[]>('http://localhost:8080/mentores')
      const mentoresFiltrados = todos.filter(mentor => mentor.id !== idUsuario)

      // 2) Para cada mentor, obtener su array de detalles y extraer las especializaciones
      const mentoresEnriquecidos = await Promise.all(
        mentoresFiltrados.map(async mentor => {
          const { data: detalles } = await axios.get<MentorDetail[]>(
            `http://localhost:8080/mentor/${mentor.id}`
          )
          // mapeamos todas las especializaciones de ese mentor
          const especialidades = detalles.map(d => d.especializacion)
          return {
            ...mentor,
            especialidades
          }
        })
      )

      // 3) Actualizamos el estado con la lista enriquecida
      setMentores(mentoresEnriquecidos)
    } catch (error) {
      console.error('Error cargando mentores o especialidades:', error)
    }
  }

  fetchMentoresConEspecialidades()
}, [idUsuario])


  // 2) Efecto para traer los IDs de seguidores cada vez que cambie idUsuario
  useEffect(() => {
    if (!idUsuario) return;

    axios
      .get<{ following: number }[]>(`http://localhost:8080/following/${idUsuario}`)
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

  // 3) Efecto que observa “idSeguidores” y dispara las peticiones a /user/:idSeg
  useEffect(() => {
    // Solo hacemos algo si ya tenemos al menos un ID
    if (idSeguidores.length === 0) {
      setUsuariosSeguidos([]); // opcional: limpiar estado si no hay seguidores
      return;
    }

    // Construimos un array de promesas, una por cada ID
    const peticiones = idSeguidores.map(idSeg =>
      axios.get<User>(`http://localhost:8080/user/${idSeg}`)
    );

    Promise.all(peticiones)
      .then(respuestas => {
        // Cada respuesta es un objeto AxiosResponse<User>
        const usuariosFollowed: User[] = respuestas.map(resp => resp.data);
        setUsuariosSeguidos(usuariosFollowed);
      })
      .catch(err => {
        console.error('Error trayendo usuarios seguidos:', err);
      });
  }, [idSeguidores]); // se ejecuta cada vez que “idSeguidores” cambie
  const handleFollow = async (userId: number) => {
    try {
      if (isFollowing(userId)) {
        // Llamada para dejar de seguir
        await axios.delete(`http://localhost:8080/unfollow/${idUsuario}/${userId}`);
        setIdSeguidores(prev => prev.filter(id => id !== userId));
      } else {
        // Llamada para empezar a seguir
        await axios.post(`http://localhost:8080/follow`, {
          follower: idUsuario,
          following: userId
        });
        setIdSeguidores(prev => [...prev, userId]);
      }
    } catch (err) {
      console.error("Error al (de)seguir:", err);
    }
  }
  
  const isFollowing = (userId: number) =>
  idSeguidores.includes(userId)


  const getInitials = (name: string, surname: string) => {
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
  }

  const getFullLocation = (ciudad?: string, pais?: string) => {
    if (ciudad && pais) return `${ciudad}, ${pais}`
    if (ciudad) return ciudad
    if (pais) return pais
    return "Ubicación no especificada"
  }
  // Función de búsqueda
  const matchesSearch = (user: User) => {
    const search = searchTerm.toLowerCase().trim()
    if (!search) return true
    return (
      `${user.name} ${user.surname}`.toLowerCase().includes(search) ||
      user.titulo_profesional?.toLowerCase().includes(search) ||
      user.especialidades?.some(e => e.toLowerCase().includes(search))
    )
  }

  // Arrays filtrados
  const displayedSeguidos = usuariosSeguidos.filter(matchesSearch)
  const displayedRelevantes = usuarios.filter(matchesSearch)
  const displayedMentores = mentores.filter(matchesSearch)

  const getRoleLabel = (roleId: number) => {
    switch (roleId) {
      case 1:
        return "Administrador"
      case 3:
        return "Emprendedor"
      case 2:
        return "Inversor"
      default:
        return "Usuario"
    }
  }

  const getRoleColor = (roleId: number) => {
    switch (roleId) {
      case 1:
        return "bg-purple-100 text-purple-800"
      case 2:
        return "bg-blue-100 text-blue-800"
      case 3:
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const UserCard = ({ user, showFollowButton = true }: { user: User; showFollowButton?: boolean }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            {user.url_imagen_perfil ? (
              <img
                src={user.url_imagen_perfil || "/placeholder.svg"}
                alt={`${user.name} ${user.surname}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(user.name, user.surname)}
              </div>
            )}
            {user.esVerificado && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle size={12} className="text-white" />
              </div>
            )}
            {user.soyMentor && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown size={10} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{`${user.name} ${user.surname}`}</h3>
              {user.soyMentor && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  Mentor
                </span>
              )}
            </div>
            {user.titulo_profesional && <p className="text-sm text-gray-600 mb-1">{user.titulo_profesional}</p>}
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role_id)}`}>
              {getRoleLabel(user.role_id)}
            </span>
            <div className="flex items-center gap-1 mt-2">
              <MapPin size={12} className="text-gray-400" />
              <span className="text-xs text-gray-500">{getFullLocation(user.ciudad, user.pais)}</span>
            </div>
          </div>
        </div>
        {showFollowButton && (
          <button
            onClick={() => handleFollow(user.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              isFollowing(user.id)
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
            }`}
          >
            {isFollowing(user.id) ? (
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
        )}
      </div>

      {user.acerca_de && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.acerca_de}</p>}

      {user.especialidades && (
        <div className="flex flex-wrap gap-1 mb-4">
          {user.especialidades.slice(0, 3).map((especialidad, index) => (
            <span key={index} className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-2 py-1 rounded text-xs font-medium">
              {especialidad}
            </span>
          ))}
        </div>
      )}



      <div className="flex gap-2">
        <Link
          to={`/perfil/${user.id}`}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors cursor-pointer"
        >
          Ver Perfil
        </Link>
        <Link
          to={`/chat/${user.id}`}>
        <button className="flex items-center justify-center gap-1 bg-[#4C9B6A]/10 hover:bg-[#4C9B6A]/20 text-[#2D6A4F] py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer">
          <MessageCircle size={14} />
          Mensaje
        </button>
        </Link>
      </div>
    </div>
  )


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Red de Contactos</h1>
              <p className="text-gray-600">Conecta con emprendedores, inversores y mentores</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar personas por nombre, título profesional o especialidad..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("seguidos")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "seguidos" ? "bg-white text-[#4C9B6A] shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Personas Seguidas ({usuariosSeguidos.length})
            </button>
            <button
              onClick={() => setActiveTab("mentores")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "mentores" ? "bg-white text-[#4C9B6A] shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mentores
            </button>
            <button
              onClick={() => setActiveTab("relevantes")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "relevantes" ? "bg-white text-[#4C9B6A] shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Descubre otros usuarios
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Personas Seguidas */}
        {activeTab === "seguidos" && (
          <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Personas que Sigues</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp size={16} /> <span>Actividad reciente</span>
            </div>
          </div>
          {displayedSeguidos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedSeguidos.map(u => <UserCard key={u.id} user={u} />)}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sigues a nadie aún</h3>
              <p className="text-gray-600 mb-4">
                Comienza a seguir a emprendedores, inversores y mentores para mantenerte al día con sus proyectos.
              </p>
              <button onClick={() => setActiveTab("relevantes")} className="bg-[#4C9B6A] text-white px-4 py-2 rounded-lg hover:bg-[#2D6A4F]">
                Descubrir Personas
              </button>
            </div>
          )}
        </div>
        )}

        {/* Usuarios Relevantes */}
        {activeTab === "relevantes" && (
          <div>
          <h2 className="text-xl font-semibold mb-6">Usuarios Relevantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRelevantes.map(u => <UserCard key={u.id} user={u} />)}
          </div>
        </div>
        )}

        {/* Mentores Destacados */}
        {activeTab === "mentores" && (
          <div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Crown className="text-yellow-600 mt-0.5" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">¿Qué es un mentor?</p>
                <p>
                  Los mentores son profesionales experimentados que ofrecen orientación, consejos y apoyo a
                  emprendedores. Tienen experiencia comprobada y altas calificaciones de la comunidad.
                </p>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-4">Todos los Mentores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedMentores.map(u => <UserCard key={u.id} user={u} />)}
          </div>
        </div>
        )}
      </div>


    </div>
  )
}
