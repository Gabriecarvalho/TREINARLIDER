"use client";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export default function Coaching() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");

  interface Training {
    coachId: number;
    coachName: string;
    email: string;
    trainingName: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
  }

  const [trainingData, setTrainingData] = useState<Training[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: User = jwtDecode(token);
      setUserEmail(decodedToken.email);
    }

    fetch("http://localhost:3001/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainingData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = trainingData.filter((training) =>
    training.coachName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestCoaching = async (coachId: number) => {
    try {
      const response = await fetch('http://localhost:3001/api/email/request-coaching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coachId, userEmail }), // Usando o email do usuário logado
      });

      if (response.ok) {
        alert('Email enviado ao seu coach. Ele irá retornar com um email para você com os horários disponíveis dele.');
      } else {
        alert('Erro ao enviar email');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Erro ao enviar email');
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Coaching Individual</h1>
      <input
        type="text"
        placeholder="Pesquisar treinamentos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded-lg w-full"
      />
      <div className="w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-lg font-semibold">Nome:</th>
              <th className="p-4 text-lg font-semibold">Endereço de email:</th>
              <th className="p-4 text-lg font-semibold">Treinamento:</th>
              <th className="p-4 text-lg font-semibold text-right">Ações:</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((training, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{training.coachName}</td>
                  <td className="p-4">{training.email}</td>
                  <td className="p-4">{training.trainingName}</td>
                  <td className="p-4 text-right">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handleRequestCoaching(training.coachId)}
                    >
                      Pedir coaching individual
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  Nenhum treinamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}