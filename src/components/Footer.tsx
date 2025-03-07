
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 md:py-12 border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 md:items-start">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Link to="/" className="text-xl font-semibold tracking-tight">VoiceNav</Link>
          <p className="text-sm text-muted-foreground md:max-w-xs">
            Elevating voice interaction with intuitive navigation and natural language understanding.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Product</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">User Guide</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 mt-8">
        <p className="text-xs text-muted-foreground">© 2023 VoiceNav. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
