interface FooterProps {
  currentTime: string;
  ip: string;
}

export function Footer({ currentTime, ip }: FooterProps) {
  return (
    <footer className="border-t border-green-400 p-3 md:p-4 bg-black/90 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto text-center text-xs text-green-500">
        AKASH_PRASHER.SYS v2.0.25 | RUNTIME: {currentTime} | STATUS: ONLINE |
        YOUR_IP: {ip}
      </div>
    </footer>
  );
}
