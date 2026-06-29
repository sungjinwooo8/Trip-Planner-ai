import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, MapPin, Plane, Compass, CheckCircle2, Rocket, Calendar, Map, Globe } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const Hero = () => {
  const [user, setUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get user from localStorage
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  };

  // Initialize user state
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  // Listen for user updates
  useEffect(() => {
    const handleUserUpdate = () => {
      const currentUser = getUser();
      const wasLoggedOut = !user && currentUser;
      
      if (wasLoggedOut && location.pathname === '/') {
        setJustLoggedIn(true);
        setShowSuccess(true);
        // Hide success animation after 4 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
        // Reset justLoggedIn after animation completes
        setTimeout(() => {
          setJustLoggedIn(false);
        }, 5000);
      }
      
      setUser(currentUser);
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    
    // Also check if user exists when component mounts (in case they navigate to home after login)
    const currentUser = getUser();
    if (currentUser && !user && location.pathname === '/') {
      // Check if we just logged in (check sessionStorage flag)
      const justLoggedInFlag = sessionStorage.getItem('justLoggedIn');
      if (justLoggedInFlag === 'true') {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
        sessionStorage.removeItem('justLoggedIn');
      }
    }
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [user, location.pathname]);

  // Update when route changes
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, [location.pathname]);

  // Confetti effect for success animation
  const confettiElements = showSuccess ? Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="confetti"
      style={{
        left: `${Math.random() * 100}%`,
        top: '-10px',
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
        width: `${8 + Math.random() * 8}px`,
        height: `${8 + Math.random() * 8}px`,
      }}
    />
  )) : null;

  if (user) {
    // Logged in state
    return (
      <div className='relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden'>
        {/* Animated Background Gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,157,12,0.1),transparent_50%)] -z-10'></div>
        
        {/* Confetti Effect */}
        {confettiElements}

        {/* Success Message Overlay */}
        {showSuccess && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-success-fade-in'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-4 transform animate-success-bounce'>
              <div className='flex flex-col items-center gap-4'>
                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-success-pulse'>
                  <CheckCircle2 className='w-12 h-12 text-white' />
                </div>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Welcome Back!</h2>
                <p className='text-gray-600 text-center'>
                  {user.name ? `Hi ${user.name.split(' ')[0]}!` : 'You\'re successfully logged in!'}
                </p>
                <p className='text-sm text-gray-500 text-center'>Ready to plan your next adventure?</p>
              </div>
            </div>
          </div>
        )}

        {/* Floating Icons */}
        <div className='absolute top-20 left-10 animate-float hidden lg:block'>
          <Plane className='w-8 h-8 text-orange-400 opacity-60' />
        </div>
        <div className='absolute top-40 right-20 animate-float-delayed hidden lg:block'>
          <MapPin className='w-6 h-6 text-blue-400 opacity-60' />
        </div>
        <div className='absolute bottom-32 left-20 animate-float-slow hidden lg:block'>
          <Compass className='w-7 h-7 text-purple-400 opacity-60' />
        </div>

        <div className='max-w-5xl mx-auto text-center space-y-8 animate-success-slide-up'>
          {/* Welcome Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium animate-success-fade-in'>
            <CheckCircle2 className='w-4 h-4' />
            <span>Welcome back, {user.name ? user.name.split(' ')[0] : 'Traveler'}!</span>
          </div>

          {/* Main Heading */}
          <h1 className='font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight'>
            <span className='bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent animate-gradient'>
              Ready to Plan Your Next
            </span>
            <br />
            <span className='text-gray-900'>Adventure?</span>
          </h1>

          {/* Description */}
          <p className='text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Create personalized itineraries, discover amazing places, and get AI-powered recommendations 
            tailored just for you.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
            <Link to='/create-trip'>
              <Button size="lg" className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                <Rocket className='w-5 h-5 mr-2' />
                Create New Trip
              </Button>
            </Link>
            <Link to='/my-trip'>
              <Button size="lg" variant="outline" className='px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300'>
                <Calendar className='w-5 h-5 mr-2' />
                View My Trips
              </Button>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-200'>
            <div className='flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-orange-50 transition-all duration-300 cursor-pointer group' onClick={() => navigate('/create-trip')}>
              <div className='w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Rocket className='w-8 h-8 text-white' />
              </div>
              <h3 className='font-semibold text-gray-900'>Create Trip</h3>
              <p className='text-sm text-gray-600 text-center'>Start planning your next journey</p>
            </div>
            <div className='flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer group' onClick={() => navigate('/my-trip')}>
              <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Map className='w-8 h-8 text-white' />
              </div>
              <h3 className='font-semibold text-gray-900'>My Trips</h3>
              <p className='text-sm text-gray-600 text-center'>View all your saved trips</p>
            </div>
            <div className='flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-purple-50 transition-all duration-300 cursor-pointer group' onClick={() => navigate('/destinations')}>
              <div className='w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Globe className='w-8 h-8 text-white' />
              </div>
              <h3 className='font-semibold text-gray-900'>Explore Destinations</h3>
              <p className='text-sm text-gray-600 text-center'>Discover amazing places</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in state
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden'>
      {/* Animated Background Gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,157,12,0.1),transparent_50%)] -z-10'></div>
      
      {/* Floating Icons */}
      <div className='absolute top-20 left-10 animate-float hidden lg:block'>
        <Plane className='w-8 h-8 text-orange-400 opacity-60' />
      </div>
      <div className='absolute top-40 right-20 animate-float-delayed hidden lg:block'>
        <MapPin className='w-6 h-6 text-blue-400 opacity-60' />
      </div>
      <div className='absolute bottom-32 left-20 animate-float-slow hidden lg:block'>
        <Compass className='w-7 h-7 text-purple-400 opacity-60' />
      </div>

      <div className='max-w-5xl mx-auto text-center space-y-8'>
        {/* Badge */}
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium'>
          <Sparkles className='w-4 h-4' />
          <span>Powered by AI</span>
        </div>

        {/* Main Heading */}
        <h1 className='font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight'>
          <span className='bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent animate-gradient'>
            Discover Your Next Adventure
          </span>
          <br />
          <span className='text-gray-900'>Let AI Craft the Ultimate Travel Plan</span>
        </h1>

        {/* Description */}
        <p className='text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
          Build, personalize, and optimize your itineraries with our free AI trip planner. 
          Designed for vacations, workations, and everyday adventures.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
          <Link to='/auth/signup'>
            <Button size="lg" className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
              Get Started, It's Free
            </Button>
          </Link>
          <Link to='/auth/login'>
            <Button size="lg" variant="outline" className='px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300'>
              Sign In
            </Button>
          </Link>
          <Link to='/destinations'>
            <Button size="lg" variant="outline" className='px-8 py-6 text-lg font-semibold border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300'>
              <Globe className='w-5 h-5 mr-2' />
              Explore Destinations
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-200'>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center'>
              <Sparkles className='w-6 h-6 text-orange-600' />
            </div>
            <h3 className='font-semibold text-gray-900'>AI-Powered</h3>
            <p className='text-sm text-gray-600 text-center'>Smart recommendations tailored to your preferences</p>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
              <MapPin className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='font-semibold text-gray-900'>Custom Itineraries</h3>
            <p className='text-sm text-gray-600 text-center'>Detailed day-by-day plans with places to visit</p>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center'>
              <Plane className='w-6 h-6 text-purple-600' />
            </div>
            <h3 className='font-semibold text-gray-900'>Hotel Recommendations</h3>
            <p className='text-sm text-gray-600 text-center'>Curated hotels matching your budget and style</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero