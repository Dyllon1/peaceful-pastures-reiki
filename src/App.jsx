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
    const loadBookings = async () => {
      try {
        const result = await window.storage.get('bookedSlots');
        if (result) {
          setBookedSlots(JSON.parse(result.value));
        }
      } catch (e) {
        console.error('Error loading bookings:', e);
      }
    };
    loadBookings();
  }, []);

  useEffect(() => {
    const saveBookings = async () => {
      try {
        await window.storage.set('bookedSlots', JSON.stringify(bookedSlots));
      } catch (e) {
        console.error('Error saving bookings:', e);
      }
    };
    if (Object.keys(bookedSlots).length > 0) {
      saveBookings();
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

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email');
      return;
    }
    const key = selectedDate.toLocaleDateString();
    setBookedSlots(prev => ({ ...prev, [key]: [...(prev[key] || []), selectedTime] }));
    setMessage("Booking confirmed! Melissa will contact you shortly to arrange payment ($125/session). Namaste");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', margin: 0, padding: 0, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .react-datepicker {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          width: 100% !important;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .react-datepicker__header {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem 0;
        }
        .react-datepicker__current-month {
          color: #111827;
          font-size: 1.125rem;
          font-weight: 600;
        }
        .react-datepicker__day-names {
          display: flex;
          justify-content: space-around;
          margin-top: 0.75rem;
        }
        .react-datepicker__day-name {
          color: #6b7280 !important;
          font-weight: 600 !important;
          font-size: 0.875rem !important;
          width: 2.5rem !important;
          line-height: 2.5rem !important;
          margin: 0.2rem !important;
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
          border-radius: 0.5rem;
          font-size: 0.9375rem;
          color: #111827;
          font-weight: 500;
        }
        .react-datepicker__day:hover {
          background: #f0fdfa;
          color: #0d9488;
        }
        .react-datepicker__day--selected {
          background: #0d9488 !important;
          color: white !important;
          font-weight: 600;
        }
        .react-datepicker__day--today {
          background: #e0f2fe;
          color: #111827;
          font-weight: 600;
        }
        .react-datepicker__day--disabled {
          color: #d1d5db;
        }
        .react-datepicker__navigation {
          top: 1rem;
        }
        @media (max-width: 640px) {
          .react-datepicker__current-month {
            font-size: 1rem;
          }
          .react-datepicker__day-name {
            font-size: 0.8125rem !important;
            width: 2.2rem !important;
            line-height: 2.2rem !important;
          }
          .react-datepicker__day {
            width: 2.2rem !important;
            height: 2.2rem !important;
            line-height: 2.2rem !important;
            font-size: 0.875rem;
          }
        }
      `}} />

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '56rem', 
          background: '#ffffff', 
          borderRadius: '1rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.05)', 
          padding: '3rem 2rem',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <img 
            src="/melissa.jpg" 
            alt="Melissa" 
            style={{ 
              width: '10rem', 
              height: '10rem', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              margin: '0 auto 2rem', 
              border: '3px solid #0d9488', 
              boxShadow: '0 4px 12px rgba(13,148,136,0.15)'
            }} 
          />

          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 2.75rem)', 
            fontWeight: '700', 
            color: '#111827', 
            letterSpacing: '-0.02em', 
            margin: '0 0 0.5rem',
            lineHeight: '1.2'
          }}>
            Balanced Hearts
          </h1>
          
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            fontWeight: '500', 
            color: '#0d9488', 
            margin: '0 0 0.5rem',
            letterSpacing: '-0.01em'
          }}>
            Holy Fire Reiki
          </h2>

          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)', color: '#6b7280', margin: '0 0 0.5rem', fontWeight: '500' }}>
            with Melissa Lynn
          </p>
          <p style={{ fontSize: 'clamp(1.125rem, 3.5vw, 1.25rem)', color: '#111827', fontWeight: '600', marginBottom: '2.5rem' }}>
            $125 · 60-minute in-person session
          </p>

          <div style={{
            maxWidth: '48rem',
            margin: '0 auto 3rem',
            padding: '2rem',
            background: '#f9fafb',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            textAlign: 'left'
          }}>
            <p style={{ 
              fontSize: 'clamp(0.9375rem, 3vw, 1.0625rem)', 
              color: '#4b5563', 
              lineHeight: '1.7', 
              margin: 0,
              fontWeight: '400'
            }}>
              Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
            </p>
          </div>

          <div style={{ width: '4rem', height: '1px', background: '#0d9488', margin: '2.5rem auto' }} />

          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
            color: '#111827', 
            fontWeight: '600', 
            marginBottom: '2rem',
            letterSpacing: '-0.01em'
          }}>
            Schedule Your Session
          </h2>

          <div style={{ 
            maxWidth: '28rem', 
            margin: '0 auto 3rem', 
            background: '#ffffff', 
            borderRadius: '0.75rem', 
            padding: '1.25rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            border: '1px solid #e5e7eb'
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
              <div style={{ width: '4rem', height: '1px', background: '#d1d5db', margin: '2rem auto' }} />
              
              <h3 style={{ 
                fontSize: 'clamp(1.125rem, 4vw, 1.375rem)', 
                color: '#111827', 
                marginBottom: '1.5rem', 
                fontWeight: '600'
              }}>
                Available times on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '3rem', maxWidth: '48rem', margin: '0 auto 3rem' }}>
                {slots.map(time => (
                  <button 
                    key={time} 
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: 'clamp(0.9375rem, 3vw, 1rem)',
                      fontWeight: '600',
                      background: selectedTime === time ? '#0d9488' : '#ffffff',
                      color: selectedTime === time ? 'white' : '#111827',
                      border: selectedTime === time ? '2px solid #0d9488' : '2px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: selectedTime === time ? '0 4px 12px rgba(13,148,136,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
                      transform: selectedTime === time ? 'translateY(-1px)' : 'translateY(0)'
                    }}
                    onMouseOver={e => {
                      if (selectedTime !== time) {
                        e.target.style.borderColor = '#0d9488';
                        e.target.style.background = '#f0fdfa';
                      }
                    }}
                    onMouseOut={e => {
                      if (selectedTime !== time) {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.background = '#ffffff';
                      }
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <>
                  <div style={{ width: '4rem', height: '1px', background: '#d1d5db', margin: '2.5rem auto' }} />
                  
                  <div style={{ maxWidth: '32rem', margin: '0 auto', textAlign: 'left' }}>
                    <input 
                      required 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid #d1d5db', 
                        background: '#ffffff', 
                        color: '#111827', 
                        marginBottom: '1rem', 
                        fontSize: '1rem', 
                        outline: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '400',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#0d9488'}
                      onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    />
                    <input 
                      required 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid #d1d5db', 
                        background: '#ffffff', 
                        color: '#111827', 
                        marginBottom: '1rem', 
                        fontSize: '1rem', 
                        outline: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '400',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#0d9488'}
                      onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    />
                    <input 
                      placeholder="Phone (optional)" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid #d1d5db', 
                        background: '#ffffff', 
                        color: '#111827', 
                        marginBottom: '1rem', 
                        fontSize: '1rem', 
                        outline: 'none', 
                        boxSizing: 'border-box',
                        fontWeight: '400',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#0d9488'}
                      onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    />
                    <textarea 
                      placeholder="Notes or questions" 
                      rows="4" 
                      value={formData.notes} 
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid #d1d5db', 
                        background: '#ffffff', 
                        color: '#111827', 
                        marginBottom: '1.5rem', 
                        fontSize: '1rem', 
                        outline: 'none', 
                        resize: 'vertical', 
                        boxSizing: 'border-box',
                        fontWeight: '400',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#0d9488'}
                      onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    />
                    <button 
                      onClick={handleSubmit}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: '#0d9488',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1.0625rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(13,148,136,0.25)',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onMouseOver={e => {
                        e.target.style.background = '#0f766e';
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(13,148,136,0.3)';
                      }}
                      onMouseOut={e => {
                        e.target.style.background = '#0d9488';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(13,148,136,0.25)';
                      }}
                    >
                      Confirm Booking – $125
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.125rem)', color: '#6b7280', fontWeight: '500' }}>No available times on this date</p>
          )}

          {message && (
            <div style={{ 
              marginTop: '3rem', 
              padding: '1.5rem', 
              background: '#ecfdf5', 
              color: '#065f46', 
              borderRadius: '0.75rem', 
              fontWeight: '500', 
              fontSize: 'clamp(0.9375rem, 3.5vw, 1.0625rem)', 
              boxShadow: '0 1px 3px rgba(13,148,136,0.1)', 
              border: '1px solid #a7f3d0' 
            }}>
              {message}
            </div>
          )}
        </div>
      </main>

      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        background: '#111827',
        borderTop: '1px solid #1f2937',
        marginTop: '4rem'
      }}>
        <p style={{ margin: '0 0 1rem', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', fontWeight: '600', color: '#ffffff' }}>Contact Melissa</p>
        <p style={{ margin: '0.5rem 0', fontSize: 'clamp(1rem, 3vw, 1.125rem)', color: '#d1d5db' }}>Text or call: <strong style={{ color: '#0d9488' }}>403-852-4324</strong></p>
        <p style={{ margin: '0.5rem 0', fontSize: 'clamp(1rem, 3vw, 1.125rem)', color: '#d1d5db' }}>Email: <strong style={{ color: '#0d9488' }}>balancedheartsranch@yahoo.com</strong></p>
        <div style={{ width: '4rem', height: '1px', background: '#374151', margin: '1.5rem auto' }} />
        <p style={{ marginTop: '1rem', fontSize: 'clamp(0.9375rem, 2.5vw, 1rem)', color: '#9ca3af' }}>
          Okotoks, Alberta, Canada
        </p>
      </footer>
    </div>
  );
}
