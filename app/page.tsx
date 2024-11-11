"use client";
import Link from "next/link";



export default function Login() {





  const handleLogin = async () => {

    window.location.href = '/home/profile';

  };

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">




      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px] mx-4 md:mx-auto my-auto relative z-10">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#357edd]">
          Bem vindo! Acesse sua conta
        </h2>


        <div className="mb-4">
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Digite seu e-mail"

          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="senha"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Digite sua senha"

          />
        </div>

        <button
          type="submit"
          className="w-full text-white py-2 px-4 rounded-md text-sm font-medium"
          style={{ backgroundColor: "#357edd" }}
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link href="/cadastro" className="nav-link text-white">
            <span className="text-center text-[#357edd]">Não tem uma conta? Cadastre-se</span>


          </Link>
        </div>

      </div>
    </div>
  );
}
