import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  axios.defaults.withCredentials=true;
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

  
      // Enviar los datos al back-end
      const response = await axios.post('http://localhost:8080/user/login', formData);
      if (response.data.Result === "Success.") {
        // Redirect to home page
        navigate('/home')
      }else{
        setError('Error logging in. Please try again.');
        console.error('Login Error');
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <Card className="bg-green-100">
      <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 p-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Inicia Sesión</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
              type="email"
              id="email"
              placeholder="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              {/* <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                ¿Has olvidado tu contraseña?
              </a> */}
            </div>
            <Input
              className="border-black focus:border-white focus:ring-2 focus:ring-indigo-200"
              id="password"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
        {error && <div className="text-red-500">{error}</div>}
          </div>
          <Button type="submit" className="w-full cursor-pointer hover:bg-gray-700">
            Iniciar Sesión
          </Button>
          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 px-2 text-muted-foreground bg-green-100">Or continue with</span>
          </div>
          <Button variant="outline" className="w-full cursor-pointer hover:bg-gray-100">
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
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="underline underline-offset-4">
            Regístrate Aquí
          </a>
        </div>
      </form>
    </Card>
  )
}

