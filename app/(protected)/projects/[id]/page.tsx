import { redirect } from "next/navigation";
import { ProjectDetails } from "@/components/project/project-details";
import { auth } from "@/auth";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <ProjectDetails id={id} />
      </main>
    </div>
  );
}
