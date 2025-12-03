import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bookedSlots');
      if (saved) setBookedSlots(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading bookings:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
    } catch (e) {
      console.error('Error saving bookings:', e);
    }
  }, [bookedSlots]);

  const getSlots = (date) => {
    if (!date) return [];
    const day = date.getDay();
    const key = date.toLocaleDateString();
    
    const all = day === 6 
      ? ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM']
      : ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0d9488, #14b8a6, #5eead4)', margin: 0, padding: 0, fontFamily: "'Georgia', serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Spectral:ital,wght@0,300;0,400;1,400&display=swap');
        
        body {
          font-family: 'Spectral', 'Georgia', serif;
        }
        
        .western-title {
          font-family: 'Playfair Display', 'Georgia', serif;
        }
        
        .react-datepicker {
          font-family: 'Spectral', 'Georgia', serif;
          width: 100% !important;
          border: none;
          background: #f0fdfa;
        }
        .react-datepicker__header {
          background: #f0fdfa;
          border-bottom: 3px solid #0f766e;
          padding: 1.25rem 0;
        }
        .react-datepicker__current-month {
          color: #0f766e;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .react-datepicker__day-names {
          display: flex;
          justify-content: space-around;
          margin-top: 1rem;
        }
        .react-datepicker__day-name {
          color: #000000 !important;
          font-weight: 800 !important;
          font-size: 1.1rem !important;
          width: 2.5rem !important;
          line-height: 2.5rem !important;
          margin: 0.2rem !important;
          text-align: center;
        }
        .react-datepicker__month {
          margin: 1rem 0.5rem;
        }
        .react-datepicker__week {
          display: flex;
          justify-content: space-around;
        }
        .react-datepicker__day {
          width: 2.5rem !important;
          height: 2.5rem !important;
          line-height: 2.5rem !important;
          margin: 0.2rem !important;
          border-radius: 50%;
          font-size: 1rem;
          color: #0f766e;
          font-weight: 600;
        }
        .react-datepicker__day:hover {
          background: #99f6e4;
          color: #0f766e;
        }
        .react-datepicker__day--selected {
          background: #0f766e !important;
          color: white !important;
          font-weight: 700;
        }
        .react-datepicker__day--today {
          background: #d97706;
          color: white;
          font-weight: 700;
        }
        .react-datepicker__day--disabled {
          color: #cbd5e1;
        }
        .react-datepicker__navigation {
          top: 1.25rem;
        }
        @media (max-width: 640px) {
          .react-datepicker__current-month {
            font-size: 1.25rem;
          }
          .react-datepicker__day-name {
            font-size: 0.95rem !important;
            width: 2.2rem !important;
            line-height: 2.2rem !important;
          }
          .react-datepicker__day {
            width: 2.2rem !important;
            height: 2.2rem !important;
            line-height: 2.2rem !important;
            font-size: 0.9rem;
          }
        }
        
        .western-divider {
          width: 200px;
          height: 3px;
          background: linear-gradient(to right, transparent, #0f766e, transparent);
          margin: 2rem auto;
        }
      `}} />

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '64rem', 
          background: 'linear-gradient(to bottom, #f0fdfa, #ffffff)', 
          borderRadius: '2rem', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.3)', 
          padding: '4rem 2rem',
          textAlign: 'center',
          border: '4px solid #0f766e',
          position: 'relative'
        }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '3rem', color: '#0f766e' }}>✦</div>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '3rem', color: '#0f766e' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '3rem', color: '#0f766e' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '3rem', color: '#0f766e' }}>✦</div>

          <img 
            src="/melissa.jpg" 
            alt="Melissa" 
            style={{ 
              width: '18rem', 
              height: '18rem', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              margin: '0 auto 2rem', 
              border: '8px solid #0f766e', 
              boxShadow: '0 25px 50px rgba(15,118,110,0.5)',
              outline: '3px solid #5eead4',
              outlineOffset: '4px'
            }} 
          />

          <div style={{ fontSize: '2.5rem', color: '#0f766e', marginBottom: '1rem' }}>~ ✦ ~</div>

          <h1 className="western-title" style={{ 
            fontSize: 'clamp(3rem, 10vw, 5.5rem)', 
            fontWeight: '700', 
            color: '#0f766e', 
            letterSpacing: '3px', 
            margin: '0 0 0.5rem',
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(15,118,110,0.2)'
          }}>
            Balanced Hearts
          </h1>
          
          <div className="western-divider"></div>
          
          <h2 className="western-title" style={{ 
            fontSize: 'clamp(1.75rem, 6vw, 3rem)', 
            fontWeight: '400', 
            color: '#14b8a6', 
            letterSpacing: '2px', 
            margin: '0 0 1rem',
            fontStyle: 'italic'
          }}>
            Holy Fire Reiki
          </h2>

          <div style={{ fontSize: '2rem', color: '#0f766e', margin: '2rem 0' }}>✦ ✦ ✦</div>

          <p style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#0f766e', fontStyle: 'italic', margin: '0 0 0.5rem', fontWeight: '600' }}>
            with Melissa Lynn
          </p>
          <p style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', color: '#b45309', fontWeight: '700', marginBottom: '3rem', letterSpacing: '1px' }}>
            $125 · 60-minute in-person session
          </p>

          <div style={{
            maxWidth: '52rem',
            margin: '0 auto 4rem',
            padding: '2.5rem',
            background: '#ccfbf1',
            borderRadius: '0.5rem',
            border: '3px solid #0f766e',
            boxShadow: 'inset 0 2px 8px rgba(15,118,110,0.1), 0 15px 40px rgba(0,0,0,0.15)',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem', background: '#f0fdfa', padding: '0 1rem', color: '#0f766e' }}>
              ✦
            </div>
            <p style={{ 
              fontSize: 'clamp(1.125rem, 3.5vw, 1.5rem)', 
              color: '#0f766e', 
              fontStyle: 'italic', 
              lineHeight: '1.8', 
              margin: 0,
              fontWeight: '400'
            }}>
              Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
            </p>
          </div>

          <div style={{ fontSize: '2rem', color: '#0f766e', margin: '3rem 0 1rem' }}>~ ✦ ~</div>

          <h2 className="western-title" style={{ 
            fontSize: 'clamp(2.25rem, 7vw, 3.5rem)', 
            color: '#0f766e', 
            fontWeight: '600', 
            marginBottom: '3rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Schedule Your Session
          </h2>

          <div style={{ 
            maxWidth: '28rem', 
            margin: '0 auto 4rem', 
            background: '#f0fdfa', 
            borderRadius: '1rem', 
            padding: '1.5rem', 
            boxShadow: '0 20px 50px rgba(15,118,110,0.3)', 
            border: '3px solid #0f766e'
          }}>
            <DatePicker 
              selected={selectedDate} 
              onChange={setSelectedDate} 
              minDate={new Date()} 
              inline 
              filterDate={date => date.getDay() !== 0}
            />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <div style={{ fontSize: '1.5rem', color: '#0f766e', margin: '2rem 0 1rem' }}>~ ~ ~</div>
              
              <h3 className="western-title" style={{ 
                fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', 
                color: '#0f766e', 
                marginBottom: '2.5rem', 
                fontWeight: '600',
                letterSpacing: '1px'
              }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.25rem', marginBottom: '4rem', maxWidth: '64rem', margin: '0 auto 4rem' }}>
                {slots.map(time => (
                  <button 
                    key={time} 
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1.75rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: 'clamp(1.125rem, 3.5vw, 1.5rem)',
                      fontWeight: '700',
                      background: selectedTime === time ? '#0f766e' : '#ccfbf1',
                      color: selectedTime === time ? 'white' : '#0f766e',
                      border: '3px solid #0f766e',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 20px 40px rgba(15,118,110,0.5)' : '0 10px 25px rgba(0,0,0,0.15)',
                      transform: selectedTime === time ? 'scale(1.05)' : 'scale(1)',
                      letterSpacing: '1px'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <>
                  <div style={{ fontSize: '1.5rem', color: '#0f766e', margin: '2rem 0' }}>✦</div>
                  
                  <form onSubmit={handleSubmit} style={{ maxWidth: '52rem', margin: '0 auto' }}>
                    <input 
                      required 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem', 
                        border: '2px solid #0f766e', 
                        background: '#f0fdfa', 
                        color: '#0f766e', 
                        marginBottom: '1.5rem', 
                        fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', 
                        outline: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '500'
                      }}
                    />
                    <input 
                      required 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem', 
                        border: '2px solid #0f766e', 
                        background: '#f0fdfa', 
                        color: '#0f766e', 
                        marginBottom: '1.5rem', 
                        fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', 
                        outline: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '500'
                      }}
                    />
                    <input 
                      placeholder="Phone (optional)" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem', 
                        border: '2px solid #0f766e', 
                        background: '#f0fdfa', 
                        color: '#0f766e', 
                        marginBottom: '1.5rem', 
                        fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', 
                        outline: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '500'
                      }}
                    />
                    <textarea 
                      placeholder="Notes or questions" 
                      rows="5" 
                      value={formData.notes} 
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem', 
                        border: '2px solid #0f766e', 
                        background: '#f0fdfa', 
                        color: '#0f766e', 
                        marginBottom: '2rem', 
                        fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', 
                        outline: 'none', 
                        resize: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '500'
                      }}
                    />
                    <button 
                      type="submit" 
                      className="western-title"
                      style={{
                        width: '100%',
                        padding: '2rem',
                        background: '#0f766e',
                        color: 'white',
                        border: '3px solid #134e4a',
                        borderRadius: '0.5rem',
                        fontSize: 'clamp(1.25rem, 4.5vw, 1.875rem)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 30px 60px rgba(15,118,110,0.5)',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                      }}
                      onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                      onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    >
                      Confirm Booking – $125
                    </button>
                  </form>
                </>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)', color: '#0f766e', fontWeight: '600' }}>No available times on this date</p>
          )}

          {message && (
            <div style={{ 
              marginTop: '4rem', 
              padding: '2.5rem', 
              background: '#ccfbf1', 
              color: '#0f766e', 
              borderRadius: '0.5rem', 
              fontWeight: '600', 
              fontSize: 'clamp(1.125rem, 4vw, 1.5rem)', 
              boxShadow: '0 15px 40px rgba(15,118,110,0.3)', 
              border: '3px solid #0f766e' 
            }}>
              {message}
            </div>
          )}
        </div>
      </main>

      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #0f766e, #0d9488)',
        borderTop: '4px solid #134e4a',
        marginTop: '4rem'
      }}>
        <div style={{ fontSize: '2rem', color: '#5eead4', marginBottom: '1.5rem' }}>~ ✦ ~</div>
        <p className="western-title" style={{ margin: '0.75rem 0', fontSize: 'clamp(1.375rem, 4vw, 1.75rem)', fontWeight: '700', color: '#f0fdfa', letterSpacing: '2px', textTransform: 'uppercase' }}>Contact Melissa</p>
        <p style={{ margin: '0.75rem 0', fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', color: '#ccfbf1' }}>Text or call: <strong style={{ color: '#fbbf24' }}>403-852-4324</strong></p>
        <p style={{ margin: '0.75rem 0', fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', color: '#ccfbf1' }}>Email: <strong style={{ color: '#fbbf24' }}>balancedheartsranch@yahoo.com</strong></p>
        <div style={{ fontSize: '1.5rem', color: '#5eead4', margin: '1.5rem 0' }}>✦</div>
        <p style={{ marginTop: '1rem', fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#99f6e4', fontStyle: 'italic' }}>
          Okotoks, Alberta, Canada
        </p>
      </footer>
    </div>
  );
}
