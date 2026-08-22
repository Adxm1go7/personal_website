"use client"

import Terminal from "./components/terminal"
import { useState } from "react"

const terminal_data = {
  bio: {
    heading:"Bio",
    info:[
      {
        subheading: "sh1",
        data: "data1"
      },
      {
        subheading: "sh2",
        data: "data2"
      }
    ]
  },
  projects: {
    heading:"Projects",
    info:[
      {
        subheading: "Personal Website",
        data: "Currently under development"
      },
      {
        subheading: "sh2",
        data: "data234"
      }
    ]
  },
  current_work: {
    heading:"Currenly Working on",
    info:[
      {
        subheading: "This website",
        data: "Improving my frontend skills"
      },
      {
        subheading: "sh2",
        data: "data234"
      }
    ]
  }
}

export default function Home() {
  const [terminal_section, set_terminal_section] = useState<"bio" | "projects" | "current_work">("projects");

  return(
    <main>
      <div className="site-container">
        <div className="contact-container">
          <a href="#" className="contact-link">LinkedIn</a>
          <span className="contact-divider">/</span>
          <a href="#" className="contact-link">GitHub</a>
        </div>
        <div className="name">
          <h1>Adam Ornoch</h1>
        </div>
        <div className="content-row">
          <nav className="command-nav">
            <button
              className={`command-btn ${terminal_section === "bio" ? "active" : ""}`}
              onClick={() => set_terminal_section("bio")}
            >
              Bio
            </button>
            <button
              className={`command-btn ${terminal_section === "projects" ? "active" : ""}`}
              onClick={() => set_terminal_section("projects")}
            >
              Projects
            </button>
            <button
              className={`command-btn ${terminal_section === "current_work" ? "active" : ""}`}
              onClick={() => set_terminal_section("current_work")}
            >
              Current Work
            </button>
          </nav>

          <div className="terminal-container">
            <Terminal
              heading={terminal_data[terminal_section].heading}
              info={terminal_data[terminal_section].info}
            />
          </div>
        </div>
      </div>
    </main>
  )
}