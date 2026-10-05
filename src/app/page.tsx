"use client"

import Terminal from "./components/terminal"
import { useState } from "react"


export default function Home() {

  return(
    <main className="site-container">
      <div className="navbar">
          <p>Home</p>
          <p>Bio</p>
          <p>Projects</p>
          <p>Skills</p>
      </div>
      <div className="name">
        <h1>Adam Ornoch</h1>
      </div>
      <div className="role">
        <h2>Full-Stack Developer</h2>
      </div>
      <div className="front-page-description">
        <p>This is going to be a short 2 line description that says something</p>
      </div>
      <div className="contact-container">
        <a href="#" className="contact-link">LinkedIn</a>
        <span className="contact-divider">/</span>
        <a href="#" className="contact-link">GitHub</a>
      </div>
    </main>
  )
}