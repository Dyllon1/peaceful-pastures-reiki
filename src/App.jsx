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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)', display: 'flex', flexDirection: 'column', fontFamily: 'Georgia, serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '640px', background: 'rgba(255,255,255,0.97)', borderRadius: '36px', boxShadow: '0 30px 70px rgba(0,0,0,0.12)', padding: '5rem 3rem', textAlign: 'center' }}>

          <img src="/melissa.jpg" alt="Melissa Ouderkirk"
            style={{ width:'200px', height:'200px', borderRadius:'50%', objectFit:'cover', marginBottom:'2.5rem', border:'10px solid #f1f5f9', boxShadow:'0 10px 30px rgba(0,0,0,0.1)' }} />

          {/* Balanced Hearts – large script */}
          <h1 style={{ fontSize: '3.6rem', fontWeight: '400', color: '#1e293b', letterSpacing: '-2px', margin: '0 0 0.2rem', lineHeight: '1' }}>
            Balanced Hearts
          </h1>

          {/* Holy Fire Reiki – one line, pulled up close */}
          <h2 style={{ fontSize: '3.2rem', fontWeight: '400', color: '#1e293b', letterSpacing: '-1px', margin: '0 0 2.5rem', lineHeight: '1' }}>
            Holy Fire Reiki
          </h2>

          <p style={{ fontSize: '1.75rem', color: '#64748b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>
            with Melissa Ouderkirk
          </p>
          <p style={{ fontSize: '1.6rem', color: '#475569', fontWeight: '500', marginBottom: '4rem' }}>
            $125 · 60-minute in-person session
          </p>

          <h2 style={{ fontSize: '2rem', color: '#334155', marginBottom: '2.5rem' }}>
            Schedule Your Session
          </h2>

          <div style={{ margin: '0 auto 3.5rem', maxWidth: '420px' }}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h3 style={{ fontSize: '1.4rem', color: '#475569', marginBottom: '2rem' }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
                {slots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1.2rem', borderRadius: '18px', fontSize: '1.15rem', fontWeight: '500',
                      background: selectedTime === time ? '#1e293b' : '#fdfcfb',
                      color: selectedTime === time ? 'white' : '#334155',
                      border: '2px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 10px 25px rgba(30,41,59,0.3)' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit}>
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width:'100%', padding:'1.2rem', borderRadius:'16px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'1rem' }} />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width:'100%', padding:'1.2rem', borderRadius:'16px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'1rem' }} />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width:'100%', padding:'1.2rem', borderRadius:'16px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'1rem' }} />
                  <textarea placeholder="Notes or questions" rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    style={{ width:'100%', padding:'1.2rem', borderRadius:'16px', border:'1px solid #cbd5e1', background:'#fafafa', marginBottom:'2.5rem' }} />
                  <button type="submit" style={{
                    width:'100%', padding:'1.4rem', background:'#1e293b', color:'white', border:'none', borderRadius:'18px', fontSize:'1.3rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 15px 35px rgba(30,41,59,0.3)'
                  }}>
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {message && (
            <div style={{ marginTop:'3rem', padding:'2rem', background:'#ecfdf5', color:'#166534', borderRadius:'18px', fontWeight:'600' }}>
              {message}
            </div>
          )}
        </div>
      </div>

      <footer style={{ padding:'3rem', textAlign:'center', background:'white', color:'#64748b', fontSize:'1.1rem' }}>
        <p>Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  );
}
