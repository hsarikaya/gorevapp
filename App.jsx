import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function App() {
  const [balance, setBalance] = useState(0);
  const [screenshot, setScreenshot] = useState(null);
  const [tasksDone, setTasksDone] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [adminMode, setAdminMode] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", link: "", reward: 1 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTasks([
      {
        id: 1,
        title: "Instagram gönderisini beğen",
        description: "Aşağıdaki gönderiyi beğen. Ekran görüntüsünü yükleyerek görevi tamamla.",
        link: "https://www.instagram.com/p/CODE123/",
        reward: 1,
      },
      {
        id: 2,
        title: "Yorum yap",
        description: "Gönderiye 'Harika ürün' yaz ve ekran görüntüsü yükle.",
        link: "https://www.instagram.com/p/CODE456/",
        reward: 1,
      },
    ]);
    setUsers([
      { username: "ahmet", tasksDone: 5, balance: 10 },
      { username: "zeynep", tasksDone: 3, balance: 6 },
    ]);
  }, []);

  const handleUpload = (taskId, e) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setScreenshot(url);
      setBalance((prev) => prev + tasks.find((t) => t.id === taskId).reward);
      setTasksDone((prev) => prev + 1);
      alert("Görev başarıyla tamamlandı ve bakiyenize eklendi.");
    }
  };

  const handleAddTask = () => {
    const id = tasks.length + 1;
    setTasks([...tasks, { ...newTask, id }]);
    setNewTask({ title: "", description: "", link: "", reward: 1 });
    alert("Yeni görev eklendi.");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🎯 Görev Yap & Para Kazan</h1>
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="tasks">📋 Görevler</TabsTrigger>
          <TabsTrigger value="profile">👤 Profil</TabsTrigger>
          <TabsTrigger value="admin">🛠️ Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          {tasks.map((task) => (
            <Card key={task.id} className="mt-4">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-1">📌 Görev: {task.title}</h2>
                <p className="text-sm mb-2">{task.description}</p>
                <a
                  href={task.link}
                  target="_blank"
                  className="text-blue-600 underline text-sm"
                >
                  Gönderiyi Aç
                </a>
                <div className="mt-2">
                  <Input type="file" accept="image/*" onChange={(e) => handleUpload(task.id, e)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="profile">
          <Card className="mt-4">
            <CardContent className="p-4 space-y-3">
              <p><strong>✅ Yapılan Görev:</strong> {tasksDone}</p>
              <p><strong>💰 Bakiyeniz:</strong> {balance} TL</p>
              <Button onClick={() => alert("Ödeme talebi sistem yöneticisine iletildi.")}>💸 Ödeme Talep Et</Button>
              <p className="text-xs text-gray-500">* Ödeme talepleri manuel onay gerektirir.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card className="mt-4">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-bold">🛠️ Görev Ekle</h2>
              <Input placeholder="Görev Başlığı" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
              <Input placeholder="Açıklama" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
              <Input placeholder="Instagram Linki" value={newTask.link} onChange={(e) => setNewTask({ ...newTask, link: e.target.value })} />
              <Input type="number" placeholder="Ödül (TL)" value={newTask.reward} onChange={(e) => setNewTask({ ...newTask, reward: parseInt(e.target.value) })} />
              <Button onClick={handleAddTask}>➕ Görev Ekle</Button>
              <h2 className="text-lg font-bold mt-6">👥 Kullanıcı Listesi</h2>
              <ul className="list-disc ml-5 text-sm">
                {users.map((user, i) => (
                  <li key={i}>{user.username} - Görev: {user.tasksDone}, Bakiye: {user.balance} TL</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}