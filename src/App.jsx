
import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import './App.css'
import Home from './components/Home.jsx'
import Annuaire from './components/Annuaire.jsx'
import Team from './components/Team.jsx'
import Notfound from './components/Notfound.jsx'


function Header({ team }) {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/annuaire", label: "Annuaire" },
    { path: "/mon-equipe", label: "Mon Équipe" },
  ];
  return (    
    <header className="header">
      
        <div className="header-brand">
        <span className="header-title">HR-Connect Elite</span>
      </div>

      <nav className="header-nav">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? "active" : ""}`}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-badge">
        <span className="badge-label">Équipe</span>
        <span className="badge-count"> {team.length} </span>
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
  function AppLayout({ employees, loading, team, onAddMember, onRemoveMember }) {
    return (<div className="app-layout">
          <Header team={team} />
          <main className="main-content">
          <Routes>

            <Route path="/" element={<Home employees={employees} loading={loading} team={team} />} />
            <Route
              path="/annuaire"
              element={<Annuaire employees={employees} loading={loading} team={team} onAddMember={onAddMember} />} />
            <Route
              path="/mon-equipe"
              element={<div> mon equipe </div>} />

            <Route path="*" element={<div>Not Found</div>} />
              
          </Routes>
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
      <AppLayout employees={employees} loading={loading} team={team} onAddMember={handleAddMember} onRemoveMember={handleRemoveMember} />
    </BrowserRouter>
  );
}