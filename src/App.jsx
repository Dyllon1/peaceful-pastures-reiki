import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState(() => {
    const saved = localStorage.getItem('bookedSlots');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  const getSlots = (date) => {
    if (!date) return [];
    const day = date.getDay();
    const key = date.toLocaleDateString();
    
    const all = day === 6 
      ? ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM']
      : ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    
    const booked = bookedSlots[key] || [];
    return all.filter(t => !booked.includes(t));
  };

  const slots = selectedDate ? getSlots(selectedDate) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = selectedDate.toLocaleDateString();
    setBookedSlots(prev => ({ ...prev, [key]: [...(prev[key] || []), selectedTime] }));
    setMessage("Booking confirmed! Melissa will contact you shortly to arrange payment ($125/session). Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-teal-50">
      <style jsx>{`
        .react-datepicker {
          font-family: 'Georgia', serif;
          width: 100% !important;
          border: none;
          background: white;
        }
        .react-datepicker__header {
          background: white;
          border-bottom: 2px solid #f59e0b;
          padding: 1.25rem 0;
        }
        .react-datepicker__current-month {
          color: #0f766e;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .react-datepicker__day-names {
          display: flex;
          justify-content: space-around;
          margin-top: 1rem;
        }
        .react-datepicker__day-name {
          color: #000000 !important;
          font-weight: 800 !important;
          font-size: 1.1rem !important;
          width: 2.5rem !important;
          line-height: 2.5rem !important;
          margin: 0.2rem !important;
          text-align: center;
        }
        .react-datepicker__month {
          margin: 1rem 0.5rem;
        }
        .react-datepicker__week {
          display: flex;
          justify-content: space-around;
        }
        .react-datepicker__day {
          width: 2.5rem !important;
          height: 2.5rem !important;
          line-height: 2.5rem !important;
          margin: 0.2rem !important;
          border-radius: 50%;
          font-size: 1rem;
          color: #1e293b;
          font-weight: 500;
        }
        .react-datepicker__day:hover {
          background: #ccfbf1;
          color: #0f766e;
        }
        .react-datepicker__day--selected {
          background: #0f766e !important;
          color: white !important;
          font-weight: 700;
        }
        .react-datepicker__day--today {
          background: #fbbf24;
          color: white;
          font-weight: 700;
        }
        .react-datepicker__day--disabled {
          color: #cbd5e1;
        }
        .react-datepicker__navigation {
          top: 1.25rem;
        }
        @media (max-width: 640px) {
          .react-datepicker__current-month {
            font-size: 1.25rem;
          }
          .react-datepicker__day-name {
            font-size: 0.95rem !important;
            width: 2.2rem !important;
            line-height: 2.2rem !important;
          }
          .react-datepicker__day {
            width: 2.2rem !important;
            height: 2.2rem !important;
            line-height: 2.2rem !important;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <main className="flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-[3rem] shadow-2xl p-8 sm:p-16 text-center">
          <img 
            src="/melissa.jpg" 
            alt="Melissa" 
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover mx-auto mb-8 border-8 sm:border-[12px] border-teal-300 shadow-2xl" 
          />

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-teal-800 tracking-tight mb-2">
            Balanced Hearts
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-teal-500 tracking-wide mb-8 sm:mb-12">
            Holy Fire Reiki
          </h2>

          <p className="text-xl sm:text-2xl lg:text-3xl text-teal-700 italic mb-2">
            with Melissa Lynn
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-600 font-semibold mb-8 sm:mb-12">
            $125 · 60-minute in-person session
          </p>

          <div className="max-w-3xl mx-auto mb-10 sm:mb-16 p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-teal-50 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-lg">
            <p className="text-base sm:text-lg lg:text-xl text-teal-800 italic leading-relaxed">
              Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-teal-800 font-light mb-8 sm:mb-12">
            Schedule Your Session
          </h2>

          <div className="max-w-md mx-auto mb-10 sm:mb-16 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-amber-200">
            <DatePicker 
              selected={selectedDate} 
              onChange={setSelectedDate} 
              minDate={new Date()} 
              inline 
              filterDate={date => date.getDay() !== 0}
            />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h3 className="text-xl sm:text-2xl lg:text-3xl text-teal-800 mb-6 sm:mb-10 font-light">
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16 max-w-4xl mx-auto">
                {slots.map(time => (
                  <button 
                    key={time} 
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 sm:py-5 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-base sm:text-lg lg:text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl ${
                      selectedTime === time 
                        ? 'bg-teal-700 text-white border-2 border-amber-400 scale-105' 
                        : 'bg-gradient-to-br from-amber-50 to-teal-50 text-teal-800 border-2 border-teal-300 hover:border-amber-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                  <input 
                    required 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white text-teal-900 text-base sm:text-lg placeholder-teal-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  <input 
                    required 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white text-teal-900 text-base sm:text-lg placeholder-teal-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  <input 
                    placeholder="Phone (optional)" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white text-teal-900 text-base sm:text-lg placeholder-teal-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  <textarea 
                    placeholder="Notes or questions" 
                    rows="5" 
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white text-teal-900 text-base sm:text-lg placeholder-teal-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all resize-none"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-5 sm:py-6 px-6 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-xl sm:rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold shadow-2xl hover:shadow-amber-400/50 hover:scale-[1.02] transition-all duration-300 border-2 border-amber-400"
                  >
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p className="text-xl sm:text-2xl text-teal-700 font-light">No available times on this date</p>
          )}

          {message && (
            <div className="mt-10 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-green-50 to-teal-50 text-green-800 rounded-2xl sm:rounded-3xl font-semibold text-base sm:text-lg lg:text-xl shadow-xl border-2 border-green-200">
              {message}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 sm:py-12 px-4 text-center bg-gradient-to-b from-white to-amber-50 border-t-2 border-amber-200 mt-12 sm:mt-20">
        <p className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-teal-800">Contact Melissa</p>
        <p className="mb-2 text-base sm:text-lg text-teal-700">Text or call: <strong className="text-amber-600">403-852-4324</strong></p>
        <p className="mb-2 text-base sm:text-lg text-teal-700">Email: <strong className="text-amber-600">balancedheartsranch@yahoo.com</strong></p>
        <p className="mt-4 text-sm sm:text-base text-teal-600">
          Okotoks, Alberta, Canada
        </p>
      </footer>
    </div>
  );
}
