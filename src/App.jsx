import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState({});

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
    setMessage("Booking confirmed! Melissa will contact you shortly. Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex flex-col font-serif">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-amber-100 to-rose-100 p-16 text-center">
            <img src="/melissa.jpg" alt="Melissa" className="w-64 h-64 rounded-full object-cover mx-auto mb-8 border-8 border-white shadow-2xl" />
            <h1 className="text-7xl md:text-8xl font-['Dancing_Script','Great_Vibes',cursive] text-amber-900 mb-4">Balanced Hearts</h1>
            <h2 className="text-5xl md:text-7xl font-light text-slate-800 mb-6 tracking-widest">Holy Fire Reiki</h2>
            <p className="text-2xl text-slate-700 italic mb-2">with Melissa Ouderkirk</p>
            <p className="text-xl text-slate-700 font-medium">$125 · 60-minute in-person session</p>
          </div>

          {/* Booking Section */}
          <div className="p-12 md:p-20 bg-white">
            <h2 className="text-4xl md:text-5xl text-slate-800 text-center mb-12">Schedule Your Session</h2>

            <div className="max-w-md mx-auto mb-16">
              <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
            </div>

            {selectedDate && slots.length > 0 && (
              <>
                <h3 className="text-2xl text-slate-700 text-center mb-12">
                  Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
                  {slots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-8 rounded-2xl text-2xl font-medium transition-all border-2 ${
                        selectedTime === time
                          ? 'bg-gradient-to-br from-amber-600 to-rose-600 text-white shadow-2xl scale-105 border-transparent'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-amber-400 hover:shadow-xl'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
                    <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-600 focus:outline-none text-xl bg-white/90" />
                    <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-600 focus:outline-none text-xl bg-white/90" />
                    <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-600 focus:outline-none text-xl bg-white/90" />
                    <textarea placeholder="Notes or questions" rows="4" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-600 focus:outline-none text-xl bg-white/90" />
                    <button type="submit" className="w-full py-10 bg-gradient-to-br from-amber-600 to-rose-600 text-white rounded-3xl text-3xl font-bold hover:shadow-2xl transition-all">
                      Confirm Booking – $125
                    </button>
                  </form>
                )}
              </>
            )}

            {selectedDate && slots.length === 0 && (
              <p className="text-2xl text-slate-600 text-center">No available times on this date</p>
            )}

            {message && (
              <div className="mt-20 p-12 bg-gradient-to-br from-amber-50 to-rose-50 text-amber-900 rounded-3xl text-2xl md:text-3xl font-medium text-center border border-amber-200">
                {message}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-16 text-center bg-white/90 text-slate-700 text-xl">
        <p className="font-medium mb-2">Contact Melissa</p>
        <p>Text or call: 403-852-4324</p>
        <p>Email: melouderkirk@yahoo.com</p>
        <p className="mt-4">Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
