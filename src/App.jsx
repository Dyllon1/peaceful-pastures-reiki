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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fffbeb, #ffffff, #f0fdfa)', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{__html: `
        .react-datepicker {
          font-family: 'Georgia', serif;
          width: 100% !important;
          border: none;
          background: white;
        }
        .react-datepicker__header {
          background: white;
          border-bottom: 2px solid #fbbf24;
          padding: 1.25rem 0;
        }
        .react-datepicker__current-month {
          color: #0f766e;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.5px;
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
          color: #1e293b;
          font-weight: 500;
        }
        .react-datepicker__day:hover {
          background: #ccfbf1;
          color: #0f766e;
        }
        .react-datepicker__day--selected {
          background: #0f766e !important;
          color: white !important;
          font-weight: 700;
        }
        .react-datepicker__day--today {
          background: #fbbf24;
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
      `}} />

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '64rem', background: 'white', borderRadius: '3rem', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', padding: '4rem 2rem', textAlign: 'center' }}>
          <img 
            src="/melissa.jpg" 
            alt="Melissa" 
            style={{ width: '16rem', height: '16rem', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 2rem', border: '12px solid #5eead4', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} 
          />

          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '300', color: '#0f766e', letterSpacing: '-2px', margin: '0 0 0.5rem' }}>
            Balanced Hearts
          </h1>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '200', color: '#14b8a6', letterSpacing: '-0.5px', margin: '0 0 3rem' }}>
            Holy Fire Reiki
          </h2>

          <p style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', color: '#0f766e', fontStyle: 'italic', margin: '0 0 0.5rem' }}>
            with Melissa Lynn
          </p>
          <p style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.75rem)', color: '#d97706', fontWeight: '600', marginBottom: '3rem' }}>
            $125 · 60-minute in-person session
          </p>

          <div style={{
            maxWidth: '48rem',
            margin: '0 auto 4rem',
            padding: '2rem',
            background: 'linear-gradient(to bottom right, #fffbeb, #f0fdfa)',
            borderRadius: '2rem',
            border: '2px solid #fde68a',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#0f766e', fontStyle: 'italic', lineHeight: '1.7', margin: 0 }}>
              Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#0f766e', fontWeight: '300', marginBottom: '3rem' }}>
            Schedule Your Session
          </h2>

          <div style={{ 
            maxWidth: '28rem', 
            margin: '0 auto 4rem', 
            background: 'white', 
            borderRadius: '2rem', 
            padding: '1.5rem', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)', 
            border: '2px solid #fde68a'
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
              <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)', color: '#0f766e', marginBottom: '2.5rem', fontWeight: '300' }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '4rem', maxWidth: '64rem', margin: '0 auto 4rem' }}>
                {slots.map(time => (
                  <button 
                    key={time} 
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1.5rem 1rem',
                      borderRadius: '1.25rem',
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                      fontWeight: '600',
                      background: selectedTime === time ? '#0f766e' : 'linear-gradient(to bottom right, #fffbeb, #f0fdfa)',
                      color: selectedTime === time ? 'white' : '#0f766e',
                      border: selectedTime === time ? '2px solid #fbbf24' : '2px solid #5eead4',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 20px 40px rgba(15,118,110,0.4)' : '0 8px 20px rgba(0,0,0,0.08)',
                      transform: selectedTime === time ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '48rem', margin: '0 auto' }}>
                  <input 
                    required 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '1.5rem', borderRadius: '1.25rem', border: '2px solid #fde68a', background: 'linear-gradient(to bottom right, #fffbeb, #ffffff)', color: '#0f766e', marginBottom: '1.5rem', fontSize: 'clamp(1rem, 3vw, 1.125rem)', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <input 
                    required 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '1.5rem', borderRadius: '1.25rem', border: '2px solid #fde68a', background: 'linear-gradient(to bottom right, #fffbeb, #ffffff)', color: '#0f766e', marginBottom: '1.5rem', fontSize: 'clamp(1rem, 3vw, 1.125rem)', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <input 
                    placeholder="Phone (optional)" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width: '100%', padding: '1.5rem', borderRadius: '1.25rem', border: '2px solid #fde68a', background: 'linear-gradient(to bottom right, #fffbeb, #ffffff)', color: '#0f766e', marginBottom: '1.5rem', fontSize: 'clamp(1rem, 3vw, 1.125rem)', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <textarea 
                    placeholder="Notes or questions" 
                    rows="5" 
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    style={{ width: '100%', padding: '1.5rem', borderRadius: '1.25rem', border: '2px solid #fde68a', background: 'linear-gradient(to bottom right, #fffbeb, #ffffff)', color: '#0f766e', marginBottom: '2rem', fontSize: 'clamp(1rem, 3vw, 1.125rem)', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                  />
                  <button 
                    type="submit" 
                    style={{
                      width: '100%',
                      padding: '1.75rem',
                      background: 'linear-gradient(to right, #0f766e, #14b8a6)',
                      color: 'white',
                      border: '2px solid #fbbf24',
                      borderRadius: '1.25rem',
                      fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 25px 50px rgba(15,118,110,0.4)',
                      transition: 'all 0.3s',
                      boxSizing: 'border-box'
                    }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  >
                    Confirm Booking – $125
                  </button>
                </form>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: '#0f766e', fontWeight: '300' }}>No available times on this date</p>
          )}

          {message && (
            <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'linear-gradient(to bottom right, #ecfdf5, #f0fdfa)', color: '#166534', borderRadius: '1.5rem', fontWeight: '600', fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid #86efac' }}>
              {message}
            </div>
          )}
        </div>
      </main>

      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #ffffff, #fffbeb)',
        borderTop: '2px solid #fde68a',
        marginTop: '4rem'
      }}>
        <p style={{ margin: '0.5rem 0', fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', fontWeight: '600', color: '#0f766e' }}>Contact Melissa</p>
        <p style={{ margin: '0.5rem 0', fontSize: 'clamp(1rem, 3vw, 1.125rem)', color: '#0f766e' }}>Text or call: <strong style={{ color: '#d97706' }}>403-852-4324</strong></p>
        <p style={{ margin: '0.5rem 0', fontSize: 'clamp(1rem, 3vw, 1.125rem)', color: '#0f766e' }}>Email: <strong style={{ color: '#d97706' }}>balancedheartsranch@yahoo.com</strong></p>
        <p style={{ marginTop: '1rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', color: '#14b8a6' }}>
          Okotoks, Alberta, Canada
        </p>
      </footer>
    </div>
  );
}
