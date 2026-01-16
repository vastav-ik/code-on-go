"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check, Search, Code, Server, Globe, Star } from "lucide-react";
import { Templates } from "@prisma/client";

interface TemplateSelectingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: Templates;
    description: string;
  }) => void;
}

type CategoryType = "all" | "frontend" | "backend" | "fullstack";
type StepType = "select" | "configure";

interface TemplateOption {
  id: Templates;
  name: string;
  description: string;
  icon: string;
  category: CategoryType;
  tags: string[];
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: Templates.REACT,
    name: "React",
    description: "A JavaScript library for building user interfaces",
    icon: "/react.svg",
    category: "frontend",
    tags: ["frontend", "library", "spa"],
  },
  {
    id: Templates.NEXTJS,
    name: "Next.js",
    description: "The React Framework for the Web",
    icon: "/next.svg",
    category: "fullstack",
    tags: ["react", "framework", "ssr", "fullstack"],
  },
  {
    id: Templates.EXPRESS,
    name: "Express",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    icon: "/express.svg",
    category: "backend",
    tags: ["backend", "framework", "node"],
  },
  {
    id: Templates.VUE,
    name: "Vue",
    description: "The Progressive JavaScript Framework",
    icon: "/vue.svg",
    category: "frontend",
    tags: ["frontend", "framework", "spa"],
  },
  {
    id: Templates.ANGULAR,
    name: "Angular",
    description: "The modern web developer's platform",
    icon: "/angular.svg",
    category: "frontend", // Or fullstack based on user transcript, keeping frontend for now as per data structure logic
    tags: ["frontend", "framework", "typescript"],
  },
  {
    id: Templates.HONO,
    name: "Hono",
    description: "Ultrafast web framework for the Edges",
    icon: "/hono.svg",
    category: "backend",
    tags: ["backend", "framework", "edge"],
  },
];

const TemplateSelectingModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TemplateSelectingModalProps) => {
  const [step, setStep] = useState<StepType>("select");
  const [selectedTemplate, setSelectedTemplate] = useState<Templates | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<CategoryType>("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const filteredTemplates = TEMPLATE_OPTIONS.filter((template) => {
    const matchesCategory =
      category === "all" || template.category === category;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      template.name.toLowerCase().includes(searchLower) ||
      template.description.toLowerCase().includes(searchLower) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (id: Templates) => {
    setSelectedTemplate(id);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setStep("configure");
    }
  };

  const handleBack = () => {
    setStep("select");
  };

  const handleCreate = () => {
    if (selectedTemplate && title.trim()) {
      onSubmit({
        title,
        template: selectedTemplate,
        description,
      });
    }
  };

  const CategoryTab = ({
    value,
    label,
    icon: Icon,
  }: {
    value: CategoryType;
    label: string;
    icon: any;
  }) => (
    <button
      onClick={() => setCategory(value)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted/80",
        category === value
          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
          : "bg-muted text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden">
        {step === "select" ? (
          <>
            <DialogHeader className="p-6 pb-2 border-b">
              <DialogTitle className="text-2xl font-bold">
                Select a Template
              </DialogTitle>
              <DialogDescription>
                Choose a template to kickstart your project.
              </DialogDescription>
              <div className="flex flex-col gap-4 mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-9 bg-muted/50 border-input/50 focus:bg-background transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <CategoryTab value="all" label="All" icon={Code} />
                  <CategoryTab value="frontend" label="Frontend" icon={Code} />
                  <CategoryTab value="backend" label="Backend" icon={Server} />
                  <CategoryTab
                    value="fullstack"
                    label="Fullstack"
                    icon={Globe}
                  />
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 bg-muted/30">
              {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleSelectTemplate(template.id)}
                      className={cn(
                        "group relative flex flex-col gap-4 p-6 rounded-lg border-2 cursor-pointer transition-all duration-300",
                        "hover:scale-[1.02] hover:shadow-lg bg-background",
                        selectedTemplate === template.id
                          ? "border-primary shadow-md ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {selectedTemplate === template.id && (
                        <div className="absolute top-3 right-3 h-5 w-5 bg-primary rounded-full flex items-center justify-center animate-in fade-in zoom-in">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}

                      <div className="h-12 w-12 relative">
                        <Image
                          src={template.icon}
                          alt={template.name}
                          fill
                          className="object-contain dark:invert"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {template.description}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {template.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50 space-y-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">No templates found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your filters or search query.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="p-4 border-t bg-background">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedTemplate}
                className="ml-2 text-white"
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="p-6 border-b">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span
                  className="cursor-pointer hover:text-foreground"
                  onClick={handleBack}
                >
                  Select Template
                </span>
                <span>/</span>
                <span className="text-foreground font-medium">
                  Configure Project
                </span>
              </div>
              <DialogTitle className="text-2xl font-bold">
                Configure Project
              </DialogTitle>
              <DialogDescription>
                Customize your new{" "}
                {TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate)?.name}{" "}
                project.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 p-6 space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-base">
                  Project Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`My ${
                    TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate)
                      ?.name
                  } Project`}
                  className="text-lg py-6"
                  autoFocus
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-base">
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project..."
                />
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border flex items-start gap-4">
                <div className="h-10 w-10 relative flex-shrink-0 mt-1">
                  <Image
                    src={
                      TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate)
                        ?.icon || ""
                    }
                    alt="Template"
                    fill
                    className="object-contain dark:invert"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">
                    Selected Template:{" "}
                    {
                      TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate)
                        ?.name
                    }
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {
                      TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate)
                        ?.description
                    }
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="p-4 border-t bg-background">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!title.trim()}
                className="ml-2 text-white"
              >
                Create Project
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectingModal;
