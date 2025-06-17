"use client"

import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, AlertTriangle, CheckCircle, Lightbulb, Users, Briefcase, User } from "lucide-react"
import axios from "axios"

interface TeamMember {
  nombre: string
  cargo: string
  descripcion: string
}

export default function TeamMemberPage() {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    nombre: "",
    cargo: "",
    descripcion: "",
  })
  const { idProyecto } = useParams<{ idProyecto: string }>();
  const updateField = (field: string, value: string) => {
    setTeamMember((prev) => ({ ...prev, [field]: value }))
  }
  const navigate = useNavigate();
  const handleSave = () => {
    if (isMemberCompleted()) {
        axios.post(`http://localhost:8080/equipo`, {
            nombre: teamMember.nombre,
            cargo: teamMember.cargo,
            descripcion: teamMember.descripcion,
            proyecto_id: idProyecto,
        }).then(res => {
            if (res.status === 200) { 
              navigate(`/proyecto/${idProyecto}`);
              console.log('Miembro creado correctamente');
            } else {
              throw new Error('Respuesta inesperada del servidor');
            }
          })
          .catch(err => {
            console.error('Error al crear miembro:', err);
          });
    }
  }

  const isMemberCompleted = () => {
    return teamMember.nombre.trim() !== "" && teamMember.cargo.trim() !== "" && teamMember.descripcion.trim() !== ""
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
                <h1 className="text-xl font-semibold">Añadir Miembro del Equipo</h1>
                <p className="text-sm text-gray-600">Presenta a las personas clave detrás de tu proyecto</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!isMemberCompleted()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  isMemberCompleted()
                    ? "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                Guardar Miembro
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
                <p className="font-medium mb-1">¿Por qué es importante presentar tu equipo?</p>
                <p>
                  Los inversores invierten en personas tanto como en ideas. Un equipo sólido con experiencia relevante
                  genera confianza y demuestra que tienes las habilidades necesarias para ejecutar tu proyecto con
                  éxito.
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
              <div className="text-sm text-gray-600">{isMemberCompleted() ? "Completado" : "Incompleto"}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#4C9B6A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${isMemberCompleted() ? 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Team Member Input */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4C9B6A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                <Users size={14} />
              </div>
              <h3 className="text-lg font-semibold">Miembro del Equipo</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={teamMember.nombre}
                    onChange={(e) => updateField("nombre", e.target.value)}
                    placeholder="Ej: Ana María González López"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Nombre completo del miembro del equipo tal como aparecerá en el perfil del proyecto.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cargo o Posición *</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={teamMember.cargo}
                    onChange={(e) => updateField("cargo", e.target.value)}
                    placeholder="Ej: CEO & Fundadora, CTO, Director de Marketing, Desarrollador Senior"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Título o posición que ocupa esta persona en el proyecto o empresa.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción y Experiencia *</label>
                <textarea
                  value={teamMember.descripcion}
                  onChange={(e) => updateField("descripcion", e.target.value)}
                  placeholder="Describe la experiencia profesional, habilidades clave, logros relevantes y cómo contribuye al éxito del proyecto. Incluye años de experiencia, empresas anteriores, educación relevante, etc."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] transition-colors"
                  rows={5}
                />
                <div className="text-xs text-gray-500 mt-1">{teamMember.descripcion.length} caracteres</div>
              </div>
            </div>

            {/* Member Status */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {isMemberCompleted() ? (
                  <>
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-green-600 font-medium">Miembro completado</span>
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


          {/* Tips Section */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Consejos para describir a tu equipo</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Incluye años de experiencia específicos en el sector relevante</li>
              <li>• Menciona empresas reconocidas donde hayan trabajado anteriormente</li>
              <li>• Destaca logros cuantificables (ahorros generados, equipos liderados, etc.)</li>
              <li>• Incluye educación relevante y certificaciones profesionales</li>
              <li>• Explica cómo sus habilidades contribuyen específicamente al proyecto</li>
            </ul>
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
              disabled={!isMemberCompleted()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                isMemberCompleted()
                  ? "bg-[#2D6A4F] text-white hover:bg-[#1A4031]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Guardar y Continuar
            </button>
          </div>

          {/* Summary */}
          {isMemberCompleted() && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-0.5" size={16} />
                <div className="text-sm text-green-800">
                  <p className="font-medium">¡Excelente! Has añadido un miembro del equipo.</p>
                  <p className="mt-1">
                    Un equipo bien presentado genera confianza en los inversores y demuestra que tienes las personas
                    adecuadas para ejecutar tu proyecto con éxito.
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
