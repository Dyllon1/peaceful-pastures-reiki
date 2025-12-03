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
    const all = day === 6 ? ['10:00','11:00','12:00','13:00'] : ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-teal-100 to-teal-200 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        {/* ←←← NO BOX — everything directly on the gradient */}
        <div className="w-full max-w-4xl text-center">

          <img src="/melissa.jpg" alt="Melissa" className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover mx-auto mb-12 border-12 border-teal-300 shadow-2xl" />

          <h1 className="text-7xl md:text-9xl font-['Dancing_Script','Great_Vibes',cursive] text-teal-900 mb-6 tracking-tight">
            Balanced Hearts
          </h1>
          <h2 className="text-5xl md:text-7xl font-light text-teal-800 mb-16 tracking-widest">
            Holy Fire Reiki
          </h2>

          <p className="text-2xl md:text-3xl text-teal-700 italic mb-4">with Melissa Ouderkirk</p>
          <p className="text-xl md:text-2xl text-teal-800 font-medium mb-20">$125 · 60-minute in-person session</p>

          {/* Horses message */}
          <div className="max-w-3xl mx-auto mb-20 p-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-teal-200 shadow-xl">
            <p className="text-xl md:text-2xl text-teal-900 italic leading-relaxed">
              Sessions take place in the calming presence of Melissa’s equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
            </p>
          </div>

          <h3 className="text-4xl md:text-5xl text-teal-900 mb-12">Schedule Your Session</h3>

          <div className="inline-block mb-16 bg-white rounded-2xl p-6 shadow-2xl">
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h4 className="text-2xl md:text-3xl text-teal-800 mb-12">
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-4xl mx-auto">
                {slots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-10 rounded-3xl text-2xl md:text-3xl font-medium transition-all border-4 ${
                      selectedTime === time
                        ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-white shadow-2xl scale-105 border-transparent'
                        : 'bg-white/80 text-teal-900 border-teal-300 hover:border-teal-500 hover:shadow-xl'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-teal-300 focus:border-teal-600 focus:outline-none text-xl bg-white text-teal-900 placeholder-teal-500" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-teal-300 focus:border-teal-600 focus:outline-none text-xl bg-white text-teal-900 placeholder-teal-500" />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-teal-300 focus:border-teal-600 focus:outline-none text-xl bg-white text-teal-900 placeholder-teal-500" />
                  <textarea placeholder="Notes or questions" rows="4" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-teal-300 focus:border-teal-600 focus:outline-none text-xl bg-white text-teal-900 placeholder-teal-500" />
                  <button type="submit" className="w-full py-10 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-3xl text-3xl md:text-4xl font-bold hover:shadow-2xl transition-all">
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p className="text-3xl text-teal-700">No available times on this date</p>
          )}

          {message && (
            <div className="mt-20 p-12 bg-white/90 text-teal-900 rounded-3xl text-2xl md:text-3xl font-medium border border-teal-200">
              {message}
            </div>
          )}
        </div>
      </main>

      <footer className="py-16 text-center text-teal-700 bg-white/80 backdrop-blur text-xl md:text-2xl">
        <p className="font-medium">Contact Melissa</p>
        <p>Text or call: 403-852-4324</p>
        <p>Email: balancedheartsranch@yahoo.com</p>
        <p className="mt-6">Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
