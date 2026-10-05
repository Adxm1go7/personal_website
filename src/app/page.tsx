"use client"

import Terminal from "./components/terminal"
import { useState } from "react"


export default function Home() {

  return(
    <main className="site-container">
      <header className="site-header">
        <nav className="navbar" aria-label="Main">
          <a href="#" className="nav-link active" aria-current="page">Home</a>
          <a href="#" className="nav-link">Bio</a>
          <a href="#" className="nav-link">Projects</a>
          <a href="#" className="nav-link">Skills</a>
        </nav>
      </header>

      <section className="hero">
        <h1 className="name">Adam Ornoch</h1>
        <h2 className="role">Full-Stack Developer</h2>
        <p className="front-page-description">
          This is going to be a short 2 line description that says something
        </p>
      </section>

      <footer className="contact-container">
        <a href="#" className="contact-link">LinkedIn</a>
        <span className="contact-divider">/</span>
        <a href="#" className="contact-link">GitHub</a>
      </footer>
    </main>
  )
}