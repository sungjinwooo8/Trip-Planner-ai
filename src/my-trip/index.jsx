import { getUserTrips } from '@/service/database'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usertripcard from './componets/Usertripcard';

const Mytrip = () => {
    const navigation = useNavigate();
    const [usertrips, setusertrips] = useState([]);

    useEffect(() => {
        GetUserTrip();
    }, []);

    const GetUserTrip = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            console.log('No user found, redirecting to login.');
            navigation('/auth/login'); // Redirect to login if no user found
            return;
        }
        const user = JSON.parse(userStr);
        setusertrips([]);
        console.log('Fetching trips for user:', user?.email); // Debug log

        try {
            const trips = await getUserTrips(user?.email);
            if (trips.length === 0) {
                console.log('No trips found for this user.');
            } else {
                setusertrips(trips);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className='font-extrabold text-4xl sm:text-5xl text-gray-900 mb-3'>
                        My <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Trips</span>
                    </h1>
                    <p className='text-lg text-gray-600'>
                        {usertrips.length === 0 
                            ? 'Start planning your first adventure!' 
                            : `You have ${usertrips.length} ${usertrips.length === 1 ? 'trip' : 'trips'} saved`
                        }
                    </p>
                </div>

                {/* Trips Grid */}
                {usertrips.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-5xl">✈️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No trips yet</h3>
                            <p className="text-gray-600 mb-6">
                                Start planning your first adventure by creating a new trip!
                            </p>
                            <a 
                                href="/create-trip"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <span>✨</span>
                                <span>Create Your First Trip</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {usertrips.map((trip, index) => (
                            <Usertripcard key={trip.id || index} trip={trip} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mytrip;
