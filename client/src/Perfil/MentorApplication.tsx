import type React from "react"
import { useState } from "react"
import { ArrowLeft, Save, CheckCircle, AlertCircle, Star, Users, Lightbulb, Target } from "lucide-react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

interface MentorApplication {
  especialidad: string
  descripcion_especialidad: string
}

const BecomeMentorPage: React.FC = () => {
  const [mentorData, setMentorData] = useState<MentorApplication>({
    especialidad: "",
    descripcion_especialidad: "",
  })
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
  const [errors, setErrors] = useState<Partial<MentorApplication>>({})
  const [isSaved, setIsSaved] = useState(false);
  

  const validateForm = (): boolean => {
    const newErrors: Partial<MentorApplication> = {}

    if (!mentorData.especialidad.trim()) {
      newErrors.especialidad = "La especialidad es requerida"
    } else if (mentorData.especialidad.trim().length < 3) {
      newErrors.especialidad = "La especialidad debe tener al menos 3 caracteres"
    }

    if (!mentorData.descripcion_especialidad.trim()) {
      newErrors.descripcion_especialidad = "La descripción es requerida"
    } else if (mentorData.descripcion_especialidad.trim().length < 50) {
      newErrors.descripcion_especialidad = "La descripción debe tener al menos 50 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const navigate = useNavigate();
  const handleSave = () => {
    if (validateForm()) {
      
        axios.post(`http://localhost:8080/mentor`, {
            especializacion: mentorData.especialidad,
            descripcion: mentorData.descripcion_especialidad,
            id_usuario: idUsuario
        }).then(res => {
            if (res.status === 200) { 
              navigate(`/perfil/${idUsuario}`);
              console.log('Miembro creado correctamente');
            } else {
              throw new Error('Respuesta inesperada del servidor');
            }
          })
          .catch(err => {
            console.error('Error al crear miembro:', err);
          });
    //Mi UPDATE
    axios.put(`http://localhost:8080/user/isMentor/${idUsuario}`, {
        id: idUsuario,
        isMentor: 1,
    })
      .then(res => {
        if (res.status === 200) {
          // Opcional: mostrar notificación de éxito
          console.log('IsMentor actualizado correctamente');
        } else {
          throw new Error('Respuesta inesperada del servidor');
        }
      })
      .catch(err => {
        console.error('Error al actualizar “isMentor”:', err);
      });

      setIsSaved(true)

      // Simular guardado
      setTimeout(() => {
        setIsSaved(false)
      }, 2000)
    }
  }

  const handleInputChange = (field: keyof MentorApplication, value: string) => {
    setMentorData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const isFormComplete =
    mentorData.especialidad.trim() &&
    mentorData.descripcion_especialidad.trim() &&
    mentorData.descripcion_especialidad.trim().length >= 50

  const especialidadExamples = [
    "Desarrollo de Software",
    "Marketing Digital",
    "Finanzas y Contabilidad",
    "Recursos Humanos",
    "Diseño UX/UI",
    "Estrategia de Negocio",
    "E-commerce",
    "Inteligencia Artificial",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link to={`/perfil/${idUsuario}`}>
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </button>
            </Link>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-800">Convertirse en Mentor</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Comparte tu experiencia como Mentor!</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ayuda a otros emprendedores compartiendo tu conocimiento y experiencia. Define tu especialidad y cómo
              puedes contribuir al crecimiento de otros proyectos.
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isFormComplete ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {isFormComplete ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Información de Mentoría</h3>
                <p className="text-sm text-gray-600">{isFormComplete ? "Completado" : "Incompleto"}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{isFormComplete ? "100%" : "0%"}</div>
              <div className="text-sm text-gray-600">Progreso</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Información de Mentoría</h2>
              </div>

              <div className="space-y-6">
                {/* Especialidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad Principal *</label>
                  <input
                    type="text"
                    value={mentorData.especialidad}
                    onChange={(e) => handleInputChange("especialidad", e.target.value)}
                    placeholder="ej. Desarrollo de Software, Marketing Digital, Finanzas..."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.especialidad ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  {errors.especialidad && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.especialidad}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Define tu área principal de expertise</p>
                </div>

                {/* Descripción de Especialidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de tu Especialidad *
                  </label>
                  <textarea
                    value={mentorData.descripcion_especialidad}
                    onChange={(e) => handleInputChange("descripcion_especialidad", e.target.value)}
                    placeholder="Describe tu experiencia, logros y cómo puedes ayudar a otros emprendedores en tu área de especialidad..."
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none ${
                      errors.descripcion_especialidad ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <div>
                      {errors.descripcion_especialidad && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.descripcion_especialidad}
                        </p>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        mentorData.descripcion_especialidad.length < 50 ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {mentorData.descripcion_especialidad.length}/50 mín.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                <Link to={`/perfil/${idUsuario}`}>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">Cancelar</button>
                </Link>
                <button
                  onClick={handleSave}
                  disabled={!isFormComplete}
                  className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                    isFormComplete
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaved ? "Guardado!" : "Aplicar como Mentor"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Examples */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Especialidades Populares</h3>
              </div>
              <div className="space-y-2">
                {especialidadExamples.map((example, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("especialidad", example)}
                    className="p-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900">Consejos para Mentores</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Sé específico sobre tu experiencia y logros</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Menciona herramientas y metodologías que dominas</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Explica cómo puedes ayudar a otros emprendedores</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Incluye años de experiencia si es relevante</p>
                </div>
              </div>
            </div>

            {/* Preview */}
            {mentorData.especialidad && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Vista Previa</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Tu Nombre</h4>
                      <p className="text-sm text-indigo-600">{mentorData.especialidad}</p>
                    </div>
                  </div>
                  {mentorData.descripcion_especialidad && (
                    <p className="text-sm text-gray-600 line-clamp-3">{mentorData.descripcion_especialidad}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeMentorPage
