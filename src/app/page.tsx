"use client";

import { useState, useEffect, useRef } from "react"

const PAGES = [
  { id: "home", label: "Home" },
  { id: "bio", label: "Bio" },
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
            if (index !== -1) setActive(index);
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
          <div>
            <h2>Bio</h2>
            <p>loths are a Neotropical group of xenarthran mammals constituting the suborder Folivora, 
              including the extant arboreal tree sloths and extinct terrestrial ground sloths. 
              Noted for their slowness of movement, tree sloths spend most of their lives hanging 
              upside down in the trees of the tropical rainforests of South America and Central America. 
              Sloths are considered to be most closely related to anteaters, together making up the xenarthran order Pilosa.</p>
          </div>
        </section>

        <section id="projects" className="page">
          <div>
            <h2>Projects</h2>
            <p>Description</p>
          </div>
        </section>

        <section id="skills" className="page">
          <div>
            <h2>Skills</h2>
          </div>
        </section>
      </main>
    </>
  )
}