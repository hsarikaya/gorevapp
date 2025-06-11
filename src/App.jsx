import { useState, useEffect } from "react";
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
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>🎯 Görev Yap & Para Kazan</h1>
      {tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: 20 }}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <a href={task.link} target="_blank">Gönderiyi Aç</a><br />
          <input type="file" accept="image/*" onChange={(e) => handleUpload(task.id, e)} />
        </div>
      ))}
      <hr />
      <h3>Profil</h3>
      <p>✅ Yapılan Görev: {tasksDone}</p>
      <p>💰 Bakiye: {balance} TL</p>
      <button onClick={() => alert("Ödeme talebi iletildi.")}>💸 Ödeme Talep Et</button>
    </div>
  );
}