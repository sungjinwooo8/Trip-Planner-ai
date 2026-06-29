import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  DollarSign, 
  Star, 
  Filter, 
  X, 
  Search,
  Waves,
  Mountain,
  Building2,
  Landmark,
  Zap,
  Sun,
  Snowflake,
  Leaf,
  Cloud,
  Users,
  Heart,
  Baby,
  User,
  Calendar,
  TrendingUp
} from 'lucide-react';

// Sample destination data
const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    priceRange: 'moderate',
    comfortLevel: 'comfortable',
    type: 'beach',
    season: 'all',
    duration: 'week',
    travelStyle: ['couple', 'family', 'friends'],
    rating: 4.8,
    description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture.',
    bestTime: 'April - October',
    avgPrice: '$800-1200',
    features: ['Beaches', 'Temples', 'Rice Terraces', 'Nightlife']
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    priceRange: 'luxury',
    comfortLevel: 'luxury',
    type: 'beach',
    season: 'summer',
    duration: 'weekend',
    travelStyle: ['couple', 'friends'],
    rating: 4.9,
    description: 'Iconic white-washed buildings overlooking the Aegean Sea.',
    bestTime: 'May - September',
    avgPrice: '$1500-2500',
    features: ['Sunset Views', 'Wine Tasting', 'Beaches', 'Luxury Resorts']
  },
  {
    id: 3,
    name: 'Swiss Alps',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    priceRange: 'luxury',
    comfortLevel: 'luxury',
    type: 'mountain',
    season: 'winter',
    duration: 'week',
    travelStyle: ['couple', 'family', 'friends'],
    rating: 4.7,
    description: 'Majestic mountains, world-class skiing, and charming alpine villages.',
    bestTime: 'December - March',
    avgPrice: '$2000-3500',
    features: ['Skiing', 'Hiking', 'Scenic Trains', 'Luxury Hotels']
  },
  {
    id: 4,
    name: 'Tokyo, Japan',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    priceRange: 'moderate',
    comfortLevel: 'comfortable',
    type: 'city',
    season: 'all',
    duration: 'week',
    travelStyle: ['solo', 'couple', 'friends'],
    rating: 4.6,
    description: 'Futuristic city blending traditional culture with cutting-edge technology.',
    bestTime: 'March - May, September - November',
    avgPrice: '$1200-1800',
    features: ['Temples', 'Sushi', 'Technology', 'Shopping']
  },
  {
    id: 5,
    name: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    priceRange: 'moderate',
    comfortLevel: 'basic',
    type: 'cultural',
    season: 'all',
    duration: 'week',
    travelStyle: ['solo', 'couple', 'friends'],
    rating: 4.9,
    description: 'Ancient Incan citadel perched high in the Andes Mountains.',
    bestTime: 'May - September',
    avgPrice: '$1000-1500',
    features: ['History', 'Hiking', 'Archaeology', 'Scenic Views']
  },
  {
    id: 6,
    name: 'New Zealand',
    location: 'New Zealand',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800',
    priceRange: 'moderate',
    comfortLevel: 'comfortable',
    type: 'adventure',
    season: 'all',
    duration: 'extended',
    travelStyle: ['solo', 'couple', 'friends'],
    rating: 4.8,
    description: 'Adventure capital with stunning landscapes and outdoor activities.',
    bestTime: 'December - February',
    avgPrice: '$1500-2200',
    features: ['Bungee Jumping', 'Hiking', 'Fiords', 'Wildlife']
  },
  {
    id: 7,
    name: 'Maldives',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    priceRange: 'luxury',
    comfortLevel: 'luxury',
    type: 'beach',
    season: 'all',
    duration: 'weekend',
    travelStyle: ['couple', 'family'],
    rating: 4.9,
    description: 'Overwater bungalows and crystal-clear waters perfect for relaxation.',
    bestTime: 'November - April',
    avgPrice: '$2500-4000',
    features: ['Overwater Villas', 'Snorkeling', 'Spa', 'Luxury']
  },
  {
    id: 8,
    name: 'Iceland',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800',
    priceRange: 'moderate',
    comfortLevel: 'comfortable',
    type: 'adventure',
    season: 'all',
    duration: 'week',
    travelStyle: ['solo', 'couple', 'friends'],
    rating: 4.7,
    description: 'Land of fire and ice with geysers, glaciers, and Northern Lights.',
    bestTime: 'June - August, September - March',
    avgPrice: '$1800-2500',
    features: ['Northern Lights', 'Geysers', 'Glaciers', 'Hot Springs']
  },
  {
    id: 9,
    name: 'Paris, France',
    location: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    priceRange: 'moderate',
    comfortLevel: 'comfortable',
    type: 'city',
    season: 'all',
    duration: 'weekend',
    travelStyle: ['solo', 'couple', 'family'],
    rating: 4.8,
    description: 'City of lights, art, and romance with iconic landmarks.',
    bestTime: 'April - June, September - October',
    avgPrice: '$1200-2000',
    features: ['Eiffel Tower', 'Museums', 'Cuisine', 'Shopping']
  },
  {
    id: 10,
    name: 'Goa, India',
    location: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?w=800',
    priceRange: 'budget',
    comfortLevel: 'basic',
    type: 'beach',
    season: 'winter',
    duration: 'week',
    travelStyle: ['solo', 'couple', 'friends'],
    rating: 4.5,
    description: 'Vibrant beaches, Portuguese heritage, and laid-back atmosphere.',
    bestTime: 'November - February',
    avgPrice: '$400-800',
    features: ['Beaches', 'Nightlife', 'Heritage', 'Food']
  },
  {
    id: 11,
    name: 'Dubai, UAE',
    location: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    priceRange: 'luxury',
    comfortLevel: 'luxury',
    type: 'city',
    season: 'winter',
    duration: 'weekend',
    travelStyle: ['couple', 'family', 'friends'],
    rating: 4.6,
    description: 'Ultra-modern city with luxury shopping, skyscrapers, and desert adventures.',
    bestTime: 'November - March',
    avgPrice: '$1500-3000',
    features: ['Shopping', 'Desert Safari', 'Skyscrapers', 'Luxury']
  },
  {
    id: 12,
    name: 'Thailand',
    location: 'Thailand',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
    priceRange: 'budget',
    comfortLevel: 'comfortable',
    type: 'beach',
    season: 'all',
    duration: 'week',
    travelStyle: ['solo', 'couple', 'family', 'friends'],
    rating: 4.7,
    description: 'Tropical beaches, rich culture, and delicious cuisine.',
    bestTime: 'November - March',
    avgPrice: '$600-1000',
    features: ['Beaches', 'Temples', 'Food', 'Islands']
  }
];

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [],
    comfortLevel: [],
    type: [],
    season: [],
    duration: [],
    travelStyle: []
  });

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [],
      comfortLevel: [],
      type: [],
      season: [],
      duration: [],
      travelStyle: []
    });
    setSearchQuery('');
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPrice = filters.priceRange.length === 0 || 
        filters.priceRange.includes(dest.priceRange);

      // Comfort level filter
      const matchesComfort = filters.comfortLevel.length === 0 || 
        filters.comfortLevel.includes(dest.comfortLevel);

      // Type filter
      const matchesType = filters.type.length === 0 || 
        filters.type.includes(dest.type);

      // Season filter
      const matchesSeason = filters.season.length === 0 || 
        filters.season.includes(dest.season) ||
        (filters.season.includes('all') && dest.season === 'all');

      // Duration filter
      const matchesDuration = filters.duration.length === 0 || 
        filters.duration.includes(dest.duration);

      // Travel style filter
      const matchesTravelStyle = filters.travelStyle.length === 0 || 
        filters.travelStyle.some(style => dest.travelStyle.includes(style));

      return matchesSearch && matchesPrice && matchesComfort && matchesType && 
             matchesSeason && matchesDuration && matchesTravelStyle;
    });
  }, [searchQuery, filters]);

  const activeFilterCount = Object.values(filters).flat().length;

  const getTypeIcon = (type) => {
    const icons = {
      beach: Waves,
      mountain: Mountain,
      city: Building2,
      cultural: Landmark,
      adventure: Zap
    };
    return icons[type] || MapPin;
  };

  const getSeasonIcon = (season) => {
    const icons = {
      spring: Leaf,
      summer: Sun,
      fall: Leaf,
      winter: Snowflake,
      all: Cloud
    };
    return icons[season] || Cloud;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Discover Amazing Destinations
          </h1>
          <p className="text-gray-600 text-lg">
            Find your perfect travel destination with our curated collection
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 sticky top-20 z-40">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-6 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            {activeFilterCount > 0 && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                className="h-12"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price Range
                </label>
                <div className="space-y-2">
                  {['budget', 'moderate', 'luxury'].map(price => (
                    <button
                      key={price}
                      onClick={() => toggleFilter('priceRange', price)}
                      className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all ${
                        filters.priceRange.includes(price)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <span className="capitalize font-medium">{price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comfort Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Comfort Level
                </label>
                <div className="space-y-2">
                  {['basic', 'comfortable', 'luxury'].map(comfort => (
                    <button
                      key={comfort}
                      onClick={() => toggleFilter('comfortLevel', comfort)}
                      className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all ${
                        filters.comfortLevel.includes(comfort)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <span className="capitalize font-medium">{comfort}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Destination Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'beach', label: 'Beach', icon: Waves },
                    { value: 'mountain', label: 'Mountain', icon: Mountain },
                    { value: 'city', label: 'City', icon: Building2 },
                    { value: 'cultural', label: 'Cultural', icon: Landmark },
                    { value: 'adventure', label: 'Adventure', icon: Zap }
                  ].map(type => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => toggleFilter('type', type.value)}
                        className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          filters.type.includes(type.value)
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Season */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Best Season
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Seasons', icon: Cloud },
                    { value: 'spring', label: 'Spring', icon: Leaf },
                    { value: 'summer', label: 'Summer', icon: Sun },
                    { value: 'fall', label: 'Fall', icon: Leaf },
                    { value: 'winter', label: 'Winter', icon: Snowflake }
                  ].map(season => {
                    const Icon = season.icon;
                    return (
                      <button
                        key={season.value}
                        onClick={() => toggleFilter('season', season.value)}
                        className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          filters.season.includes(season.value)
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{season.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Trip Duration
                </label>
                <div className="space-y-2">
                  {['weekend', 'week', 'extended'].map(duration => (
                    <button
                      key={duration}
                      onClick={() => toggleFilter('duration', duration)}
                      className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all ${
                        filters.duration.includes(duration)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <span className="capitalize font-medium">{duration}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Travel Style
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'solo', label: 'Solo', icon: User },
                    { value: 'couple', label: 'Couple', icon: Heart },
                    { value: 'family', label: 'Family', icon: Baby },
                    { value: 'friends', label: 'Friends', icon: Users }
                  ].map(style => {
                    const Icon = style.icon;
                    return (
                      <button
                        key={style.value}
                        onClick={() => toggleFilter('travelStyle', style.value)}
                        className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          filters.travelStyle.includes(style.value)
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{style.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-orange-600">{filteredDestinations.length}</span> destinations
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map(dest => {
              const TypeIcon = getTypeIcon(dest.type);
              return (
                <Link
                  key={dest.id}
                  to={`/create-trip?destination=${encodeURIComponent(dest.name)}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x600?text=' + dest.name;
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{dest.rating}</span>
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <TypeIcon className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium capitalize">{dest.type}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {dest.location}
                      </p>
                      <p className="text-gray-700 text-sm mb-4 flex-1">
                        {dest.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dest.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Avg. Price</p>
                          <p className="text-lg font-bold text-gray-900">{dest.avgPrice}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Best Time</p>
                          <p className="text-sm font-medium text-gray-700">{dest.bestTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;

