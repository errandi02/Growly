import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, AlertTriangle, CheckCircle, Lightbulb, Bell, Calendar, TrendingUp } from "lucide-react"
import axios from "axios"

interface ProjectUpdate {
  titulo: string
  descripcion: string
}

export default function ActualizacionPage() {
  const [projectUpdate, setProjectUpdate] = useState<ProjectUpdate>({
    titulo: "",
    descripcion: "",
  })
  const { idProyecto } = useParams<{ idProyecto: string }>();
  const updateField = (field: string, value: string) => {
    setProjectUpdate((prev) => ({ ...prev, [field]: value }))
  }
  const navigate = useNavigate();
  const handleSave = () => {
    
    if (isUpdateCompleted()) {
        axios.post(`http://localhost:8080/actualizacion`, {
            titulo: projectUpdate.titulo,
            descripcion: projectUpdate.descripcion,
            id_proyecto: idProyecto,
        }).then(res => {
            if (res.status === 200) { 
              navigate(`/proyecto/${idProyecto}`);
            } else {
              throw new Error('Respuesta inesperada del servidor');
            }
          })
          .catch(err => {
            console.error('Error al crear proyecto:', err);
          });
    }
  }

  const isUpdateCompleted = () => {
    return projectUpdate.titulo.trim() !== "" && projectUpdate.descripcion.trim() !== ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to={`/proyecto/${idProyecto}`} className="text-[#4C9B6A] hover:text-[#2D6A4F]">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Añadir Actualización del Proyecto</h1>
                <p className="text-sm text-gray-600">Mantén informados a tus inversores sobre el progreso</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!isUpdateCompleted()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  isUpdateCompleted()
                    ? "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                Publicar Actualización
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-blue-600 mt-0.5" size={20} />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">¿Por qué son importantes las actualizaciones?</p>
                <p>
                  Las actualizaciones regulares mantienen a tus inversores informados sobre el progreso, generan
                  confianza y demuestran transparencia. Los inversores valoran la comunicación constante y los hitos
                  alcanzados.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#4C9B6A]" size={20} />
                <span className="font-medium">Progreso</span>
              </div>
              <div className="text-sm text-gray-600">{isUpdateCompleted() ? "Completado" : "Incompleto"}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#4C9B6A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${isUpdateCompleted() ? 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Update Input */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                <Bell size={14} />
              </div>
              <h3 className="text-lg font-semibold">Nueva Actualización</h3>
            </div>

            <div className="space-y-4">
                 <div>
                <label className="block text-sm font-medium mb-2">Título de la Actualización *</label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={projectUpdate.titulo}
                    onChange={(e) => updateField("titulo", e.target.value)}
                    placeholder="Ej: ¡Alcanzamos el 75% de financiación!, Nuevo partnership estratégico, Lanzamiento del MVP"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Un título atractivo y claro que resuma la noticia o hito alcanzado. Usa emojis para hacerlo más
                  llamativo.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción de la Actualización *</label>
                <textarea
                  value={projectUpdate.descripcion}
                  onChange={(e) => updateField("descripcion", e.target.value)}
                  placeholder="Describe detalladamente la actualización. Incluye logros específicos, métricas alcanzadas, próximos pasos, agradecimientos a inversores, nuevas funcionalidades desarrolladas, partnerships conseguidos, etc. Sé transparente y específico."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  rows={6}
                />
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-gray-500">{projectUpdate.descripcion.length} caracteres</div>
                  <div className="text-xs text-gray-500">Recomendado: 200-500 caracteres para máximo engagement</div>
                </div>
              </div>
            </div>

            {/* Update Status */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {isUpdateCompleted() ? (
                  <>
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-green-600 font-medium">Actualización lista para publicar</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <span className="text-sm text-yellow-600 font-medium">Completa todos los campos</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Ejemplos de una buena actualización</h3>
            <div className="space-y-4">


              <div className="bg-white p-4 rounded-lg border border-gray-100 border-l-4 border-l-[#4C9B6A]">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-gray-500" size={14} />
                  <span className="text-xs text-gray-500">Hace 1 semana</span>
                </div>
                <h4 className="font-medium text-[#2D6A4F] mb-2">🚀 Nuevas funcionalidades en desarrollo</h4>
                <p className="text-sm text-gray-600">
                  Nuestro equipo de desarrollo ha completado la integración con paneles solares y sistemas de
                  almacenamiento de energía. Esta nueva funcionalidad permitirá a nuestros usuarios gestionar no solo el
                  consumo, sino también la generación y almacenamiento de energía renovable. Las pruebas internas
                  muestran una mejora del 40% en la eficiencia energética. Esperamos lanzar esta característica en la
                  versión beta del próximo mes.
                </p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Consejos para actualizaciones efectivas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-700 mb-1">Qué incluir:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Métricas específicas y logros cuantificables</li>
                  <li>• Hitos alcanzados y próximos objetivos</li>
                  <li>• Agradecimientos a inversores y equipo</li>
                  <li>• Nuevas funcionalidades o partnerships</li>
                  <li>• Resultados de pruebas o validaciones</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-700 mb-1">Mejores prácticas:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Mantén un tono positivo pero realista</li>
                  <li>• Usa emojis para hacer el contenido más atractivo</li>
                  <li>• Sé transparente sobre desafíos y soluciones</li>
                  <li>• Incluye llamadas a la acción cuando sea apropiado</li>
                  <li>• Publica actualizaciones regularmente (semanal/quincenal)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {isUpdateCompleted() && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Vista previa de la actualización</h4>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-l-[#4C9B6A]">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-gray-500" size={14} />
                  <span className="text-xs text-gray-500">Ahora</span>
                </div>
                <h4 className="font-medium text-[#2D6A4F] mb-2">{projectUpdate.titulo}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{projectUpdate.descripcion}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Link
              to={`/proyecto/${idProyecto}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver al Proyecto
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => console.log("Guardar como borrador")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Guardar Borrador
              </button>
              <button
                onClick={handleSave}
                disabled={!isUpdateCompleted()}
                className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  isUpdateCompleted()
                    ? "bg-[#2D6A4F] text-white hover:bg-[#1A4031]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Publicar Actualización
              </button>
            </div>
          </div>

          {/* Summary */}
          {isUpdateCompleted() && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-0.5" size={16} />
                <div className="text-sm text-green-800">
                  <p className="font-medium">¡Perfecto! Tu actualización está lista para publicar.</p>
                  <p className="mt-1">
                    Esta actualización será enviada a todos tus inversores y aparecerá en el feed de tu proyecto. Las
                    actualizaciones regulares aumentan la confianza y el engagement de los inversores.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}