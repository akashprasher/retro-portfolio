import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { educationData } from "@/data";

export function EducationSection() {
  return (
    <Card className="bg-black border-green-400 text-green-400 h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-green-400">
          {"> LOADING EDUCATION.DAT..."}
          <span className="animate-pulse">_</span>
        </CardTitle>
        <div className="text-xs text-green-500">ACADEMIC RECORDS FOUND</div>
      </CardHeader>
      <CardContent>
        <div className="border-l-2 border-green-400 pl-4">
          <div className="text-base md:text-lg font-semibold text-green-300">
            {educationData.university}
          </div>
          <div className="text-sm md:text-base">{educationData.degree}</div>
          <div className="text-xs md:text-sm text-green-500">
            {educationData.period}
          </div>
          <div className="mt-4 text-sm md:text-base">
            {educationData.description}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationData.categories.map((category, index) => (
              <div key={index} className="border border-green-400 p-3">
                <div className="text-xs text-green-500 mb-2">
                  {category.title}:
                </div>
                <div className="text-xs space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex}>• {item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
