import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
          Bem-vindo ao Gerenciador de Projetos
        </h1>
        <p className="text-xl mb-8 animate-fade-in-up">
          Organize, colabore e alcance seus objetivos com nossa plataforma
          intuitiva de gerenciamento de projetos.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/auth/login">
            <Button className="bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-300 text-lg py-2 px-6 rounded-full shadow-lg">
              Entrar
            </Button>
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm opacity-75">
        © 2024 Gerenciador de Projetos. Todos os direitos reservados.
      </footer>
    </div>
  );
}
