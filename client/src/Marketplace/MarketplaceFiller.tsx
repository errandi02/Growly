import { Link, useNavigate } from "react-router-dom"
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  Clock,
  Users,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

export default function MarketplacePage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [destacados, setDestacados] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoriaSel, setCategoriaSel] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
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
      console.log(decodedToken);
      // name = decodedToken.name;
      // profesion = decodedToken.profesion;
      // id = decodedToken.id;
      role_id = decodedToken.role_id;
      //console.log(decodedToken);
      //setId(decodedToken.id);
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  }
const idUsuario = id; 
  useEffect(() => {
    const loadProyectos = async () => {
      try {
        const [resAll, resDest] = await Promise.all([
          axios.get<Proyecto[]>(`http://localhost:8080/proyecto`),
          axios.get<Proyecto[]>(`http://localhost:8080/proyectodestacado`),
        ]);
        setProyectos(resAll.data);
        setDestacados(resDest.data.slice(0, 3));
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    loadProyectos();
  }, []);

  const calcularPorcentaje = (recaudado: number, meta: number) =>
    meta > 0 ? Math.min(100, Math.floor((recaudado / meta) * 100)) : 0;

  const calcularDiasRestantes = (fecha_fin: string) => {
    const diffMs = new Date(fecha_fin).getTime() - Date.now();
    return diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;
  };

  if (loading) return <p className="text-center py-8">Cargando proyectos...</p>;
  if (error)
    return <p className="text-center py-8 text-red-600">{error}</p>;

  // Combina filtro de categoría + búsqueda por texto
  const filtrar = (lista: Proyecto[]) =>
    lista.filter((p) => {
      const coincideCat =
        categoriaSel === "Todos" || p.categoria === categoriaSel;
      const texto = searchTerm.trim().toLowerCase();
      const coincideSearch =
        texto === "" ||
        p.titulo.toLowerCase().includes(texto) ||
        p.descripcion.toLowerCase().includes(texto);
      return coincideCat && coincideSearch;
    });

  const categorias = [
    "Todos",
    "Tecnología",
    "Sostenibilidad",
    "Salud",
    "Educación",
    "Finanzas",
    "Alimentación",
  ];


  return (
    <div className="min-h-screen bg-gray-50">
<div className="bg-gradient-to-t from-[#1B4332] to-[#2D6A4F] text-white py-10">
  <div className="container mx-auto px-4">
    {/* Título + Botón */}
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl md:text-4xl font-bold">
        Marketplace de Proyectos
      </h1>
      
      {role_id === 3 && (
        <Link to="/createproject">
          <button
            className="items-center gap-2 px-4 py-2 bg-[#4C9B6A] text-white rounded-lg hover:bg-[#2D6A4F] cursor-pointer"
          >
            Añadir Proyecto
          </button>
        </Link>
      )}
    </div>

    <p className="text-lg mb-6">
      Descubre proyectos innovadores en los que puedes invertir y formar parte de su éxito
    </p>

    <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar proyectos..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] text-black"
        />
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#4C9B6A] text-white rounded-lg hover:bg-[#2D6A4F] cursor-pointer">
          Buscar
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Categorías */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSel(cat)}
              className={`
                px-4 py-2 rounded-full
                ${
                  categoriaSel === cat
                    ? "bg-[#2D6A4F] text-white cursor-pointer"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Proyectos Destacados */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Proyectos Destacados</h2>
          <Link
            to="/marketplace/destacados"
            className="text-[#4C9B6A] hover:underline flex items-center"
          >
            Ver todos <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtrar(destacados).map((p) => {
            const porc = calcularPorcentaje(p.recaudado, p.meta_financiacion);
            const dias = calcularDiasRestantes(p.fecha_fin);
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  {p.imagen_url ? (
                    <img
                      src={p.imagen_url}
                      alt={p.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-full h-full object-cover text-gray-300" />
                  )}
                  <div className="absolute top-2 right-2 bg-[#4C9B6A] text-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
                    <Star size={14} className="mr-1" /> Destacado
                  </div>
                </div>
                <Link to={`/proyecto/${p.id}`}>
                  <div className="p-5 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{p.titulo}</h3>
                      <span className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-2 py-1 rounded text-xs font-medium">
                        {p.categoria}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {p.descripcion}
                    </p>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">
                          {p.recaudado.toLocaleString()}€ recaudados
                        </span>
                        <span className="text-gray-500">
                          de {p.meta_financiacion.toLocaleString()}€
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#4C9B6A] h-2.5 rounded-full"
                          style={{ width: `${porc}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{dias} días restantes</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>{p.inversores} inversores</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-2 rounded-lg font-medium">
                      Invertir ahora
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Todos los Proyectos */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Todos los Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtrar(proyectos).map((p) => {
            const porc = calcularPorcentaje(p.recaudado, p.meta_financiacion);
            const dias = calcularDiasRestantes(p.fecha_fin);
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  {p.imagen_url ? (
                    <img
                      src={p.imagen_url}
                      alt={p.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-full h-full object-cover text-gray-300" />
                  )}
                </div>
                <Link to={`/proyecto/${p.id}`}>
                  <div className="p-4 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{p.titulo}</h3>
                      <span className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-2 py-1 rounded text-xs font-medium">
                        {p.categoria}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                      {p.descripcion}
                    </p>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">
                          {p.recaudado.toLocaleString()}€ recaudados
                        </span>
                        <span className="text-gray-500">
                          de {p.meta_financiacion.toLocaleString()}€
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#4C9B6A] h-2 rounded-full"
                          style={{ width: `${porc}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        <span>{dias} días</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={12} className="mr-1" />
                        <span>{p.inversores} inversores</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#2D6A4F] hover:bg-[#1A4031] text-white py-1.5 rounded-lg text-sm font-medium">
                      Invertir ahora
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
