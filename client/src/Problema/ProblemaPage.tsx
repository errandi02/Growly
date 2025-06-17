import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react"
import axios from "axios";

export default function ProblemaPage() {
  const [problemTitle, setProblemTitle] = useState("")
  const { idProyecto } = useParams<{ idProyecto: string }>();
  const navigate = useNavigate();
  const handleSave = () => {
    if (problemTitle.trim()) {
        axios.post(`http://localhost:8080/problema`, {
            problema: problemTitle,
            id_proyecto: idProyecto
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

  const isProblemCompleted = () => {
    return problemTitle.trim() !== ""
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
                <h1 className="text-xl font-semibold">Añadir Problema</h1>
                <p className="text-sm text-gray-600">Define el problema principal que resuelve tu proyecto</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!isProblemCompleted()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  isProblemCompleted()
                    ? "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                Guardar Problema
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
                <p className="font-medium mb-1">¿Por qué es importante definir el problema?</p>
                <p>
                  Identificar claramente el problema principal que resuelve tu proyecto ayuda a los inversores a
                  entender el valor y la necesidad de tu solución en el mercado.
                </p>
              </div>
            </div>
          </div>

          {/* Problem Input */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                *
              </div>
              <h3 className="text-lg font-semibold">Problema</h3>
            </div>

            <div>
              
              <input
                type="text"
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                placeholder="Ej: Alto consumo energético en hogares y empresas"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">
                Describe el problema de forma clara y concisa. Un buen título de problema debe ser específico y
                comunicar claramente el desafío que tu proyecto resuelve.
              </p>
            </div>

            {/* Problem Status */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {isProblemCompleted() ? (
                  <>
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-green-600 font-medium">Problema definido</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <span className="text-sm text-yellow-600 font-medium">Ingresa el título del problema</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Ejemplos de buenos problemas</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="font-medium text-[#2D6A4F]">
                  "Falta de acceso a financiamiento para pequeños emprendedores"
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="font-medium text-[#2D6A4F]">"Desperdicio de alimentos en restaurantes y supermercados"</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="font-medium text-[#2D6A4F]">
                  "Dificultad para encontrar estacionamiento en zonas urbanas"
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
              disabled={!isProblemCompleted()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                isProblemCompleted()
                  ? "bg-[#2D6A4F] text-white hover:bg-[#1A4031]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Guardar y Continuar
            </button>
          </div>

          {/* Summary */}
          {isProblemCompleted() && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-0.5" size={16} />
                <div className="text-sm text-green-800">
                  <p className="font-medium">¡Excelente! Has definido el problema principal.</p>
                  <p className="mt-1">
                    Este problema ayudará a los inversores a entender rápidamente el propósito de tu proyecto.
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
