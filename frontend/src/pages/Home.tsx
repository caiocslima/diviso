import { useState, useEffect } from "react";
import { AddExpenseModal } from "../modals/AddExpenseModal";

const Home = () => {
  const [balance, setBalance] = useState(2500.0);
  const [expenses, setExpenses] = useState([]);
  const categories = [
    { name: "Alimentação", color: "bg-red-500", icon: "🍔" },
    { name: "Transporte", color: "bg-blue-500", icon: "🚌" },
    { name: "Entretenimento", color: "bg-green-500", icon: "🎬" },
    { name: "Saúde", color: "bg-purple-500", icon: "💊" },
  ];

  useEffect(() => {
    fetch("http://localhost:4000/expense/1edef73e-e4f8-43d1-b526-27f2ada8ad4b")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  const refreshExpenses = () => {
    fetch("http://localhost:4000/expense/1edef73e-e4f8-43d1-b526-27f2ada8ad4b")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Gastos</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={(expense as any)?.id} className="border-b py-2">
            {(expense as any)?.name} - R$ {(expense as any)?.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <AddExpenseModal onExpenseAdded={refreshExpenses} />
    </div>
  );
};

export default Home;