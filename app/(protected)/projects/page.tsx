import { redirect } from "next/navigation";
import { ProjectList } from "@/components/project/project-list";
import { CreateProjectButton } from "@/components/project/create-project-button";
import { auth } from "@/auth";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <CreateProjectButton />
        </div>
        <ProjectList />
      </main>
    </div>
  );
}
