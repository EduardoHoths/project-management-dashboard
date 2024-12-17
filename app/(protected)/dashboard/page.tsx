import { redirect } from "next/navigation";
import { ProjectSummary } from "@/components/project/project-summary";
import { ProjectProgress } from "@/components/project/project-progress";
import { auth } from "@/auth";

export default async function DashboardP() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectSummary />
          <ProjectProgress />
        </div>
      </main>
    </div>
  );
}
