import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data";

export function ExperienceSection() {
  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-black border-green-400 text-green-400">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-green-400">
            {"> EXECUTING EXPERIENCE.BAT..."}
            <span className="animate-pulse">_</span>
          </CardTitle>
          <div className="text-xs text-green-500">
            FOUND {experiences.length} RECORDS
          </div>
        </CardHeader>
      </Card>

      {experiences.map((exp, index) => (
        <Card key={index} className="bg-black border-green-400 text-green-400">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-green-300 text-base md:text-lg">
                  {exp.role}
                </CardTitle>
                <div className="text-sm md:text-base font-semibold">
                  {exp.company}
                </div>
                <div className="text-xs md:text-sm text-green-400">
                  {exp.period}
                </div>
                <div className="text-xs text-green-500">
                  {exp.location} · {exp.type}
                </div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            </div>
          </CardHeader>
          <CardContent>
            {exp.projects && (
              <div className="space-y-4">
                {exp.projects.map((project, pIndex) => (
                  <div
                    key={pIndex}
                    className="border-l-2 border-green-400 pl-4"
                  >
                    <div className="font-semibold text-green-300 mb-2 text-sm md:text-base">
                      {project.title}
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {exp.achievements && (
              <div className="space-y-2">
                {exp.achievements.map((achievement, aIndex) => (
                  <div key={aIndex} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 mt-1 text-green-400 flex-shrink-0" />
                    <p className="text-xs md:text-sm leading-relaxed">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {exp.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-green-400 text-green-400 text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
