import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Save,
  Eye,
  AlertCircle,
  FileText,
  ImageIcon,
  DollarSign,
  Users,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"
import axios from "axios"
import { jwtDecode } from "jwt-decode";

export default function CreateProjectPage() {

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
      id = decodedToken.id;
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  }
const idUsuario = id; 

  const [activeStep, setActiveStep] = useState(1)

  // Estados para los campos del formulario
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState("")
  const [imagenUrl, setImagenUrl] = useState("")
  const [recaudado, setRecaudado] = useState(0)
  const [metaFinanciacion, setMetaFinanciacion] = useState(0)
  const [inversores, setInversores] = useState(0)
  const [fechaFin, setFechaFin] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [sitio_web, setSitioWeb] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [sobre_proyecto, setSobreProyecto] = useState("")
  const [inversion_minima, setInversionMinima] = useState("")
  const [retorno_minimo, setRetornoMinimo] = useState("")
  const [retorno_maximo, setRetornoMaximo] = useState("")
  const [plazo_de, setPlazoDe] = useState("")
  const [plazo_hasta, setPlazoHasta] = useState("")

  const steps = [
    { id: 1, title: "Información Básica", icon: FileText },
    { id: 2, title: "Detalles Financieros", icon: DollarSign },
    { id: 3, title: "Contacto y Configuración", icon: Users },
    { id: 4, title: "Revisión", icon: Eye },
  ];
  const categories = [
    "Tecnología",
    "Sostenibilidad",
    "Salud",
    "Educación",
    "Finanzas",
    "Alimentación",
    "Energía",
    "Transporte",
    "Inmobiliario",
    "Otros",
  ];
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log()
    //Mi Post
    axios.post(`http://localhost:8080/proyecto`, {
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
        imagen_url: imagenUrl,
        recaudado : recaudado,
        meta_financiacion: metaFinanciacion,
        inversores : inversores,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        sitio_web: sitio_web,
        telefono: telefono,
        correo: correo,
        ubicacion : ubicacion,
        sobre_proyecto: sobre_proyecto,
        inversion_minima: inversion_minima,
        retorno_maximo: retorno_maximo,
        retorno_minimo: retorno_minimo,
        plazo_de: plazo_de,
        plazo_hasta: plazo_hasta,
        id_usuario: idUsuario,
    }).then(res => {
        if (res.status === 200) {
          navigate(`/marketplace`);
          console.log('Proyecto creado correctamente');
        } else {
          throw new Error('Respuesta inesperada del servidor');
        }
      })
      .catch(err => {
        console.error('Error al crear proyecto:', err);
      });
};

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Título del Proyecto *</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: EcoTech Solutions"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descripción Corta *</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe tu proyecto en una frase atractiva"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Categoría *</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ubicación *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    placeholder="Ciudad, País"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sitio Web</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="url"
                  value={sitio_web}
                  onChange={(e) => setSitioWeb(e.target.value)}
                  placeholder="https://tu-sitio-web.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sobre el Proyecto *</label>
              <textarea
                value={sobre_proyecto}
                onChange={(e) => setSobreProyecto(e.target.value)}
                placeholder="Describe detalladamente tu proyecto, el problema que resuelve y tu solución..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Imagen Web</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="url"
                  value={imagenUrl}
                  onChange={(e) => setImagenUrl(e.target.value)}
                  placeholder="https://tu-sitio-web.com/foto-web.png"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Meta de Financiación (€) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    value={metaFinanciacion}
                    onChange={e => setMetaFinanciacion(Number(e.target.value))} 
                    placeholder="100000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Inversión Mínima (€) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    value={inversion_minima}
                    onChange={(e) => setInversionMinima(e.target.value)}
                    placeholder="100"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Retorno Mínimo (% anual) *</label>
                <input
                  type="number"
                  value={retorno_minimo}
                  onChange={(e) => setRetornoMinimo(e.target.value)}
                  placeholder="15"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Retorno Máximo (% anual) *</label>
                <input
                  type="number"
                  value={retorno_maximo}
                  onChange={(e) => setRetornoMaximo(e.target.value)}
                  placeholder="20"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Plazo Desde (años) *</label>
                <input
                  type="number"
                  value={plazo_de}
                  onChange={(e) => setPlazoDe(e.target.value)}
                  placeholder="3"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Plazo Hasta (años) *</label>
                <input
                  type="number"
                  value={plazo_hasta}
                  onChange={(e) => setPlazoHasta(e.target.value)}
                  placeholder="5"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email de Contacto *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+34 123 456 789"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Configuración del Proyecto</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fecha de Inicio *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fecha de Fin *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cantidad Recaudada Actual (€)</label>
                  <input
                    type="number"
                    value={recaudado}
                    onChange={e => setRecaudado(Number(e.target.value))} 
                    placeholder="0"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Número de Inversores Actuales</label>
                  <input
                    type="number"
                    value={inversores}
                    onChange={e => setInversores(Number(e.target.value))}                     
                    placeholder="0"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A]"
                  />
                </div>
              </div>

              
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-yellow-600 mt-0.5" size={16} />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Revisión Final</p>
                  <p>
                    Por favor, revisa toda la información antes de enviar tu proyecto. Una vez enviado, será revisado
                    por nuestro equipo antes de ser publicado.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Resumen del Proyecto</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Información Básica</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Título:</span> {titulo || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Categoría:</span> {categoria || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Ubicación:</span> {ubicacion || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Sitio Web:</span> {sitio_web || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Imagen:</span> {imagenUrl ? "Subida" : "No subida"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Información Financiera</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Meta:</span> €{metaFinanciacion || "0"}
                    </div>
                    <div>
                      <span className="text-gray-600">Inversión mínima:</span> €{inversion_minima || "0"}
                    </div>
                    <div>
                      <span className="text-gray-600">Retorno:</span> {retorno_minimo || "0"}% - {retorno_maximo || "0"}
                      %
                    </div>
                    <div>
                      <span className="text-gray-600">Plazo:</span> {plazo_de || "0"} - {plazo_hasta || "0"} años
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contacto</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span> {correo || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Teléfono:</span> {telefono || "No especificado"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Configuración</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Fecha inicio:</span> {fechaInicio || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Fecha fin:</span> {fechaFin || "No especificado"}
                    </div>
                    <div>
                      <span className="text-gray-600">Recaudado:</span> €{recaudado || "0"}
                    </div>
                    <div>
                      <span className="text-gray-600">Inversores:</span> {inversores || "0"}
                    </div>

                  </div>
                </div>
              </div>

              {descripcion && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Descripción</h4>
                  <p className="text-sm text-gray-700">{descripcion}</p>
                </div>
              )}

              {sobre_proyecto && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sobre el Proyecto</h4>
                  <p className="text-sm text-gray-700">{sobre_proyecto}</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/marketplace" className="text-[#4C9B6A] hover:text-[#2D6A4F]">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold">Crear Nuevo Proyecto</h1>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                <Save size={16} />
                Guardar Borrador
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      activeStep >= step.id
                        ? "bg-[#4C9B6A] border-[#4C9B6A] text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    <step.icon size={16} />
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div
                      className={`text-sm font-medium ${activeStep >= step.id ? "text-[#4C9B6A]" : "text-gray-500"}`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-4 ${activeStep > step.id ? "bg-[#4C9B6A]" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">{steps[activeStep - 1]?.title}</h2>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className={`px-6 py-2 rounded-lg  ${
                activeStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              Anterior
            </button>

            <div className="flex gap-2">
              {activeStep === 4 ? (
                <button onClick={handleSubmit} className="px-6 py-2 bg-[#2D6A4F] hover:bg-[#1A4031] text-white rounded-lg font-medium cursor-pointer">
                  Crear Proyecto
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
                  className="px-6 py-2 bg-[#4C9B6A] hover:bg-[#2D6A4F] text-white rounded-lg font-medium cursor-pointer"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
