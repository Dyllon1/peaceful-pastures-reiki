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
    setMessage("Booking confirmed! Melissa will contact you shortly to arrange payment ($125/session). Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 flex flex-col font-serif">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 md:p-24 text-center border border-white/40">

          {/* Melissa's Photo */}
          <img src="/melissa.jpg" alt="Melissa Ouderkirk" className="w-80 h-80 rounded-full object-cover mx-auto mb-12 border-12 border-white/60 shadow-2xl" />

          {/* Title — luxurious */}
          <h1 className="text-8xl md:text-9xl font-['Dancing_Script','Great_Vibes',cursive] text-amber-900 mb-4 tracking-tight leading-none">
            Balanced Hearts
          </h1>
          <h2 className="text-6xl md:text-8xl font-light text-slate-800 mb-16 tracking-widest">
            Holy Fire Reiki
          </h2>

          <p className="text-3xl text-slate-600 italic mb-4">with Melissa Ouderkirk</p>
          <p className="text-2xl text-slate-700 font-medium mb-20">$125 · 60-minute in-person session</p>

          <h3 className="text-5xl text-slate-800 mb-16">Schedule Your Session</h3>

          <div className="inline-block mb-20">
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h4 className="text-3xl text-slate-700 mb-16">
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 max-w-5xl mx-auto">
                {slots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-12 rounded-3xl text-3xl font-medium transition-all border-4 ${
                      selectedTime === time
                        ? 'bg-gradient-to-br from-amber-600 to-rose-600 text-white shadow-2xl scale-105 border-transparent'
                        : 'bg-white/80 text-slate-800 border-slate-300 hover:border-amber-400 hover:shadow-2xl'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-12 py-8 rounded-3xl border-2 border-slate-300 focus:border-amber-600 focus:outline-none text-2xl bg-white/70 text-slate-900 placeholder-slate-500" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-12 py-8 rounded-3xl border-2 border-slate-300 focus:border-amber-600 focus:outline-none text-2xl bg-white/70 text-slate-900 placeholder-slate-500" />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-12 py-8 rounded-3xl border-2 border-slate-300 focus:border-amber-600 focus:outline-none text-2xl bg-white/70 text-slate-900 placeholder-slate-500" />
                  <textarea placeholder="Notes or questions" rows="5" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-12 py-8 rounded-3xl border-2 border-slate-300 focus:border-amber-600 focus:outline-none text-2xl bg-white/70 text-slate-900 placeholder-slate-500" />
                  <button type="submit" className="w-full py-12 bg-gradient-to-br from-amber-600 to-rose-600 text-white rounded-3xl text-4xl font-bold hover:shadow-2xl transition-all">
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p className="text-3xl text-slate-600">No available times on this date</p>
          )}

          {message && (
            <div className="mt-24 p-16 bg-gradient-to-br from-amber-50 to-rose-50 text-amber-900 rounded-3xl text-3xl font-medium border border-amber-200">
              {message}
            </div>
          )}
        </div>
      </main>

      <footer className="py-20 text-center bg-white/80 backdrop-blur text-2xl text-slate-700">
        <p className="font-medium">Contact Melissa</p>
        <p>Text or call: 403-852-4324</p>
        <p>Email: melouderkirk@yahoo.com</p>
        <p className="mt-6">Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
