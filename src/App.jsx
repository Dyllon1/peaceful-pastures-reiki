import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');
  
  // Load booked slots from localStorage when the page loads
  const [bookedSlots, setBookedSlots] = useState(() => {
    const saved = localStorage.getItem('bookedSlots');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever bookedSlots changes
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
    
    // Permanently book this slot
    setBookedSlots(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), selectedTime]
    }));

    setMessage("Booking confirmed! Melissa will contact you shortly to arrange payment ($125/session). Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col text-white">
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '900px', background: 'white', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', padding: '6rem 4rem', textAlign: 'center' }}>
          <img src="/melissa.jpg" alt="Melissa" style={{ width:'300px', height:'300px', borderRadius:'50%', objectFit:'cover', marginBottom:'3rem', border:'16px solid #fde68a', boxShadow:'0 20px 50px rgba(0,0,0,0.2)' }} />

          <h1 style={{ fontSize: '5.5rem', fontWeight: '400', color: '#1e293b', letterSpacing: '-3px', margin: '0 0 0.5rem' }}>
            Balanced Hearts
          </h1>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '200', color: '#253145', letterSpacing: '-1px', margin: '0 0 4rem' }}>
            Holy Fire Reiki
          </h2>

          <p style={{ fontSize: '2.2rem', color: '#64748b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>
            with Melissa Ouderkirk
          </p>
          <p style={{ fontSize: '2rem', color: '#475569', fontWeight: '500', marginBottom: '5rem' }}>
            $125 · 60-minute in-person session
          </p>

          <h2 style={{ fontSize: '3rem', color: '#1e293b', marginBottom: '3rem' }}>
            Schedule Your Session
          </h2>

          <div style={{ margin: '0 auto 5rem', maxWidth: '500px' }}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h3 style={{ fontSize: '2rem', color: '#475569', marginBottom: '3rem' }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '5rem' }}>
                {slots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '2rem', borderRadius: '28px', fontSize: '1.8rem', fontWeight: '600',
                      background: selectedTime === time ? '#1e293b' : '#fdfcfb',
                      color: selectedTime === time ? 'white' : '#334155',
                      border: '4px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 30px 70px rgba(30,41,59,0.4)' : '0 12px 35px rgba(0,0,0,0.1)'
                    }}>
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'2rem', fontSize:'1.5rem' }} />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'2rem', fontSize:'1.5rem' }} />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'2rem', fontSize:'1.5rem' }} />
                  <textarea placeholder="Notes or questions" rows="6" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'4rem', fontSize:'1.5rem' }} />
                  <button type="submit" style={{
                    width:'100%', padding:'2.5rem', background:'#1e293b', color:'white', border:'none', borderRadius:'28px', fontSize:'2rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 35px 80px rgba(30,41,59,0.4)'
                  }}>
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p style={{ fontSize: '2rem', color: '#475569' }}>No available times on this date</p>
          )}

          {message && (
            <div style={{ marginTop:'6rem', padding:'4rem', background:'#ecfdf5', color:'#166534', borderRadius:'28px', fontWeight:'600', fontSize:'1.8rem' }}>
              {message}
            </div>
          )}
        </div>
      </main>

   <footer style={{
  padding: '4rem 2rem',
  textAlign: 'center',
  background: 'white',
  borderTop: '1px solid #e2e8f0',
  marginTop: '4rem',
  fontSize: '1.4rem',
  color: '#475569'
}}>
  <p style={{ margin: '0.5rem 0', fontWeight: '600' }}>Contact Melissa</p>
  <p style={{ margin: '0.5rem 0' }}>Text or call: <strong>403-852-4324</strong></p>
  <p style={{ margin: '0.5rem 0' }}>Email: <strong>melouderkirk@yahoo.com</strong></p>
  <p style={{ margin: '1rem 0 0', fontSize: '1.2rem', color: '#64748b' }}>
    Okotoks, Alberta, Canada
  </p>
</footer>
    </div>
  );
}
