import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Info, Users, ChevronLeft, User, Check, CheckCircle, Mail } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: Date;
}

interface Usuario {
  id: number;
  name: string;
  surname: string;
  url_imagen_perfil: string | null;
  titulo_profesional: string;
}

export default function Messages() {


  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const [userChatter, setUserChatter] = useState<Usuario>();
  const [userSender, setUserSender] = useState<Usuario>();
  const idUsuarioDuplicata = idUsuario;



  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };
  // Uso
  const token = getTokenFromCookies();
  let id;
  if (token) {
    try {
      // Decodificar el token y obtener el nombre de usuario
      const decodedToken = jwtDecode(token);
      id = decodedToken.id;

    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  }
  const idUserSender = id;
  // Agrupar mensajes por remitente
  const processMessages = (msgs: Message[]): Message[] =>
    msgs.map((msg, idx) => {
      const prev = msgs[idx - 1];
      const next = msgs[idx + 1];
      return {
        ...msg,
        isFirstInGroup: !prev || prev.sender_id !== msg.sender_id,
        isLastInGroup: !next || next.sender_id !== msg.sender_id,
      };
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${idUsuario}`).then(res => {
          if (res.status === 200) {
              setUserChatter(res.data);
          } else {
            throw new Error("No se pudo obtener el usuario");
          }
        })
        .catch(err => {
          console.error("Error al cargar datos de usuario:", err);
         // setError("No se pudieron cargar los datos del usuario.");
        });
        

    }, [idUsuario]); 
    useEffect(() => {
    axios.get(`http://localhost:8080/user/${idUserSender}`).then(res => {
          if (res.status === 200) {
              setUserSender(res.data);
              console.log(userSender);
          } else {
            throw new Error("No se pudo obtener el usuario");
          }
        })
        .catch(err => {
          console.error("Error al cargar datos de usuario:", err);
         // setError("No se pudieron cargar los datos del usuario.");
        });
      }, [idUserSender]); 
  // Fetch y polling de mensajes
  useEffect(() => {
    let mounted = true;
    const fetchMessages = async () => {
      try {
        const res = await axios.get<Message[]>(
          `http://localhost:8080/messages/${idUserSender}/${idUsuario}`
        );
        const fetched = res.data.map(m => ({
          id: m.id,
          sender_id: m.sender_id,
          content: m.content,
          created_at: new Date((m as any).created_at),
          status: (m as any).read_at ? 'read' : 'delivered',
          isFirstInGroup: false,
          isLastInGroup: false,
        }));
        if (!mounted) return;
        setMessages(processMessages(fetched));
        console.log(messages)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enviar nuevo mensaje
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content) return;
    setNewMessage('');
    try {
      const res = await axios.post(`http://localhost:8080/messages`, {
        sender_id: idUserSender,
        receiver_id: idUsuario,
        content,
      });
      const created = res.data;
      const newMsg: Message = {
        id: created.id,
        sender_id: idUserSender,
        receiver_id: idUsuarioDuplicata,
        content: created.content,
        created_at: new Date(created.created_at)
      };
      setMessages(prev => processMessages([...prev, newMsg]));
      //window.location.reload();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const getInitials = (user?: Usuario) => {
    if (!user) return "";
    return `${user.name.charAt(0)}${user.surname.charAt(0)}`;
  };
  

  

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === yesterday.toDateString()) return 'Ayer';
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto mt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            
            
              <Mail className="h-6 w-6 text-gray-600 mr-4" />
          
            <h1 className="text-2xl font-bold text-gray-800">Mensajes</h1>
          </div>
          <Link to="/comunidad" className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-600 font-medium hover:bg-gray-50 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Contactos</span>
          </Link>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {/* Chat Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {userChatter?.url_imagen_perfil ? (
                  <img src={userChatter.url_imagen_perfil} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {getInitials(userChatter)}
                  </div>
                )}
              </div>
              <div className=" text-black font-medium">
               {userChatter?.name+ " " + userChatter?.surname}
              </div>
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Link to={`/perfil/${idUsuario}`}>
              <Info className="h-5 w-5 text-gray-600" />
              </Link>
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Cargando mensajes...</p>
            ) : (
              messages.map((message, idx) => {
                const isCurrent = message.sender_id === idUserSender;
                const showDate =
                  idx === 0 || new Date(messages[idx - 1].created_at).toDateString() !== new Date(message.created_at).toDateString();
                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <div className="flex justify-center my-4">
                        <span className="px-4 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-medium">
                          {formatMessageDate(message.created_at)}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${isCurrent ? 'justify-end' : 'justify-start'}`}>                     
                      <div className={`flex ${isCurrent ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>                    
                        { !isCurrent && (
                          <div className="flex-shrink-0 h-8 w-8 mr-2">
                            {userChatter?.url_imagen_perfil ? (
                              <img src={userChatter.url_imagen_perfil} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">{getInitials(userChatter)}</div>
                              
                            )}
                          </div>
                        )}
                        <div className={[
                          'px-4 py-2 shadow-sm',
                        ].filter(Boolean).join(' ')}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1 text-xs">
                            <span>{formatTime(message.created_at)}</span>
      </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensaje */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700 mb-2">
                <User className="h-5 w-5" />
              </button>
              <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }}
              />
              <button
                type="submit"
                className={`p-3 rounded-full ${newMessage.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
