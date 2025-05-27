import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  loadingProgress: number;
}

export function LoadingScreen({ loadingProgress }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold mb-8">BOOTING SYSTEM...</div>
          <Progress
            value={loadingProgress}
            className="w-full h-2 bg-gray-800"
          />
          <div className="text-sm">LOADING: {loadingProgress}%</div>
          <div className="text-xs text-green-500 space-y-1">
            <div>{loadingProgress > 20 && "> INITIALIZING PORTFOLIO.SYS"}</div>
            <div>{loadingProgress > 40 && "> LOADING USER DATA..."}</div>
            <div>{loadingProgress > 60 && "> ESTABLISHING CONNECTIONS..."}</div>
            <div>{loadingProgress > 80 && "> SYSTEM READY"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
