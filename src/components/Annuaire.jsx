import React from 'react'
import { useState, useEffect } from "react";

function CarteEmployee({ employee, isInTeam, onAdd }) {
  return (
    <div className="employee-card">
      <div className="card-avatar">
        {employee.name.charAt(0).toUpperCase()}
      </div>
      <div className="card-info">
        <h3 className="card-name">{employee.name}</h3>
        <p className="card-email">Email :  {employee.email}</p>
        <p className="card-company">Company : {employee.company?.name}</p>
        <p className="card-city"> Location : {employee.address?.city}</p>
        <p className="card-phone"># : {employee.phone}</p>
      </div>
      <button
        className={`card-btn ${isInTeam ? "card-btn-added" : ""}`}
        onClick={() => onAdd(employee)}
        disabled={isInTeam}
      >
        {isInTeam ? "^ Ajouté" : "+ Recruter"}
      </button>
    </div>
  );
}


export default function Annuaire( {employees, loading, team, onAddMember}) {

const companies = [...new Set(employees.map((e) => e.company?.name))].sort();



//Variables utilisées pour filtrer les données
const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortAZ, setSortAZ] = useState(false);
  const [sortZA, setSortZA] = useState(false);
//Filtre par nom et entreprise en utilisant .filter
  let filtered = employees.filter((e) => {
    const matchName = e.name.toLowerCase().includes(search.toLowerCase());
    const matchCompany = companyFilter === "" || e.company?.name === companyFilter;
    return matchName && matchCompany;
  });
//Filtre par nom dans l'ordre alphabétique avec .Sort
  if (sortAZ) {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }
  


  return (
    <div>
      <div className="page annuaire">
        <div className="annuaire-sub">
          <h1 className="annuaire-title">Annuaire des Talents</h1>
          <p className="annuaire-subtitle">{employees.length} professionnels disponibles</p>
        </div>

        <div className="filters-bar">
          <input
            className="filter-input"
            type="text"
            placeholder=" Rechercher par nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-select"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="">Toutes les entreprises</option>
            {companies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            className={`filter-sort-btn ${sortAZ ? "active" : ""}`}
            onClick={() => setSortAZ(!sortAZ)}
          >
            {sortAZ ? "↑ A→Z activé" : "Trier A→Z"}
          </button>
          <button
            className={`filter-sort-btn ${sortZA ? "active" : ""}`}
            onClick={() => setSortZA(!sortZA)}
          >
            {sortZA ? "↓ Z→A activé" : "Trier Z→A"}
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des talents...</p>
          </div>
        ) : (
          <>
            <p className="results-count">{filtered.length} résultat(s)</p>
            <div className="cards-grid">
              {filtered.map((employee) => (
                <CarteEmployee
                  key={employee.id}
                  employee={employee}
                  isInTeam={team.some((m) => m.id === employee.id)}
                  onAdd={onAddMember}
                 />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <span></span>
                <p>Aucun talent trouvé avec ces critères.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

   
