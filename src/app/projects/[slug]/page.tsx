import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { ProjectDetailContent } from "@/components/project/ProjectDetailContent";
import { Footer } from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Kevin Risky",
      description: "The requested project case study could not be found.",
    };
  }

  const shortTitle = project.title.split(" - ")[0];
  const pageDescription = project.summary || project.description.slice(0, 160);

  return {
    title: `${shortTitle} | Kevin Risky`,
    description: pageDescription,
    openGraph: {
      title: `${shortTitle} | Kevin Risky`,
      description: pageDescription,
      url: `https://kevin.dev/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="flex flex-col min-h-screen">
      <ProjectDetailContent project={project} nextProject={nextProject} />
      <Footer />
    </div>
  );
}
