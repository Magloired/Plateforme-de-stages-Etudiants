import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}


/* 

rmipmap-hdpi rmipmap-xhdpi rmipmap-xxxhdpi
icon-512x512.png  
icon-384x384.png
icon-192x192.png  xxxhdpi
icon-144x144.png  xxhdpi
icon-96x96.png  xhdpi
icon-72x72.png  hdpi
icon-48x48.png  mdpi
icon-36x36.png  ldpi


*/