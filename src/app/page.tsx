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
        subheading: "sh1",
        data: "data123"
      },
      {
        subheading: "sh2",
        data: "data234"
      }
    ]
  }
}

export default function Home() {
  const [terminal_section, set_terminal_section] = useState<"bio" | "projects">("projects");

  return(
    <main>
      <div className="site-container">
        <div className="contact-container">
          <p>LinkedIn, Github, etc</p>
        </div>
        <div className="name">
          <h1>Adam Ornoch</h1>
        </div>
        <div className="terminal-container">
          <button onClick={() => set_terminal_section("bio")}>Bio</button>
          <button onClick={() => set_terminal_section("projects")}>Projects</button>
          <p>Currently Working On</p>
          <Terminal 
            heading={terminal_data[terminal_section].heading}
            info={terminal_data[terminal_section].info}
          />
        </div>
      </div>
    </main>
  )
}