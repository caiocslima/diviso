import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function AddExpenseModal({ onExpenseAdded }: { onExpenseAdded: () => void }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData = { description, amount: parseFloat(amount), category };

    try {
      const response = await fetch("http://localhost:4000/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar gasto");
      }

      onExpenseAdded();
      setOpen(false);
      setDescription("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Adicionar Gasto</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Descrição</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label>Valor</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Categoria</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
