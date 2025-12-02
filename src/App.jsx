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
      background: 'linear-gradient(to bottom, #f0fdfa, #ccfbf1)', /* richer teal gradient */
      margin: 0, 
      padding: 0, 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: '"Playfair Display", Georgia, serif'
    }}>
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem 1rem' 
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '800px', 
          background: 'white', 
          borderRadius: '32px', 
          boxShadow: '0 35px 80px rgba(0,0,0,0.12)', 
          padding: '5rem 3rem', 
          textAlign: 'center',
          border: '1px solid #5eead4' /* visible teal border */
        }}>
          <img src="/melissa.jpg" alt="Melissa Ouderkirk" style={{ 
            width: '280px', 
            height: '280px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
            marginBottom: '3rem', 
            border: '12px solid #ccfbf1', /* richer teal */
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)' 
          }} />

          <h1 style={{ 
            fontSize: '4.5rem', 
            fontWeight: '400', 
            color: '#0f766e', /* deep teal */
            letterSpacing: '-2px', 
            margin: '0 0 1rem' 
          }}>
            Balanced Hearts
          </h1>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '200', 
            color: '#14b8a6', /* vibrant teal */
            letterSpacing: '-1px', 
            margin: '0 0 2.5rem' 
          }}>
            Holy Fire Reiki
          </h2>

          <p style={{ 
            fontSize: '2rem', 
            color: '#0d9488', /* rich teal */
            fontStyle: 'italic', 
            margin: '0 0 0.5rem' 
          }}>
            with Melissa Lynn
          </p>
          <p style={{ 
            fontSize: '1.8rem', 
            color: '#0f766e', 
            fontWeight: '500', 
            marginBottom: '4rem' 
          }}>
            $125 · 60-minute in-person session
          </p>

          {/* One-sentence benefit — teal theme */}
          <div style={{
            margin: '4rem auto 5rem',
            maxWidth: '700px',
            padding: '2rem 3rem',
            background: 'rgba(204,251,241,0.8)', /* rich teal tint */
            borderRadius: '24px',
            border: '2px solid #5eead4',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
            fontSize: '1.1rem',
            color: '#0f766e',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Sessions take place in the calming presence of Melissa’s equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
          </div>

          <h3 style={{ 
            fontSize: '2.8rem', 
            color: '#0f766e', /* deep teal */
            marginBottom: '3rem' 
          }}>
            Schedule Your Session
          </h3>

          <div style={{ margin: '0 auto 5rem', maxWidth: '500px' }}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <h4 style={{ 
                fontSize: '1.9rem', 
                color: '#0f766e', 
                marginBottom: '3rem' 
              }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
                {slots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1.8rem', 
                      borderRadius: '24px', 
                      fontSize: '1.5rem', 
                      fontWeight: '600',
                      background: selectedTime === time ? '#0f766e' : '#ccfbf1',
                      color: selectedTime === time ? 'white' : '#0f766e',
                      border: '3px solid #5eead4', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 25px 60px rgba(15,118,110,0.4)' : '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width:'100%', padding:'1.8rem', borderRadius:'20px', border:'1px solid #5eead4', background:'#f0fdfa', marginBottom:'1.5rem', fontSize:'1.4rem' }} />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width:'100%', padding:'1.8rem', borderRadius:'20px', border:'1px solid #5eead4', background:'#f0fdfa', marginBottom:'1.5rem', fontSize:'1.4rem' }} />
                  <input placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width:'100%', padding:'1.8rem', borderRadius:'20px', border:'1px solid #5eead4', background:'#f0fdfa', marginBottom:'1.5rem', fontSize:'1.4rem' }} />
                  <textarea placeholder="Notes or questions" rows="5" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    style={{ width:'100%', padding:'1.8rem', borderRadius:'20px', border:'1px solid #5eead4', background:'#f0fdfa', marginBottom:'3rem', fontSize:'1.4rem' }} />
                  <button type="submit" style={{
                    width:'100%', padding:'2.2rem', background:'#0f766e', color:'white', border:'none', borderRadius:'24px', fontSize:'1.7rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 30px 70px rgba(15,118,110,0.4)'
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
