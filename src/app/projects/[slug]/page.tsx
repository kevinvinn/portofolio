import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Briefcase, Tag, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectGallery } from "@/components/project/ProjectGallery";
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
  const shortTitle = project.title.split(" - ")[0];

  // Split description text into clean paragraphs
  const paragraphs = project.description
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6 md:pt-32">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-all px-4 py-2 rounded-xl border-2 border-border-strong shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[200px]">{shortTitle}</span>
          </nav>
        </div>
      </div>

      <article className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-14">
        {/* Project Header Info */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-foreground text-background">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground bg-surface-muted px-3 py-1 rounded-full border border-border">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.date}</span>
            </span>
            {project.role && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground bg-surface-muted px-3 py-1 rounded-full border border-border">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{project.role}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.05]">
            {project.title}
          </h1>

          {project.summary && (
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          )}

          {/* Verified External Outbound Link */}
          {project.link && (
            <div className="pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-bold text-sm hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-brutal-sm border-2 border-border-strong"
              >
                <span>Read Published Research Paper</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </header>

        {/* Hero Interactive Gallery with Neo-Brutalist Framing */}
        <div className="rounded-3xl border-2 border-border-strong p-3 sm:p-5 bg-surface shadow-brutal-md">
          <ProjectGallery
            title={project.title}
            gallery={project.gallery}
            mainImage={project.image}
          />
        </div>

        {/* 2-Column Editorial Body & Metadata Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4">
          {/* Main Content Area (Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            {project.overview && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                    01 // OVERVIEW
                  </span>
                  <div className="h-[1px] w-8 bg-border" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Project Context
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {project.overview}
                </p>
              </section>
            )}

            {/* In-depth Engineering & Architecture */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                  02 // ENGINEERING
                </span>
                <div className="h-[1px] w-8 bg-border" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Architecture &amp; Implementation
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>

            {/* Key Features Section */}
            {project.features && project.features.length > 0 && (
              <section className="space-y-6 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                    03 // FEATURES
                  </span>
                  <div className="h-[1px] w-8 bg-border" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Key Technical Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border-2 border-border-strong bg-surface shadow-brutal-sm flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-foreground leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Metadata Sidebar (Right 4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl border-2 border-border-strong bg-surface shadow-brutal-md space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-foreground border-b-2 border-border-strong pb-3 uppercase tracking-wider font-mono">
                Project Details
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Category</div>
                  <div className="text-foreground font-semibold mt-1">{project.category}</div>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Date</div>
                  <div className="text-foreground font-semibold mt-1">{project.date}</div>
                </div>

                {project.role && (
                  <div>
                    <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Role</div>
                    <div className="text-foreground font-semibold mt-1">{project.role}</div>
                  </div>
                )}

                {project.link && (
                  <div>
                    <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">External Reference</div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline mt-1 break-all"
                    >
                      <span>Published Article</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {/* Technologies & Tools */}
              <div className="border-t-2 border-border-strong pt-5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Technologies &amp; Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium border border-border bg-surface-muted text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Next Project Teaser Card with Neo-Brutalist Frame */}
        <section className="pt-12 border-t-2 border-border-strong">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block p-7 sm:p-10 rounded-3xl border-2 border-border-strong bg-surface hover:shadow-brutal-lg hover:-translate-y-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-brutal-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                  Next Case Study
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {nextProject.summary}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full border-2 border-border-strong bg-foreground text-background group-hover:bg-primary group-hover:border-primary flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>
      </article>

      <Footer />
    </div>
  );
}
