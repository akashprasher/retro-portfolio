import { useState, useEffect } from "react";

// Matrix Rain Component
interface MatrixRainProps {
  matrixMode: boolean;
}

export function MatrixRain({ matrixMode }: MatrixRainProps) {
  const [drops, setDrops] = useState<
    Array<{ id: number; x: number; y: number; speed: number }>
  >([]);

  useEffect(() => {
    if (!matrixMode) return;

    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() * 3 + 1,
    }));
    setDrops(newDrops);

    const interval = setInterval(() => {
      setDrops((prev) =>
        prev.map((drop) => ({
          ...drop,
          y: drop.y > window.innerHeight ? -20 : drop.y + drop.speed,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [matrixMode]);

  if (!matrixMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-green-400 text-sm font-mono animate-pulse"
          style={{
            left: drop.x,
            top: drop.y,
            textShadow: "0 0 10px #00ff00",
          }}
        >
          {String.fromCharCode(0x30a0 + Math.random() * 96)}
        </div>
      ))}
    </div>
  );
}

// Secret Message Component
interface SecretMessageProps {
  secretMessage: string;
}

export function SecretMessage({ secretMessage }: SecretMessageProps) {
  if (!secretMessage) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-400 text-black px-4 py-2 rounded font-mono text-sm animate-bounce">
      {secretMessage}
    </div>
  );
}

// Secret Terminal Component
interface SecretTerminalProps {
  showSecretTerminal: boolean;
  terminalHistory: string[];
  terminalInput: string;
  setTerminalInput: (input: string) => void;
  handleTerminalCommand: (command: string) => void;
}

export function SecretTerminal({
  showSecretTerminal,
  terminalHistory,
  terminalInput,
  setTerminalInput,
  handleTerminalCommand,
}: SecretTerminalProps) {
  if (!showSecretTerminal) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-black border-2 border-green-400 p-4 z-50 font-mono text-sm">
      <div className="text-green-400 mb-2">SECRET TERMINAL v1.0</div>
      <div className="h-32 overflow-y-auto mb-2 text-green-400 text-xs">
        {terminalHistory.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith(">") ? "text-green-300" : "text-green-400"
            }
          >
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <input
          type="text"
          value={terminalInput}
          onChange={(e) => setTerminalInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTerminalCommand(terminalInput);
            }
          }}
          className="flex-1 bg-transparent text-green-400 outline-none"
          placeholder="Type 'help' for commands..."
          autoFocus
        />
      </div>
    </div>
  );
}
