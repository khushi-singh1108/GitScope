"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import {
  AlertCircle,
  Clock,
  FileCode,
  GitBranch,
  ExternalLink,
  Gauge,
  Map,
  CircleDot,
  User,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import "@/styles/dashboard.css";

/* ── Grid background ── */
function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

/* ── Skeleton loader ── */
function SkeletonLoader() {
  return (
    <div className="rp-page min-h-screen">
      <Navbar />
      <section className="relative">
        <GridBackground />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 z-10 space-y-5">
          <div className="dash-skeleton-card animate-pulse p-8 space-y-5">
            <div className="dash-skel h-4 w-32 rounded-full" />
            <div className="dash-skel h-9 w-3/4 rounded-lg" />
            <div className="flex gap-3 mt-2">
              <div className="dash-skel h-7 w-20 rounded-full" />
              <div className="dash-skel h-7 w-28 rounded-full" />
            </div>
          </div>
          <div className="dash-skeleton-card animate-pulse p-8 space-y-5">
            <div className="dash-skel h-7 w-48 rounded-lg" />
            <div className="dash-skel h-4 w-full rounded" />
            <div className="dash-skel h-4 w-5/6 rounded" />
            <div className="dash-skel h-4 w-2/3 rounded" />
            <div className="flex gap-3 mt-4">
              <div className="dash-skel h-16 w-36 rounded-xl" />
              <div className="dash-skel h-16 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Error state ── */
function ErrorState() {
  return (
    <div className="rp-page min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="dash-empty-icon mx-auto mb-5" style={{ width: 56, height: 56 }}>
          <TriangleAlert size={24} />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--heading)" }}>
          Failed to load issue analysis
        </h1>
        <p className="mt-2" style={{ color: "var(--text-muted)" }}>
          Something went wrong. Please try again later.
        </p>
      </div>
      <Footer />
    </div>
  );
}

/* ── difficulty colour ── */
function diffStyle(raw: string) {
  const d = raw?.toLowerCase() ?? "";
  if (d.includes("beginner") || d.includes("easy")) return "dash-chip-emerald";
  if (d.includes("intermediate")) return "dash-chip-amber";
  if (d.includes("advanced")) return "dash-chip-orange";
  if (d.includes("expert")) return "dash-chip-red";
  return "dash-chip-blue";
}

/* ── Section block ── */
function Section({
  icon: Icon,
  title,
  accent = "#3b82f6",
  children,
}: {
  icon: React.ElementType;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="flex items-center gap-2.5">
        <div className="dash-section-icon">
          <Icon size={14} />
        </div>
        <h3 className="dash-section-title text-base">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function AnalyzeIssuePage() {
  const params = useParams();
  const owner       = params.owner as string;
  const repo        = params.repo as string;
  const issueNumber = params.issueNumber as string;

  const [loading, setLoading] = useState(true);
  const [data, setData]       = useState<any>(null);

  const fetchIssueAnalysis = async () => {
    try {
      setLoading(true);
      const repoUrl = `https://github.com/${owner}/${repo}`;
      const response = await api.post("/issues/analyze", { repoUrl, issueNumber });
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssueAnalysis(); }, []);

  if (loading) return <SkeletonLoader />;
  if (!data)   return <ErrorState />;

  const { issue, analysis } = data;
  const diffChip = diffStyle(analysis.difficulty ?? "");

  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 z-10 space-y-5">

          {/* ── Issue header card ── */}
          <div className="dash-card p-6 sm:p-8">
            {/* breadcrumb */}
            <div className="flex items-center gap-1.5 mb-4 flex-wrap">
              <span className="text-xs font-medium" style={{ color: "var(--blue)" }}>
                {owner}
              </span>
              <span style={{ color: "var(--text-faint)" }}>/</span>
              <span className="text-xs font-medium" style={{ color: "var(--blue)" }}>
                {repo}
              </span>
              <span style={{ color: "var(--text-faint)" }}>/</span>
              <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                #{issueNumber}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              <div className="min-w-0">
                <h1
                  className="text-xl sm:text-3xl font-bold leading-snug"
                  style={{ color: "var(--heading)" }}
                >
                  {issue.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2.5 mt-4">
                  {/* state badge */}
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                    issue.state === "open" ? "dash-chip-emerald" : "dash-chip-blue"
                  }`}>
                    <CircleDot size={11} />
                    {issue.state}
                  </span>

                  {/* author */}
                  <span className="dash-badge inline-flex items-center gap-1.5">
                    <User size={11} />
                    {issue.author}
                  </span>
                </div>
              </div>

              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="explore-btn-primary sm:flex-shrink-0 !w-auto"
                style={{ paddingLeft: 16, paddingRight: 16, whiteSpace: "nowrap" }}
              >
                <ExternalLink size={14} />
                Open on GitHub
              </a>
            </div>
          </div>

          {/* ── AI Analysis card ── */}
          <div className="dash-card p-6 sm:p-8">
            {/* AI header */}
            <div className="flex items-center gap-2.5 mb-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="dash-icon-badge-blue">
                <Sparkles size={15} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: "var(--heading)" }}>
                AI Issue Analysis
              </h2>
            </div>

            <div className="space-y-7">

              {/* Problem + Root Cause */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Section icon={AlertCircle} title="Problem" accent="#f43f5e">
                  <p className="dash-text-body !text-sm leading-relaxed">{analysis.problem}</p>
                </Section>
                <Section icon={GitBranch} title="Root Cause" accent="#8b5cf6">
                  <p className="dash-text-body !text-sm leading-relaxed">{analysis.rootCause}</p>
                </Section>
              </div>

              <div style={{ borderTop: "1px solid var(--border)" }} className="pt-6">
                {/* Difficulty + Estimated Time */}
                <div className="flex flex-wrap gap-5">
                  <Section icon={Gauge} title="Difficulty" accent="#f59e0b">
                    <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full ${diffChip}`}>
                      {analysis.difficulty}
                    </span>
                  </Section>

                  {analysis.estimatedTime && (
                    <Section icon={Clock} title="Estimated Time" accent="#10b981">
                      <span className="dash-chip-emerald inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full">
                        <Clock size={11} />
                        {analysis.estimatedTime}
                      </span>
                    </Section>
                  )}
                </div>
              </div>

              {/* Relevant Files */}
              {analysis.relevantFiles?.length > 0 && (
                <div style={{ borderTop: "1px solid var(--border)" }} className="pt-6">
                  <Section icon={FileCode} title="Relevant Files" accent="#06b6d4">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {analysis.relevantFiles.map((file: string, i: number) => (
                        <span key={i} className="dash-chip font-mono !text-xs" style={{ padding: "5px 10px" }}>
                          <FileCode size={11} style={{ color: "var(--blue)", flexShrink: 0 }} />
                          {file}
                        </span>
                      ))}
                    </div>
                  </Section>
                </div>
              )}

              {/* Contribution Roadmap */}
              {analysis.roadmap?.length > 0 && (
                <div style={{ borderTop: "1px solid var(--border)" }} className="pt-6">
                  <Section icon={Map} title="Contribution Roadmap" accent="#3b82f6">
                    <ol className="space-y-3 mt-1">
                      {analysis.roadmap.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="dash-step-num flex-shrink-0 mt-0.5">{i + 1}</span>
                          <div
                            className="flex-1 rounded-xl px-4 py-3 text-sm leading-relaxed"
                            style={{
                              background: "var(--surface-2)",
                              border: "1px solid var(--border)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {step}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Section>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}