import React, { useState, useEffect } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents([
        {
          "id": 1,
          "title": "Pongal Festival",
          "date": "January 14-17, 2025",
          "image": "./event1.jpg",
          "description": "A harvest festival celebrated across Tamil Nadu with traditional food, kolams, and bull-taming sports like Jallikattu."
        },
        {
          "id": 2,
          "title": "Thaipusam Festival - Palani",
          "date": "February 9, 2025",
          "image": "./event2.jpg",
          "description": "A spiritual festival where devotees walk in processions carrying ‘Kavadi’ to Murugan temples, particularly in Palani."
        },
        {
          "id": 3,
          "title": "Chithirai Festival - Madurai",
          "date": "April 2025",
          "image": "./event3.jpg",
          "description": "One of the longest religious festivals in the world, celebrating the wedding of Lord Sundareswarar and Goddess Meenakshi."
        },
        {
          "id": 4,
          "title": "Mahamaham Festival - Kumbakonam",
          "date": "Next in 2032",
          "image": "./event4.jpg",
          "description": "A once-in-12-years Hindu festival where devotees take a holy dip in the Mahamaham tank in Kumbakonam."
        },
        {
          "id": 5,
          "title": "Natyanjali Dance Festival - Chidambaram",
          "date": "March 2025",
          "image": "./event5.jpg",
          "description": "A festival dedicated to Lord Nataraja, featuring classical dance performances at the Chidambaram temple."
        },
        {
          "id": 6,
          "title": "Kaanum Pongal & Tourist Fair - Chennai",
          "date": "January 17, 2025",
          "image": "./event6.avif",
          "description": "A day where families visit beaches, parks, and tourist fairs, with cultural performances and food festivals."
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  

  // const fetchRecentEvents = async () => {
  //   try {
  //     const response = await fetch("https://your-api-endpoint.com/events"); // Replace with actual API
  //     const data = await response.json();
  //     setEvents(data);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //     setEvents([]); // Set empty array on error
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Recent Events</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{event.date}</p>
                <p className="text-gray-700 mt-2">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
