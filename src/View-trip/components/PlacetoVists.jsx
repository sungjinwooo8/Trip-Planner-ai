import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

// Replace with your Pexels API key
const PEXELS_API_KEY = "jkTXzyWcuD4lFMtj9wYgziiIVEEN6RrAwraovKartb2c795k0BNgdJxl"; // Replace with your Pexels API Key

const PlacetoVists = ({ trip }) => {
  const [placeImages, setPlaceImages] = useState({}); // To store images for each place

  // Fetch image from Pexels based on place name
  const getPlaceImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${placeName}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY, // Add the API key in the request header
          },
        }
      );
      const data = await response.json();

      if (data && data.photos && data.photos.length > 0) {
        return data.photos[0].src.small; // Return the small image URL from Pexels API
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }

    // Return a default image if Pexels API fails
    return "https://via.placeholder.com/150"; // Default image
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      const itinerary = trip?.tripdata?.itinerary || trip?.tripdata?.tripPlan?.itinerary || {};
      console.log('Itinerary data:', itinerary); // Debug log
      
      // Handle different itinerary structures
      if (Array.isArray(itinerary)) {
        // Array structure
        for (const day of itinerary) {
          // Check for activities array (Paris structure)
          if (day.activities && Array.isArray(day.activities)) {
            for (const activity of day.activities) {
              const placeName = activity?.placeName || activity?.place_name || activity?.PlaceName || activity?.place || "place";
              const imageUrl = await getPlaceImage(placeName);
              images[placeName] = imageUrl;
            }
          }
          // Check for plan array (Goa structure)
          else if (day.plan && Array.isArray(day.plan)) {
            for (const planItem of day.plan) {
              const placeName = planItem?.placeName || planItem?.place_name || planItem?.PlaceName || planItem?.place || "place";
              const imageUrl = await getPlaceImage(placeName);
              images[placeName] = imageUrl;
            }
          } else {
            const placeName = day?.placeName || day?.place_name || day?.PlaceName || day?.place || "place";
            const imageUrl = await getPlaceImage(placeName);
            images[placeName] = imageUrl;
          }
        }
      } else {
        // Object structure
        for (let dayKey of Object.keys(itinerary)) {
          const dayData = itinerary[dayKey];
          if (dayData.plan && Array.isArray(dayData.plan)) {
            // Structure with plan array
            for (const planItem of dayData.plan) {
              const placeName = planItem?.placeName || planItem?.place_name || planItem?.PlaceName || planItem?.place || "place";
              const imageUrl = await getPlaceImage(placeName);
              images[placeName] = imageUrl;
            }
          } else if (dayData.activities && Array.isArray(dayData.activities)) {
            // Structure with activities array
            for (const activity of dayData.activities) {
              const placeName = activity?.placeName || activity?.place_name || activity?.PlaceName || activity?.place || "place";
              const imageUrl = await getPlaceImage(placeName);
              images[placeName] = imageUrl;
            }
          } else {
            // Single item per day
            const placeName = dayData?.placeName || dayData?.place_name || dayData?.PlaceName || dayData?.place || "place";
            const imageUrl = await getPlaceImage(placeName);
            images[placeName] = imageUrl;
          }
        }
      }
      setPlaceImages(images);
    };

    const itinerary = trip?.tripdata?.itinerary || trip?.tripdata?.tripPlan?.itinerary;
    if (itinerary) {
      const hasData = Array.isArray(itinerary) ? itinerary.length > 0 : Object.keys(itinerary).length > 0;
      if (hasData) {
        fetchImages();
      }
    }
  }, [trip]);

  const handleNavigate = (placeName) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(placeName)}`;
    window.open(googleMapsUrl, "_blank"); // Opens the map in a new tab
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🗺️</span>
        </div>
        <h2 className="font-extrabold text-3xl text-gray-900">Places to Visit</h2>
      </div>

      {(() => {
        // Handle multiple data structure variations
        let itinerary = trip?.tripdata?.itinerary || 
                       trip?.tripdata?.Itinerary ||
                       trip?.tripdata?.tripPlan?.itinerary || 
                       trip?.tripdata?.travel_plan?.itinerary ||
                       {};
        
        // Handle different itinerary structures
        // Structure 1: Object with day keys (day1, day2, etc.) containing single item
        // Structure 2: Object with day keys containing plan arrays
        // Structure 3: Array of day objects with plan arrays
        // Structure 4: Array of day objects with activities arrays
        
        let itineraryItems = [];
        
        if (Array.isArray(itinerary)) {
          // If it's an array (Paris structure with activities, or travel_plan structure)
          itinerary.forEach((day, idx) => {
            const dayNumber = day.day || day.day_number || day.dayNumber || 
                            (day.date ? parseInt(day.date.match(/\d+/)?.[0]) : null) || 
                            idx + 1;
            
            // Check for activities array (Paris structure)
            if (day.activities && Array.isArray(day.activities)) {
              day.activities.forEach((activity, actIdx) => {
                itineraryItems.push({
                  dayKey: `day${dayNumber}`,
                  dayNumber: dayNumber,
                  item: activity,
                  index: `${idx}-${actIdx}`,
                  theme: day.theme
                });
              });
            }
            // Check for plan array (Goa structure)
            else if (day.plan && Array.isArray(day.plan)) {
              day.plan.forEach((planItem, planIdx) => {
                itineraryItems.push({
                  dayKey: `day${dayNumber}`,
                  dayNumber: dayNumber,
                  item: planItem,
                  index: `${idx}-${planIdx}`
                });
              });
            } else {
              // Single item per day
              itineraryItems.push({
                dayKey: `day${dayNumber}`,
                dayNumber: dayNumber,
                item: day,
                index: idx.toString()
              });
            }
          });
        } else {
          // If it's an object, process each day
          Object.keys(itinerary).forEach((dayKey) => {
            const dayData = itinerary[dayKey];
            const dayNumber = dayData.day || parseInt(dayKey.replace('day', '')) || 1;
            
            if (dayData.plan && Array.isArray(dayData.plan)) {
              // Structure with plan array
              dayData.plan.forEach((planItem, planIdx) => {
                itineraryItems.push({
                  dayKey: dayKey,
                  dayNumber: dayNumber,
                  item: planItem,
                  index: `${dayKey}-${planIdx}`
                });
              });
            } else if (dayData.activities && Array.isArray(dayData.activities)) {
              // Structure with activities array
              dayData.activities.forEach((activity, actIdx) => {
                itineraryItems.push({
                  dayKey: dayKey,
                  dayNumber: dayNumber,
                  item: activity,
                  index: `${dayKey}-${actIdx}`,
                  theme: dayData.theme
                });
              });
            } else {
              // Single item per day
              itineraryItems.push({
                dayKey: dayKey,
                dayNumber: dayNumber,
                item: dayData,
                index: dayKey
              });
            }
          });
        }
        
        if (itineraryItems.length === 0) {
          return (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-500">No itinerary available for this trip.</p>
            </div>
          );
        }

        return (
          <div className="space-y-8">
            {itineraryItems.map(({ dayKey, dayNumber, item, index, theme }) => {
              // Handle multiple naming conventions
              const placeName = item?.placeName || item?.place_name || item?.place || item?.PlaceName || 'Place Name';
              const placeDetails = item?.["Place Details"] || item?.PlaceDetails || item?.placeDetails || item?.place_details || item?.details || 'No details available';
              const ticketPricing = item?.["ticket Pricing"] || item?.ticket_pricing || item?.ticketPricing || item?.ticket_pricing_eur || item?.ticket_pricing_inr || item?.["ticketPricing NR"] || item?.ticketPricingNR || item?.ticketPricingINR;
              const placeImageUrl = item?.['Place Image Url'] || item?.PlaceImageUrl || item?.placelmageUrl || item?.placeImageUrl || item?.place_image_url || item?.image_url;
              const timeSpent = item?.time || item?.Time || item?.timeSpentAtLocation || item?.time_spent_at_location_hours || item?.bestTimeTovisit || item?.best_time_to_visit_today || 'Full Day';
              
              const imageUrl = placeImages[placeName] || 
                             placeImages[item?.place] ||
                             placeImages[item?.PlaceName] ||
                             placeImageUrl || 
                             "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop";
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                    <h2 className="font-bold text-xl text-white capitalize">
                      Day {dayNumber}{theme ? ` - ${theme}` : ''} - {timeSpent}
                    </h2>
                  </div>
                  
                  {/* Place Content */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={imageUrl}
                          alt={placeName}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-900 mb-2">
                            {placeName}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {placeDetails}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                          {item?.rating && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-lg">
                              <span className="text-yellow-600">⭐</span>
                              <span className="text-sm font-semibold text-gray-900">{item.rating} stars</span>
                            </div>
                          )}
                          {ticketPricing && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                              <span className="text-green-600">🎟️</span>
                              <span className="text-sm font-semibold text-gray-900">
                                {ticketPricing === "0" ? "Free" : ticketPricing}
                              </span>
                            </div>
                          )}
                          {timeSpent && timeSpent !== 'Full Day' && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                              <span className="text-blue-600">🕐</span>
                              <span className="text-sm font-semibold text-gray-900">{timeSpent}</span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => handleNavigate(placeName)}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <span className="mr-2">🎯</span>
                          Navigate on Google Maps
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
};

export default PlacetoVists;
