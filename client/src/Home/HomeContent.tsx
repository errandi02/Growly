"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookmarkPlus,
  Share2,
  Globe,
  ImageIcon,
  MapPin,
  Users,
  Calendar,
  Hash,
  TrendingUp,
  Plus,
  Heart,
  MessageCircle,
  Repeat2,
  Book,
} from "lucide-react"

// Interfaces
interface DecodedToken {
  id: number
  name: string
  surname: string
  profesion: string
  role_id: number
}

interface Post {
  id: number
  autor: number
  contenido: string
  fecha_publicacion: Date
  imagen: string
  likes: string
  comentarios: string
  compartidos: string
  etiquetas: string
  url: string
  visibilidad: string
  hashtags: string
  localizacion: string
  archivo_adjunto: string
  estado: string
}

interface User {
  id: number
  name: string
  surname: string
  titulo_profesional: string
  ciudad: string
  pais: string
  url_imagen_perfil?: string
  acerca_de: string
  email: string
  telefono: string
  sitio_web: string
  birth_date: string
}

interface AuthorInfo {
  name: string
  surname: string
  profesion: string
  url_imagen_perfil?: string
}

// Utility functions
const getTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split("; ")
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=")
    if (name === "token") return value
  }
  return null
}

const decodeUserToken = (): DecodedToken | null => {
  const token = getTokenFromCookies()
  if (!token) return null

  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error("Error al decodificar el token:", error)
    return null
  }
}

const formatDateTime = (dateStr: string | number | Date): string => {
  const date = new Date(dateStr)
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

const getInitials = (name: string, surname: string): string => {
  return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
}

// Create Post Component
function CreatePostCard({ userId, onPostCreated }: { userId: number; onPostCreated: () => void }) {
  const [formData, setFormData] = useState({
    autor: userId,
    contenido: "",
    imagen: null,
    likes: null,
    comentarios: null,
    compartidos: null,
    etiquetas: null,
    url: null,
    visibilidad: "Público",
    hashtags: null,
    localizacion: "Málaga",
    archivo_adjunto: null,
    estado: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.contenido.trim()) return

    setIsSubmitting(true)
    setError("")

    try {
      await axios.post("http://localhost:8080/post", formData)
      setFormData((prev) => ({ ...prev, contenido: "" }))
      onPostCreated()
    } catch (error) {
      setError("Error al publicar. Inténtalo de nuevo.")
      console.error("Error al crear post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrivacyChange = (option: string) => {
    setFormData((prev) => ({ ...prev, visibilidad: option }))
  }

  return (
    <Card className="mb-6 border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-green-100 text-green-600">TU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea
              value={formData.contenido}
              onChange={(e) => setFormData((prev) => ({ ...prev, contenido: e.target.value }))}
              placeholder="¿Qué novedades tienes sobre tu proyecto?"
              className="w-full min-h-[80px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100 cursor-pointer">
                  <Globe className="h-4 w-4 mr-2" />
                  {formData.visibilidad}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer" onClick={() => handlePrivacyChange("Público")}>
                  <Globe className="h-4 w-4 mr-2"  />
                  Público
                </DropdownMenuItem>
                {/*  
                <DropdownMenuItem onClick={() => handlePrivacyChange("Amigos")}>
                  <Users className="h-4 w-4 mr-2" />
                  Solo amigos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrivacyChange("Privado")}>
                  <Users className="h-4 w-4 mr-2" />
                  Privado
                </DropdownMenuItem>*/}
              </DropdownMenuContent>
            </DropdownMenu>
          {/*  
            <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100">
              <ImageIcon className="h-4 w-4 mr-2" />
              Multimedia
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100">
              <MapPin className="h-4 w-4 mr-2" />
              Ubicación
            </Button>*/}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!formData.contenido.trim() || isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-6 cursor-pointer"
          >
            {isSubmitting ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Profile Card Component
function ProfileCard({ user }: { user: User | null }) {
  if (!user) return null

  return (
    <Card className="mb-6 border-slate-200 shadow-sm">
      <div className="h-16 bg-gradient-to-b from-[#1B4332] to-[#2D6A4F] rounded-t-lg"></div>
      <CardContent className="p-6 -mt-8">
        <div className="flex flex-col items-center text-center">
          <Link to={`/perfil/${user.id}`} className="w-full">
            <Avatar className="h-16 w-16 border-4 border-white mx-auto mb-3">
              <AvatarImage src={user.url_imagen_perfil || "/placeholder.svg?height=64&width=64"} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(user.name, user.surname)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-slate-900 mb-1">
              {user.name} {user.surname}
            </h3>
            <p className="text-sm text-slate-600 mb-2">{user.titulo_profesional}</p>
            <p className="text-xs text-slate-500">
              {user.ciudad && user.pais ? `${user.ciudad}, ${user.pais}` : ""}
            </p>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// Post Component
function PostCard({ post, author }: { post: Post; author: AuthorInfo | undefined }) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(Number.parseInt(post.likes) || 0)

  const handleLike = () => {
    setLiked(!liked)
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <Card className="mb-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author?.url_imagen_perfil || "/placeholder.svg?height=48&width=48"} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {author ? getInitials(author.name, author.surname) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <Link
                  to={`/perfil/${post.autor}`}
                  className="font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                >
                  {author ? `${author.name} ${author.surname}` : "Cargando..."}
                </Link>
                <p className="text-sm text-slate-600">{author?.profesion}</p>
                <p className="text-xs text-slate-500 mt-1">{formatDateTime(post.fecha_publicacion)}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                <Book className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator/>
      <CardContent className="px-6 pb-4">
        <p className="text-slate-800 mb-4 leading-relaxed">{post.contenido}</p>

        {post.imagen && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={post.imagen || "/placeholder.svg"}
              alt="Contenido del post"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Trending Topics Component
function TrendingTopics() {
  const topics = [
    { name: "Desarrollo Web", posts: "1.2k posts" },
    { name: "Gestión de Proyectos", posts: "856 posts" },
    { name: "React", posts: "2.1k posts" },
    { name: "DevOps", posts: "743 posts" },
    { name: "UX/UI Design", posts: "1.8k posts" },
  ]

  return (
    <div className=""></div>
    // <Card className="border-slate-200 shadow-sm">
    //   <CardHeader className="p-6 pb-4">
    //     <div className="flex items-center gap-2">
    //       <TrendingUp className="h-5 w-5 text-blue-600" />
    //       <h3 className="font-semibold text-slate-900">Tendencias para ti</h3>
    //     </div>
    //   </CardHeader>
    //   <CardContent className="p-6 pt-0">
    //     <div className="space-y-3">
    //       {topics.map((topic, index) => (
    //         <div key={index} className="group cursor-pointer">
    //           <Link
    //             to={`/topic/${topic.name.replace(/\s+/g, "")}`}
    //             className="block hover:bg-slate-50 p-2 rounded-lg -m-2 transition-colors"
    //           >
    //             <div className="flex items-center gap-2 mb-1">
    //               <Hash className="h-3 w-3 text-slate-400" />
    //               <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600">{topic.name}</span>
    //             </div>
    //             <p className="text-xs text-slate-500 ml-5">{topic.posts}</p>
    //           </Link>
    //         </div>
    //       ))}
    //     </div>
    //     <Separator className="my-4" />
    //     <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
    //       Ver más tendencias
    //     </Button>
    //   </CardContent>
    // </Card>
  )
}

// Quick Actions Component
function QuickActions() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-3">
          <Link to="/comunidad" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Users className="h-4 w-4 text-slate-600" />
            <span className="text-sm text-slate-700">Amistades</span>
          </Link>
          <Link to="/marketplace" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Calendar className="h-4 w-4 text-slate-600" />
            <span className="text-sm text-slate-700">Mercado</span>
          </Link>
          {/* <Link to="/hashtags" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Hash className="h-4 w-4 text-slate-600" />
            <span className="text-sm text-slate-700">Hashtags seguidos</span>
          </Link> */}
        </div>
        <Separator className="my-4" />
        <Link to={"/chatbot"}>
        <Button variant="outline" className="w-full cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Descubrir más
        </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

// Main Home Component
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [authorMap, setAuthorMap] = useState<Record<number, AuthorInfo>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const userToken = decodeUserToken()
  const userId = userToken?.id

  // Load user data
  useEffect(() => {
    if (!userId) return

    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data)
        }
      })
      .catch((err) => {
        console.error("Error al cargar datos de usuario:", err)
        setError("Error al cargar datos del usuario")
      })
  }, [userId])

  // Load posts from followed users
  useEffect(() => {
    if (!userId) return

    const loadPosts = async () => {
      try {
        // Get followed users

        let followedIds: number[] = []
        try {
          const followingRes = await axios.get<{ following: number }[]>(`http://localhost:8080/following/${userId}`)
          followedIds = followingRes.data.map(f => f.following)
        } catch (err: any) {
          if (err.response?.status === 404) {
            // no estás siguiendo a nadie, seguimos con un array vacío
            followedIds = []
          } else {
            // si es otro error (p.ej. 500 o de red), lo re-lanzo al catch externo
            throw err
          }
        }
  
        const allUserIds = [...followedIds, userId]
        console.log("All user ids: "+followedIds)
        // Get posts from all users
        const postPromises = allUserIds.map((id) =>
          axios
            .get<Post[]>(`http://localhost:8080/myPosts?id=${id}`)
            .then((res) => res.data)
            .catch((err) => {
              if (err.response?.status === 404) return []
              throw err
            }),
        )

        const postsArrays = await Promise.all(postPromises)
        const allPosts = postsArrays.flat()

        // Sort by date
        allPosts.sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())

        setPosts(allPosts)

        // Load author information
        const authorIds = Array.from(new Set(allPosts.map((p) => p.autor)))
        const authorPromises = authorIds.map((id) => axios.get(`http://localhost:8080/user/${id}`))

        const authorResponses = await Promise.all(authorPromises)
        const newAuthorMap: Record<number, AuthorInfo> = {}

        authorResponses.forEach((res) => {
          const userData = res.data
          newAuthorMap[userData.id] = {
            name: userData.name,
            surname: userData.surname,
            profesion: userData.titulo_profesional,
            url_imagen_perfil: userData.url_imagen_perfil,
          }
        })

        setAuthorMap(newAuthorMap)
      } catch (err) {
        console.error("Error al cargar posts:", err)
        //setError("Error al cargar las publicaciones")
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [userId])

  const handlePostCreated = () => {
    // Reload posts when a new post is created
    window.location.reload()
  }

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <p className="text-slate-600">Debes iniciar sesión para ver el feed</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
            <QuickActions />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <CreatePostCard userId={userId} onPostCreated={handlePostCreated} />

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border-slate-200">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-32"></div>
                            <div className="h-3 bg-slate-200 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded"></div>
                          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <p className="text-red-600">{error}</p>
                </CardContent>
              </Card>
            ) : posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} author={authorMap[post.autor]} />)
            ) : (
              <Card className="border-slate-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">¡Bienvenido a tu feed!</h3>
                    <p className="text-slate-600">
                      Aún no hay publicaciones en tu círculo. Sigue a otros usuarios para ver sus actualizaciones aquí.
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/comunidad">
                      <Users className="h-4 w-4 mr-2" />
                      Descubrir personas
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <TrendingTopics />
          </div>
        </div>
      </div>
    </div>
  )
}
