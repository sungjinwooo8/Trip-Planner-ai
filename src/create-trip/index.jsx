import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { AI_PROMT, selectBudgetOption, SelectTravelList } from "@/constant/option";
import { toast } from "@/hooks/use-toast";
import { generateTripPlan, listAvailableModels, updateModelFromAvailable, getChatSession } from "@/service/AImodal";
import React, { useEffect, useState } from "react";
import { saveTrip } from "@/service/database";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get destination from URL query parameter
  useEffect(() => {
    const destination = searchParams.get('destination');
    if (destination) {
      setPlace(destination);
      handleInputChange('location', destination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleInputChange = (name, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Removed excessive logging - formdata is tracked via state

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to login page instead of showing dialog
      navigate('/auth/login');
      return;
    }
    if (
      !formdata?.location ||
      !formdata?.days ||
      formdata?.days > 30 ||
      !formdata?.budget ||
      !formdata?.traveler
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields: destination, days (max 30), budget, and travelers.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const FINAL_PROMT = AI_PROMT
      .replace("{location}", formdata?.location)
      .replace("{days}", formdata?.days)
      .replace("{traveler}", formdata?.traveler)
      .replace("{budget}", formdata?.budget);

    try {
      // First, try to list available models and update to a working one
      const modelsData = await listAvailableModels();
      
      // Try to update model to one that supports generateContent
      if (modelsData && modelsData.modelName) {
        await updateModelFromAvailable();
      }
      
      // Try using generateContent directly first (more reliable)
      let tripData;
      try {
        tripData = await generateTripPlan(FINAL_PROMT);
      } catch (directError) {
        // Fallback to chatSession if generateContent fails
        const chatSession = getChatSession();
        const result = await chatSession.sendMessage(FINAL_PROMT);
        tripData = result?.response?.text();
      }
      setLoading(false);
      Saveaitrip(tripData);
    } catch (error) {
      console.error('Error generating trip:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      setLoading(false);
      
      let errorMessage = "Failed to generate trip. Please try again.";
      
      if (error.message?.includes('404')) {
        errorMessage = "Model not found. Check: 1) Generative Language API is enabled, 2) API key has access to the API, 3) API key is from the same project.";
      } else if (error.message?.includes('403') || error.message?.includes('API key not valid')) {
        errorMessage = "API key issue. Check: 1) Key is correct, 2) Key has Generative Language API enabled, 3) Key restrictions allow the API.";
      } else if (error.message?.includes('API key')) {
        errorMessage = "Invalid API key. Please verify your Gemini API key in Google Cloud Console.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const Saveaitrip = async (tripdata) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docid = Date.now().toString();
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanedData = tripdata.trim();
      
      // Remove ```json at the start
      if (cleanedData.startsWith('```json')) {
        cleanedData = cleanedData.replace(/^```json\s*/i, '');
      } else if (cleanedData.startsWith('```')) {
        cleanedData = cleanedData.replace(/^```\s*/i, '');
      }
      
      // Remove ``` at the end
      if (cleanedData.endsWith('```')) {
        cleanedData = cleanedData.replace(/\s*```$/i, '');
      }
      
      // Parse the cleaned JSON
      const parsedData = JSON.parse(cleanedData.trim());
      
      await saveTrip({
        userselection: formdata,
        tripdata: parsedData,
        userEmail: user?.email,
        id: docid,
      });
      setLoading(false);
      navigate('/view-trip/' + docid);
    } catch (error) {
      console.error('Error saving trip:', error);
      setLoading(false);
      
      // Provide more specific error messages
      let errorMessage = "Failed to save trip. Please try again.";
      if (error?.message?.includes('Failed to fetch') || error?.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        errorMessage = "Network error: Unable to connect to database. Please check your internet connection and Supabase configuration.";
      } else if (error?.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      toast({
        title: "Error Saving Trip",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
    
    if (!apiKey) {
      console.error('VITE_GEOAPIFY_API_KEY is not set in environment variables');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Geoapify API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
      setSuggestions([]);
    }

    setLoading(false);
  };

  const handleInputChangeAndSuggestions = (e) => {
    const query = e.target.value;
    setPlace(query);
    handleInputChange("location", query);
    if (query) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const selectedPlace = suggestion.properties.formatted;
    setPlace(selectedPlace);
    handleInputChange("location", selectedPlace);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-4">
            <span>✨</span>
            <span>AI-Powered Trip Planning</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Tell us your <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">travel preferences</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Just provide some basic information, and our AI trip planner will generate
            a customized itinerary based on your preferences.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 space-y-10">
          {/* Destination Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span className="text-2xl">📍</span>
              What is your destination of choice?
            </label>
            <div className="relative">
              <Input
                type="text"
                value={place}
                onChange={handleInputChangeAndSuggestions}
                placeholder="Search for a destination (e.g., Paris, Tokyo, New York)..."
                className="w-full h-12 text-base border-2 border-gray-200 focus:border-orange-500 rounded-xl pl-4 pr-4"
              />
              {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="loader"></div>
                </div>
              )}
            </div>
            {suggestions.length > 0 && (
              <ul className="border-2 border-gray-200 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg bg-white">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.properties.place_id}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="p-4 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📍</span>
                      <span className="font-medium text-gray-900">{suggestion.properties.formatted}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Days Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span className="text-2xl">📅</span>
              How many days are you planning your trip?
            </label>
            <Input
              placeholder="Enter number of days (e.g., 3, 5, 7)..."
              type="number"
              min="1"
              max="30"
              onChange={(e) => handleInputChange("days", e.target.value)}
              className="h-12 text-base border-2 border-gray-200 focus:border-orange-500 rounded-xl"
            />
          </div>

          {/* Budget Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span className="text-2xl">💰</span>
              What is your budget?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectBudgetOption.map((item, index) => (
                <div
                  onClick={() => handleInputChange("budget", item.title)}
                  key={index}
                  className={`p-6 border-2 cursor-pointer rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    formdata?.budget === item.title
                      ? "border-orange-500 bg-orange-50 shadow-lg ring-2 ring-orange-200"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="text-5xl mb-3 text-center">{item.icon}</div>
                  <h3 className="font-bold text-xl text-center mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Traveler Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span className="text-2xl">👥</span>
              Who do you plan on traveling with?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SelectTravelList.map((item, index) => (
                <div
                  onClick={() => handleInputChange("traveler", item.title)}
                  key={index}
                  className={`p-6 border-2 cursor-pointer rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    formdata?.traveler === item.title
                      ? "border-orange-500 bg-orange-50 shadow-lg ring-2 ring-orange-200"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="text-4xl mb-3 text-center">{item.icon}</div>
                  <h3 className="font-bold text-lg text-center mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-6 flex justify-center">
            <Button 
              onClick={OnGenerateTrip} 
              disabled={loading}
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="loader"></div>
                  <span>Generating your perfect trip...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>✨</span>
                  <span>Generate Trip</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default CreateTrip;
