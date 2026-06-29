import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react'

const Usertripcard = ({trip}) => {
  const navigate = useNavigate()
  
  const getDestinationImage = () => {
    // Try to get image from trip data, otherwise use placeholder
    if (trip?.tripdata?.hotels?.[0]?.hotel_image_url) {
      return trip.tripdata.hotels[0].hotel_image_url
    }
    return `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop`
  }

  return (
    <div 
      onClick={() => navigate(`/view-trip/${trip.id}`)}
      className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02] border border-gray-100'
    >
      {/* Image */}
      <div className='relative h-48 overflow-hidden'>
        <img 
          src={getDestinationImage()} 
          alt={trip?.userselection?.location || 'Trip destination'} 
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
        
        {/* Badge */}
        <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full'>
          <span className='text-xs font-semibold text-orange-600'>{trip?.userselection?.budget || 'Moderate'}</span>
        </div>
      </div>

      {/* Content */}
      <div className='p-5 space-y-3'>
        <div>
          <h3 className='font-bold text-xl text-gray-900 mb-1 line-clamp-1'>
            {trip?.userselection?.location || 'Unknown Destination'}
          </h3>
          <p className='text-sm text-gray-500 line-clamp-2'>
            {trip?.tripdata?.trip_details?.destination || trip?.userselection?.location}
          </p>
        </div>

        {/* Trip Details */}
        <div className='flex flex-wrap gap-3 pt-2'>
          <div className='flex items-center gap-1.5 text-sm text-gray-600'>
            <Calendar className='w-4 h-4 text-orange-500' />
            <span className='font-medium'>{trip?.userselection?.days || 0} Days</span>
          </div>
          <div className='flex items-center gap-1.5 text-sm text-gray-600'>
            <DollarSign className='w-4 h-4 text-green-500' />
            <span className='font-medium'>{trip?.userselection?.budget || 'N/A'}</span>
          </div>
          <div className='flex items-center gap-1.5 text-sm text-gray-600'>
            <Users className='w-4 h-4 text-blue-500' />
            <span className='font-medium'>{trip?.userselection?.traveler || 'Solo'}</span>
          </div>
        </div>

        {/* View Trip Button */}
        <div className='pt-2 border-t border-gray-100'>
          <div className='flex items-center justify-between text-orange-600 font-semibold text-sm group-hover:text-orange-700 transition-colors'>
            <span>View Details</span>
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usertripcard