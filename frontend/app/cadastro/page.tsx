"use client";
import { useState } from "react";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleRegister = async () => {
    const response = await fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone, location }),
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      const errorData = await response.json();
      alert(`Erro: ${errorData.error}`);
    }
  };

  

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px] mx-4 md:mx-auto my-auto relative z-10">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#357edd]">
          Bem vindo! Crie sua conta
        </h2>

        <h3 className="text-xl font-semibold text-center mb-6 text-[#585858]">
          Bem vindo a bordo coloque suas informações para criar sua conta
        </h3>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="senha"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="nome"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Insira seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="phone"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Insira seu telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="location"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#357edd] focus:border-[#357edd] text-sm"
            placeholder="Insira sua localização"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="w-full text-white py-2 px-4 rounded-md text-sm font-medium"
          style={{ backgroundColor: "#357edd" }}
          onClick={handleRegister}
        >
          Cadastrar
        </button>

        <button
          type="button"
          className="w-full text-white py-2 px-4 rounded-md text-sm font-medium mt-2"
          style={{ backgroundColor: "#357edd" }}
          onClick={() => window.location.href = '/login'}
        >
          Voltar ao login
        </button>
      </div>
    </div>
  );
}