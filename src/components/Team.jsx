import React from 'react'
import { useState, useEffect } from "react";




export default function Team( {team, onRemoveMember}) {

  

  return (
    <div>
      <div className="team-page">
        <div className="team-sub">
          <h1 className="team-title">Mon Équipe</h1>
          <p className="team-subtitle">Voici la liste des talents que vous avez recrutés</p>
        </div>
        <div className="team-grid">
          {team.map((employee) => (
            <div className="team-card" key={employee.id}>
              <div className="card-profile">
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
                className="card-btn"
                onClick={() => onRemoveMember(employee.id)}
              >
               
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
