
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const NavBar: React.FC = () => {
  return (
    <header className="w-full py-4 px-6">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight">VoiceNav</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <NavLink href="/" exact>Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/guide">Guide</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium text-primary underline-offset-4 hover:underline transition-all">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, exact, children }) => {
  const isActive = exact 
    ? window.location.pathname === href 
    : window.location.pathname.startsWith(href);
  
  return (
    <Link 
      to={href} 
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive 
          ? "text-foreground"
          : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default NavBar;
