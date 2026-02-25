import React from 'react'
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    
     <div className="page notfound-page">
      <div className="notfound-content">
        <div className="notfound-code">404</div>
        <h2 className="notfound-title">Page Introuvable</h2>
        <p className="notfound-text">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="notfound-btn">
           Retour à l'Accueil
        </Link>
      </div>
    </div>
  )
}
