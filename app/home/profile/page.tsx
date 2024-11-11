"use client";
export default function Page() {
  return (
    <div className="p-4 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-12">Perfil pessoal</h1>
      
      <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 flex flex-col shadow-lg border border-gray-300">
        <div className="flex flex-col items-center mt-8 lg:mt-16">
          <div className="w-32 h-32 lg:w-56 lg:h-56 bg-gray-300 rounded-full mb-4 lg:mb-6"></div>
          <h2 className="font-bold text-xl">Nome exemplo</h2>
        </div>

        <div className="text-left space-y-4 mt-4 pl-4 lg:pl-8">
          <p className="text-lg">
            <strong>ID:</strong> ID exemplo
          </p>
          <p className="text-lg">
            <strong>Email:</strong> emailexemplo@exemplo.com
          </p>
          <p className="text-lg">
            <strong>Número:</strong> Numero exemplo
          </p>
          <p className="text-lg">
            <strong>Coaching Individual:</strong> Coaching exemplo
          </p>
          <p className="text-lg">
            <strong>Local:</strong> São josé dos campos
          </p>
          <p className="text-lg">
            <strong>Capacitaçoes:</strong> Aqui ficaria aulas que o usuario fez
          </p>
        </div>
      </div>
    </div>
  );
}
