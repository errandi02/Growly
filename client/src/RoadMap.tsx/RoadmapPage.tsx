"use client"

import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, AlertTriangle, CheckCircle, Lightbulb, Calendar, MapPin } from "lucide-react"
import axios from "axios"

interface RoadmapStep {
  fecha: string
  titulo: string
  descripcion: string
}

export default function RoadmapPage() {
  const [roadmapStep, setRoadmapStep] = useState<RoadmapStep>({
    fecha: "",
    titulo: "",
    descripcion: "",
  })
  const { idProyecto } = useParams<{ idProyecto: string }>();

  const updateField = (field: string, value: string) => {
    setRoadmapStep((prev) => ({ ...prev, [field]: value }))
  }
  const navigate = useNavigate();
  const handleSave = () => {
    if (isStepCompleted()) {
      axios.post(`http://localhost:8080/roadmap`, {
        Titulo: roadmapStep.titulo,
        Fecha: roadmapStep.fecha,
        Descripcion: roadmapStep.descripcion,
        id_proyecto: idProyecto,
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

  const isStepCompleted = () => {
    return roadmapStep.fecha.trim() !== "" && roadmapStep.titulo.trim() !== "" && roadmapStep.descripcion.trim() !== ""
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
                <h1 className="text-xl font-semibold">Añadir Paso del Roadmap</h1>
                <p className="text-sm text-gray-600">Define los hitos clave en el desarrollo de tu proyecto</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!isStepCompleted()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isStepCompleted()
                    ? "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                Guardar Paso
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
                <p className="font-medium mb-1">¿Por qué es importante definir un roadmap?</p>
                <p>
                  Un roadmap bien definido muestra a los inversores que tienes un plan claro para el desarrollo y
                  crecimiento de tu proyecto. Demuestra visión estratégica y capacidad de planificación.
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
              <div className="text-sm text-gray-600">{isStepCompleted() ? "Completado" : "Incompleto"}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#4C9B6A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${isStepCompleted() ? 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Roadmap Step Input */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                <MapPin size={14} />
              </div>
              <h3 className="text-lg font-semibold">Paso del Roadmap</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fecha *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={roadmapStep.fecha}
                    onChange={(e) => updateField("fecha", e.target.value)}
                    placeholder="Ej: Q1 2024, Enero 2024, 2024-2025"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Puedes usar trimestres (Q1, Q2...), meses específicos o rangos de tiempo.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Título del Paso *</label>
                <input
                  type="text"
                  value={roadmapStep.titulo}
                  onChange={(e) => updateField("titulo", e.target.value)}
                  placeholder="Ej: Lanzamiento del MVP, Expansión Internacional, Integración con APIs"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Un título claro y conciso que describa el hito o fase del proyecto.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción del Paso *</label>
                <textarea
                  value={roadmapStep.descripcion}
                  onChange={(e) => updateField("descripcion", e.target.value)}
                  placeholder="Describe detalladamente qué se logrará en este paso, qué actividades se realizarán y cuáles son los resultados esperados."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1">{roadmapStep.descripcion.length} caracteres</div>
              </div>
            </div>

            {/* Step Status */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {isStepCompleted() ? (
                  <>
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-green-600 font-medium">Paso completado</span>
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
            <h3 className="text-lg font-semibold mb-4">Ejemplos de buenos pasos de roadmap</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-2 py-1 rounded text-xs font-medium">Q1 2024</span>
                  <h4 className="font-medium text-[#2D6A4F]">Desarrollo del MVP</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Desarrollo de la versión mínima viable de la plataforma con funcionalidades básicas: registro de
                  usuarios, sistema de búsqueda y panel de control. Incluye pruebas con 50 usuarios beta para validar la
                  usabilidad y recopilar feedback inicial.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-2 py-1 rounded text-xs font-medium">Q3 2024</span>
                  <h4 className="font-medium text-[#2D6A4F]">Lanzamiento Comercial</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Lanzamiento oficial de la plataforma al mercado español con campaña de marketing digital.
                  Implementación del sistema de pagos y modelo de suscripción premium. Meta: alcanzar 1,000 usuarios
                  activos y 100 transacciones mensuales.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#4C9B6A]/10 text-[#2D6A4F] px-2 py-1 rounded text-xs font-medium">2025</span>
                  <h4 className="font-medium text-[#2D6A4F]">Expansión Internacional</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Adaptación de la plataforma para mercados internacionales, comenzando por Portugal y Francia.
                  Traducción de la interfaz, adaptación a regulaciones locales y establecimiento de alianzas
                  estratégicas con socios locales en cada país.
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
              disabled={!isStepCompleted()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                isStepCompleted()
                  ? "bg-[#2D6A4F] text-white hover:bg-[#1A4031]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Guardar y Continuar
            </button>
          </div>

          {/* Summary */}
          {isStepCompleted() && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-0.5" size={16} />
                <div className="text-sm text-green-800">
                  <p className="font-medium">¡Excelente! Has definido un paso del roadmap.</p>
                  <p className="mt-1">
                    Este paso ayudará a los inversores a entender tu plan de desarrollo y la visión a futuro del
                    proyecto.
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
