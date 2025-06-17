"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Send,
  Paperclip,
  Mic,
  ArrowLeft,
  MoreVertical,
  Bot,
  Loader,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Sparkles,
} from "lucide-react"
import axios from "axios"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  status?: "sending" | "sent" | "error"
  isTyping?: boolean
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy el asistente virtual de Growly. Estoy aquí para ayudarte con información sobre proyectos, inversiones o cualquier duda que tengas. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "¿Cómo funciona el proceso de inversión?",
    "¿Cuál es la inversión mínima?",
    "¿Cómo se evalúan los proyectos?",
    "¿Qué comisiones aplican?",
  ]
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages])

  // 1. Lógica estática
  const getStaticResponse = (input: string): string | null => {
    if (input.includes("¿Cómo funciona el proceso de inversión?") || input.includes("¿Cuál es la inversión mínima?")) {
      return "El proceso de inversión es sencillo. Primero, debes registrarte como inversor. Luego, puedes explorar los proyectos disponibles, analizar sus detalles y decidir cuánto quieres invertir. La inversión mínima varía según el proyecto, pero generalmente comienza desde €100."
    } else if (input.includes("¿Qué comisiones aplican?")) {
      return "Cobramos una comisión del 2% sobre el capital recaudado por los proyectos exitosos. Para los inversores, no hay comisiones por invertir, solo por los beneficios obtenidos (5% sobre ganancias)."
    } else if (input.includes("¿Cómo se evalúan los proyectos?")) {
      return "Todos los proyectos pasan por un riguroso proceso de evaluación antes de aparecer en nuestra plataforma. Analizamos el modelo de negocio, el equipo, las proyecciones financieras y el potencial de mercado. Solo aproximadamente el 5% de los proyectos que solicitan financiación son aprobados."
    } else if (input.includes("hola") || input.includes("buenos días") || input.includes("buenas")) {
      return "¡Hola! ¿En qué puedo ayudarte hoy? Puedo proporcionarte información sobre proyectos, el proceso de inversión o resolver cualquier duda que tengas sobre nuestra plataforma."
    } else if (input.includes("gracias")) {
      return "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?"
    } 
      return null
    
  }

  async function callChatGPT(body: any): Promise<string> {
    try {
        // Enviar los datos al back
        const introInput="Se trata de una plataforma de emprendedores e inversores. Donde los emprendedores podrán crear proyectos en el apartado de Marketplace en el botón “Crear Proyecto”. Podrán también desde la propia página de Marketplace revisar todos los proyectos creados por la gente y que buscan financiación. Puedes buscar tu proyecto y clickar adentro y si le das a que he invertido te aparecerá en tu pestaña de Mis inversiones. En el Marketplace cuando clickas en un proyecto te abre todos los detalles del proyecto, ahí es donde los Inversores podrán invertir. También puedes acceder a tu perfil o en el menú principal clickando en la información que aparece de tu usuario o en el header a la derecha desplegando tu imagen y clickando en Perfil para configuración básica de perfil, o en Configuración la configuración más relacionada con el correo, fecha de nacimiento, ciudad… Para modificar Habilidades, Educación, Experiencia y declararte como mentor. En el menú de inicio puedes publicar posts y te aparecen los posts de tus amigos y los tuyos. En el menú arriba de amistades puedes ver a la gente que sigues, encontrar mentores que te validen tus proyectos y descubrir a usuarios nuevos, a los que puedes seguir.  También en el menú de arriba tienes un apartado de ChatBot en el que hay un chatbot con el que puedes hablar y que te indique más o menos cómo usar la aplicación:";
        const input = introInput +"Quiero que con la información que te he pasado, respondas (no uses ni negrita, ni cursiva, responde en un párrafo o dos) como si fueses un buen chatbot a la siguiente pregunta: " + body;
        const response = await axios.post('http://localhost:8080/api/gpt', {messages:input});      
        const text = response.data;      
      return text ?? 'Lo siento, no he podido generar respuesta.'
    } catch (error: any) {
      console.error('Error llamando a tu API local:', error.response ?? error.message)
      return 'Lo siento, ha ocurrido un error al contactar con el servicio local.'
    }
  }

  // 3. Nuevo handleSendMessage asíncrono
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // ¿Coincide con estáticas?
    const staticResp = getStaticResponse(userMessage.content)
    let reply: string
    if (staticResp) {
      reply = staticResp
    } else {
      // Llamada a ChatGPT
      reply = await callChatGPT(userMessage.content)
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: reply,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    document.getElementById("chat-input")?.focus()
  }
  return (
    <div className=" bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/home" className="text-[#4C9B6A] hover:text-[#2D6A4F]">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#4C9B6A] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Asistente IA</h1>
                <p className="text-xs text-gray-500">En línea</p>
              </div>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 container mx-auto max-w-4xl max-h-screen">
        <div className="space-y-4 pb-20">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-[#4C9B6A] text-white rounded-tr-none"
                    : "bg-white border border-gray-200 rounded-tl-none"
                }`}
              >
                <div className="text-sm md:text-base">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-green-100" : "text-gray-500"
                  } flex justify-between items-center`}
                >
                  <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  {message.sender === "bot" && (
                    <div className="flex gap-2 ml-4">
                      <button className="hover:bg-gray-100 p-1 rounded">
                        <Copy size={14} />
                      </button>
                      <button className="hover:bg-gray-100 p-1 rounded">
                        <ThumbsUp size={14} />
                      </button>
                      <button className="hover:bg-gray-100 p-1 rounded">
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] md:max-w-[70%] rounded-2xl p-4 bg-white border border-gray-200 rounded-tl-none">
                <div className="flex items-center gap-2">
                  <Loader size={16} className="animate-spin text-[#4C9B6A]" />
                  <span className="text-gray-500">Escribiendo...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="bg-white border-t border-gray-200 py-3 px-4">
        <div className="container mx-auto max-w-4xl overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 flex items-center"
              >
                <Sparkles size={14} className="mr-2 text-[#4C9B6A]" />
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-10 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end gap-2">

            <div className="flex-1 relative">
              <textarea
                id="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#4C9B6A] resize-none"
                rows={1}
                style={{ maxHeight: "150px", minHeight: "44px" }}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ""}
              className={`p-3 rounded-full ${
                inputValue.trim() === "" ? "bg-gray-200 text-gray-400" : "bg-[#4C9B6A] text-white hover:bg-[#2D6A4F]"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            El asistente IA puede cometer errores. Verifica la información importante.
          </div>
        </div>
      </div>

      {/* New Chat Button - Fixed */}
      <button className="fixed bottom-20 right-6 bg-[#2D6A4F] text-white p-3 rounded-full shadow-lg hover:bg-[#1A4031]">
        <RefreshCw size={20} />
      </button>
    </div>
  )
}
