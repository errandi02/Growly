
import rocketpic from '../assets/Rocket_PC.png'
import { Link } from 'react-router-dom';
import {ArrowRight, Users, PiggyBank, CheckSquare, Bot, Shield, LayoutDashboard, Rocket } from "lucide-react"
import logo from "../assets/Logo_Growly_SinFondo.png";

	export default function FrontPage() {
		return (
			<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-[#2D6A4F] to-[#1A4031] text-white py-20">
			  <div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center">
				  <div className="md:w-1/2 mb-10 md:mb-0">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Conectamos Emprendedores e Inversores</h1>
					<p className="text-xl mb-8">
					  Una plataforma integral que facilita el intercambio de información, acceso a financiamiento y validación
					  de ideas de negocio.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
					  <Link
						to="/register"
						className="bg-white text-[#4C9B6A] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
					  >
						Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
					  </Link>
					  <Link
						to="/que-hacemos"
						className="border border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
					  >
						Cómo funciona
					  </Link>
					</div>
				  </div>
				  <div className="md:w-1/2">
				  <img
				  src={rocketpic}
					  width={500}
					  height={400}
					  className="ml-40"
					/>
				  </div>
				</div>
			  </div>
			</section>
	  
			{/* Features Section */}
			<section className="py-20 bg-white">
			  <div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Funcionalidades Principales</h2>
	  
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				  {/* Feature 1 */}
				  <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div className="bg-[#4C9B6A]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
					  <Users className="h-8 w-8 text-[#4C9B6A]" />
					</div>
					<h3 className="text-xl font-bold mb-4">Networking Inteligente</h3>
					<p className="text-gray-600">
					  Conectamos emprendedores con mentores, socios e inversores relevantes según sus intereses y necesidades.
					</p>
				  </div>
	  
				  {/* Feature 2 */}
				  <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div className="bg-[#4C9B6A]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
					  <PiggyBank className="h-8 w-8 text-[#4C9B6A]" />
					</div>
					<h3 className="text-xl font-bold mb-4">Micro Financiación</h3>
					<p className="text-gray-600">
					  Implementamos módulos para crear campañas de financiación colectiva y apoyar proyectos emergentes.
					</p>
				  </div>
	  
				  {/* Feature 3 */}
				  <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div className="bg-[#4C9B6A]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
					  <CheckSquare className="h-8 w-8 text-[#4C9B6A]" />
					</div>
					<h3 className="text-xl font-bold mb-4">Validación de Ideas</h3>
					<p className="text-gray-600">
					  Herramientas para realizar encuestas, análisis de mercado y pruebas piloto antes del lanzamiento.
					</p>
				  </div>
	  
				  {/* Feature 4 */}
				  <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div className="bg-[#4C9B6A]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
					  <Bot className="h-8 w-8 text-[#4C9B6A]" />
					</div>
					<h3 className="text-xl font-bold mb-4">Asistencia con IA</h3>
					<p className="text-gray-600">
					  Chatbot basado en IA que brinda consejos personalizados y análisis de riesgo para proyectos.
					</p>
				  </div>
	  
				  {/* Feature 5 */}
				  <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div className="bg-[#4C9B6A]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
					  <Shield className="h-8 w-8 text-[#4C9B6A]" />
					</div>
					<h3 className="text-xl font-bold mb-4">Gestión y Seguridad</h3>
					<p className="text-gray-600">
					  Sistema de autenticación y gestión de usuarios para asegurar la privacidad y seguridad de los datos.
					</p>
				  </div>
	  
				  {/* Feature 6 */}
				  <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div className="bg-[#4C9B6A]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
					  <LayoutDashboard className="h-8 w-8 text-[#4C9B6A]" />
					</div>
					<h3 className="text-xl font-bold mb-4">Panel Personalizado</h3>
					<p className="text-gray-600">
					  Panel de control donde los usuarios pueden gestionar interacciones y monitorear el progreso.
					</p>
				  </div>
				</div>
			  </div>
			</section>
	  
			{/* For Entrepreneurs & Investors Section */}
			<section className="py-20 bg-gray-50">
			  <div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Para Emprendedores e Inversores</h2>
	  
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				  {/* For Entrepreneurs */}
				  <div className="bg-white p-10 rounded-xl shadow-md">
					<h3 className="text-2xl font-bold mb-6 text-[#4C9B6A]">Para Emprendedores</h3>
					<ul className="space-y-4">
					  <li className="flex items-start">
						<div className="bg-[#4C9B6A]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#4C9B6A]" />
						</div>
						<p>Acceso a una red de inversores y mentores cualificados</p>
					  </li>
					  <li className="flex items-start">
						<div className="bg-[#4C9B6A]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#4C9B6A]" />
						</div>
						<p>Herramientas para validar ideas de negocio antes de lanzarlas</p>
					  </li>
					  <li className="flex items-start">
						<div className="bg-[#4C9B6A]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#4C9B6A]" />
						</div>
						<p>Oportunidades de financiación a través de crowdfunding</p>
					  </li>
					  <li className="flex items-start">
						<div className="bg-[#4C9B6A]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#4C9B6A]" />
						</div>
						<p>Asesoramiento personalizado mediante IA para desarrollar proyectos</p>
					  </li>
					</ul>
				  </div>
	  
				  {/* For Investors */}
				  <div className="bg-white p-10 rounded-xl shadow-md">
					<h3 className="text-2xl font-bold mb-6 text-[#2D6A4F]">Para Inversores</h3>
					<ul className="space-y-4">
					  <li className="flex items-start">
						<div className="bg-[#2D6A4F]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#2D6A4F]" />
						</div>
						<p>Descubrimiento de proyectos innovadores con potencial de crecimiento</p>
					  </li>
					  <li className="flex items-start">
						<div className="bg-[#2D6A4F]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#2D6A4F]" />
						</div>
						<p>Herramientas de análisis de riesgo para evaluar oportunidades</p>
					  </li>
					  <li className="flex items-start">
						<div className="bg-[#2D6A4F]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#2D6A4F]" />
						</div>
						<p>Seguimiento detallado del progreso de las inversiones</p>
					  </li>
					  <li className="flex items-start">
						<div className="bg-[#2D6A4F]/20 p-1 rounded-full mr-3 mt-1">
						  <ArrowRight className="h-4 w-4 text-[#2D6A4F]" />
						</div>
						<p>Conexión directa con emprendedores que se alinean con sus intereses</p>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			</section>
	  
			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
			  <div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6">
				  ¿Listo para impulsar tu proyecto o invertir en el futuro?
				</h2>
				<p className="text-xl mb-10 max-w-3xl mx-auto">
				  Únete a nuestra comunidad de emprendedores e inversores y comienza a aprovechar todas las herramientas que
				  ofrecemos.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
				  <Link
					to="/register"
					className="bg-white text-[#4C9B6A] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg"
				  >
					Registrarse como Emprendedor
				  </Link>
				  <Link
					to="/register"
					className="border border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg"
				  >
					Registrarse como Inversor
				  </Link>
				</div>
			  </div>
			</section>
			      {/* Footer */}
				<div className="flex flex-col items-center justify-center  bg-gray-50">
						<div className="text-center px-4 py-12">
						{/* Logo + “Growly” */}
						<div className="flex items-center justify-center space-x-2 mb-4">
							<img
								src={logo || "/placeholder.svg"}
								alt="Logo"
								className="h-10 w-auto"
							/>
							<span className="font-bold text-gray-800 text-lg">Growly</span>
						</div>

							{/* Descripción */}
							<p className="text-gray-600">
							La plataforma diseñada para emprendedores e inversores para todo el mundo.
							</p>

							{/* Separador y texto de derechos */}
							<div className="border-t border-gray-200 mt-12 pt-8 text-gray-600">
							<p>&copy; {new Date().getFullYear()} Growly. Todos los derechos reservados.</p>
							</div>
						</div>
				</div>
		</div>
		);
	}