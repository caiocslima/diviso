import { useState } from "react";
import { PlusCircle, LogOut } from "lucide-react";
import ThemeToggle from "../atoms/themeToggle";

const Home = () => {
  const [balance, setBalance] = useState(2500.0);
  const [expenses, setExpenses] = useState(1500.0);
  const categories = [
    { name: "Alimentação", color: "bg-red-500", icon: "🍔" },
    { name: "Transporte", color: "bg-blue-500", icon: "🚌" },
    { name: "Entretenimento", color: "bg-green-500", icon: "🎬" },
    { name: "Saúde", color: "bg-purple-500", icon: "💊" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-2">
        <h1 className="text-xl font-bold">Diviso</h1>
        <div className="flex gap-3">
            <ThemeToggle />
            <button className="text-red-500">
                <LogOut size={24} />
            </button>
        </div>
      </header>

      {/* Resumo Financeiro */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold">Saldo Disponível</h2>
        <p className="text-3xl font-bold text-green-500">R$ {balance.toFixed(2)}</p>
        <h3 className="mt-4 text-lg font-semibold">Total de Gastos</h3>
        <p className="text-2xl font-bold text-red-500">R$ {expenses.toFixed(2)}</p>
      </div>

      {/* Categorias */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Categorias</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, index) => (
            <div key={index} className={`p-4 rounded-lg text-white flex items-center ${cat.color}`}>
              <span className="text-2xl">{cat.icon}</span>
              <span className="ml-2 font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Flutuante */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center">
        <PlusCircle size={32} />
      </button>
    </div>
  );
};

export default Home;