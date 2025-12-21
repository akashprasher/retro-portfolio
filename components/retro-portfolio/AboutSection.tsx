import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aboutData } from "@/data";
import { useEffect } from "react";
import { useState } from "react";

import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { showFestivBanner } from "@/lib/utils";

interface AboutSectionProps {
  typewriterText: string;
  fullText: string;
  showContent: boolean;
}

export function AboutSection({
  typewriterText,
  fullText,
  showContent,
}: AboutSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Card className="bg-black border-green-400 text-green-400 h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-green-400">
          {isLoading ? "> LOADING ABOUT.ME..." : "> ABOUT.ME EXECUTED"}
          <span className="animate-pulse">_</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="text-xl md:text-3xl font-bold text-green-300 min-h-[2rem] md:min-h-[3rem]">
          {typewriterText}
          {typewriterText.length < fullText.length && (
            <span className="animate-pulse">|</span>
          )}
        </div>

        {showContent && (
          <div className="animate-fade-in space-y-4 md:space-y-6">
            <div className="text-base md:text-lg">{aboutData.currentRole}</div>
            <div className="text-sm md:text-base text-green-300">
              {aboutData.previousRoles}
            </div>

            <div className="border-l-2 border-green-400 pl-4 mt-4">
              <p className="text-sm md:text-base leading-relaxed">
                {aboutData.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
              {aboutData.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-green-400 text-green-400 text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="border border-green-400 p-4 mt-6">
              <div className="text-xs text-green-500 mb-2">SYSTEM STATS:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {aboutData.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-green-300">{stat.label}:</div>
                    <div>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* TODO: MAKE THIS DYNAMIC, SHOULD BE ABLE TO HANDLE FROM DASHBOARD */}
            {/* CURRENT: TILL 25 Dec 2025 */}
            {showFestivBanner(new Date(2025, 11, 25)) && (
              <div className="w-full h-full relative sm:h-80">
                <div className="absolute bottom-2 right-2 text-green-600 text-xs">
                  <a
                    href="https://tenor.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1"
                  >
                    Credits
                    <MoveUpRight height={10} />
                  </a>
                </div>
                <Image
                  src="/merry-christmas.gif"
                  // src="/new-year.gif"
                  alt="Akash Prasher"
                  width={100}
                  height={100}
                  className="rounded-md w-full sm:h-full h-16 object-contain bg-green-400"
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
