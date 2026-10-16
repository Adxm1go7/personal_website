"use client";

import { useState, useEffect, useRef } from "react"
import ProjectsCarousel from "./components/ProjectsCarousel";
import { skillGroups } from "./data/skills";
import SkillBox from "./components/SkillBox";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "bio", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

const bioImages = [
  { src: "/subaru_sketch.webp", alt: "Picture of a car (WRX STI)" },
  { src: "/catan.webp", alt: "Picture of a car (WRX STI)" },
  { src: "/subaru_sketch.webp", alt: "Picture of a car (WRX STI)" },
];

export default function Home() {
  const [active, setActive] = useState(0);

  return(
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main">
          {PAGES.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="page">
          <div className="hero">
            <div className="name-band">
              <h1 className="name">Adam Ornoch</h1>
            </div>
            <h2 className="role">Full-Stack Developer</h2>
            <p className="front-page-description">
              This is going to be a short 2 line description that says something
            </p>
          </div>

          <div className="contact-container">
            <a href="#" className="contact-link">
              <img className="link-icon" src="./linkedin-icon.png" alt="LinkedIn"></img>
            </a>
            <a href="#" className="contact-link">
              <img className="link-icon" src="./github-icon2.webp" alt="Github"></img>
            </a>
          </div>
        </section>

        <section id="bio" className="page">
          <div className="bio-page-container">
            <div className="bio-page-content bio-page-text-container">
              <h2 className="page-title">About Me</h2>
              <div>
                <p>
                  Hey, I’m Adam - an aspiring Software Engineer based in London.<br></br>

                  I’ve always enjoyed drafting up creative and functional solutions to problems which naturally led me to programming.
                  I like taking an idea, constructing it into a plan, and turning it into something real
                  that I can use, improve, and learn from.
                  My interests are spread across web development and ..., and I’m currently
                  developing my skills across TypeScript, React, Next.js, Python, and SQL. Most of my learning 
                  happens through building projects, experimenting with new technologies, and fixing things
                  that break along the way.
                  Outside of work, I enjoy a variety of sports and board games. I enjoy competition, figuring 
                  out why things work the way they do, and learning optimal strategies.
                  My Qualities
                  Creative. Thoughtful. ...
                  I’m currently focused on improving my technical skills
                  and looking forward to seeing where it takes me.
                </p>
              </div>
            </div>
            <div className="bio-page-content bio-page-img-container">
              <div className="bio-track">
                {[...bioImages, ...bioImages].map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={i < bioImages.length ? img.alt : ""}
                    aria-hidden={i >= bioImages.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="page">
          <h2 className="page-title projects-page-title">Projects</h2>
          <ProjectsCarousel />
        </section>

        <section id="skills" className="page">
          <h2 className="page-title skills-page-title">Skills</h2>

          <div className="skills-row">
            {skillGroups.map((group) => (
              <SkillBox key={group.id} group={group} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}