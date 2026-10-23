export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string; /*? = optional property*/
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Opinion Dynamics Simulator",
    description: `An agent-based simulation of opinion dynamics using the bounded confidence model,
     where agents on a grid update their opinions based on interactions with nearby agents who hold 
     sufficiently similar views. Includes a live, colour-coded visualisation of the simulation and a
      parameter-sweep mode for running controlled experiments and analysing convergence behaviour.`,
    tech: ["Python", "React",  "FastAPI",  "Mesa"],
    link: "https://github.com/Adxm1go7/Multi-Agent-System-with-Emergent-Behaviours",
  },
  {
    id: "project-two",
    title: "PC Builder & Parts Picker",
    description: `A GUI-driven desktop application that lets registered users build custom PCs from 
    a live catalogue of 200+ components, with secure user authentication. It’s backed by a normalised 
    10-table SQL database that updates stock availability on every order, preventing overselling. 
    Catalogue search filters directly at the database layer instead of in application code, which 
    minimises the data transferred and keeps the interface responsive.`,
    tech: ["Python", "Tkinter"],
    link: "",
  },
  {
    id: "project-three",
    title: "Slyme Defender",
    description: `A tower defence game built in Unity, powered by over 80 C# scripts covering enemy AI,
     wave spawning, tower behaviour, player progression and UI. The systems follow an object-oriented 
     design, so each component is modular, reusable and easy to maintain. Built as a team project, it 
     was developed collaboratively using Git for version control.`,
    tech: ["Unity", "C#"],
    link: "",
  },
  {
    id: "project-four",
    title: "Aviation Weather App",
    description: `A live flight-tracking web app that plots real-time aircraft positions from the OpenSky
     Network API on an interactive Leaflet map. Users can search any city to see current conditions and
      forecasts from the OpenWeather API, including temperature, humidity, wind speed and visibility. 
      Weather overlays sit on the map alongside rule-based alerts that flag crosswind, low visibility
       and temperature extremes.`,
    tech: ["React", "Leaflet", "OpenWeather API", "OpenSky", "Network API"],
    link: "",
  },
];