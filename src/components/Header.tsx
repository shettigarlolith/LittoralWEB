import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Home, Package, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getItemCount } = useCart();
  const location = useLocation();
  const itemCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/payment', label: 'Payment', icon: CreditCard },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          aria-label="Home"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Littoral"
            className="h-10 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Search Bar - Desktop */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex flex-1 max-w-xl mx-4"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ready mixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 bg-secondary border-0 focus-visible:ring-primary"
            />
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path}>
              <Button 
                variant={isActive(path) ? "default" : "ghost"} 
                className={`${isActive(path) ? '' : 'text-foreground hover:text-primary hover:bg-accent'}`}
              >
                {label}
                {label === 'Cart' && itemCount > 0 && (
                  <Badge 
                    className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile: Cart & Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ready mixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-secondary border-0"
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 space-y-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link 
                key={path} 
                to={path}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button 
                  variant={isActive(path) ? "default" : "ghost"} 
                  className={`w-full justify-start gap-3 ${isActive(path) ? '' : 'text-foreground'}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {label === 'Cart' && itemCount > 0 && (
                    <Badge className="ml-auto bg-destructive text-destructive-foreground">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
