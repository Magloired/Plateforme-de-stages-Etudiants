import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/providers/query-provider";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (

    <QueryProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <Toaster />
    </QueryProvider>


  );
}


