
"use client";

import Link from 'next/link';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, LogOut, PlusCircle, ListFilter } from 'lucide-react'; // Added ListFilter

export default function Header() {
  const { user, logout, loading } = useAuth();

  const getAvatarFallbackText = (name?: string, email?: string) => {
    if (name) return name;
    if (email) return email;
    return 'User';
  };

  const getAvatarInitial = (name?: string, email?: string) => {
    if (name && name.length > 0) return name[0].toUpperCase();
    if (email && email.length > 0) return email[0].toUpperCase();
    return 'U';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          {loading ? (
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    {(user.avatarUrl && !user.avatarUrl.startsWith('https://placehold.co')) ? (
                      <AvatarImage src={user.avatarUrl} alt={user.displayName || user.email || "User"} />
                    ) : null}
                    <AvatarFallback className="text-[0.625rem] p-0.5 truncate leading-tight">
                      {getAvatarFallbackText(user.displayName, user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'admin' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/add-plant" className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Añadir Planta</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/manage-filters" className="flex items-center">
                        <ListFilter className="mr-2 h-4 w-4" />
                        <span>Gestionar Filtros</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Ingresar</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Registrarse</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
