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
    <>
      {/* Hide on desktop */}
      <div className="hidden md:block min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Mobile Only</h1>
          <p className="text-xl text-gray-600">This site is designed for phones only.<br/>Please open on your mobile device.</p>
        </div>
      </div>

      {/* Mobile version — full screen, perfect on phones */}
      <div className="md:hidden min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 flex flex-col">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">

            <img src="/melissa.jpg" alt="Melissa" className="w-48 h-48 rounded-full object-cover mx-auto mb-8 border-8 border-amber-100 shadow-xl" />

            <h1 className="text-5xl font-bold text-amber-900 mb-2">Balanced Hearts</h1>
            <h2 className="text-4xl font-light text-slate-800 mb-8">Holy Fire Reiki</h2>

            <p className="text-xl text-slate-600 italic mb-2">with Melissa Ouderkirk</p>
            <p className="text-lg text-slate-700 font-medium mb-10">$125 · 60-minute session</p>

            <h3 className="text-2xl text-slate-800 mb-8">Schedule Your Session</h3>

            <div className="mb-10">
              <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
            </div>

            {selectedDate && slots.length > 0 && (
              <>
                <h4 className="text-lg text-slate-700 mb-6">
                  Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </h4>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {slots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-5 rounded-2xl text-lg font-semibold transition-all ${
                        selectedTime === time
                          ? 'bg-gradient-to-br from-amber-600 to-rose-600 text-white shadow-xl'
                          : 'bg-white text-slate-800 border-2 border-slate-300 hover:border-amber-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none text-lg bg-white/70" />
                    <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none text-lg bg-white/70" />
                    <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none text-lg bg-white/70" />
                    <textarea placeholder="Notes or questions" rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none text-lg bg-white/70" />
                    <button type="submit" className="w-full py-7 bg-gradient-to-br from-amber-600 to-rose-600 text-white rounded-2xl text-2xl font-bold hover:shadow-2xl transition-all">
                      Confirm Booking – $125
                    </button>
                  </form>
                )}
              </>
            )}

            {message && (
              <div className="mt-10 p-8 bg-green-50 text-green-800 rounded-2xl text-xl font-medium">
                {message}
              </div>
            )}
          </div>
        </main>

        <footer className="py-10 text-center text-slate-600 bg-white/80 text-lg">
          <p className="font-medium">Contact Melissa</p>
          <p>Text or call: 403-555-1234</p>
          <p>Email: melissa@balancedheartsholyfirereiki.com</p>
          <p>Okotoks, Alberta, Canada</p>
        </footer>
      </div>
    </>
  );
}
