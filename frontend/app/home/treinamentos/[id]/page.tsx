"use client";

import { useEffect, useState } from "react";

interface Training {
  coachName: string;
  trainingName: string;
  videoLink: string;
  description: string;
}

export default function TrainingDetailsPage({ params }: { params: { id: string } }) {
  const [training, setTraining] = useState<Training | null>(null);
  const { id } = params;//pega o id do treinamento para requisiçao

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/trainings/${id}`)
        .then((response) => response.json())
        .then((data) => setTraining(data))
        .catch((error) => console.error("Error fetching training details:", error));
    }
  }, [id]);

  // Função para converter o link do vídeo para o formato embed
  const getEmbedLink = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extrai o ID do vídeo
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!training) {
    return <div>Loading...</div>;
  }

  const embedLink = getEmbedLink(training.videoLink);

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">{training.trainingName}</h1>
      <h2 className="text-2xl mb-4">Coach: {training.coachName}</h2>
      <div className="mb-6">
        {embedLink ? (
          <iframe
            width="560"
            height="315"
            src={embedLink}
            title={training.trainingName}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Invalid video link</p>
        )}
      </div>
      <p className="text-lg">{training.description}</p>
    </div>
  );
}
