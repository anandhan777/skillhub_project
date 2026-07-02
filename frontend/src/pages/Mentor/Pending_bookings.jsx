import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user=JSON.parse(localStorage.getItem("user"));
  const mentorId=user.id;

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/mentor/pendingbookings/${mentorId}`);
      setBookings(res.data.filter(b => b.status === "pending")); // only pending
    };
    fetchBookings();
  }, [mentorId]);

  const handleDecision = async (bookingId, status, classroomLink) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/showbookings/${bookingId}`, {
        status,
        classroomLink
      });
      alert(`Booking ${status}`);
      // update local state
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  return (
    <div className="bg-white  rounded p-4">
      <h2 className="text-xl font-bold mb-4">Pending Bookings</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        bookings.map(booking => (
          <div key={booking._id} className="border-b py-4">
            <p className="font-semibold">{booking.userId.name}</p>
            <p>{booking.topic} — {new Date(booking.date).toLocaleDateString()} {booking.time}</p>

            <div className="flex items-center gap-2 mt-2">
              {/* <input
                type="text"
                placeholder="Classroom link"
                className="border rounded-xl px-2 py-1 flex-1"
                onChange={e => booking.classroomLink = e.target.value}
              /> */}
              <button
                onClick={() => handleDecision(booking._id, "confirmed", booking.classroomLink)}
                className="bg-blue-500 text-white px-3 py-1 rounded-full"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision(booking._id, "rejected")}
                className="bg-transparent text-blue-700 border-2 border-blue-600 px-3 py-1 rounded-full"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingBookings;
