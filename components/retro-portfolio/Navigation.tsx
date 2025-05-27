import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Terminal, Briefcase, GraduationCap, Mail } from "lucide-react";

// Define the section type
export interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

// Export the sections array for reuse
export const sections: Section[] = [
  { id: "about", label: "ABOUT.ME", icon: Terminal },
  { id: "experience", label: "EXPERIENCE.LOG", icon: Briefcase },
  { id: "education", label: "EDUCATION.DAT", icon: GraduationCap },
  { id: "contact", label: "CONTACT.INFO", icon: Mail },
];

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  resetContent: () => void;
}

export function Navigation({
  activeSection,
  setActiveSection,
  resetContent,
}: NavigationProps) {
  return (
    <Card className="bg-black border-green-400 text-green-400 h-fit sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-400 flex items-center gap-2 text-sm md:text-base">
          <Code className="w-4 h-4" />
          NAVIGATION.DIR
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            className={`w-full justify-start text-left font-mono text-xs md:text-sm ${
              activeSection === section.id
                ? "bg-green-400 text-black hover:bg-green-300"
                : "text-green-400 hover:bg-green-400/10 hover:text-green-300"
            }`}
            onClick={() => {
              setActiveSection(section.id);
              resetContent();
            }}
          >
            <section.icon className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            <ChevronRight className="w-3 h-3 mr-1" />
            {section.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
