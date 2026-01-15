import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllPlaygrounds } from "@/modules/dashboard/actions";
import { AppSidebar } from "@/modules/dashboard/components/app-sidebar";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgrounds = await getAllPlaygrounds();

  const formattedPlaygroundData = playgrounds?.map((item) => ({
    id: item.id,
    name: item.title,
  }));

  return (
    <SidebarProvider>
      <AppSidebar playgrounds={playgrounds} />
      <div className="flex min-h-screen w-full overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden h-full">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
