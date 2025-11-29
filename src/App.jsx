import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');

  const getSlots = (date) => {
    if (!date) return [];
    const day = date.getDay();
    if (day === 0) return [];
    if (day === 6) return ['10:00', '11:00', '12:00', '13:00'];
    return ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  };

  const slots = selectedDate ? getSlots(selectedDate) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Booking confirmed! Melissa will contact you shortly to arrange payment ($125/session). Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 md:p-20 text-center border border-white/30">

          <img src="/melissa.jpg" alt="Melissa Ouderkirk" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover mx-auto mb-10 border-12 border-white shadow-2xl" />

          {/* Balanced Hearts — elegant script */}
          <h1 className="text-6xl md:text-8xl font-['Dancing_Script','Great_Vibes',cursive] text-amber-900 mb-4 tracking-tight">
            Balanced Hearts
          </h1>

          {/* Holy Fire Reiki — clean serif */}
          <h2 className="text-5xl md:text-7xl font-light text-slate-800 mb-10 tracking-widest">
            Holy Fire Reiki
          </h2>

          <p className="text-2xl md:text-3xl text-slate-600 italic mb-4">with Melissa Ouderkirk</p>
          <p className="text-xl md:text-2xl text-slate-700 font-medium mb-16">$125 · 60-minute in-person session</p>

          <h3 className="text-4xl md:text-5xl text-slate-800 mb-12">Schedule Your Session</h3>

          <div className="inline-block mb-16">
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h4 className="text-2xl text-slate-700 mb-10">
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
                {slots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-10 rounded-3xl text-2xl font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-gradient-to-br from-amber-600 to-rose-600 text-white shadow-2xl scale-105'
                        : 'bg-white/80 text-slate-800 border-2 border-slate-200 hover:border-amber-400 hover:shadow-xl'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-500 focus:outline-none text-xl bg-white/70" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-500 focus:outline-none text-xl bg-white/70" />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-500 focus:outline-none text-xl bg-white/70" />
                  <textarea placeholder="Notes or questions" rows="4" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-amber-500 focus:outline-none text-xl bg-white/70" />
                  <button type="submit" className="w-full py-10 bg-gradient-to-br from-amber-600 to-rose-600 text-white rounded-3xl text-3xl font-semibold hover:shadow-2xl transition-all">
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {message && (
            <div className="mt-20 p-12 bg-gradient-to-br from-amber-50 to-rose-50 text-amber-900 rounded-3xl text-2xl font-medium border border-amber-200">
              {message}
            </div>
          )}
        </div>
      </main>

      <footer className="py-16 text-center text-slate-600 bg-white/80 backdrop-blur text-xl">
        <p className="font-medium">Contact Melissa</p>
        <p>Text or call: 403-555-1234</p>
        <p>Email: melissa@balancedheartsholyfirereiki.com</p>
        <p>Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
