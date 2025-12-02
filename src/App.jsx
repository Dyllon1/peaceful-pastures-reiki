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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #f0fdfa, #ccfbf1)', 
      margin: 0, 
      padding: 0, 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem 1rem' 
      }}>
        {/* ←←← SMOKEY GRAY BOX — light, elegant, not dark charcoal */}
        <div style={{ 
          width: '100%', 
          maxWidth: '900px', 
          background: '#e2e8f0', /* beautiful smokey gray */
          color: '#1e293b', 
          borderRadius: '40px', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.15)', 
          padding: '6rem 4rem', 
          textAlign: 'center' 
        }}>
         <img 
  src="/melissa.jpg" 
  alt="Melissa Ouderkirk" 
  style={{
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '3rem',
    padding: '12px',
    background: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Cdefs%3E%3Cpattern id=%27wood%27 patternUnits=%27userSpaceOnUse%27 width=%2720%27 height=%2720%27%3E%3Crect width=%2720%27 height=%2720%27 fill=%27%23d4a574%27/%3E%3Cpath d=%27M0,10 Q10,0 20,10 T40,10 L40,20 L0,20 Z%27 fill=%27%23b8875e%27/%3E%3Cpath d=%27M5,5 Q10,0 15,5 T25,5 L25,15 L5,15 Z%27 fill=%27%23c49568%27/%3E%3C/pattern%3E%3C/defs%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2748%27 fill=%27url(%23wood)%27 stroke=%27%23856d4d%27 stroke-width=%278%27/%3E%3C/svg%3E")',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    border: '8px solid #5C4033'
  }} 
/>

          <h1 style={{ 
  fontSize: '6rem', 
  fontWeight: '400', 
  color: '#1a4731', /* Hunter Green */
  fontFamily: '"Great Vibes", cursive',
  letterSpacing: '-2px', 
  margin: '0 0 1rem',
  textShadow: '2px 4px 12px rgba(0,0,0,0.15)'
}}>
  Balanced Hearts
</h1>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '200', color: '#253145', letterSpacing: '-1px', margin: '0 0 1rem' }}>
  Holy Fire Reiki
</h2>

<p style={{ fontSize: '2.2rem', color: '#008080', fontStyle: 'italic', margin: '0 0 3rem' }}>
  with Melissa Lynn
</p>
          <p style={{ fontSize: '2rem', color: '#1a4731', fontWeight: '500', marginBottom: '5rem' }}>
            $125 · 60-minute in-person session
          </p>

          {/* One-sentence benefit */}
          <div style={{
            margin: '4rem auto 5rem',
            maxWidth: '700px',
            padding: '2rem 3rem',
            background: '#f0fdfa',
            borderRadius: '24px',
            border: '2px solid #5eead4',
            fontSize: '1.1rem',
            color: '#0f766e',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Sessions take place in the calming presence of Melissa’s equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
          </div>

          <h2 style={{ fontSize: '3rem', color: '#1a4731', marginBottom: '3rem' }}>
            Schedule Your Session
          </h2>

          <div style={{ margin: '0 auto 5rem', maxWidth: '500px' }}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h3 style={{ fontSize: '2rem', color: '#0f766e', marginBottom: '3rem' }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '5rem' }}>
                {slots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '2rem', 
                      borderRadius: '28px', 
                      fontSize: '1.8rem', 
                      fontWeight: '600',
                      background: selectedTime === time ? '#0f766e' : '#f0fdfa',
                      color: selectedTime === time ? 'white' : '#0f766e',
                      border: '4px solid #5eead4', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 30px 70px rgba(15,118,110,0.4)' : '0 12px 35px rgba(0,0,0,0.1)'
                    }}>
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #5eead4', background:'#f0fdfa', color:'#0f766e', marginBottom:'2rem', fontSize:'1.5rem' }} />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #5eead4', background:'#f0fdfa', color:'#0f766e', marginBottom:'2rem', fontSize:'1.5rem' }} />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #5eead4', background:'#f0fdfa', color:'#0f766e', marginBottom:'2rem', fontSize:'1.5rem' }} />
                  <textarea placeholder="Notes or questions" rows="6" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    style={{ width:'100%', padding:'2rem', borderRadius:'24px', border:'1px solid #5eead4', background:'#f0fdfa', color:'#0f766e', marginBottom:'4rem', fontSize:'1.5rem' }} />
                  <button type="submit" style={{
                    width:'100%', padding:'2.5rem', background:'#0f766e', color:'white', border:'none', borderRadius:'28px', fontSize:'2rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 35px 80px rgba(15,118,110,0.4)'
                  }}>
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p style={{ fontSize: '2rem', color: '#0f766e' }}>No available times on this date</p>
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
        borderTop: '1px solid #5eead4',
        marginTop: '4rem',
        fontSize: '1.4rem',
        color: '#0f766e'
      }}>
        <p style={{ margin: '0.5rem 0', fontWeight: '600' }}>Contact Melissa</p>
        <p style={{ margin: '0.5rem 0' }}>Text or call: <strong>403-852-4324</strong></p>
        <p style={{ margin: '0.5rem 0' }}>Email: <strong>balancedheartsranch@yahoo.com</strong></p>
        <p style={{ margin: '1rem 0 0', fontSize: '1.2rem', color: '#0f766e' }}>
          Okotoks, Alberta, Canada
        </p>
      </footer>
    </div>
  );
}
