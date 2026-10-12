"use client";

import { useState, useEffect, useRef } from "react"
import ProjectsCarousel from "./components/ProjectsCarousel";
import SkillsField from "./components/SkillsField";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "bio", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export default function Home() {
  const containerRef = useRef<HTMLElement>(null); 
  const [active, setActive] = useState(0);

  // Track which page is currently in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = PAGES.findIndex((p) => p.id === entry.target.id);
            if (index !== -1) setActive(0);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    PAGES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    const index = PAGES.findIndex((p) => p.id === id);
    if (index !== -1) setActive(index);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };


  return(
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main">
          {PAGES.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${active === i ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main className="site-snap-container" ref={containerRef}>
        <section id="home" className="page">
          <div className="hero">
            <h1 className="name">Adam Ornoch</h1>
            <h2 className="role">Full-Stack Developer</h2>
            <p className="front-page-description">
              This is going to be a short 2 line description that says something
            </p>
          </div>

          <div className="contact-container">
            <a href="#" className="contact-link">LinkedIn</a>
            <span className="contact-divider">/</span>
            <a href="#" className="contact-link">GitHub</a>
          </div>
        </section>

        <section id="bio" className="page">

          <h2 className="page-title">About Me</h2>
          <div className="bio-page-container">
            <div className="bio-page-content bio-page-text-container">
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
            <div className="bio-page-content bio-page-img-container">
              <p>Image</p>
            </div>
          </div>
        </section>

        <section id="projects" className="page">
          <h2 className="page-title">Projects</h2>
          <ProjectsCarousel />
        </section>

        <section id="skills" className="page">
          <h2 className="page-title">Skills</h2>
          <SkillsField />
        </section>
      </main>
    </>
  )
}