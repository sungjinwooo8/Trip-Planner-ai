import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, User, MapPin, Menu, Settings } from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to get user from localStorage
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  };

  // Get current user directly from localStorage for immediate check
  const currentUser = getUser();
  const displayUser = user || currentUser;
  
  // Initialize user state immediately
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  // Listen for storage changes (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const currentUser = getUser();
        setUser(currentUser);
      }
    };

    // Listen for custom event dispatched after login
    const handleUserUpdate = () => {
      const currentUser = getUser();
      setUser(currentUser);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Check user when route changes (navigation)
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, [location.pathname]);

  // Check user periodically and on focus (when user comes back to tab)
  useEffect(() => {
    const checkUser = () => {
      const currentUser = getUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    };

    // Check when window gains focus
    window.addEventListener('focus', checkUser);
    
    // Also check periodically (every 500ms) as a fallback
    const interval = setInterval(checkUser, 500);

    return () => {
      window.removeEventListener('focus', checkUser);
      clearInterval(interval);
    };
  }, [user]);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate('/');
    // Dispatch event to update other components
    window.dispatchEvent(new Event('userUpdated'));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              AI Trip Planner
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/create-trip" 
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Create Trip
            </Link>
            <Link 
              to="/destinations" 
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Destinations
            </Link>
            {displayUser && (
              <Link 
                to="/my-trip" 
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                My Trips
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {displayUser ? (
              <>
                <Link to="/my-trip">
                  <Button 
                    variant="outline" 
                    className="hidden sm:flex items-center gap-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                  >
                    <MapPin className="w-4 h-4" />
                    My Trips
                  </Button>
                </Link>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="relative flex items-center gap-2 rounded-full border border-gray-200 p-1.5 hover:border-orange-300 hover:shadow-md transition-all">
                      {(displayUser.picture || displayUser.picture_url) ? (
                        <>
                          <img 
                            src={displayUser.picture || displayUser.picture_url}  
                            alt={displayUser.name || 'User'}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallback = e.target.parentElement.querySelector('.profile-fallback');
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="profile-fallback w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 hidden items-center justify-center border-2 border-white shadow-sm"
                          >
                            {displayUser.name ? (
                              <span className="text-white text-sm font-semibold">
                                {displayUser.name.charAt(0).toUpperCase()}
                              </span>
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </>
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-2 border-white shadow-sm"
                        >
                          {displayUser.name ? (
                            <span className="text-white text-sm font-semibold">
                              {displayUser.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2" align="end">
                    <div className="px-3 py-3 border-b">
                      <div className="flex items-center gap-3">
                        {(displayUser.picture || displayUser.picture_url) ? (
                          <img 
                            src={displayUser.picture || displayUser.picture_url}  
                            alt={displayUser.name || 'User'}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-2 border-gray-200 ${(displayUser.picture || displayUser.picture_url) ? 'hidden' : ''}`}
                        >
                          {displayUser.name ? (
                            <span className="text-white text-lg font-semibold">
                              {displayUser.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <User className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{displayUser.name || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{displayUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/account"
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Account Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth/login">
                  <Button variant="outline" className="hidden sm:flex border-gray-200 hover:border-orange-300">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
