"use client";
import { useState, useEffect } from "react";

export default function Coaching() {
  const [searchTerm, setSearchTerm] = useState("");
  interface Training {
    coachName: string;
    email: string;
    trainingName: string;
  }

  const [trainingData, setTrainingData] = useState<Training[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainingData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = trainingData.filter((training) =>
    training.coachName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
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