"use client"

import { useEffect, useState } from "react"

type TerminalData = {
    subheading: string;
    data: string;
};

type props = {heading: string; info: TerminalData[];};

export default function Terminal({heading, info}: props){
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const promptLine = `guest@adam:~$ open ${heading.toLowerCase()}`;
    const bodyLines = info.flatMap((item) => [
      `> ${item.subheading}`,
      `  ${item.data}`,
      "",
    ]);
    const fullText = [promptLine, "", heading, "", ...bodyLines].join("\n");

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplayed(fullText);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);

    let i = 0;
    const speed = 12; // ms per character — raise to slow down, lower to speed up
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [heading, info]);

  return (
    <div className="terminal">
      <pre className="terminal-body">
        {displayed}
        <span className={`cursor ${done ? "cursor-idle" : ""}`}>█</span>
      </pre>
    </div>
  );
}