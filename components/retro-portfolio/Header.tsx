import { useState, useEffect } from "react";

interface HeaderProps {
  currentTime: string;
  ip: string;
}

export function Header({ currentTime, ip }: HeaderProps) {
  return (
    <header className="border-b border-green-400 p-3 md:p-4 bg-black/90 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm md:text-lg font-bold">
            AKASH_PRASHER.SYS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs md:text-sm md:block hidden">
            YOUR_IP: {ip} {" | "}
          </div>
          <div className="text-xs md:text-sm">SYSTEM_TIME: {currentTime}</div>
        </div>
      </div>
    </header>
  );
}
