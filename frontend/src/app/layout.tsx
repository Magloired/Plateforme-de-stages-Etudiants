import { Roboto } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})


export const metadata = {
  title: "Plateforme de gestion de stage",
  description: "Application pour la gestion des stages étudiants, suivi des entreprises, encadrants, et rapports.",
  themeColor: "#0F172A",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    title: "GestionStage",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Plateforme de gestion de stage",
    description: "Plateforme complète pour la gestion des stages.",
    url: "",
    siteName: "GestionStage",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aperçu de la plateforme",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plateforme de gestion de stage",
    description: "Gérez les stages efficacement avec notre plateforme.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}