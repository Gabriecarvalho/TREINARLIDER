"use client";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export default function Page() {
  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        return;
      }

      try {
        const decodedToken: User = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-3">Perfil pessoal</h1>
      
      <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 flex flex-col shadow-lg border border-gray-300">
        <div className="flex flex-col items-center mt-8 lg:mt-16">
          <div className="w-32 h-32 lg:w-56 lg:h-56 bg-gray-300 rounded-full mb-4 lg:mb-6"></div>
          <h2 className="font-bold text-xl">{user.name}</h2>
        </div>

        <div className="text-left space-y-4 mt-4 pl-4 lg:pl-8">
          <p className="text-lg">
            <strong>ID:</strong> {user.id}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Número:</strong> {user.phone}
          </p>
          <p className="text-lg">
            <strong>Coaching Individual:</strong> Coaching exemplo
          </p>
          <p className="text-lg">
            <strong>Local:</strong> {user.location}
          </p>
          <p className="text-lg">
            <strong>Capacitações:</strong> Aqui ficaria aulas que o usuário fez
          </p>
        </div>
      </div>
    </div>
  );
}