"use client";
import { useState, useEffect } from "react";

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  interface Training {
    coachName: string;
    trainingName: string;
  }

  const [trainingData, setTrainingData] = useState<Training[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        // Filtra apenas os campos necessários (coachName e trainingName)
        const filteredData = data.map((item: { coachName: string; trainingName: string }) => ({
          coachName: item.coachName,
          trainingName: item.trainingName,
        }));
        setTrainingData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filtrar treinamentos pelo nome do coach ou do treinamento
  const filteredData = trainingData.filter((training) =>
    `${training.coachName} ${training.trainingName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Treinamentos</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome ou treinamento"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded-lg w-full"
      />

      <div className="w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-lg font-semibold">Nome do Coach</th>
              <th className="p-4 text-lg font-semibold">Treinamento</th>
              <th className="p-4 text-lg font-semibold text-right">Ações:</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((training, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{training.coachName}</td>
                  <td className="p-4">{training.trainingName}</td>
                  <td className="p-4 text-right">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => window.location.href = (`/home/treinamentos/${index+1}`)}
                    >
                      Ver mais
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center">
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
