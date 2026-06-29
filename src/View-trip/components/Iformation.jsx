import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

// Replace with your Pexels API key
const PEXELS_API_KEY = "jkTXzyWcuD4lFMtj9wYgziiIVEEN6RrAwraovKartb2c795k0BNgdJxl";

const Information = ({ trip }) => {
  const [destinationImage, setDestinationImage] = useState(
    "https://t4.ftcdn.net/jpg/00/65/48/25/240_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg" // Fallback image
  );

  // Function to fetch an image based on location dynamically
  const fetchDestinationImage = async (location) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${location}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY, // Pass your API key
          },
        }
      );
      const data = await response.json();

      if (data?.photos?.length > 0) {
        setDestinationImage(data.photos[0].src.large); // Update state with the fetched image
      }
    } catch (error) {
      console.error("Error fetching destination image:", error);
    }
  };

  useEffect(() => {
    if (trip?.userselection?.location) {
      fetchDestinationImage(trip.userselection.location);
    }
  }, [trip?.userselection?.location]);

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <img
          className="w-full h-full object-cover"
          src={destinationImage}
          alt={trip?.userselection?.location || "Trip destination"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            {trip?.userselection?.location || "Unknown Destination"}
          </h1>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <span>🗓️</span>
              <span>{trip?.userselection?.days || 0} Days</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <span>💰</span>
              <span>{trip?.userselection?.budget || "N/A"} Budget</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <span>👥</span>
              <span>{trip?.userselection?.traveler || "Solo"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">✈️</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Your Adventure Awaits</p>
            <p className="font-semibold text-gray-900">Ready to explore?</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="mr-2">📤</span>
          Share Trip
        </Button>
      </div>
    </div>
  );
};

export default Information;
