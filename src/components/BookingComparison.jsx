import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Building2,
  Globe,
  CreditCard
} from 'lucide-react';

const BookingComparison = ({ hotelName, hotelAddress, checkIn, checkOut, guests = 2 }) => {
  const [loading, setLoading] = useState(false);
  
  // Mock booking platforms data - In production, this would come from APIs
  const bookingPlatforms = [
    {
      name: 'Booking.com',
      icon: '🏨',
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.8,
      features: ['Free Cancellation', 'Breakfast Included', 'Best Price Guarantee'],
      link: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName)}`,
      badge: 'Best Price',
      color: 'blue'
    },
    {
      name: 'Expedia',
      icon: '✈️',
      price: 125,
      originalPrice: 160,
      discount: 22,
      rating: 4.7,
      features: ['Rewards Points', 'Member Discount', 'Price Match'],
      link: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(hotelName)}`,
      badge: null,
      color: 'purple'
    },
    {
      name: 'Agoda',
      icon: '🌏',
      price: 115,
      originalPrice: 145,
      discount: 21,
      rating: 4.6,
      features: ['Instant Confirmation', 'Mobile Exclusive', 'Last Minute Deal'],
      link: `https://www.agoda.com/search?city=${encodeURIComponent(hotelName)}`,
      badge: 'Mobile Deal',
      color: 'green'
    },
    {
      name: 'Hotels.com',
      icon: '🏩',
      price: 130,
      originalPrice: 155,
      discount: 16,
      rating: 4.5,
      features: ['Rewards Night', 'Price Match', 'VIP Access'],
      link: `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(hotelName)}`,
      badge: null,
      color: 'orange'
    },
    {
      name: 'Airbnb',
      icon: '🏡',
      price: 95,
      originalPrice: null,
      discount: null,
      rating: 4.9,
      features: ['Entire Place', 'Kitchen Access', 'Local Experience'],
      link: `https://www.airbnb.com/s/${encodeURIComponent(hotelName)}`,
      badge: 'Alternative',
      color: 'pink'
    },
    {
      name: 'TripAdvisor',
      icon: '⭐',
      price: 128,
      originalPrice: 152,
      discount: 16,
      rating: 4.7,
      features: ['Price Comparison', 'Reviews', 'Best Value'],
      link: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(hotelName)}`,
      badge: null,
      color: 'teal'
    }
  ];

  // Sort by price (lowest first)
  const sortedPlatforms = [...bookingPlatforms].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPlatforms[0];
  const savings = bestPrice.originalPrice ? bestPrice.originalPrice - bestPrice.price : 0;

  const handleBooking = (platform) => {
    setLoading(true);
    // Open booking link in new tab
    window.open(platform.link, '_blank');
    setTimeout(() => setLoading(false), 1000);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      pink: 'bg-pink-50 border-pink-200 text-pink-700',
      teal: 'bg-teal-50 border-teal-200 text-teal-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Best Booking Prices
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Compare prices across top booking platforms
          </p>
        </div>
        {bestPrice && (
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
              <TrendingDown className="w-5 h-5" />
              ${bestPrice.price}
            </div>
            {savings > 0 && (
              <p className="text-xs text-gray-500">Save ${savings}/night</p>
            )}
          </div>
        )}
      </div>

      {/* Best Deal Highlight */}
      {bestPrice && (
        <div className={`mb-6 p-4 rounded-lg border-2 ${getColorClasses(bestPrice.color)}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{bestPrice.icon}</span>
                <h4 className="font-bold text-lg">{bestPrice.name}</h4>
                {bestPrice.badge && (
                  <span className="px-2 py-1 bg-white rounded-md text-xs font-semibold">
                    {bestPrice.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <span className="text-3xl font-bold">${bestPrice.price}</span>
                  {bestPrice.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${bestPrice.originalPrice}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-green-600 ml-2">
                    {bestPrice.discount}% off
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{bestPrice.rating}</span>
                </div>
              </div>
              <ul className="space-y-1 mb-4">
                {bestPrice.features.map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleBooking(bestPrice)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Book on {bestPrice.name} - Best Price
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* All Platforms Comparison */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Compare All Platforms
        </h4>
        {sortedPlatforms.map((platform, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              idx === 0
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{platform.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-gray-900">{platform.name}</h5>
                    {platform.badge && (
                      <span className="px-2 py-0.5 bg-gray-200 rounded text-xs font-medium">
                        {platform.badge}
                      </span>
                    )}
                    {idx === 0 && (
                      <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-semibold">
                        Lowest
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{platform.rating}</span>
                    </div>
                    {platform.discount && (
                      <span className="text-green-600 font-semibold">
                        {platform.discount}% off
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ${platform.price}
                  </div>
                  {platform.originalPrice && (
                    <div className="text-xs text-gray-500 line-through">
                      ${platform.originalPrice}
                    </div>
                  )}
                  <div className="text-xs text-gray-500">per night</div>
                </div>
                <Button
                  onClick={() => handleBooking(platform)}
                  variant="outline"
                  size="sm"
                  className="border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Book
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Price Comparison Tips:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Prices are estimates and may vary based on dates and availability</li>
            <li>Always check cancellation policies before booking</li>
            <li>Some platforms offer member discounts and rewards</li>
            <li>Prices shown are per night for {guests} {guests === 1 ? 'guest' : 'guests'}</li>
          </ul>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{sortedPlatforms.length}</div>
          <div className="text-xs text-gray-600">Platforms</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${sortedPlatforms[sortedPlatforms.length - 1].price - bestPrice.price}
          </div>
          <div className="text-xs text-gray-600">Price Range</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {(sortedPlatforms.reduce((sum, p) => sum + p.rating, 0) / sortedPlatforms.length).toFixed(1)}
          </div>
          <div className="text-xs text-gray-600">Avg Rating</div>
        </div>
      </div>
    </div>
  );
};

export default BookingComparison;

