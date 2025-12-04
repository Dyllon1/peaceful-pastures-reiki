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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 50%, #5eead4 100%)', margin: 0, padding: 0, fontFamily: "'Cormorant Garamond', 'Georgia', serif", position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Cinzel:wght@400;500;600;700&display=swap');
        
        body { font-family: 'Cormorant Garamond', 'Georgia', serif; }
        .luxury-title { font-family: 'Cinzel', 'Georgia', serif; }
        
        .pattern-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        
        .floating-ornament {
          position: absolute;
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.15);
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .ornament-1 { top: 15%; left: 10%; animation-delay: 0s; }
        .ornament-2 { top: 25%; right: 15%; animation-delay: 2s; font-size: 2.5rem; }
        .ornament-3 { top: 60%; left: 8%; animation-delay: 4s; font-size: 2rem; }
        .ornament-4 { top: 70%; right: 12%; animation-delay: 1s; font-size: 3.5rem; }
        .ornament-5 { top: 40%; left: 5%; animation-delay: 3s; font-size: 2rem; }
        
        .react-datepicker {
          font-family: 'Cormorant Garamond', 'Georgia', serif !important;
          width: 100% !important; border: 2px solid #14b8a6 !important;
          background: linear-gradient(to bottom, #ffffff, #f0fdfa);
          box-shadow: 0 8px 32px rgba(13, 148, 136, 0.2); border-radius: 0.75rem !important;
          overflow: hidden;
        }
        .react-datepicker__header {
          background: linear-gradient(to bottom, #ffffff, #f0fdfa);
          border-bottom: 2px solid #14b8a6 !important; padding: 1.25rem 0.75rem !important; 
          border-radius: 0 !important;
        }
        .react-datepicker__current-month { color: #0a4f4a; font-size: 1.375rem; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 0.75rem !important; }
        .react-datepicker__day-names { display: flex !important; justify-content: space-around !important; margin-top: 0 !important; padding: 0 0.5rem !important; }
        .react-datepicker__day-name { color: #0d6b65 !important; font-weight: 700 !important; font-size: 1rem !important;
          width: 2.5rem !important; line-height: 2.5rem !important; margin: 0.15rem !important; text-align: center !important; }
        .react-datepicker__month { margin: 1rem 0.75rem 1rem 0.75rem !important; }
        .react-datepicker__week { display: flex !important; justify-content: space-around !important; }
        .react-datepicker__day {
          width: 2.5rem !important; height: 2.5rem !important; line-height: 2.5rem !important; margin: 0.15rem !important;
          border-radius: 0.5rem; font-size: 1.0625rem; color: #0a4f4a; font-weight: 600; transition: all 0.2s;
        }
        .react-datepicker__day:hover { background: linear-gradient(135deg, #5eead4, #14b8a6); color: white; transform: scale(1.05); }
        .react-datepicker__day--selected {
          background: linear-gradient(135deg, #0d9488, #0a4f4a) !important; color: white !important;
          font-weight: 700; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
        }
        .react-datepicker__day--today { background: #fef3c7; color: #92400e; font-weight: 700; border: 2px solid #f59e0b; }
        .react-datepicker__day--disabled { color: #cbd5e1; }
        .react-datepicker__navigation { top: 1.25rem; }
        
        @media (max-width: 640px) {
          .react-datepicker__current-month { font-size: 1.125rem; }
          .react-datepicker__day-name { font-size: 0.875rem !important; width: 2.2rem !important; line-height: 2.2rem !important; margin: 0.1rem !important; }
          .react-datepicker__day { width: 2.2rem !important; height: 2.2rem !important; line-height: 2.2rem !important; font-size: 0.9375rem; margin: 0.1rem !important; }
          .react-datepicker__month { margin: 0.75rem 0.5rem !important; }
          .react-datepicker__header { padding: 1rem 0.5rem !important; }
          .floating-ornament { display: none; }
        }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.6s ease-out; }
      `}} />

      <div className="pattern-overlay"></div>
      
      <div className="floating-ornament ornament-1">✦</div>
      <div className="floating-ornament ornament-2">✦</div>
      <div className="floating-ornament ornament-3">✦</div>
      <div className="floating-ornament ornament-4">✦</div>
      <div className="floating-ornament ornament-5">✦</div>

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <div className="fade-in" style={{ 
          width: '100%', maxWidth: '62rem', background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)', 
          borderRadius: '1.5rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', 
          padding: '3rem 3rem 4rem 3rem', textAlign: 'center', border: '3px solid #14b8a6', position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '50px', height: '50px', borderTop: '3px solid #14b8a6', borderLeft: '3px solid #14b8a6', borderRadius: '0.5rem 0 0 0' }}>
            <div style={{ position: 'absolute', top: '-8px', left: '-8px', color: '#14b8a6', fontSize: '1rem' }}>✦</div>
          </div>
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '50px', height: '50px', borderTop: '3px solid #14b8a6', borderRight: '3px solid #14b8a6', borderRadius: '0 0.5rem 0 0' }}>
            <div style={{ position: 'absolute', top: '-8px', right: '-8px', color: '#14b8a6', fontSize: '1rem' }}>✦</div>
          </div>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', width: '50px', height: '50px', borderBottom: '3px solid #14b8a6', borderLeft: '3px solid #14b8a6', borderRadius: '0 0 0 0.5rem' }}>
            <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', color: '#14b8a6', fontSize: '1rem' }}>✦</div>
          </div>
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '50px', height: '50px', borderBottom: '3px solid #14b8a6', borderRight: '3px solid #14b8a6', borderRadius: '0 0 0.5rem 0' }}>
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', color: '#14b8a6', fontSize: '1rem' }}>✦</div>
          </div>

          <div style={{ width: '12rem', height: '12rem', borderRadius: '50%', margin: '-4rem auto 2rem',
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)', padding: '6px',
            boxShadow: '0 12px 40px rgba(13, 148, 136, 0.3), 0 0 0 8px rgba(20, 184, 166, 0.1), 0 0 0 12px rgba(255, 255, 255, 0.8)' }}>
            <img src="/melissa.jpg" alt="Melissa" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>

          <div style={{ fontSize: '2.5rem', color: '#14b8a6', marginBottom: '1rem', letterSpacing: '1rem' }}>✦ ✦ ✦</div>

          <h1 className="luxury-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '700', color: '#0a4f4a', 
            letterSpacing: '3px', margin: '0 0 1rem', lineHeight: '1.1', textShadow: '0 2px 8px rgba(13, 148, 136, 0.1)' }}>
            BALANCED HEARTS
          </h1>
          
          <div style={{ margin: '1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, transparent, #14b8a6)' }}></div>
            <div style={{ color: '#14b8a6', fontSize: '1.25rem' }}>✦</div>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to left, transparent, #14b8a6)' }}></div>
          </div>
          
          <h2 className="luxury-title" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '500', 
            color: '#14b8a6', letterSpacing: '2px', margin: '0 0 1rem', fontStyle: 'italic' }}>
            Holy Fire Reiki
          </h2>

          <div style={{ margin: '1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, transparent, #14b8a6)' }}></div>
            <div style={{ color: '#14b8a6', fontSize: '1.25rem' }}>✦</div>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to left, transparent, #14b8a6)' }}></div>
          </div>

          <p style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: '#0d6b65', fontStyle: 'italic', margin: '0 0 0.75rem', fontWeight: '600' }}>
            with Melissa Lynn
          </p>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ fontSize: '1.5rem', color: '#14b8a6' }}>✦</div>
            <p style={{ fontSize: 'clamp(1.375rem, 4vw, 1.875rem)', color: '#0a4f4a', fontWeight: '700', margin: 0,
              padding: '1rem 2rem', background: 'linear-gradient(135deg, #ccfbf1, #f0fdfa)', borderRadius: '0.75rem',
              border: '2px solid #14b8a6', boxShadow: '0 4px 16px rgba(13, 148, 136, 0.15)' }}>
              $125 · 60-minute session
            </p>
            <div style={{ fontSize: '1.5rem', color: '#14b8a6' }}>✦</div>
          </div>

          <div style={{ maxWidth: '52rem', margin: '0 auto 4rem', padding: '2.5rem',
            background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)', borderRadius: '1rem',
            border: '2px solid #14b8a6', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.15)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', 
              background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)', padding: '0 1rem', color: '#14b8a6', fontSize: '1.5rem',
              border: '2px solid #14b8a6', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✦</div>
            
            <p style={{ fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', color: '#0a4f4a', lineHeight: '1.8', margin: 0, fontWeight: '500' }}>
              Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release and opens the heart to profound peace. After the Reiki session, the horses often share their quiet wisdom.
            </p>
          </div>

          <div style={{ fontSize: '2.5rem', color: '#14b8a6', margin: '3rem 0 2rem', letterSpacing: '0.5rem' }}>✦ ✦ ✦ ✦ ✦</div>

          <h2 className="luxury-title" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#0a4f4a', 
            fontWeight: '600', marginBottom: '3rem', letterSpacing: '2px' }}>
            SCHEDULE YOUR SESSION
          </h2>

          <div style={{ maxWidth: '32rem', margin: '0 auto 4rem', background: 'transparent', borderRadius: '1rem', padding: '1.5rem' }}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline filterDate={date => date.getDay() !== 0} />
          </div>

          {selectedDate && slots.length > 0 && (
            <>
              <div style={{ fontSize: '2rem', color: '#14b8a6', margin: '2rem 0 1.5rem', letterSpacing: '0.5rem' }}>✦ ✦ ✦ ✦ ✦</div>
              
              <h3 className="luxury-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: '#0a4f4a', 
                marginBottom: '2.5rem', fontWeight: '600', letterSpacing: '1px' }}>
                Available Times
              </h3>
              <p style={{ fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', color: '#0d6b65', marginBottom: '2rem', fontWeight: '500' }}>
                {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '4rem', maxWidth: '56rem', margin: '0 auto 4rem' }}>
                {slots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1.5rem 1rem', borderRadius: '0.75rem', fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)', fontWeight: '600',
                      background: selectedTime === time ? 'linear-gradient(135deg, #0d9488, #0a4f4a)' : 'linear-gradient(to bottom, #ffffff, #f0fdfa)',
                      color: selectedTime === time ? 'white' : '#0a4f4a',
                      border: selectedTime === time ? '3px solid #14b8a6' : '2px solid #14b8a6', cursor: 'pointer', transition: 'all 0.3s',
                      boxShadow: selectedTime === time ? '0 8px 24px rgba(13, 148, 136, 0.4)' : '0 4px 12px rgba(13, 148, 136, 0.15)',
                      transform: selectedTime === time ? 'translateY(-4px)' : 'translateY(0)', letterSpacing: '0.5px',
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      position: 'relative'
                    }}
                    onMouseOver={e => {
                      if (selectedTime !== time) {
                        e.target.style.background = 'linear-gradient(135deg, #ccfbf1, #f0fdfa)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.25)';
                      }
                    }}
                    onMouseOut={e => {
                      if (selectedTime !== time) {
                        e.target.style.background = 'linear-gradient(to bottom, #ffffff, #f0fdfa)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.15)';
                      }
                    }}>
                    {selectedTime === time && <span style={{ position: 'absolute', top: '4px', right: '8px', fontSize: '0.75rem' }}>✦</span>}
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <>
                  <div style={{ fontSize: '2rem', color: '#14b8a6', margin: '3rem 0 2rem' }}>✦</div>
                  
                  <div style={{ maxWidth: '38rem', margin: '0 auto', textAlign: 'left' }}>
                    <input required placeholder="Your Name" value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '2px solid #14b8a6',
                        background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)', color: '#0a4f4a', marginBottom: '1.25rem',
                        fontSize: '1.125rem', outline: 'none', boxSizing: 'border-box', fontWeight: '500',
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif", transition: 'all 0.3s',
                        boxShadow: '0 2px 8px rgba(13, 148, 136, 0.1)' }}
                      onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.boxShadow = '0 4px 16px rgba(13, 148, 136, 0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = '#14b8a6'; e.target.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.1)'; }}
                    />
                    <input required type="email" placeholder="Email Address" value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '2px solid #14b8a6',
                        background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)', color: '#0a4f4a', marginBottom: '1.25rem',
                        fontSize: '1.125rem', outline: 'none', boxSizing: 'border-box', fontWeight: '500',
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif", transition: 'all 0.3s',
                        boxShadow: '0 2px 8px rgba(13, 148, 136, 0.1)' }}
                      onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.boxShadow = '0 4px 16px rgba(13, 148, 136, 0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = '#14b8a6'; e.target.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.1)'; }}
                    />
                    <input placeholder="Phone Number (optional)" value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '2px solid #14b8a6',
                        background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)', color: '#0a4f4a', marginBottom: '1.25rem',
                        fontSize: '1.125rem', outline: 'none', boxSizing: 'border-box', fontWeight: '500',
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif", transition: 'all 0.3s',
                        boxShadow: '0 2px 8px rgba(13, 148, 136, 0.1)' }}
                      onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.boxShadow = '0 4px 16px rgba(13, 148, 136, 0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = '#14b8a6'; e.target.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.1)'; }}
                    />
                    <textarea placeholder="Any notes or questions for Melissa..." rows="5" value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '2px solid #14b8a6',
                        background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)', color: '#0a4f4a', marginBottom: '2rem',
                        fontSize: '1.125rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontWeight: '500',
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif", transition: 'all 0.3s',
                        boxShadow: '0 2px 8px rgba(13, 148, 136, 0.1)', lineHeight: '1.6' }}
                      onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.boxShadow = '0 4px 16px rgba(13, 148, 136, 0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = '#14b8a6'; e.target.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.1)'; }}
                    />
                    <button onClick={handleSubmit} className="luxury-title"
                      style={{
                        width: '100%', padding: '1.75rem 2rem', background: 'linear-gradient(135deg, #0d9488, #0a4f4a)',
                        color: 'white', border: '3px solid #14b8a6', borderRadius: '0.75rem', fontSize: '1.5rem',
                        fontWeight: '600', cursor: 'pointer', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.4)',
                        transition: 'all 0.3s', boxSizing: 'border-box', letterSpacing: '2px'
                      }}
                      onMouseOver={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 12px 32px rgba(13, 148, 136, 0.5)';
                        e.target.style.background = 'linear-gradient(135deg, #14b8a6, #0d9488)';
                      }}
                      onMouseOut={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 24px rgba(13, 148, 136, 0.4)';
                        e.target.style.background = 'linear-gradient(135deg, #0d9488, #0a4f4a)';
                      }}>
                      ✦ CONFIRM BOOKING — $125 ✦
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {selectedDate && slots.length === 0 && (
            <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '0.75rem', border: '2px solid #f59e0b' }}>
              <p style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', color: '#92400e', fontWeight: '600', fontStyle: 'italic', margin: 0 }}>
                ✦ No available times on this date ✦
              </p>
            </div>
          )}

          {message && (
            <div style={{ marginTop: '4rem', padding: '2rem 2.5rem', background: 'linear-gradient(135deg, #d1fae5, #ccfbf1)',
              color: '#065f46', borderRadius: '1rem', fontWeight: '600', fontSize: 'clamp(1.125rem, 4vw, 1.375rem)',
              boxShadow: '0 8px 24px rgba(13, 148, 136, 0.2)', border: '2px solid #14b8a6', fontStyle: 'italic', lineHeight: '1.6',
              position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', color: '#14b8a6', fontSize: '1.5rem', background: 'white', padding: '0 0.5rem' }}>✦</div>
              {message}
            </div>
          )}
        </div>
      </main>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(to bottom, #0a4f4a, #064e3b)',
        borderTop: '3px solid #14b8a6', marginTop: '0' }}>
        <div style={{ fontSize: '2.5rem', color: '#14b8a6', marginBottom: '2rem', letterSpacing: '0.5rem' }}>✦ ✦ ✦</div>
        <p className="luxury-title" style={{ margin: '0 0 1.5rem', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', 
          fontWeight: '600', color: '#ffffff', letterSpacing: '2px' }}>CONTACT MELISSA</p>
        <div style={{ margin: '1.5rem auto', width: '100px', height: '2px', background: 'linear-gradient(to right, transparent, #14b8a6, transparent)' }}></div>
        <p style={{ margin: '1rem 0', fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', color: '#ccfbf1', fontWeight: '500' }}>
          Text or call: <strong style={{ color: '#14b8a6', fontWeight: '700' }}>403-852-4324</strong>
        </p>
        <p style={{ margin: '1rem 0', fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', color: '#ccfbf1', fontWeight: '500' }}>
          Email: <strong style={{ color: '#14b8a6', fontWeight: '700' }}>balancedheartsranch@yahoo.com</strong>
        </p>
        <div style={{ margin: '2rem auto 1.5rem', width: '100px', height: '2px', background: 'linear-gradient(to right, transparent, #14b8a6, transparent)' }}></div>
        <p style={{ marginTop: '1.5rem', fontSize: 'clamp(1.125rem, 3vw, 1.375rem)', color: '#99f6e4', fontStyle: 'italic' }}>
          Okotoks, Alberta, Canada
        </p>
      </footer>
    </div>
  );
}
