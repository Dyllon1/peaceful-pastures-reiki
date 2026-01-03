import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState({});
  const [storageLoaded, setStorageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentScreen('main'), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const result = await window.storage.get('bookedSlots');
        if (result && result.value) setBookedSlots(JSON.parse(result.value));
      } catch (e) {
        console.log('Storage not available:', e);
      } finally {
        setStorageLoaded(true);
      }
    };
    loadBookings();
  }, []);

  useEffect(() => {
    const saveBookings = async () => {
      if (!storageLoaded) return;
      try {
        await window.storage.set('bookedSlots', JSON.stringify(bookedSlots));
      } catch (e) {
        console.error('Error saving:', e);
      }
    };
    if (storageLoaded) saveBookings();
  }, [bookedSlots, storageLoaded]);

  const getSlots = (date) => {
    if (!date) return [];
    const day = date.getDay();
    const key = date.toLocaleDateString();
    const all = day === 6 ? ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'] : ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const booked = bookedSlots[key] || [];
    return all.map(time => ({ time, isBooked: booked.includes(time) }));
  };

  const slots = selectedDate ? getSlots(selectedDate) : [];
  const availableSlots = slots.filter(slot => !slot.isBooked);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email');
      return;
    }
    const key = selectedDate.toLocaleDateString();
    const newBookedSlots = { ...bookedSlots, [key]: [...(bookedSlots[key] || []), selectedTime] };
    setBookedSlots(newBookedSlots);
    setMessage("Booking confirmed! Melissa will contact you shortly. Namaste 🙏");
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedTime('');
    setTimeout(async () => {
      try { await window.storage.set('bookedSlots', JSON.stringify(newBookedSlots)); } catch (e) {}
    }, 100);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Inter, sans-serif; overflow-x: hidden; background: #0A0E1A; }
        
        img { background: transparent !important; }
        
        .splash-screen {
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
          background: linear-gradient(180deg, #0A0E1A, #0D3B4A);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 9999; animation: fadeOut 0.5s ease 3s forwards;
        }
        @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
        
        .logo-container {
          width: 280px; height: 380px;
          animation: logoFadeIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        
        .logo-image {
          width: 100%; height: 100%;
          filter: drop-shadow(0 10px 40px rgba(255, 74, 28, 0.4)) 
                  drop-shadow(0 0 60px rgba(255, 74, 28, 0.3)) 
                  brightness(1.1);
          background: transparent !important;
        }
        
        .main-content {
          min-height: 100vh;
          background: linear-gradient(135deg, #0A0E1A 0%, #0E1D34 50%, #0D3B4A 100%);
          position: relative; padding: 2rem 1rem;
        }
        
        .pattern-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(circle at 50% 50%, rgba(255, 74, 28, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .react-datepicker {
          font-family: Inter, sans-serif !important;
          border: 1px solid rgba(255, 107, 61, 0.2) !important;
          background: #1A2235 !important;
          box-shadow: 0 8px 32px rgba(255, 74, 28, 0.2) !important;
          border-radius: 14px !important;
        }
        .react-datepicker__header {
          background: #222B3F !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          padding: 1rem !important;
          border-radius: 14px 14px 0 0 !important;
        }
        .react-datepicker__current-month {
          color: #F8FAFB !important; font-size: 1.125rem !important; font-weight: 600 !important;
        }
        .react-datepicker__day-name { color: #9AA5B1 !important; font-weight: 600 !important; }
        .react-datepicker__day {
          color: #E5E9ED !important; font-weight: 500 !important;
          border-radius: 8px !important; transition: all 0.2s !important;
        }
        .react-datepicker__day:hover {
          background: rgba(255, 74, 28, 0.2) !important; color: #FF6B3D !important;
        }
        .react-datepicker__day--selected {
          background: linear-gradient(135deg, #FF4A1C, #FF6B3D) !important;
          color: white !important; box-shadow: 0 4px 12px rgba(255, 74, 28, 0.4) !important;
        }
        .react-datepicker__day--today {
          background: rgba(251, 191, 36, 0.2) !important;
          color: #FCD34D !important; border: 1px solid #F59E0B !important;
        }
        .react-datepicker__day--disabled { color: #52606D !important; opacity: 0.4 !important; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        
        @media (max-width: 640px) { .logo-container { width: 220px; height: 300px; } }
      `}</style>

      {currentScreen === 'splash' && (
        <div className="splash-screen">
          <div className="logo-container">
            <img 
              src="/melissa.png" 
              alt="Sacred Fire Reiki Logo" 
              className="logo-image" 
              style={{width: '100%', height: '100%', objectFit: 'contain'}} 
            />
          </div>
          <div style={{marginTop: '2rem', maxWidth: '500px', textAlign: 'center', padding: '0 2rem'}}>
            <p style={{
              fontFamily: 'Cinzel, serif', 
              fontSize: '1.25rem', 
              color: '#FF8A5C', 
              fontStyle: 'italic', 
              lineHeight: '1.8', 
              letterSpacing: '0.02em'
            }}>
              "Energy flows where intention goes"
            </p>
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="pattern-overlay"></div>
        <main style={{position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto'}}>
          <div className="fade-in" style={{
            background: 'linear-gradient(to bottom, rgba(26, 34, 53, 0.95), rgba(34, 43, 63, 0.95))', 
            borderRadius: '20px', 
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 74, 28, 0.2)', 
            padding: '3rem 2.5rem 4rem', 
            textAlign: 'center', 
            backdropFilter: 'blur(10px)'
          }}>

            <div style={{
              width: '280px', 
              height: '280px', 
              margin: '0 auto 2rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'transparent'
            }}>
              <img 
                src="/melissa.png" 
                alt="Sacred Fire Logo" 
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain', 
                  filter: 'drop-shadow(0 10px 40px rgba(255, 74, 28, 0.5))',
                  background: 'transparent'
                }} 
              />
            </div>

            <h1 style={{
              fontFamily: 'Cinzel, serif', 
              fontSize: 'clamp(2.5rem, 7vw, 4rem)', 
              fontWeight: '700', 
              color: '#F8FAFB', 
              letterSpacing: '0.1em', 
              margin: '0 0 0.5rem', 
              lineHeight: '1.1', 
              textShadow: '0 2px 20px rgba(255, 74, 28, 0.3)'
            }}>
              SACRED FIRE REIKI
            </h1>
            
            <div style={{
              width: '100px', 
              height: '3px', 
              background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
              margin: '1.5rem auto'
            }}></div>
            
            <p style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
              color: '#FF8A5C', 
              fontStyle: 'italic', 
              margin: '0 0 0.75rem', 
              fontWeight: '500'
            }}>
              with Melissa Lynn
            </p>
            
            <p style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#F8FAFB', 
              fontWeight: '700', 
              margin: '0 0 0.5rem', 
              padding: '1rem 2rem', 
              background: 'rgba(255, 74, 28, 0.1)', 
              borderRadius: '12px', 
              border: '2px solid rgba(255, 74, 28, 0.3)', 
              boxShadow: '0 4px 16px rgba(255, 74, 28, 0.2)', 
              display: 'inline-block'
            }}>
              $125 · 60-minute session
            </p>
            
            <p style={{
              fontSize: 'clamp(0.9rem, 3vw, 1.125rem)', 
              color: '#9AA5B1', 
              fontStyle: 'italic', 
              margin: '0.5rem 0 3rem', 
              fontWeight: '400'
            }}>
              Payment by e-transfer or cash at appointment
            </p>

            <div style={{
              maxWidth: '700px', 
              margin: '0 auto 3rem', 
              padding: '2rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '14px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}>
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                color: '#E5E9ED', 
                lineHeight: '1.7', 
                margin: 0, 
                fontWeight: '400'
              }}>
                Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release, and opens the heart to profound peace.
              </p>
            </div>

            {/* Services Section */}
            <div style={{
              width: '100px', 
              height: '3px', 
              background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
              margin: '4rem auto 2rem'
            }}></div>

            <h2 style={{
              fontFamily: 'Cinzel, serif', 
              fontSize: 'clamp(2rem, 5vw, 2.75rem)', 
              color: '#F8FAFB', 
              fontWeight: '600', 
              marginBottom: '3rem', 
              letterSpacing: '0.08em'
            }}>
              SERVICES
            </h2>

            {/* Service 1: One-on-One Sacred Fire Reiki */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              padding: '2.5rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                color: '#FF6B3D', 
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}>
                One-on-One Sacred Fire Reiki Session
              </h3>
              
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.125rem', color: '#CBD2D9', marginBottom: '0.5rem'}}>
                  <strong style={{color: '#FF8A5C'}}>Length:</strong> 60 minutes
                </p>
                <p style={{fontSize: '1.125rem', color: '#CBD2D9'}}>
                  <strong style={{color: '#FF8A5C'}}>Investment:</strong> $125 CAD
                </p>
              </div>

              <p style={{fontSize: '1rem', color: '#9AA5B1', fontStyle: 'italic', marginBottom: '1.5rem'}}>
                <strong style={{color: '#CBD2D9'}}>Who it's for:</strong> Individuals seeking grounding, emotional balance, nervous system regulation, or energetic support during stress, transition, or integration.
              </p>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                This private Sacred Fire Reiki session offers intuitive, focused energy work to support relaxation, alignment, and inner stability. Clients often experience a sense of calm, emotional settling, and renewed clarity as Sacred Fire gently releases energetic holding patterns and restores balance.
              </p>

              <p style={{fontSize: '1rem', color: '#CBD2D9', marginBottom: '0.75rem', fontWeight: '600'}}>
                Common intentions include:
              </p>
              <ul style={{color: '#9AA5B1', fontSize: '1rem', lineHeight: '1.8', marginLeft: '1.5rem'}}>
                <li>Stress or burnout support</li>
                <li>Emotional regulation</li>
                <li>Grounding and embodiment</li>
                <li>Energetic recalibration</li>
              </ul>
            </div>

            {/* Service 2: Sacred Fire Reiki with the Horses */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              padding: '2.5rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                color: '#FF6B3D', 
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}>
                Sacred Fire Reiki with the Horses
              </h3>
              
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.125rem', color: '#CBD2D9', marginBottom: '0.5rem'}}>
                  <strong style={{color: '#FF8A5C'}}>Length:</strong> 75 minutes
                </p>
                <p style={{fontSize: '1.125rem', color: '#CBD2D9'}}>
                  <strong style={{color: '#FF8A5C'}}>Investment:</strong> $175 CAD
                </p>
              </div>

              <p style={{fontSize: '1rem', color: '#9AA5B1', fontStyle: 'italic', marginBottom: '1.5rem'}}>
                <strong style={{color: '#CBD2D9'}}>Who it's for:</strong> Individuals seeking deeper grounding, embodied healing, and heart-centered awareness through equine-assisted energy work.
              </p>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1rem'}}>
                This session weaves Sacred Fire Reiki with the grounded, intuitive presence of my horses, who serve as energetic partners and sacred space holders. Their steady wisdom supports regulation, embodiment, and emotional integration while Sacred Fire moves through the field.
              </p>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1.5rem', fontStyle: 'italic'}}>
                No horse experience is required. All interaction is optional and guided by the horse's comfort and consent.
              </p>

              <p style={{fontSize: '1rem', color: '#CBD2D9', marginBottom: '0.75rem', fontWeight: '600'}}>
                Common intentions include:
              </p>
              <ul style={{color: '#9AA5B1', fontSize: '1rem', lineHeight: '1.8', marginLeft: '1.5rem'}}>
                <li>Emotional release and nervous system regulation</li>
                <li>Feeling safe and present in the body</li>
                <li>Heart coherence and grounding</li>
                <li>Support through life transitions</li>
              </ul>
            </div>

            {/* Service 3: Travel Sacred Fire Reiki */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              padding: '2.5rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                color: '#FF6B3D', 
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}>
                Travel Sacred Fire Reiki — Client or Horse
              </h3>
              
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.125rem', color: '#CBD2D9', marginBottom: '0.5rem'}}>
                  <strong style={{color: '#FF8A5C'}}>Length:</strong> 60 minutes (per individual)
                </p>
                <p style={{fontSize: '1.125rem', color: '#CBD2D9'}}>
                  <strong style={{color: '#FF8A5C'}}>Investment:</strong> $225 CAD + travel fee
                </p>
                <p style={{fontSize: '0.95rem', color: '#9AA5B1', fontStyle: 'italic', marginTop: '0.5rem'}}>
                  (Travel fee calculated based on distance)
                </p>
              </div>

              <p style={{fontSize: '1rem', color: '#9AA5B1', fontStyle: 'italic', marginBottom: '1.5rem'}}>
                <strong style={{color: '#CBD2D9'}}>Who it's for:</strong> Clients or horses who benefit from receiving Reiki in a familiar environment.
              </p>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                Travel sessions are available for Sacred Fire Reiki offered individually to either the client or their horse. These sessions support balance, regulation, and energetic alignment while honoring the horse's autonomy and sensitivity. Working in a familiar setting allows Sacred Fire to integrate gently and respectfully.
              </p>

              <p style={{fontSize: '1rem', color: '#CBD2D9', marginBottom: '0.75rem', fontWeight: '600'}}>
                Common intentions include:
              </p>
              <ul style={{color: '#9AA5B1', fontSize: '1rem', lineHeight: '1.8', marginLeft: '1.5rem'}}>
                <li>Stress or anxiety support</li>
                <li>Post-event or transition integration</li>
                <li>Emotional or energetic settling</li>
                <li>Support for sensitive or senior horses</li>
              </ul>
            </div>

            {/* Session Preparation */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              padding: '2.5rem', 
              background: 'rgba(13, 59, 74, 0.15)', 
              borderRadius: '16px', 
              border: '1px solid rgba(94, 234, 212, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                color: '#5EEAD4', 
                marginBottom: '1.5rem',
                letterSpacing: '0.05em'
              }}>
                Session Preparation
              </h3>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                To receive the most from your session, please consider the following:
              </p>

              <ul style={{color: '#CBD2D9', fontSize: '1.05rem', lineHeight: '1.9', marginLeft: '1.5rem', marginBottom: '1.5rem'}}>
                <li>Wear comfortable clothing</li>
                <li>Avoid heavy meals immediately before your session</li>
                <li>Stay well hydrated</li>
                <li>Arrive with an open, relaxed mindset—no intention is required</li>
                <li>For horse sessions, ensure a calm environment and allow the horse freedom to move or rest</li>
              </ul>

              <p style={{fontSize: '1.05rem', color: '#9AA5B1', fontStyle: 'italic', lineHeight: '1.7'}}>
                There is no need to prepare emotionally or energetically—Sacred Fire Reiki meets you (or your horse) exactly where you are.
              </p>
            </div>

            {/* What to Expect */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              padding: '2.5rem', 
              background: 'rgba(13, 59, 74, 0.15)', 
              borderRadius: '16px', 
              border: '1px solid rgba(94, 234, 212, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                color: '#5EEAD4', 
                marginBottom: '1.5rem',
                letterSpacing: '0.05em'
              }}>
                What to Expect
              </h3>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                Each session begins with a brief check-in to clarify intentions and ensure comfort. Reiki is then offered through gentle, non-invasive energy work, either hands-on or hands-off depending on preference and consent.
              </p>

              <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.7', marginBottom: '1.5rem'}}>
                Clients may experience sensations such as warmth, relaxation, emotional release, imagery, or deep stillness. Horses may shift posture, yawn, rest, move away, or engage—all responses are respected and honored.
              </p>

              <p style={{fontSize: '1.1rem', color: '#5EEAD4', fontStyle: 'italic', fontWeight: '500', lineHeight: '1.7'}}>
                Every session is unique. Healing unfolds in alignment with what is ready to be received.
              </p>
            </div>

            {/* Disclaimer */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              padding: '2rem', 
              background: 'rgba(82, 96, 109, 0.15)', 
              borderRadius: '12px', 
              border: '1px solid rgba(203, 210, 217, 0.2)', 
              textAlign: 'left'
            }}>
              <p style={{fontSize: '0.95rem', color: '#9AA5B1', lineHeight: '1.7', marginBottom: '1rem'}}>
                <strong style={{color: '#CBD2D9'}}>Gentle Reiki Disclaimer:</strong>
              </p>
              <p style={{fontSize: '0.95rem', color: '#9AA5B1', lineHeight: '1.7'}}>
                Sacred Fire Reiki is a complementary, energy-based practice intended to support relaxation, balance, and overall well-being. It is not a substitute for medical, veterinary, psychological, or professional care. No diagnosis or treatment is offered or implied. Clients are encouraged to seek appropriate professional support for medical or veterinary concerns.
              </p>
              <p style={{fontSize: '0.95rem', color: '#9AA5B1', lineHeight: '1.7', marginTop: '1rem', fontStyle: 'italic'}}>
                All sessions honor consent, autonomy, and the innate wisdom of both human and horse.
              </p>
            </div>

            <div style={{
              width: '100px', 
              height: '3px', 
              background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
              margin: '3rem auto 2rem'
            }}></div>

            <h2 style={{
              fontFamily: 'Cinzel, serif', 
              fontSize: 'clamp(2rem, 5vw, 2.75rem)', 
              color: '#F8FAFB', 
              fontWeight: '600', 
              marginBottom: '2.5rem', 
              letterSpacing: '0.08em'
            }}>
              SCHEDULE YOUR SESSION
            </h2>

            <div style={{maxWidth: '420px', margin: '0 auto 3rem'}}>
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
                <div style={{
                  width: '60px', 
                  height: '2px', 
                  background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
                  margin: '2rem auto 1.5rem'
                }}></div>
                
                <h3 style={{
                  fontFamily: 'Cinzel, serif', 
                  fontSize: 'clamp(1.5rem, 4vw, 1.875rem)', 
                  color: '#F8FAFB', 
                  marginBottom: '1rem', 
                  fontWeight: '600', 
                  letterSpacing: '0.05em'
                }}>
                  AVAILABLE TIMES
                </h3>
                
                <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                  color: '#FF8A5C', 
                  marginBottom: '2rem', 
                  fontWeight: '500'
                }}>
                  {selectedDate.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'})}
                </p>

                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                  gap: '1rem', 
                  marginBottom: '3rem', 
                  maxWidth: '700px', 
                  margin: '0 auto 3rem'
                }}>
                  {slots.map(slot => (
                    <button 
                      key={slot.time} 
                      onClick={() => !slot.isBooked && setSelectedTime(slot.time)} 
                      disabled={slot.isBooked} 
                      style={{
                        padding: '1.25rem 0.75rem', 
                        borderRadius: '12px', 
                        fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                        fontWeight: '600', 
                        background: slot.isBooked 
                          ? 'rgba(82, 96, 109, 0.3)' 
                          : (selectedTime === slot.time ? 'linear-gradient(135deg, #FF4A1C, #FF6B3D)' : 'rgba(255, 74, 28, 0.1)'), 
                        color: slot.isBooked 
                          ? '#52606D' 
                          : (selectedTime === slot.time ? 'white' : '#E5E9ED'), 
                        border: slot.isBooked 
                          ? '2px solid rgba(82, 96, 109, 0.3)' 
                          : (selectedTime === slot.time ? '2px solid #FF8A5C' : '2px solid rgba(255, 74, 28, 0.3)'), 
                        cursor: slot.isBooked ? 'not-allowed' : 'pointer', 
                        transition: 'all 0.3s', 
                        boxShadow: selectedTime === slot.time ? '0 8px 24px rgba(255, 74, 28, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.2)', 
                        transform: selectedTime === slot.time ? 'translateY(-2px)' : 'translateY(0)', 
                        fontFamily: 'Inter, sans-serif', 
                        textDecoration: slot.isBooked ? 'line-through' : 'none', 
                        opacity: slot.isBooked ? 0.5 : 1
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                {selectedTime && availableSlots.some(slot => slot.time === selectedTime) && (
                  <>
                    <div style={{
                      width: '60px', 
                      height: '2px', 
                      background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
                      margin: '3rem auto 2rem'
                    }}></div>
                    
                    <div style={{maxWidth: '500px', margin: '0 auto', textAlign: 'left'}}>
                      <input 
                        required 
                        placeholder="Your Name" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        style={{
                          width: '100%', 
                          padding: '1rem 1.25rem', 
                          borderRadius: '10px', 
                          border: '2px solid rgba(255, 74, 28, 0.3)', 
                          background: 'rgba(26, 34, 53, 0.8)', 
                          color: '#F8FAFB', 
                          marginBottom: '1rem', 
                          fontSize: '1rem', 
                          outline: 'none', 
                          fontWeight: '500', 
                          fontFamily: 'Inter, sans-serif', 
                          transition: 'all 0.3s'
                        }} 
                      />
                      
                      <input 
                        required 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        style={{
                          width: '100%', 
                          padding: '1rem 1.25rem', 
                          borderRadius: '10px', 
                          border: '2px solid rgba(255, 74, 28, 0.3)', 
                          background: 'rgba(26, 34, 53, 0.8)', 
                          color: '#F8FAFB', 
                          marginBottom: '1rem', 
                          fontSize: '1rem', 
                          outline: 'none', 
                          fontWeight: '500', 
                          fontFamily: 'Inter, sans-serif', 
                          transition: 'all 0.3s'
                        }} 
                      />
                      
                      <input 
                        placeholder="Phone (optional)" 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        style={{
                          width: '100%', 
                          padding: '1rem 1.25rem', 
                          borderRadius: '10px', 
                          border: '2px solid rgba(255, 74, 28, 0.3)', 
                          background: 'rgba(26, 34, 53, 0.8)', 
                          color: '#F8FAFB', 
                          marginBottom: '1rem', 
                          fontSize: '1rem', 
                          outline: 'none', 
                          fontWeight: '500', 
                          fontFamily: 'Inter, sans-serif', 
                          transition: 'all 0.3s'
                        }} 
                      />
                      
                      <textarea 
                        placeholder="Notes or questions..." 
                        rows="4" 
                        value={formData.notes} 
                        onChange={e => setFormData({...formData, notes: e.target.value})} 
                        style={{
                          width: '100%', 
                          padding: '1rem 1.25rem', 
                          borderRadius: '10px', 
                          border: '2px solid rgba(255, 74, 28, 0.3)', 
                          background: 'rgba(26, 34, 53, 0.8)', 
                          color: '#F8FAFB', 
                          marginBottom: '1.5rem', 
                          fontSize: '1rem', 
                          outline: 'none', 
                          resize: 'vertical', 
                          fontWeight: '500', 
                          fontFamily: 'Inter, sans-serif', 
                          transition: 'all 0.3s', 
                          lineHeight: '1.6'
                        }} 
                      />
                      
                      <button 
                        onClick={handleSubmit} 
                        style={{
                          width: '100%', 
                          padding: '1.25rem 2rem', 
                          background: 'linear-gradient(135deg, #FF4A1C, #FF6B3D)', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '12px', 
                          fontSize: '1.25rem', 
                          fontWeight: '700', 
                          cursor: 'pointer', 
                          boxShadow: '0 8px 24px rgba(255, 74, 28, 0.4)', 
                          transition: 'all 0.3s', 
                          fontFamily: 'Cinzel, serif', 
                          letterSpacing: '0.05em'
                        }}
                      >
                        CONFIRM BOOKING — $125
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {selectedDate && slots.length === 0 && (
              <div style={{
                padding: '2rem', 
                background: 'rgba(251, 191, 36, 0.1)', 
                borderRadius: '12px', 
                border: '2px solid rgba(251, 191, 36, 0.3)'
              }}>
                <p style={{
                  fontSize: 'clamp(1.125rem, 4vw, 1.375rem)', 
                  color: '#FCD34D', 
                  fontWeight: '600', 
                  fontStyle: 'italic', 
                  margin: 0
                }}>
                  No times available. Please select another day.
                </p>
              </div>
            )}

            {message && (
              <div style={{
                marginTop: '3rem', 
                padding: '1.5rem 2rem', 
                background: 'rgba(16, 185, 129, 0.1)', 
                color: '#10B981', 
                borderRadius: '12px', 
                fontWeight: '600', 
                fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', 
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)', 
                border: '2px solid rgba(16, 185, 129, 0.3)', 
                fontStyle: 'italic', 
                lineHeight: '1.6'
              }}>
                {message}
              </div>
            )}
          </div>
        </main>

        <footer style={{
          padding: '4rem 2rem', 
          textAlign: 'center', 
          background: 'rgba(10, 14, 26, 0.8)', 
          borderTop: '1px solid rgba(255, 74, 28, 0.2)', 
          marginTop: '3rem'
        }}>
          <div style={{
            width: '80px', 
            height: '2px', 
            background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
            margin: '0 auto 2rem'
          }}></div>
          
          <p style={{
            margin: '0 0 1.5rem', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            fontWeight: '600', 
            color: '#F8FAFB', 
            letterSpacing: '0.08em', 
            fontFamily: 'Cinzel, serif'
          }}>
            CONTACT MELISSA
          </p>
          
          <p style={{
            margin: '1rem 0', 
            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)', 
            color: '#CBD2D9', 
            fontWeight: '500'
          }}>
            Text or call: <strong style={{color: '#FF6B3D', fontWeight: '700'}}>403-852-4324</strong>
          </p>
          
          <p style={{
            margin: '1rem 0', 
            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)', 
            color: '#CBD2D9', 
            fontWeight: '500'
          }}>
            Email: <strong style={{color: '#FF6B3D', fontWeight: '700'}}>balancedheartsranch@yahoo.com</strong>
          </p>
          
          <div style={{
            width: '80px', 
            height: '2px', 
            background: 'linear-gradient(to right, transparent, #FF4A1C, transparent)', 
            margin: '2rem auto 1.5rem'
          }}></div>
          
          <p style={{
            marginTop: '1.5rem', 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
            color: '#9AA5B1', 
            fontStyle: 'italic'
          }}>
            Okotoks, Alberta, Canada
          </p>
        </footer>
      </div>
    </>
  );
}
