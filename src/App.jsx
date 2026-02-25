
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


function Header() {
  return (    
    <header className="header">
      
        <div className="header-brand">
        <span className="header-title">HR-Connect Elite</span>
      </div>

      <nav className="header-nav">
        <span> Acceuil </span>
        <span> Annuaire </span>
        <span> Mon Équipe </span>
      </nav>

      <div className="header-badge">
        <span className="badge-label">Équipe</span>
        <span className="badge-count"> 0 </span>
      </div>
    </header>
  )}

  function Footer() {
    return (
      <footer className="App-footer">
        <p> 2026 HR-Connect Elite — Gabriel Labrosse</p>
      </footer>
    )
  }

  // Ici on affiche le composant AppLayout
  function AppLayout() {
    return (
      <div className="app-layout">
        <Header />
        <main className="main-content">
          
        </main>
        <Footer />
      </div>
    );
  }




export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("hr-team");
    return saved ? JSON.parse(saved) : [];
  });


  // Ici on récupère les données de l'API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Ici on stocke les données dans le localStorage
  useEffect(() => {
    localStorage.setItem("hr-team", JSON.stringify(team));
  }, [team]);
 


  //Fonction pour ajouter ou supprimer un membre de l'équipe
  function handleAddMember(employee) {
    const alreadyIn = team.find((m) => m.id === employee.id);
    if (!alreadyIn) {
      setTeam([...team, employee]);
    }
  }

  function handleRemoveMember(id) {
    setTeam(team.filter((m) => m.id !== id));
  }

  return (
    <BrowserRouter>
      <AppLayout/>
    </BrowserRouter>
  );
}