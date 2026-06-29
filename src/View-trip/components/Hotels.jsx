import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingComparison from '@/components/BookingComparison';
import { Button } from '@/components/ui/button';
import { ExternalLink, DollarSign, X } from 'lucide-react';

// Replace with your Pexels API key
const PEXELS_API_KEY = "jkTXzyWcuD4lFMtj9wYgziiIVEEN6RrAwraovKartb2c795k0BNgdJxl";

const Hotels = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState({}); // State to store fetched hotel images
  const [selectedHotel, setSelectedHotel] = useState(null); // Track which hotel's booking comparison is open

  // Function to fetch images dynamically from Pexels API
  const fetchHotelImage = async (hotelName) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${hotelName}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: PEXELS_API_KEY, // Pass your API key
          },
        }
      );
      const data = await response.json();

      if (data?.photos?.length > 0) {
        return data.photos[0].src.large; // Return the first image URL (large size for better quality)
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
    }

    // Fallback to a default image if the fetch fails
    return "https://www.vivantahotels.com/content/dam/vivanta/hotels/vivanta-vijayawada/gallery/Vijaywada_Welcome-for-Web_3x2-02.jpg/jcr:content/renditions/cq5dam.web.756.756.jpeg";
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      // Handle multiple data structure variations - check root level first, then nested structures
      const hotels = trip?.tripdata?.hotels || 
                   trip?.tripdata?.hotel_options || 
                   trip?.tripdata?.HotelsOptions ||
                   trip?.tripdata?.hotels_options ||
                   trip?.tripdata?.tripPlan?.hotels ||
                   trip?.tripdata?.tripPlan?.HotelsOptions ||
                   trip?.tripdata?.travel_plan?.hotels ||
                   trip?.tripdata?.travel_plan?.HotelsOptions ||
                   trip?.tripdata?.travel_plan?.hotels_options ||
                   [];
      
      for (const hotel of hotels) {
        // Handle multiple naming conventions
        const hotelName = hotel?.HotelName || hotel?.name || hotel?.hotelName || hotel?.hotel_name || "hotel";
        const imageUrl = await fetchHotelImage(hotelName);
        images[hotelName] = imageUrl;
        // Store by all possible keys for compatibility
        if (hotel?.hotelName) images[hotel.hotelName] = imageUrl;
        if (hotel?.hotel_name) images[hotel.hotel_name] = imageUrl;
        if (hotel?.HotelName) images[hotel.HotelName] = imageUrl;
        if (hotel?.name) images[hotel.name] = imageUrl;
      }
      setHotelImages(images);
    };

      const hotels = trip?.tripdata?.hotels || 
                   trip?.tripdata?.hotel_options || 
                   trip?.tripdata?.HotelsOptions ||
                   trip?.tripdata?.hotels_options ||
                   trip?.tripdata?.tripPlan?.hotels ||
                   trip?.tripdata?.tripPlan?.HotelsOptions ||
                   trip?.tripdata?.travel_plan?.hotels ||
                   trip?.tripdata?.travel_plan?.HotelsOptions ||
                   trip?.tripdata?.travel_plan?.hotels_options ||
                   [];
    if (hotels && Array.isArray(hotels) && hotels.length > 0) {
      fetchImages();
    }
  }, [trip]);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🏨</span>
        </div>
        <h2 className="font-extrabold text-3xl text-gray-900">Hotel Recommendations</h2>
      </div>
      
      {(() => {
        // Handle multiple data structure variations - check root level first, then nested structures
        let hotels = trip?.tripdata?.hotels || 
                     trip?.tripdata?.hotel_options || 
                     trip?.tripdata?.HotelsOptions ||
                     trip?.tripdata?.hotels_options ||
                     trip?.tripdata?.tripPlan?.hotels ||
                     trip?.tripdata?.tripPlan?.HotelsOptions ||
                     trip?.tripdata?.travel_plan?.hotels ||
                     trip?.tripdata?.travel_plan?.HotelsOptions ||
                     trip?.tripdata?.travel_plan?.hotels_options ||
                     [];
        
        // Debug: Log what we found
        if (!hotels || hotels.length === 0) {
          console.log('🔍 Hotels search - tripdata structure:', {
            hasTripdata: !!trip?.tripdata,
            tripdataKeys: trip?.tripdata ? Object.keys(trip.tripdata) : [],
            hasTravelPlan: !!trip?.tripdata?.travel_plan,
            travelPlanKeys: trip?.tripdata?.travel_plan ? Object.keys(trip.tripdata.travel_plan) : [],
            rootHotels: trip?.tripdata?.hotels,
            rootHotelsOptions: trip?.tripdata?.HotelsOptions,
            travelPlanHotels: trip?.tripdata?.travel_plan?.hotels,
            travelPlanHotelsOptions: trip?.tripdata?.travel_plan?.HotelsOptions
          });
        }
        
        if (!hotels || !Array.isArray(hotels) || hotels.length === 0) {
          return (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-500">No hotel recommendations available for this trip.</p>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 gap-8">
            {hotels.map((hotel, index) => {
              // Handle multiple naming conventions from AI response
              const hotelName = hotel?.HotelName || hotel?.name || hotel?.hotelName || hotel?.hotel_name || 'Hotel Name';
              const hotelAddress = hotel?.['Hotel address'] || hotel?.address || hotel?.hotelAddress || hotel?.hotel_address || 'Address not available';
              const hotelPrice = hotel?.Price || hotel?.price || hotel?.pricePerNightINR || hotel?.pricePerNight || hotel?.price_per_night_eur || hotel?.price_per_night || 'Price on request';
              const hotelRating = hotel?.rating || 'N/A';
              const hotelImageUrl = hotel?.hotel_image_url || hotel?.image_url || hotel?.hotelimageUrl || hotel?.hotelImageUrl || hotel?.hotel_image_url;
              
              const imageUrl =
                hotelImages[hotelName] ||
                hotelImages[hotel?.hotelName] ||
                hotelImages[hotel?.name] ||
                hotelImageUrl ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop";

              return (
                <div key={index} className="space-y-4">
                  <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <Link
                      to={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        encodeURIComponent(hotelAddress || hotelName)
                      }
                      target="_blank"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          src={imageUrl} 
                          alt={hotelName} 
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="text-xs font-semibold text-orange-600">
                            ⭐ {hotelRating}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                        {hotelName}
                      </h3>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-base">📍</span>
                        <span className="line-clamp-2">{hotelAddress}</span>
                      </div>
                      {hotel?.description && (
                        <p className="text-xs text-gray-500 line-clamp-2">{hotel.description}</p>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <span>💵</span>
                          <span>{hotelPrice}</span>
                        </div>
                        <Link
                          to={
                            'https://www.google.com/maps/search/?api=1&query=' +
                            encodeURIComponent(hotelAddress || hotelName)
                          }
                          target="_blank"
                          className="text-xs text-orange-600 font-medium hover:underline"
                        >
                          View on Map →
                        </Link>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedHotel(selectedHotel === index ? null : index);
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        {selectedHotel === index ? 'Hide' : 'Compare'} Booking Prices
                      </Button>
                    </div>
                  </div>
                  
                  {/* Booking Comparison */}
                  {selectedHotel === index && (
                    <div className="relative">
                      <Button
                        onClick={() => setSelectedHotel(null)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <BookingComparison
                        hotelName={hotelName}
                        hotelAddress={hotelAddress}
                        checkIn={trip?.userselection?.checkIn || new Date().toISOString().split('T')[0]}
                        checkOut={trip?.userselection?.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                        guests={trip?.userselection?.travelers || 2}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
};

export default Hotels;
