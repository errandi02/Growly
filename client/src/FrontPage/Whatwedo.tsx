import { Link } from "react-router-dom"
import {
  Users,
  DollarSign,
  CheckCircle,
  Bot,
  Shield,
  Search,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Network,
  Target,
  ArrowRight,
  Zap,
  Globe,
  Heart,
} from "lucide-react"

export default function WhatWeDoPage() {
  const features = [
    {
      icon: Network,
      title: "Networking Inteligente",
      description:
        "Conectamos emprendedores con mentores, socios e inversores relevantes según sus intereses, perfil y necesidades, promoviendo la creación de redes de apoyo y colaboración.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: DollarSign,
      title: "Microfinanciación y Crowdfunding",
      description:
        "Implementamos un módulo completo para que los emprendedores puedan crear campañas de financiación colectiva, permitiendo a inversores y personas apoyar proyectos emergentes.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: CheckCircle,
      title: "Validación de Ideas de Negocio",
      description:
        "Ofrecemos herramientas para realizar encuestas, análisis de mercado y pruebas piloto con la ayuda de mentores y otros emprendedores del mismo sector antes del lanzamiento.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Bot,
      title: "Asistencia con Inteligencia Artificial",
      description:
        "Nuestro chatbot basado en IA brinda consejos personalizados, proporcionando guías prácticas para desarrollar proyectos y realizar análisis de riesgo desde la perspectiva de los inversores.",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Shield,
      title: "Gestión Segura de Usuarios",
      description:
        "Sistema robusto de autenticación y gestión de usuarios que asegura la privacidad y seguridad de los datos de emprendedores e inversores en la plataforma.",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description:
        "Herramientas de búsqueda eficiente que permiten a los usuarios encontrar proyectos, inversores y oportunidades de manera rápida y precisa según sus criterios específicos.",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: BarChart3,
      title: "Panel de Control Personalizado",
      description:
        "Dashboard donde los usuarios pueden gestionar sus interacciones, visualizar proyectos, recibir recomendaciones y monitorear el progreso de sus inversiones o proyectos.",
      color: "bg-teal-50 text-teal-600",
    },
  ]

  const problems = [
    {
      icon: TrendingUp,
      title: "Acceso a Financiamiento",
      description: "Muchos emprendedores luchan por encontrar fuentes de capital adecuadas para sus proyectos.",
    },
    {
      icon: Users,
      title: "Construcción de Redes",
      description: "Dificultad para conectar con mentores, socios e inversores relevantes en el ecosistema.",
    },
    {
      icon: Target,
      title: "Validación de Ideas",
      description: "Falta de herramientas para validar ideas de negocio antes del lanzamiento al mercado.",
    },
    {
      icon: Globe,
      title: "Identificación de Oportunidades",
      description:
        "Los inversores carecen de herramientas efectivas para identificar oportunidades con alto potencial.",
    },
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Regístrate",
      description: "Crea tu perfil como emprendedor o inversor y completa tu información profesional.",
      icon: Users,
    },
    {
      step: "02",
      title: "Conecta",
      description: "Nuestro algoritmo inteligente te conecta con las personas y oportunidades más relevantes.",
      icon: Network,
    },
    {
      step: "03",
      title: "Valida",
      description: "Utiliza nuestras herramientas para validar tu idea de negocio con la comunidad.",
      icon: CheckCircle,
    },
    {
      step: "04",
      title: "Financia",
      description: "Lanza tu campaña de crowdfunding o encuentra inversores para tu proyecto.",
      icon: DollarSign,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">¿Qué Hacemos?</h1>
            <p className="text-xl md:text-2xl mb-2 text-green-100">
              Conectamos emprendedores e inversores en un ecosistema integral que facilita el crecimiento y la
              innovación
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Desarrollamos una <strong>plataforma web integral</strong> que conecta emprendedores e inversores de
              manera eficiente, facilitando el intercambio de información, el acceso a financiamiento y la validación de
              ideas de negocio. Nuestro objetivo es crear un ecosistema donde la innovación prospere y las oportunidades
              se materialicen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#4C9B6A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovación</h3>
                <p className="text-gray-600">Fomentamos la creatividad y el desarrollo de ideas disruptivas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
                <p className="text-gray-600">Construimos una red sólida de apoyo mutuo y colaboración</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Eficiencia</h3>
                <p className="text-gray-600">Optimizamos procesos para acelerar el crecimiento empresarial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems We Solve */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Problemas que Resolvemos</h2>
              <p className="text-lg text-gray-600">
                El ecosistema emprendedor actual enfrenta desafíos significativos que limitamos las oportunidades de
                éxito
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((problem, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <problem.icon className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                  <p className="text-gray-600 text-sm">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Solutions */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Soluciones</h2>
              <p className="text-lg text-gray-600">
                Funcionalidades innovadoras diseñadas para superar los desafíos del ecosistema emprendedor
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gradient-to-r from-[#4C9B6A] to-[#2D6A4F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
              <p className="text-lg text-green-100">
                Un proceso simple y eficiente para conectar emprendedores e inversores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="text-[#2D6A4F]" size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-green-100">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Comenzar?</h2>
            <p className="text-xl mb-8 text-green-100">
              Únete a nuestra comunidad de emprendedores e inversores y forma parte del futuro de la innovación
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
