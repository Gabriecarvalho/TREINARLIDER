"use client";
import Link from "next/link";




export default function Cadastro() {


 

  const onClick = () => {
    window.location.href = '/';
  }

  const back = () => { 
    window.location.href = '/home/profile';
  }

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
     

      

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px] mx-4 md:mx-auto my-auto relative z-10">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#357edd]">
          Bem vindo! Crie sua conta
        </h2>

        <h3 className="text-xl font-semibold text-center mb-6 text-[#585858]">Bem vindo a bordo coloque suas informações para criar sua conta</h3>


          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
              placeholder="Insira seu e-mail"
              
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="senha"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
              placeholder="Insira sua senha"
              
            />
          </div>

          <div className="mb-4">
            <input
              type="name"
              id="nome"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
              placeholder="Insira seu nome"
              
            />
          </div>

          <div className="mb-4">
            <input
              type="phone"
              id="phone"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
              placeholder="Insira seu telefone"
              
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-md text-sm font-medium"
            style={{ backgroundColor: "#357edd" }}
            onClick={back}
          >
            Cadastrar
          </button>

          <button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-md text-sm font-medium mt-2"
            style={{ backgroundColor: "#357edd" }}
            onClick={onClick}
          >
            Voltar ao login
          </button>

      </div>
    </div>
  );
}
