

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for Booking History
export const BookingHistoryContext = createContext();

export const BookingHistoryProvider = ({ children }) => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async (retryCount = 3) => {
      try {
        const response = await axios.get('http://10.0.2.2:5000/api/bookings'); // Adjust URL as needed
        setBookingHistory(response.data);
      } catch (err) {
        if (retryCount > 0) {
          console.warn(`Retrying... attempts left: ${retryCount}`);
          setTimeout(() => fetchBookingHistory(retryCount - 1), 1000); // Retry after 1 second
        } else {
          console.error('Error fetching booking history:', err.message);
          console.error('Full error details:', err.response?.data || err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  return (
    <BookingHistoryContext.Provider value={{ bookingHistory, setBookingHistory, loading }}>
      {children}
    </BookingHistoryContext.Provider>
  );
};
