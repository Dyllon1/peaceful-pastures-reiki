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
    <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '900px', background: 'white', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', padding: '6rem 4rem', textAlign: 'center' }}>
          <img src="/melissa.jpg" alt="Melissa" style={{ width:'300px', height:'300px', borderRadius:'50%', objectFit:'cover', marginBottom:'3rem', border:'16px solid #f1f5f9', boxShadow:'0 20px 50px rgba(0,0,0,0.2)' }} />

          <h1 style={{ fontSize: '5.5rem', fontWeight: '400', color: '#1e293b', letterSpacing: '-3px', margin: '0 0 0.5rem' }}>
            Balanced Hearts
          </h1>
          <h2 style={{ fontSize: '4.5rem', fontWeight: '400', color: '#1e293b', letterSpacing: '-2px', margin: '0 0 3rem' }}>
            Holy Fire Reiki
          </h2>

          <p style={{ fontSize: '2rem', color: '#64748b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>
            with Melissa Ouderkirk
          </p>
          <p style={{ fontSize: '1.9rem', color: '#475569', fontWeight: '500', marginBottom: '5rem' }}>
            $125 · 60-minute in-person session
          </p>

          <h2 style={{ fontSize: '2.8rem', color: '#1e293b', marginBottom: '3rem' }}>
            Schedule Your Session
          </h2>

          {/* Calendar — normal size, not stretched */}
          <div style={{ margin: '0 auto 5rem', maxWidth: '420px' }}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h3 style={{ fontSize: '1.8rem', color: '#475569', marginBottom: '3rem' }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
                {slots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1.8rem', borderRadius: '24px', fontSize: '1.5rem', fontWeight: '600',
                      background: selectedTime === time ? '#1e293b' : '#fdfcfb',
                      color: selectedTime === time ? 'white' : '#334155',
                      border: '3px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 25px 60px rgba(30,41,59,0.4)' : '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width:'100%', padding:'1.6rem', borderRadius:'20px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'1.5rem', fontSize:'1.3rem' }} />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width:'100%', padding:'1.6rem', borderRadius:'20px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'1.5rem', fontSize:'1.3rem' }} />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width:'100%', padding:'1.6rem', borderRadius:'20px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'1.5rem', fontSize:'1.3rem' }} />
                  <textarea placeholder="Notes or questions" rows="5" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    style={{ width:'100%', padding:'1.6rem', borderRadius:'20px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'3rem', fontSize:'1.3rem' }} />
                  <button type="submit" style={{
                    width:'100%', padding:'2rem', background:'#1e293b', color:'white', border:'none', borderRadius:'24px', fontSize:'1.8rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 30px 70px rgba(30,41,59,0.4)'
                  }}>
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {message && (
            <div style={{ marginTop:'5rem', padding:'3rem', background:'#ecfdf5', color:'#166534', borderRadius:'24px', fontWeight:'600', fontSize:'1.6rem' }}>
              {message}
            </div>
          )}
        </div>
      </main>

      <footer style={{ padding:'5rem', textAlign:'center', background:'white', color:'#64748b', fontSize:'1.4rem' }}>
        <p>Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
