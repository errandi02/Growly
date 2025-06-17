import { Link } from "react-router-dom"
import {
  GraduationCap,
  Code,
  Lightbulb,
  Target,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Award,
  Users,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react"
import imagen_omar from "../assets/ImagenMia.jpeg"
export default function AboutUsPage() {


  const values = [
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Creo en el poder de la tecnología para resolver problemas reales y crear oportunidades.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Mi objetivo es construir puentes entre emprendedores e inversores para fortalecer el ecosistema.",
    },
    {
      icon: Target,
      title: "Impacto",
      description: "Busco crear soluciones que generen un impacto positivo y duradero en la sociedad.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Quiénes Somos</h1>
                <p className="text-xl mb-6 text-green-100">
                  Hola, soy <strong>Omar Errandi</strong>, el creador y desarrollador de Growly.
                </p>
                <p className="text-lg mb-8 text-green-100">
                  Como estudiante de Ingeniería Informática en la Universidad de Málaga, he desarrollado esta plataforma
                  con la visión de revolucionar la forma en que emprendedores e inversores se conectan y colaboran.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">

                  <a
                    href="mailto:omar@growly.com"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2D6A4F] transition-colors text-center"
                  >
                    Contactar
                  </a>
                </div>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                    <img
                      src={imagen_omar}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <div className="flex items-center gap-2 text-green-100">
                    <MapPin size={16} />
                    <span>Málaga, España</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-100">
                    <GraduationCap size={16} />
                    <span>Ing. Informática</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Story */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Mi Historia</h2>
              <p className="text-lg text-gray-600">
                La motivación detrás de Growly y mi visión para el futuro del emprendimiento
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">¿Por qué Growly?</h3>
                <p className="text-gray-700 mb-4">
                  Durante mis estudios en Ingeniería Informática, me di cuenta de que muchas ideas brillantes nunca ven
                  la luz debido a las barreras existentes entre emprendedores e inversores. El ecosistema actual está
                  fragmentado y carece de herramientas eficientes para facilitar estas conexiones cruciales.
                </p>
                <p className="text-gray-700 mb-4">
                  Growly nació como mi Trabajo de Fin de Grado con el objetivo de crear una solución integral que
                  no solo conecte a las personas adecuadas, sino que también proporcione las herramientas necesarias
                  para validar ideas, acceder a financiamiento y construir redes sólidas de apoyo.
                </p>
                <p className="text-gray-700">
                  Mi visión es democratizar el acceso al emprendimiento y la inversión, creando un ecosistema donde la
                  innovación pueda florecer sin barreras artificiales.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <h4 className="text-xl font-semibold mb-6">Información Académica</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="text-[#4C9B6A] mt-1" size={20} />
                    <div>
                      <p className="font-medium">Grado en Ingeniería Informática</p>
                      <p className="text-sm text-gray-600">Universidad de Málaga (2021-2025)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="text-[#4C9B6A] mt-1" size={20} />
                    <div>
                      <p className="font-medium">Trabajo de Fin de Grado</p>
                      <p className="text-sm text-gray-600">Tutorizado por Mónica Pinto Alarcón</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Mis Valores</h2>
              <p className="text-lg text-gray-600">Los principios que guían el desarrollo de Growly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-[#4C9B6A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* Vision */}
      <div className="py-16 bg-gradient-to-r from-[#4C9B6A] to-[#2D6A4F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mi Visión para el Futuro</h2>
            <p className="text-xl mb-8 text-green-100">
              Growly es solo el comienzo. Mi objetivo es crear un ecosistema global donde la innovación no tenga
              fronteras y donde cada idea brillante tenga la oportunidad de convertirse en realidad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Escalabilidad</h3>
                <p className="text-green-100 text-sm">
                  Expandir la plataforma a nivel internacional, conectando ecosistemas globales
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovación</h3>
                <p className="text-green-100 text-sm">
                  Integrar nuevas tecnologías como blockchain y machine learning avanzado
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Impacto Social</h3>
                <p className="text-green-100 text-sm">
                  Democratizar el acceso al emprendimiento en comunidades desatendidas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres Conectar?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Estoy siempre abierto a nuevas ideas, colaboraciones y conversaciones sobre el futuro del emprendimiento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:omar@growly.com"
                className="flex items-center justify-center gap-2 bg-[#4C9B6A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2D6A4F] transition-colors"
              >
                <Mail size={20} />
                Enviar Email
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
