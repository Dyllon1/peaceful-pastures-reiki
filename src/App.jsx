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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        {/* ←←← CHARCOAL BOX — everything inside is now on rich charcoal */}
        <div className="w-full max-w-5xl bg-slate-800 rounded-3xl shadow-2xl p-12 md:p-20 text-center text-white">

          <img src="/melissa.jpg" alt="Melissa" className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover mx-auto mb-12 border-12 border-slate-600 shadow-2xl" />

          <h1 className="text-7xl md:text-9xl font-light text-amber-100 mb-6 tracking-tight">
            Balanced Hearts
          </h1>
          <h2 className="text-5xl md:text-7xl font-light text-amber-200 mb-16 tracking-widest">
            Holy Fire Reiki
          </h2>

          <p className="text-2xl md:text-3xl text-amber-100 italic mb-4">with Melissa Lynn</p>
          <p className="text-xl md:text-2xl text-amber-50 font-medium mb-16">$125 · 60-minute in-person session</p>

          <h3 className="text-4xl md:text-5xl text-amber-100 mb-12">Schedule Your Session</h3>

          <div className="inline-block mb-16 bg-white/90 rounded-2xl p-4">
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h4 className="text-2xl md:text-3xl text-amber-100 mb-12">
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
                {slots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-10 rounded-3xl text-2xl md:text-3xl font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xl scale-105'
                        : 'bg-white/20 text-amber-100 border-2 border-amber-300/50 hover:border-amber-300 hover:shadow-xl'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-amber-300/50 focus:border-amber-400 focus:outline-none text-xl bg-white/20 text-white placeholder-amber-200 backdrop-blur-sm" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-amber-300/50 focus:border-amber-400 focus:outline-none text-xl bg-white/20 text-white placeholder-amber-200 backdrop-blur-sm" />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-amber-300/50 focus:border-amber-400 focus:outline-none text-xl bg-white/20 text-white placeholder-amber-200 backdrop-blur-sm" />
                  <textarea placeholder="Notes or questions" rows="4" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-10 py-7 rounded-2xl border border-amber-300/50 focus:border-amber-400 focus:outline-none text-xl bg-white/20 text-white placeholder-amber-200 backdrop-blur-sm" />
                  <button type="submit" className="w-full py-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-3xl text-3xl md:text-4xl font-bold hover:shadow-2xl transition-all">
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p className="text-3xl text-amber-100">No available times on this date</p>
          )}

          {message && (
            <div className="mt-20 p-12 bg-gradient-to-br from-amber-50/20 to-rose-50/20 text-amber-100 rounded-3xl text-2xl md:text-3xl font-medium border border-amber-200/50">
              {message}
            </div>
          )}
        </div>
      </main>

      <footer className="py-16 text-center text-amber-100 bg-slate-900 text-xl md:text-2xl">
        <p className="font-medium">Contact Melissa</p>
        <p>Text or call: 403-852-4324</p>
        <p>Email: balancedheartsranch@yahoo.com</p>
        <p className="mt-mt-6">Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
