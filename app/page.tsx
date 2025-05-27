"use client";

import { useState, useEffect } from "react";
import {
  Header,
  Footer,
  Navigation,
  LoadingScreen,
  ScanLines,
  AboutSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
  MatrixRain,
  SecretMessage,
  SecretTerminal,
} from "@/components/retro-portfolio";
import { aboutData, terminalCommands, easterEggs } from "@/data";
import Image from "next/image";

export default function RetroPortfolio() {
  const [currentTime, setCurrentTime] = useState("");
  const [activeSection, setActiveSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [showContent, setShowContent] = useState(false);

  const [matrixMode, setMatrixMode] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [secretMessage, setSecretMessage] = useState("");
  const [showSecretTerminal, setShowSecretTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [touchCount, setTouchCount] = useState(0);
  const [ip, setIp] = useState("");

  const fullText = aboutData.fullText;

  const konamiCode = easterEggs.konamiCode;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initial loading sequence
    const loadingTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingTimer);
          setIsLoading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(loadingTimer);
  }, []);

  useEffect(() => {
    if (touchCount >= 3) {
      // setShowContent(true);
      setMatrixMode(true);
      setTouchCount(0);
      setTimeout(() => {
        setMatrixMode(false);
      }, 3000);
    }
  }, [touchCount]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip));
  }, []);

  useEffect(() => {
    // Typewriter effect for the name
    if (!isLoading && activeSection === "about") {
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index <= fullText.length) {
          setTypewriterText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typeTimer);
          setShowContent(true);
        }
      }, 25);

      return () => clearInterval(typeTimer);
    }
  }, [isLoading, activeSection]);

  // Konami Code and Easter Eggs
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Konami Code Detection
      const newSequence = [...konamiSequence, event.code].slice(-10);
      setKonamiSequence(newSequence);

      if (newSequence.join(",") === konamiCode.join(",")) {
        setMatrixMode(true);
        setSecretMessage(easterEggs.secretMessages.matrixActivated);
        setTimeout(() => setSecretMessage(""), easterEggs.messageTimeout);
        setTimeout(() => setMatrixMode(false), easterEggs.matrixDuration);
        setKonamiSequence([]);
      }

      // Secret key combinations
      if (event.ctrlKey && event.shiftKey && event.code === "KeyT") {
        event.preventDefault();
        setShowSecretTerminal(!showSecretTerminal);
        setSecretMessage(
          "SECRET TERMINAL " +
            (!showSecretTerminal
              ? easterEggs.secretMessages.terminalActivated
              : easterEggs.secretMessages.terminalDeactivated)
        );
        setTimeout(() => setSecretMessage(""), easterEggs.messageTimeout);
      }

      if (event.ctrlKey && event.shiftKey && event.code === "KeyM") {
        event.preventDefault();
        setMatrixMode(!matrixMode);
        setSecretMessage(
          "MATRIX MODE " +
            (!matrixMode
              ? easterEggs.secretMessages.matrixOn
              : easterEggs.secretMessages.matrixOff)
        );
        setTimeout(() => setSecretMessage(""), easterEggs.messageTimeout);
      }

      // Easter egg messages
      if (event.code === "F12") {
        console.log(easterEggs.asciiArt);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiSequence, showSecretTerminal, matrixMode]);

  // Secret Terminal Commands
  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response = "";

    switch (cmd) {
      case "help":
        response = `Available commands: ${terminalCommands.availableCommands}`;
        break;
      case "about":
        response = terminalCommands.responses.about;
        break;
      case "skills":
        response = terminalCommands.responses.skills;
        break;
      case "joke":
        response = terminalCommands.responses.joke;
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "matrix":
        setMatrixMode(true);
        response = terminalCommands.responses.matrix;
        setTimeout(() => setMatrixMode(false), terminalCommands.matrixDuration);
        break;
      case "time":
        response = `Current system time: ${new Date().toLocaleString()}`;
        break;
      case "whoami":
        response = terminalCommands.responses.whoami;
        break;
      case "ls":
        response = terminalCommands.responses.ls;
        break;
      case "cat resume":
        response = terminalCommands.responses["cat resume"];
        break;
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, `> ${command}`, response]);
    setTerminalInput("");
  };

  // Function to reset content for section changes
  const resetContent = () => {
    setShowContent(false);
    setTypewriterText("");
  };

  if (isLoading) {
    return <LoadingScreen loadingProgress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1113] text-green-400 font-mono overflow-hidden">
      {/* Scanlines effect */}
      <ScanLines />

      {/* Easter Eggs */}
      <MatrixRain matrixMode={matrixMode} />
      <SecretMessage secretMessage={secretMessage} />
      <SecretTerminal
        showSecretTerminal={showSecretTerminal}
        terminalHistory={terminalHistory}
        terminalInput={terminalInput}
        setTerminalInput={setTerminalInput}
        handleTerminalCommand={handleTerminalCommand}
      />

      {/* Header */}
      <Header currentTime={currentTime} ip={ip} />

      <div className="max-w-7xl mx-auto p-3 md:p-6 grid grid-cols-1 xl:grid-cols-5 gap-4 md:gap-6 relative z-10 min-h-[calc(100vh-120px)]">
        {/* Navigation */}
        <div className="xl:col-span-1 flex flex-col h-full">
          <div className="order-2 md:order-1">
            <Navigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              resetContent={resetContent}
            />
          </div>
          <div className=" flex-grow order-1 md:order-2 md:mb-0 md:mt-4 mb-4 mt-0">
            <Image
              src={"/profile-2.png"}
              alt="Akash Prasher"
              width={100}
              height={100}
              className="rounded-md w-full sm:h-full h-16 object-contain bg-green-400"
              onClick={() => setTouchCount(touchCount + 1)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-4">
          {activeSection === "about" && (
            <AboutSection
              typewriterText={typewriterText}
              fullText={fullText}
              showContent={showContent}
            />
          )}

          {activeSection === "experience" && <ExperienceSection />}

          {activeSection === "education" && <EducationSection />}

          {activeSection === "contact" && <ContactSection />}
        </div>
      </div>

      {/* Footer */}
      <Footer currentTime={currentTime} ip={ip} />
    </div>
  );
}
