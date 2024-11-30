"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Page() {
  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        const decodedToken: User = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : null
    );
  };

  const handleSaveClick = async () => {
    if (!formData) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUser(formData);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-12">Perfil pessoal</h1>

      <div className={`w-full lg:w-1/2 bg-white rounded-lg p-6 flex flex-col shadow-lg border border-gray-300 ${isEditing ? "border-blue-500" : ""}`}>
        <div className="flex flex-col items-center mt-8 lg:mt-16">
          <div className="w-32 h-32 lg:w-56 lg:h-56 bg-gray-300 rounded-full mb-4 lg:mb-6"></div>
          <h2 className={`font-bold text-xl ${isEditing ? "text-blue-500" : ""}`}>
            {user.name}
          </h2>
        </div>

        {isEditing && (
          <p className="text-blue-500 font-semibold mb-4">
            Você está editando o perfil. Faça suas alterações e clique em Salvar.
          </p>
        )}

        <div className="text-left space-y-4 mt-4 pl-4 lg:pl-8">
          <p className="text-lg">
            <strong>ID:</strong> {user.id}
          </p>
          <p className="text-lg">
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                className="p-2 border border-blue-300 rounded w-full"
              />
            ) : (
              user.email
            )}
          </p>
          <p className="text-lg">
            <strong>Número:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                className="p-2 border border-blue-300 rounded w-full"
              />
            ) : (
              user.phone
            )}
          </p>
          <p className="text-lg">
            <strong>Local:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData?.location}
                onChange={handleInputChange}
                className="p-2 border border-blue-300 rounded w-full"
              />
            ) : (
              user.location
            )}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Salvar
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Personalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
