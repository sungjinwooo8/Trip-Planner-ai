import { getTripById } from '@/service/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Information from '../components/Iformation';
import Hotels from '../components/Hotels';
import PlacetoVists from '../components/PlacetoVists';

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    try {
      setLoading(true);
      const tripData = await getTripById(tripId);
      if (tripData) {
        
        // Parse JSONB fields if they're strings (Supabase sometimes returns JSONB as strings)
        let parsedTripData = { ...tripData };
        
        if (typeof tripData.tripdata === 'string') {
          try {
            parsedTripData.tripdata = JSON.parse(tripData.tripdata);
            console.log("Parsed tripdata:", parsedTripData.tripdata);
          } catch (e) {
            console.error("Error parsing tripdata:", e);
          }
        }
        
        if (typeof tripData.userselection === 'string') {
          try {
            parsedTripData.userselection = JSON.parse(tripData.userselection);
          } catch (e) {
            console.error("Error parsing userselection:", e);
          }
        }
        
        // Debug logging removed - data structure is now handled by components
        
        setTrip(parsedTripData);
      } else {
        console.log("No trip found with ID:", tripId);
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto space-y-12'>
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">⏳</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading trip details...</h3>
                <p className="text-gray-600">
                  Please wait while we fetch your trip information.
                </p>
              </div>
            </div>
          ) : !trip || Object.keys(trip).length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Trip Not Found</h3>
                <p className="text-gray-600">
                  We couldn't find a trip with that ID. Please check the URL and try again.
                </p>
              </div>
            </div>
          ) : (
            <>
              <Information trip={trip}/>
              <Hotels trip={trip}/>
              <PlacetoVists trip={trip}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewtrip;
