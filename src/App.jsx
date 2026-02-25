

import { useState } from 'react'
import { useEffect } from 'react'

import './App.css'


function Header() {
  return (


    <header className="App-header">
      <span className="team-badge">Équipe</span>
      <span className="badge-count"></span>
      <span className="team-name">HR-Connect Elite</span>

    </header>

  )}

  function Footer() {
    return (
      <footer className="App-footer">
        <p> 2026 HR-Connect Elite — Gabriel Labrosse</p>
      </footer>
    )
  }





function App() {

  
  
  // State to store employees
  const [employees, setEmployees] = useState([])

  // Asynchronously fetch employees from an API
  const [loading, setLoading] = useState(true)

  // Load employees from localStorage
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('hr-team')
    return saved ? JSON.parse(saved) : []
  })

  //Fetch employees dans un useEffect
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])



  //fonction pour ajouter un employé
  function handleAddMember(employee) {
    const alreadyIn = team.find((m) => m.id === employee.id)
    if (!alreadyIn) {
      setTeam([...team, employee])
    }
  }
  //fonction pour supprimer un employé
  function handleRemoveMember(id) {
    setTeam(team.filter((m) => m.id !== id))
  }
  
  
  


  return (

    // Garder toute l'application dans le navigateur
   <BrowserRouter>
   
  
  
   </BrowserRouter>
  )
}

export default App
