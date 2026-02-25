import React from 'react'
import { useState, useEffect } from "react";


export default function Home( {employees, loading, team}) {


  // Utilisation de spread operator pour créer un tableau unique
  const companies = [...new Set(employees.map((e) => e.company?.name))];
  const cities = [...new Set(employees.map((e) => e.address?.city))];
  

  

  return (
    <div>
      <div className="page home-page">
        <div className="page-hero">
          <h1 className="hero-title">Tableau de Bord</h1>
          <p className="hero-subtitle">Bienvenue sur la plateforme de recrutement interne</p>
        </div>


 
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des données...</p>
          </div>
        ) : (
          <><div className="stats-grid">
              <div className="stat-card stat-primary">

                <div className="stat-value">{employees.length}</div>
                <div className="stat-label">Talents Disponibles</div>
              </div>
              <div className="stat-card stat-success">

                <div className="stat-value">{companies.length}</div>
                <div className="stat-label">Entreprises</div>
              </div>
              <div className="stat-card stat-info">

                <div className="stat-value">{cities.length}</div>
                <div className="stat-label">Villes</div>
              </div>
              <div className="stat-card stat-accent">

                <div className="stat-value">{team.length}</div>
                <div className="stat-label">Dans Mon Équipe</div>
              </div>
            </div><div className="home-section">
                <h2 className="section-title">Aperçu des Entreprises</h2>
                <div className="companies-list">
                  {companies.map((company, i) => (
                    <span key={i} className="company-tag">
                      {company}
                    </span>
                  ))}
                </div>
              </div></>

          


        )}
        </div>
      
      
    </div>
  )
}
