import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, AlertTriangle, CheckCircle, Lightbulb, Zap } from "lucide-react"
import axios from "axios"

interface Solution {
  titulo: string
  descripcion: string
}

export default function SolucionPage() {
  const [solution, setSolution] = useState<Solution>({ titulo: "", descripcion: "" })
  const { idProyecto } = useParams<{ idProyecto: string }>()

  const updateField = (field: string, value: string) => {
    setSolution((prev) => ({ ...prev, [field]: value }))
  }
  const navigate = useNavigate();
  const handleSave = () => {
    if (solution.titulo.trim() && solution.descripcion.trim()) {
      axios.post(`http://localhost:8080/solucion`, {
        solucion: solution.titulo,
        id_proyecto: idProyecto,
        solucion_desc: solution.descripcion
    }).then(res => {
        if (res.status === 200) {
          navigate(`/proyecto/${idProyecto}`);
          console.log('Proyecto creado correctamente');
        } else {
          throw new Error('Respuesta inesperada del servidor');
        }
      })
      .catch(err => {
        console.error('Error al crear proyecto:', err);
      });
    }
  }

  const isSolutionCompleted = () => {
    return solution.titulo.trim() !== "" && solution.descripcion.trim() !== ""
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
                <h1 className="text-xl font-semibold">Añadir Solución</h1>
                <p className="text-sm text-gray-600">Define la solución principal que ofrece tu proyecto</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!isSolutionCompleted()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isSolutionCompleted()
                    ? "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                Guardar Solución
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
                <p className="font-medium mb-1">¿Por qué es importante definir la solución?</p>
                <p>
                  Presentar claramente la solución que ofrece tu proyecto ayuda a los inversores a entender cómo
                  resuelves el problema identificado y qué valor aportas al mercado.
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
              <div className="text-sm text-gray-600">{isSolutionCompleted() ? "Completado" : "Incompleto"}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#4C9B6A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${isSolutionCompleted() ? 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Solution Input */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                <Zap size={14} />
              </div>
              <h3 className="text-lg font-semibold">Solución</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título de la Solución *</label>
                <input
                  type="text"
                  value={solution.titulo}
                  onChange={(e) => updateField("titulo", e.target.value)}
                  placeholder="Ej: Plataforma de gestión energética inteligente con IA"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Describe tu solución de forma clara y concisa. Un buen título de solución debe comunicar claramente
                  cómo resuelves el problema y qué valor aportas.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción de la Solución *</label>
                <textarea
                  value={solution.descripcion}
                  onChange={(e) => updateField("descripcion", e.target.value)}
                  placeholder="Describe detalladamente cómo funciona tu solución. ¿Qué tecnologías utiliza? ¿Cómo resuelve el problema? ¿Cuáles son sus características principales?"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1">{solution.descripcion.length} caracteres</div>
              </div>
            </div>

            {/* Solution Status */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {isSolutionCompleted() ? (
                  <>
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-green-600 font-medium">Solución completada</span>
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
            <h3 className="text-lg font-semibold mb-4">Ejemplos de buenas soluciones</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-[#2D6A4F] mb-2">
                  "Monitoreo en tiempo real"
                </p>
                <p className="text-sm text-gray-600">
                Seguimiento continuo del consumo energético con alertas automáticas
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-[#2D6A4F] mb-2">
                  "Automatización inteligente"
                </p>
                <p className="text-sm text-gray-600">
                Control automático de dispositivos basado en patrones de uso
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Link
              to={`/proyecto/${idProyecto}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver al Proyecto
            </Link>

            <button
              onClick={handleSave}
              disabled={!isSolutionCompleted()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSolutionCompleted()
                  ? "bg-[#2D6A4F] text-white hover:bg-[#1A4031]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Guardar y Continuar
            </button>
          </div>

          {/* Summary */}
          {isSolutionCompleted() && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-0.5" size={16} />
                <div className="text-sm text-green-800">
                  <p className="font-medium">¡Excelente! Has definido la solución principal.</p>
                  <p className="mt-1">
                    Esta solución ayudará a los inversores a entender rápidamente cómo tu proyecto resuelve el problema
                    identificado y qué valor aporta al mercado.
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
