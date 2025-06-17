import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import axios from 'axios'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Switch } from "./ui/switch"
export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [esEmprendedor, setEsEmprendedor] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      birth_date: '',
      password: '',
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');
/* 
      // Validación simple para asegurarse de que las contraseñas coincidan
      if (formData.password !== formData.repeatPassword) {
        setError('Las contraseñas no coinciden.');
        setLoading(false);
        return;
      }
 */ 
      try {
        //console.log(formData);
        const payload = {
          ...formData,
          role_id: esEmprendedor ? 3 : 2,
          titulo_profesional: esEmprendedor ? 'Emprendedor' : 'Inversor'
        };
        console.log(payload);
        // Enviar los datos al back-end
        const response = await axios.post('http://localhost:8080/user/register', payload);
        if (response.status === 200) {
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
          Navigate('/login')
          
        }
      } catch (err) {
        setError('Hubo un error al registrarse. Por favor, inténtalo de nuevo.');
        //console.error('Error al registrar:', err);
      } finally {
        setLoading(false);
      }
    };


  return (
    <Card className="bg-green-100">
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 p-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold">Regístrate en nuestra plataforma</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="surname">Apellidos</Label>
          <Input
            className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
            type="text"
            id="surname"
            name="surname"
            placeholder="Apellidos"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo</Label>
          <Input
            className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
            type="email"
            id="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
          <Input
            className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
            type="date"
            id="birth_date"
            name="birth_date"
            placeholder="Birth Date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input
            className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="repeatPassword">Repite Contraseña</Label>
          </div>
          <Input
            className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="Repetir Contraseña"
            ///value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center space-x-2 ">
          <Switch
            id="tipo_usuario"
            checked={esEmprendedor}
            onCheckedChange={setEsEmprendedor}
            className="cursor-pointer"
          />
          <Label htmlFor="tipo_usuario" className="cursor-pointer">
            {esEmprendedor ? "Soy Emprendedor" : "Soy Inversor"}
          </Label>
        </div>
        {error && <div className="text-red-500">{error}</div>}

        <Button
  type="submit"
  className={`w-full ${loading ? '' : 'cursor-pointer hover:bg-gray-700'}`}
  disabled={loading}
>
  {loading ? 'Registerando...' : 'Registro'}
</Button>


        {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 px-2 text-muted-foreground bg-green-100">Or register with</span>
        </div>

        <Button variant="outline" className="w-full hover:border-gray-500 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button> */}
      </div>
      <div className="text-center text-sm">
        ¿Tienes ya una cuenta?{" "}
        <a href="/login" className="underline underline-offset-4">
          Inicia Sesión
        </a>
      </div>
    </form>
  </Card>
  )
}

