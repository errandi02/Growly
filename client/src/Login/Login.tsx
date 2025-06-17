import { LoginForm } from "@/components/login-form";
import { JSX } from "react";
import fotoPaisaje from "../assets/AbreLlaveVerde.jpg"
import logo from "../assets/Logo_Growly_SinFondo.png";
import logotext from "../assets/Nombre_Growly.png"

export default function Login(): JSX.Element {
  return (
    
  <div className="grid min-h-svh lg:grid-cols-3 bg-green-200">
  <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-2">
    <div className="flex justify-center gap-2 md:justify-center mt-1">
      <a href="/" className="flex items-center gap-2 font-medium">
        <div className="flex items-center justify-center ">
          <img src={logo} alt="" className="w-20 h-20"/>
        </div>
        <img src={logotext} alt="" className="w40 h-14 "/>
      </a>
    </div>
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full w-xl">
        <LoginForm />
      </div>
    </div>
  </div>
  <div className="relative hidden bg-muted lg:block lg:col-span-1 bg-white">
    <img
      src={fotoPaisaje}
      alt="Image"
      className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
    />
  </div>
</div>

    
  );
}