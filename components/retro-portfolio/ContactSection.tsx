import { Mail, Github, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contactData } from "@/data";

export function ContactSection() {
  // Function to get the right icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return <Mail className="w-4 h-4 mr-2" />;
      case "Github":
        return <Github className="w-4 h-4 mr-2" />;
      case "Linkedin":
        return <Linkedin className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-black border-green-400 text-green-400 h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-green-400">
          {"> INITIALIZING CONTACT.COM..."}
          <span className="animate-pulse">_</span>
        </CardTitle>
        <div className="text-xs text-green-500">CONNECTION PROTOCOLS READY</div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="text-center">
          <div className="text-base md:text-lg font-semibold text-green-300 mb-6">
            ESTABLISH CONNECTION
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {contactData.contactMethods.map((method, index) => (
              <Button
                key={index}
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300"
                onClick={() => window.open(method.link, "_blank")}
              >
                {getIcon(method.icon)}
                {method.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="border border-green-400 p-4 mt-6">
          <div className="text-xs text-green-500 mb-2">SYSTEM STATUS:</div>
          <div className="text-sm space-y-1">
            {contactData.statusMessages.map((message, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {message}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {contactData.contactPreferences.map((pref, index) => (
            <div key={index} className="border border-green-400 p-3">
              <div className="text-xs text-green-500 mb-2">{pref.title}:</div>
              <div className="text-sm">{pref.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
