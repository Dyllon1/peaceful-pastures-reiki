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
    if (day === 6) return ['10:00','11:00','12:00','13:00'];
    return ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
  };

  const slots = selectedDate ? getSlots(selectedDate) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Booking confirmed! Melissa will contact you shortly to arrange payment ($125/session). Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Full-screen main area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 md:p-20 text-center">

          <img src="/melissa.jpg" alt="Melissa" className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover mx-auto mb-10 border-12 border-slate-100 shadow-2xl" />

          <h1 className="text-5xl md:text-8xl font-light text-slate-800 mb-6 tracking-tight">
            Balanced Hearts Holy Fire Reiki
          </h1>

          <p className="text-2xl md:text-3xl text-slate-600 italic mb-4">with Melissa Ouderkirk</p>
          <p className="text-xl md:text-2xl text-slate-700 font-medium mb-16">$125 · 60-minute in-person session</p>

          <h2 className="text-4xl md:text-5xl text-slate-800 mb-12">Schedule Your Session</h2>

          <div className="inline-block mb-16">
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h3 className="text-2xl text-slate-700 mb-10">
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
                {slots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-8 rounded-3xl text-2xl font-semibold transition-all ${
                      selectedTime === time
                        ? 'bg-slate-800 text-white shadow-2xl scale-105'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-slate-600 focus:outline-none text-xl" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-slate-600 focus:outline-none text-xl" />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-slate-600 focus:outline-none text-xl" />
                  <textarea placeholder="Notes or questions" rows="4" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-8 py-6 rounded-2xl border border-slate-300 focus:border-slate-600 focus:outline-none text-xl" />
                  <button type="submit" className="w-full py-8 bg-slate-800 text-white rounded-3xl text-3xl font-bold hover:bg-slate-900 transition shadow-2xl">
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {message && (
            <div className="mt-20 p-12 bg-green-50 text-green-800 rounded-3xl text-2xl font-medium">
              {message}
            </div>
          )}
        </div>
      </main>

      <footer className="py-16 text-center text-slate-600 bg-white text-xl">
        <p className="font-semibold">Contact Melissa</p>
        <p>Text or call: 403-852-4324</p>
        <p>Email: melouderkirk@yahoo.com</p>
        <p>Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
