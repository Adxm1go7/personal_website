"use client";

import { useState, useEffect } from "react";
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
  { src: "/software-testing.png", alt: "Image of Programming" },
  { src: "/subaru.jpg", alt: "Image of a Subaru WRX STI" },
  { src: "/catan_transparent.png", alt: "Image of Catan (Board Game)" },
  { src: "/volleyball_transparent.png", alt: "Image of a Volleyball" },
  { src: "/judo11.png", alt: "Image of bowing in Judo" }
];

export default function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = PAGES.findIndex((p) => p.id === entry.target.id);
            if (index !== -1) setActive(index);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // a thin line across the middle of the screen
    );

    PAGES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll", progress.toFixed(3));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main">
          {PAGES.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${active === i ? "active" : ""}`}
              aria-current={active === i ? "page" : undefined}
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
              I build web applications from idea to deployment, with a focus on clean, reliable code.
            </p>
          </div>

          <div className="contact-container">
            <a href="https://www.linkedin.com/in/adamornoch" className="contact-link">
              <img className="link-icon" src="/linkedin-icon.png" alt="LinkedIn" />
            </a>
            <a href="#" className="contact-link">
              <img className="link-icon" src="/github-icon2.webp" alt="GitHub" />
            </a>
          </div>
        </section>

        <section id="bio" className="page">
          <div className="bio-page-container">
            <div className="bio-page-content bio-page-text-container">
              <h2 className="page-title">About Me</h2>
              <div className="bio-all">
                <p>
                  Hey, I’m Adam, an aspiring Software Engineer based in London.
                </p>
                <p>
                  I’ve always enjoyed drafting up creative and functional solutions to problems, which naturally led me to programming.
                  I like taking an idea, turning it into a detailed plan, and turning it into something real
                  that I can use, improve, and learn from.
                </p>
                <p>
                  I’m interested in web development, backend systems, DevOps and software testing. 
                  I’m currently exploring how AI can be used both as a development tool and as a feature in the applications I build.
                  Most of my learning happens through building projects, experimenting with new technologies, and fixing things
                  that break along the way.
                </p>
                <p>
                  Outside of work, I enjoy a variety of sports, board games and car-related activities. I also like competition, figuring
                  out why things work the way they do, and learning optimal strategies.
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
          <h2 className="page-title">Projects</h2>
          <ProjectsCarousel />
        </section>

        <section id="skills" className="page">
          <h2 className="page-title">Skills</h2>

          <div className="skills-row">
            {skillGroups.map((group) => (
              <SkillBox key={group.id} group={group} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}