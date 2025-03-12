import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

export default function Portfolio() {
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [universityLogos, setUniversityLogos] = useState([null, null]);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2 cursor-pointer">About Me</li>
          <li className="mb-2 cursor-pointer">Education</li>
          <li className="mb-2 cursor-pointer">Skills</li>
          <li className="mb-2 cursor-pointer">Experience</li>
          <li className="mb-2 cursor-pointer">Projects</li>
          <li className="mb-2 cursor-pointer">Publications</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-5 overflow-auto">
        <Tabs defaultValue="about">
          <TabsList className="flex gap-4">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>

          {/* About Me Section */}
          <TabsContent value="about">
            <div className="relative w-full h-48 bg-gray-300 flex items-center justify-center">
              {backgroundImage ? (
                <img src={backgroundImage} className="w-full h-full object-cover" alt="Background" />
              ) : ("Upload Background")}
              <input type="file" accept="image/png" className="absolute inset-0 opacity-0" onChange={(e) => handleImageUpload(e, setBackgroundImage)} />
            </div>
            <div className="flex items-center mt-4">
              {profileImage ? (
                <img src={profileImage} className="w-20 h-20 rounded-full" alt="Profile" />
              ) : ("Upload Profile Picture")}
              <input type="file" accept="image/png" className="ml-4 opacity-0 absolute" onChange={(e) => handleImageUpload(e, setProfileImage)} />
            </div>
            <Textarea placeholder="Write about yourself here..." className="mt-4 w-full" />
          </TabsContent>

          {/* Education Section */}
          <TabsContent value="education">
            {universityLogos.map((logo, index) => (
              <Card key={index} className="mb-4 p-4">
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div>
                      {logo ? <img src={logo} className="w-16 h-16" alt="University Logo" /> : "Upload Logo"}
                      <input type="file" accept="image/png" onChange={(e) => {
                        const newLogos = [...universityLogos];
                        newLogos[index] = URL.createObjectURL(e.target.files[0]);
                        setUniversityLogos(newLogos);
                      }} />
                    </div>
                    <div>
                      <Input placeholder="University Name" />
                      <Input placeholder="Degree" className="mt-2" />
                      <Input placeholder="Cumulative GPA" className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Skills Section */}
          <TabsContent value="skills">
            <div className="grid grid-cols-2 gap-4">
              {["Programming", "Frameworks", "Tools", "Soft Skills"].map((category) => (
                <Card key={category} className="p-4">
                  <h3 className="font-bold">{category}</h3>
                  <Textarea placeholder={`Add ${category} skills here...`} className="mt-2" />
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects">
            {[...Array(5)].map((_, index) => (
              <Card key={index} className="mb-4 p-4">
                <CardContent>
                  <Input placeholder={`Project ${index + 1} Name`} className="mb-2" />
                  <input type="file" accept="image/png" className="mb-2" />
                  <input type="file" accept="application/vnd.ms-powerpoint,.pptx" className="mb-2" />
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
