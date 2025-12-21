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

  // Auto-transition from splash to main
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('main');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Load bookings from storage
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const result = await window.storage.get('bookedSlots');
        if (result && result.value) {
          setBookedSlots(JSON.parse(result.value));
        }
      } catch (e) {
        console.log('Storage not available or error:', e);
      } finally {
        setStorageLoaded(true);
      }
    };
    loadBookings();
  }, []);

  // Save bookings to storage
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

  return (<>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter,sans-serif;overflow-x:hidden;background:#0A0E1A}
.splash-screen{position:fixed;top:0;left:0;width:100%;height:100vh;background:linear-gradient(180deg,#0A0E1A,#0D3B4A);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;animation:fadeOut .5s ease 3s forwards}
@keyframes fadeOut{to{opacity:0;pointer-events:none}}
.logo-container{width:280px;height:380px;animation:logoFadeIn 1.5s cubic-bezier(.4,0,.2,1) forwards}
@keyframes logoFadeIn{0%{opacity:0;transform:scale(.9) translateY(20px);filter:blur(10px)}100%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}}
.logo-image{width:100%;height:100%;filter:drop-shadow(0 10px 40px rgba(255,74,28,.4)) drop-shadow(0 0 60px rgba(255,74,28,.3)) brightness(1.1)}
.brand-name{font-family:Cinzel,serif;font-size:32px;font-weight:700;color:#FF4A1C;text-align:center;margin-top:24px;letter-spacing:.1em;text-shadow:0 0 30px rgba(255,74,28,.5);animation:textGlow 2s ease-in-out infinite}
@keyframes textGlow{0%,100%{text-shadow:0 0 30px rgba(255,74,28,.5)}50%{text-shadow:0 0 50px rgba(255,74,28,.8)}}
.tagline{font-size:15px;color:#9AA5B1;text-align:center;margin-top:12px;letter-spacing:.15em;text-transform:uppercase;font-weight:500;opacity:0;animation:fadeInUp 1s ease-out .5s forwards}
@keyframes fadeInUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.main-content{min-height:100vh;background:linear-gradient(135deg,#0A0E1A 0%,#0E1D34 50%,#0D3B4A 100%);position:relative;padding:2rem 1rem}
.pattern-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(circle at 50% 50%,rgba(255,74,28,.05) 0%,transparent 50%);pointer-events:none}
.react-datepicker{font-family:Inter,sans-serif!important;border:1px solid rgba(255,107,61,.2)!important;background:#1A2235!important;box-shadow:0 8px 32px rgba(255,74,28,.2)!important;border-radius:14px!important}
.react-datepicker__header{background:#222B3F!important;border-bottom:1px solid rgba(255,255,255,.05)!important;padding:1rem!important;border-radius:14px 14px 0 0!important}
.react-datepicker__current-month{color:#F8FAFB!important;font-size:1.125rem!important;font-weight:600!important}
.react-datepicker__day-name{color:#9AA5B1!important;font-weight:600!important}
.react-datepicker__day{color:#E5E9ED!important;font-weight:500!important;border-radius:8px!important;transition:all .2s!important}
.react-datepicker__day:hover{background:rgba(255,74,28,.2)!important;color:#FF6B3D!important}
.react-datepicker__day--selected{background:linear-gradient(135deg,#FF4A1C,#FF6B3D)!important;color:white!important;box-shadow:0 4px 12px rgba(255,74,28,.4)!important}
.react-datepicker__day--today{background:rgba(251,191,36,.2)!important;color:#FCD34D!important;border:1px solid #F59E0B!important}
.react-datepicker__day--disabled{color:#52606D!important;opacity:.4!important}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeIn .8s ease-out}
@media(max-width:640px){.logo-container{width:220px;height:300px}.brand-name{font-size:24px}}`}</style>

    {currentScreen==='splash'&&<div className="splash-screen"><div className="logo-container">
      <img src="/melissa.jpg" alt="Sacred Fire Reiki Logo" className="logo-image" style={{width:'100%',height:'100%',objectFit:'contain',mixBlendMode:'screen',filter:'brightness(1.2) contrast(1.1)'}}/>
    </div></div>}

    <div className="main-content"><div className="pattern-overlay"></div>
      <main style={{position:'relative',zIndex:1,maxWidth:'1000px',margin:'0 auto'}}>
        <div className="fade-in" style={{background:'linear-gradient(to bottom,rgba(26,34,53,.95),rgba(34,43,63,.95))',borderRadius:'20px',boxShadow:'0 20px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,74,28,.2)',padding:'3rem 2.5rem 4rem',textAlign:'center',backdropFilter:'blur(10px)'}}>

          <div style={{width:'140px',height:'140px',borderRadius:'50%',margin:'0 auto 2rem',background:'linear-gradient(135deg,#FF4A1C,#FF8A5C)',padding:'5px',boxShadow:'0 0 40px rgba(255,74,28,.4), 0 0 0 8px rgba(255,74,28,.1)'}}>
            <img src="/melissa.jpg" alt="Sacred Fire Logo" style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover',mixBlendMode:'screen'}}/>
          </div>

          <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(2.5rem,7vw,4rem)',fontWeight:'700',color:'#F8FAFB',letterSpacing:'.1em',margin:'0 0 .5rem',lineHeight:'1.1',textShadow:'0 2px 20px rgba(255,74,28,.3)'}}>SACRED FIRE REIKI</h1>
          
          <div style={{width:'100px',height:'3px',background:'linear-gradient(to right,transparent,#FF4A1C,transparent)',margin:'1.5rem auto'}}></div>
          
          <p style={{fontSize:'clamp(1.25rem,4vw,1.75rem)',color:'#FF8A5C',fontStyle:'italic',margin:'0 0 .75rem',fontWeight:'500'}}>with Melissa Lynn</p>
          
          <p style={{fontSize:'clamp(1.5rem,4vw,2rem)',color:'#F8FAFB',fontWeight:'700',margin:'0 0 .5rem',padding:'1rem 2rem',background:'rgba(255,74,28,.1)',borderRadius:'12px',border:'2px solid rgba(255,74,28,.3)',boxShadow:'0 4px 16px rgba(255,74,28,.2)',display:'inline-block'}}>$125 · 60-minute session</p>
          
          <p style={{fontSize:'clamp(.9rem,3vw,1.125rem)',color:'#9AA5B1',fontStyle:'italic',margin:'.5rem 0 3rem',fontWeight:'400'}}>Payment by e-transfer or cash at appointment</p>

          <div style={{maxWidth:'700px',margin:'0 auto 3rem',padding:'2rem',background:'rgba(255,74,28,.05)',borderRadius:'14px',border:'1px solid rgba(255,74,28,.2)',boxShadow:'0 4px 16px rgba(0,0,0,.3)'}}>
            <p style={{fontSize:'clamp(1rem,3vw,1.25rem)',color:'#E5E9ED',lineHeight:'1.7',margin:0,fontWeight:'400'}}>Sessions take place in the calming presence of Melissa's equine companions. Their grounded energy naturally deepens relaxation, supports emotional release, and opens the heart to profound peace.</p>
          </div>

          <div style={{width:'100px',height:'3px',background:'linear-gradient(to right,transparent,#FF4A1C,transparent)',margin:'3rem auto 2rem'}}></div>

          <h2 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(2rem,5vw,2.75rem)',color:'#F8FAFB',fontWeight:'600',marginBottom:'2.5rem',letterSpacing:'.08em'}}>SCHEDULE YOUR SESSION</h2>

          <div style={{maxWidth:'420px',margin:'0 auto 3rem'}}>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} inline filterDate={date=>date.getDay()!==0}/>
          </div>

          {selectedDate&&slots.length>0&&<>
            <div style={{width:'60px',height:'2px',background:'linear-gradient(to right,transparent,#FF4A1C,transparent)',margin:'2rem auto 1.5rem'}}></div>
            
            <h3 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(1.5rem,4vw,1.875rem)',color:'#F8FAFB',marginBottom:'1rem',fontWeight:'600',letterSpacing:'.05em'}}>AVAILABLE TIMES</h3>
            <p style={{fontSize:'clamp(1rem,3vw,1.25rem)',color:'#FF8A5C',marginBottom:'2rem',fontWeight:'500'}}>
              {selectedDate.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}
            </p>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'1rem',marginBottom:'3rem',maxWidth:'700px',margin:'0 auto 3rem'}}>
              {slots.map(slot=><button key={slot.time} onClick={()=>!slot.isBooked&&setSelectedTime(slot.time)} disabled={slot.isBooked} style={{padding:'1.25rem .75rem',borderRadius:'12px',fontSize:'clamp(1rem,3vw,1.25rem)',fontWeight:'600',background:slot.isBooked?'rgba(82,96,109,.3)':(selectedTime===slot.time?'linear-gradient(135deg,#FF4A1C,#FF6B3D)':'rgba(255,74,28,.1)'),color:slot.isBooked?'#52606D':(selectedTime===slot.time?'white':'#E5E9ED'),border:slot.isBooked?'2px solid rgba(82,96,109,.3)':(selectedTime===slot.time?'2px solid #FF8A5C':'2px solid rgba(255,74,28,.3)'),cursor:slot.isBooked?'not-allowed':'pointer',transition:'all .3s',boxShadow:selectedTime===slot.time?'0 8px 24px rgba(255,74,28,.4)':'0 2px 8px rgba(0,0,0,.2)',transform:selectedTime===slot.time?'translateY(-2px)':'translateY(0)',fontFamily:'Inter,sans-serif',textDecoration:slot.isBooked?'line-through':'none',opacity:slot.isBooked?.5:1}}>{slot.time}</button>)}
            </div>

            {selectedTime&&availableSlots.some(slot=>slot.time===selectedTime)&&<>
              <div style={{width:'60px',height:'2px',background:'linear-gradient(to right,transparent,#FF4A1C,transparent)',margin:'3rem auto 2rem'}}></div>
              
              <div style={{maxWidth:'500px',margin:'0 auto',textAlign:'left'}}>
                <input required placeholder="Your Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={{width:'100%',padding:'1rem 1.25rem',borderRadius:'10px',border:'2px solid rgba(255,74,28,.3)',background:'rgba(26,34,53,.8)',color:'#F8FAFB',marginBottom:'1rem',fontSize:'1rem',outline:'none',fontWeight:'500',fontFamily:'Inter,sans-serif',transition:'all .3s'}}/>
                <input required type="email" placeholder="Email Address" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} style={{width:'100%',padding:'1rem 1.25rem',borderRadius:'10px',border:'2px solid rgba(255,74,28,.3)',background:'rgba(26,34,53,.8)',color:'#F8FAFB',marginBottom:'1rem',fontSize:'1rem',outline:'none',fontWeight:'500',fontFamily:'Inter,sans-serif',transition:'all .3s'}}/>
                <input placeholder="Phone (optional)" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} style={{width:'100%',padding:'1rem 1.25rem',borderRadius:'10px',border:'2px solid rgba(255,74,28,.3)',background:'rgba(26,34,53,.8)',color:'#F8FAFB',marginBottom:'1rem',fontSize:'1rem',outline:'none',fontWeight:'500',fontFamily:'Inter,sans-serif',transition:'all .3s'}}/>
                <textarea placeholder="Notes or questions..." rows="4" value={formData.notes} onChange={e=>setFormData({...formData,notes:e.target.value})} style={{width:'100%',padding:'1rem 1.25rem',borderRadius:'10px',border:'2px solid rgba(255,74,28,.3)',background:'rgba(26,34,53,.8)',color:'#F8FAFB',marginBottom:'1.5rem',fontSize:'1rem',outline:'none',resize:'vertical',fontWeight:'500',fontFamily:'Inter,sans-serif',transition:'all .3s',lineHeight:'1.6'}}/>
                <button onClick={handleSubmit} style={{width:'100%',padding:'1.25rem 2rem',background:'linear-gradient(135deg,#FF4A1C,#FF6B3D)',color:'white',border:'none',borderRadius:'12px',fontSize:'1.25rem',fontWeight:'700',cursor:'pointer',boxShadow:'0 8px 24px rgba(255,74,28,.4)',transition:'all .3s',fontFamily:'Cinzel,serif',letterSpacing:'.05em'}}>CONFIRM BOOKING — $125</button>
              </div>
            </>}
          </>}

          {selectedDate&&slots.length===0&&<div style={{padding:'2rem',background:'rgba(251,191,36,.1)',borderRadius:'12px',border:'2px solid rgba(251,191,36,.3)'}}><p style={{fontSize:'clamp(1.125rem,4vw,1.375rem)',color:'#FCD34D',fontWeight:'600',fontStyle:'italic',margin:0}}>No times available. Please select another day.</p></div>}

          {message&&<div style={{marginTop:'3rem',padding:'1.5rem 2rem',background:'rgba(16,185,129,.1)',color:'#10B981',borderRadius:'12px',fontWeight:'600',fontSize:'clamp(1rem,3.5vw,1.25rem)',boxShadow:'0 4px 16px rgba(16,185,129,.2)',border:'2px solid rgba(16,185,129,.3)',fontStyle:'italic',lineHeight:'1.6'}}>{message}</div>}
        </div>
      </main>

      <footer style={{padding:'4rem 2rem',textAlign:'center',background:'rgba(10,14,26,.8)',borderTop:'1px solid rgba(255,74,28,.2)',marginTop:'3rem'}}>
        <div style={{width:'80px',height:'2px',background:'linear-gradient(to right,transparent,#FF4A1C,transparent)',margin:'0 auto 2rem'}}></div>
        <p style={{margin:'0 0 1.5rem',fontSize:'clamp(1.5rem,4vw,2rem)',fontWeight:'600',color:'#F8FAFB',letterSpacing:'.08em',fontFamily:'Cinzel,serif'}}>CONTACT MELISSA</p>
        <p style={{margin:'1rem 0',fontSize:'clamp(1.125rem,3vw,1.375rem)',color:'#CBD2D9',fontWeight:'500'}}>Text or call: <strong style={{color:'#FF6B3D',fontWeight:'700'}}>403-852-4324</strong></p>
        <p style={{margin:'1rem 0',fontSize:'clamp(1.125rem,3vw,1.375rem)',color:'#CBD2D9',fontWeight:'500'}}>Email: <strong style={{color:'#FF6B3D',fontWeight:'700'}}>balancedheartsranch@yahoo.com</strong></p>
        <div style={{width:'80px',height:'2px',background:'linear-gradient(to right,transparent,#FF4A1C,transparent)',margin:'2rem auto 1.5rem'}}></div>
        <p style={{marginTop:'1.5rem',fontSize:'clamp(1rem,3vw,1.25rem)',color:'#9AA5B1',fontStyle:'italic'}}>Okotoks, Alberta, Canada</p>
      </footer>
    </div>
  </>);
}
