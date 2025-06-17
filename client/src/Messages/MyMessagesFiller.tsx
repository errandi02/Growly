import React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Search,
  Phone,
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock,
  ArrowLeft,
  Menu,
  Info,
  Users,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface Message {
  id: number
  sender_id: number
  receiver_id: number
  content: string
  created_at: Date
  status?: "sent" | "delivered" | "read"
  isFirstInGroup?: boolean
  isLastInGroup?: boolean
}

interface Usuario {
  id: number
  name: string
  surname: string
  url_imagen_perfil: string | null
  titulo_profesional: string
  online?: boolean
  lastSeen?: Date
}

interface Conversation {
  id: number
  user: Usuario
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
}

export default function MyMessagesFiller() {
  const { idUsuario } = useParams<{ idUsuario: string }>()
  const navigate = useNavigate()

  // Authentication
  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=")
      if (name === "token") {
        return value
      }
    }
    return null
  }

  const token = getTokenFromCookies()
  let currentUserId = 0

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token)
      currentUserId = decodedToken.id
    } catch (error) {
      console.error("Error al decodificar el token", error)
    }
  }

  // State
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null)
  const [chatPartner, setChatPartner] = useState<Usuario | null>(null)
  const [newMessage, setNewMessage] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Process messages for grouping
  const processMessages = (msgs: Message[]): Message[] =>
    msgs.map((msg, idx) => {
      const prev = msgs[idx - 1]
      const next = msgs[idx + 1]
      return {
        ...msg,
        isFirstInGroup: !prev || prev.sender_id !== msg.sender_id,
        isLastInGroup: !next || next.sender_id !== msg.sender_id,
      }
    })

  // Load current user data
  useEffect(() => {
    if (!currentUserId) return

    axios
      .get(`http://localhost:8080/user/${currentUserId}`)
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser({
            ...res.data,
            online: true,
          })
        }
      })
      .catch((err) => {
        console.error("Error al cargar datos del usuario actual:", err)
      })
  }, [currentUserId])

  // Load chat partner data and update selected conversation
  useEffect(() => {
    if (!idUsuario) {
      // If no specific user, keep the selected conversation from the list
      return
    }

    axios
      .get(`http://localhost:8080/user/${idUsuario}`)
      .then((res) => {
        if (res.status === 200) {
          const partner: Usuario = {
            ...res.data,
            online: Math.random() > 0.5, // Simulate online status
          }
          setChatPartner(partner)

          // Update selected conversation if it exists in the list
          setConversations((prev) => {
            const existingConv = prev.find((conv) => conv.id === Number.parseInt(idUsuario))
            if (existingConv) {
              const updatedConv = { ...existingConv, user: partner }
              setSelectedConversation(updatedConv)
              return prev.map((conv) => (conv.id === Number.parseInt(idUsuario) ? updatedConv : conv))
            } else {
              // Create new conversation if it doesn't exist
              const newConversation: Conversation = {
                id: Number.parseInt(idUsuario),
                user: partner,
                lastMessage: "Nueva conversación",
                lastMessageTime: new Date(),
                unreadCount: 0,
                messages: [],
              }
              setSelectedConversation(newConversation)
              return [newConversation, ...prev]
            }
          })
        }
      })
      .catch((err) => {
        console.error("Error al cargar datos del usuario:", err)
      })
  }, [idUsuario])

  // Load conversations from contacts
  useEffect(() => {
    if (!currentUserId) return

    const loadConversations = async () => {
      try {
        // Get contact IDs
        const contactsRes = await axios.get<number[]>(`http://localhost:8080/contacts/${currentUserId}`)
        const contactIds = contactsRes.data

        if (contactIds.length === 0) {
          setConversations([])
          return
        }

        // Load user data for each contact
        const contactPromises = contactIds.map((contactId) =>
          axios.get<Usuario>(`http://localhost:8080/user/${contactId}`),
        )

        const contactResponses = await Promise.all(contactPromises)

        // Load last message for each conversation
        const conversationPromises = contactIds.map(async (contactId) => {
          try {
            const messagesRes = await axios.get<Message[]>(
              `http://localhost:8080/messages/${currentUserId}/${contactId}`,
            )
            const messages = messagesRes.data

            // Get the last message
            const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null

            return {
              contactId,
              lastMessage: lastMessage ? lastMessage.content : "Sin mensajes",
              lastMessageTime: lastMessage ? new Date(lastMessage.created_at) : new Date(),
              messageCount: messages.length,
            }
          } catch (error) {
            return {
              contactId,
              lastMessage: "Sin mensajes",
              lastMessageTime: new Date(),
              messageCount: 0,
            }
          }
        })

        const conversationData = await Promise.all(conversationPromises)

        // Create conversation objects
        const newConversations: Conversation[] = contactResponses.map((response, index) => {
          const user: Usuario = {
            ...response.data,
            online: Math.random() > 0.5, // Simulate online status
          }

          const convData = conversationData[index]

          return {
            id: user.id,
            user,
            lastMessage: convData.lastMessage,
            lastMessageTime: convData.lastMessageTime,
            unreadCount: 0, // You can implement unread count logic here
            messages: [],
          }
        })

        // Sort conversations by last message time (most recent first)
        newConversations.sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime())

        setConversations(newConversations)

        // If we came from a specific conversation URL, select it
        if (idUsuario) {
          const targetConversation = newConversations.find((conv) => conv.id === Number.parseInt(idUsuario))
          if (targetConversation) {
            setSelectedConversation(targetConversation)
          }
        } else if (newConversations.length > 0) {
          // Select the most recent conversation by default
          setSelectedConversation(newConversations[0])
        }
      } catch (error) {
        console.error("Error loading conversations:", error)
        setConversations([])
      }
    }

    loadConversations()
  }, [currentUserId, idUsuario])

  // Fetch messages with polling
  useEffect(() => {
    if (!currentUserId || !idUsuario) return

    let mounted = true
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const res = await axios.get<Message[]>(`http://localhost:8080/messages/${currentUserId}/${idUsuario}`)

        const fetched = res.data.map((m) => ({
          id: m.id,
          sender_id: m.sender_id,
          receiver_id: m.receiver_id,
          content: m.content,
          created_at: new Date((m as any).created_at),
          status: (m as any).read_at ? "read" : "delivered",
          isFirstInGroup: false,
          isLastInGroup: false,
        }))

        if (!mounted) return
        setMessages(processMessages(fetched))
        setLoading(false)
      } catch (err) {
        console.error("Error fetching messages:", err)
        setLoading(false)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [currentUserId, idUsuario])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Generate initials from user
  const getInitials = (user?: Usuario) => {
    if (!user) return "U"
    return `${user.name.charAt(0)}${user.surname.charAt(0)}`
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  }

  // Format message date
  const formatMessageDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return "Hoy"
    if (date.toDateString() === yesterday.toDateString()) return "Ayer"
    return date.toLocaleDateString("es-ES")
  }

  // Format last message time
  const formatLastMessageTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Get status icon
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-emerald-500" />
      default:
        return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  // Handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    const content = newMessage.trim()
    if (!content || !idUsuario) return

    setNewMessage("")

    try {
      const res = await axios.post(`http://localhost:8080/messages`, {
        sender_id: currentUserId,
        receiver_id: Number.parseInt(idUsuario),
        content,
      })

      const created = res.data
      const newMsg: Message = {
        id: created.id,
        sender_id: currentUserId,
        receiver_id: Number.parseInt(idUsuario),
        content: created.content,
        created_at: new Date(created.created_at),
        status: "sent",
      }

      setMessages((prev) => processMessages([...prev, newMsg]))
    } catch (err) {
      console.error("Error sending message:", err)
      // Restore message on error
      setNewMessage(content)
    }
  }

  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setIsSidebarOpen(false)

    // Navigate to the conversation URL
    navigate(`/chat/${conversation.user.id}`)

    // Mark messages as read (you can implement this in your backend)
    const updatedConversation = { ...conversation, unreadCount: 0 }
    setConversations((prev) => prev.map((conv) => (conv.id === conversation.id ? updatedConversation : conv)))
  }

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    (conv) =>
      `${conv.user.name} ${conv.user.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Mail className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Mis Mensajes</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/comunidad"
              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Contactos</span>
            </Link>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto h-[calc(100vh-80px)] flex">
        {/* Sidebar - Red de Contactos */}
        <div
          className={`
          ${isSidebarOpen ? "block" : "hidden"} md:block
          w-full md:w-80 bg-white border-r border-gray-200 flex flex-col
        `}
        >
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar conversaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-emerald-50 border-emerald-200 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">Red de Contactos</h3>
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`
                      flex items-center p-3 rounded-lg cursor-pointer transition-colors
                      ${
                        selectedConversation?.id === conversation.id
                          ? "bg-emerald-100 border-l-4 border-emerald-500"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        {conversation.user.url_imagen_perfil ? (
                          <AvatarImage src={conversation.user.url_imagen_perfil || "/placeholder.svg"} />
                        ) : (
                          <AvatarFallback className="bg-emerald-500 text-white">
                            {getInitials(conversation.user)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {conversation.user.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.user.name} {conversation.user.surname}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatLastMessageTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conversation.user.titulo_profesional}</p>
                      <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                    </div>

                    {conversation.unreadCount > 0 && (
                      <div className="ml-2">
                        <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-emerald-500 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p>No hay conversaciones</p>
                  <Link to="/comunidad" className="text-emerald-600 hover:underline text-sm">
                    Buscar contactos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {chatPartner && selectedConversation ? (
            <>
              {/* Chat Header - Nombre de Usuario */}
              <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      {chatPartner.url_imagen_perfil ? (
                        <AvatarImage src={chatPartner.url_imagen_perfil || "/placeholder.svg"} />
                      ) : (
                        <AvatarFallback className="bg-emerald-500 text-white">
                          {getInitials(chatPartner)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {chatPartner.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">
                      {chatPartner.name} {chatPartner.surname}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {chatPartner.online ? "En línea" : chatPartner.titulo_profesional}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-100">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-100">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Link to={`/perfil/${idUsuario}`}>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-100">
                      <Info className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-emerald-25">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">Cargando mensajes...</p>
                  </div>
                ) : (
                  messages.map((message, idx) => {
                    const isCurrent = message.sender_id === currentUserId
                    const user = isCurrent ? currentUser : chatPartner
                    const showDate =
                      idx === 0 ||
                      new Date(messages[idx - 1].created_at).toDateString() !==
                        new Date(message.created_at).toDateString()

                    return (
                      <React.Fragment key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="px-4 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-medium">
                              {formatMessageDate(message.created_at)}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${isCurrent ? "justify-end" : "justify-start"}`}>
                          <div className={`flex ${isCurrent ? "flex-row-reverse" : "flex-row"} max-w-[70%]`}>
                            <Avatar className="h-8 w-8 mx-2">
                              {user?.url_imagen_perfil ? (
                                <AvatarImage src={user.url_imagen_perfil || "/placeholder.svg"} />
                              ) : (
                                <AvatarFallback className="bg-emerald-500 text-white text-xs">
                                  {getInitials(user)}
                                </AvatarFallback>
                              )}
                            </Avatar>

                            <div
                              className={`
                                px-4 py-2 rounded-lg shadow-sm
                                ${
                                  isCurrent
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-800 border border-gray-200"
                                }
                              `}
                            >
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              <div
                                className={`flex items-center justify-end space-x-1 mt-1 text-xs ${
                                  isCurrent ? "text-emerald-100" : "text-gray-400"
                                }`}
                              >
                                <span>{formatTime(message.created_at)}</span>
                                {isCurrent && <span>{getStatusIcon(message.status)}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                  <Button type="button" variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-100">
                    <Paperclip className="h-5 w-5" />
                  </Button>

                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="w-full border border-emerald-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-emerald-50"
                      rows={1}
                      style={{ minHeight: "44px", maxHeight: "120px" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 bottom-2 text-emerald-600 hover:bg-emerald-100"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className={`p-3 rounded-full ${
                      newMessage.trim() ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-gray-200 text-gray-400"
                    }`}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            /* No conversation selected */
            <div className="flex-1 flex items-center justify-center bg-emerald-25">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una conversación</h3>
                <p className="text-gray-500 mb-4">Elige un contacto de la lista para comenzar a chatear</p>
                <Link
                  to="/comunidad"
                  className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Buscar contactos
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
