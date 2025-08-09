
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap, User, LogIn, UserPlus, LogOut, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const publicNavigationItems = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "Stages",
    href: "/etudiant/stages",
  },
];

const authenticatedNavigationItems = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "Mes Stages",
    href: "/etudiant/stages",
  },
  {
    title: "Mes Candidatures",
    href: "/etudiant/candidatures",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navigationItems = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems;

  // Fonction pour obtenir les initiales de l'utilisateur
  const getUserInitials = (user: any) => {
    if (!user) return "U";
    const nom = user.nom || "";
    const prenom = user.prenom || "";
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };
  const avatarUrl = user?.avatar_url || "/avatar.png";
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo et titre */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                StagesTogo
              </h1>
              <p className="text-xs text-muted-foreground">Plateforme de stages</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions et Toggle */}
          <div className="flex items-center space-x-2">
            {/* Mode Toggle */}
            <ModeToggle />

            {/* Contenu conditionnel selon l'authentification */}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              // Menu utilisateur connecté - Desktop
              <div className="hidden md:flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarUrl} alt={`${user.prenom} ${user.nom}`} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.prenom} {user.nom}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {user.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // Boutons d'authentification - Desktop (non connecté)
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Connexion</span>
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/register" className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>S&apos;inscrire</span>
                  </Link>
                </Button>
              </div>
            )}

            {/* Menu Mobile */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Logo Mobile */}
                  <div className="flex items-center space-x-2 pb-4 border-b border-border">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                      <GraduationCap className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">StagesTogo</h2>
                      <p className="text-xs text-muted-foreground">Plateforme de stages</p>
                    </div>
                  </div>

                  {/* Informations utilisateur (si connecté) */}
                  {isAuthenticated && user && (
                    <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarUrl} alt={`${user.prenom} ${user.nom}`} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user.prenom} {user.nom}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Mobile */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>

                  {/* Séparateur */}
                  <div className="border-t border-border pt-4">
                    {isAuthenticated && user ? (
                      // Actions pour utilisateur connecté
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link 
                            href="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-2"
                          >
                            <User className="h-4 w-4" />
                            <span>Profil</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link 
                            href="/settings"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-2"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Paramètres</span>
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Déconnexion</span>
                        </Button>
                      </div>
                    ) : (
                      // Boutons d'authentification Mobile (non connecté)
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link 
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-2"
                          >
                            <LogIn className="h-4 w-4" />
                            <span>Connexion</span>
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" asChild>
                          <Link 
                            href="/auth/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-2"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>S&apos;inscrire</span>
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 