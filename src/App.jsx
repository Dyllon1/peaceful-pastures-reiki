import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'herd', or 'sessionInfo'
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [message, setMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState({});
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [expandedInfo, setExpandedInfo] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [showWaiver, setShowWaiver] = useState(false);

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const toggleInfo = (infoId) => {
    setExpandedInfo(expandedInfo === infoId ? null : infoId);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Meta Tags
  useEffect(() => {
    // Set page title
    document.title = "Sacred Fire Reiki with Melissa Lynn | Equine-Assisted Energy Healing in Calgary, AB";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Experience Sacred Fire Reiki energy healing with Melissa Lynn in Calgary, Alberta. Offering one-on-one sessions, equine-assisted Reiki with horses, and travel services for clients and horses. Book your transformative healing session today.";
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Add meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "Sacred Fire Reiki, Reiki Calgary, energy healing, equine assisted therapy, horse therapy, Reiki with horses, holistic healing, nervous system regulation, emotional healing, Melissa Lynn, Calgary Reiki practitioner, energy work, spiritual healing, animal Reiki";
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(metaKeywords);
    }

    // Open Graph meta tags for social media
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "Sacred Fire Reiki with Melissa Lynn | Calgary Energy Healing";
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = "Transformative Sacred Fire Reiki sessions in Calgary. Experience deep healing with one-on-one sessions or unique equine-assisted energy work.";
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = "website";
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = "https://www.balancedheartsholyfirereiki.ca";
    if (!document.querySelector('meta[property="og:url"]')) {
      document.head.appendChild(ogUrl);
    }

    // Add canonical URL
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = "canonical";
    canonical.href = "https://www.balancedheartsholyfirereiki.ca";
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }

    // Add Schema.org structured data for Local Business
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HealthAndBeautyBusiness",
        "name": "Sacred Fire Reiki with Melissa Lynn",
        "description": "Sacred Fire Reiki energy healing services including one-on-one sessions, equine-assisted therapy, and travel services in Calgary, Alberta.",
        "url": "https://www.balancedheartsholyfirereiki.ca",
        "telephone": "+1-403-852-4324",
        "email": "balancedheartsranch@yahoo.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Calgary",
          "addressRegion": "AB",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.0447",
          "longitude": "-114.0719"
        },
        "priceRange": "$125 - $225",
        "openingHours": "Mo-Sa 09:00-18:00",
        "paymentAccepted": "E-transfer",
        "areaServed": {
          "@type": "City",
          "name": "Calgary",
          "containedIn": {
            "@type": "AdministrativeArea",
            "name": "Alberta"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Sacred Fire Reiki Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "One-on-One Sacred Fire Reiki Session",
                "description": "60-minute private Sacred Fire Reiki session for relaxation, alignment, and inner stability",
                "provider": {
                  "@type": "Person",
                  "name": "Melissa Lynn"
                }
              },
              "price": "125",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sacred Fire Reiki with the Horses",
                "description": "75-minute equine-assisted Sacred Fire Reiki session for deeper grounding and embodied healing",
                "provider": {
                  "@type": "Person",
                  "name": "Melissa Lynn"
                }
              },
              "price": "175",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Travel Sacred Fire Reiki",
                "description": "60-minute Sacred Fire Reiki session at client or horse location with travel fee",
                "provider": {
                  "@type": "Person",
                  "name": "Melissa Lynn"
                }
              },
              "price": "225",
              "priceCurrency": "CAD"
            }
          ]
        }
      });
      document.head.appendChild(script);
    }
  }, []);

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
        body { font-family: Inter, sans-serif; overflow-x: hidden; background: #000000; }
        
        img { background: transparent !important; }
        
        .splash-screen {
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
          background: #000000;
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
          filter: drop-shadow(0 0 10px rgba(30, 41, 59, 0.8))
                  drop-shadow(0 0 25px rgba(15, 23, 42, 0.6))
                  drop-shadow(0 0 50px rgba(10, 14, 26, 0.4)) 
                  drop-shadow(0 0 80px rgba(0, 0, 0, 0.3))
                  brightness(1.1);
          background: transparent !important;
        }
        
        .main-content {
          min-height: 100vh;
          background: #000000;
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
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 1000px; } }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        
        .sticky-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 74, 28, 0.3);
          z-index: 1000;
          padding: 1rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(-100%);
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .sticky-nav.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .nav-link {
          color: #CBD2D9;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s;
          cursor: pointer;
          letter-spacing: 0.05em;
          font-family: 'Inter', sans-serif;
        }
        
        .nav-link:hover {
          color: #FF6B3D;
          background: rgba(255, 74, 28, 0.1);
        }
        
        .nav-link.active {
          color: #FF6B3D;
          background: rgba(255, 74, 28, 0.15);
        }
        
        @media (max-width: 640px) { 
          .logo-container { width: 220px; height: 300px; }
          .home-logo-container { 
            width: 300px !important; 
            height: 300px !important; 
            margin: 0 auto 2rem !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 90vw !important;
          }
          .sticky-nav {
            padding: 0.75rem 1rem;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          .nav-link {
            font-size: 0.85rem;
            padding: 0.4rem 0.75rem;
          }
        }
      `}</style>

      {/* Sticky Navigation */}
      <nav className={`sticky-nav visible`} role="navigation" aria-label="Main navigation">
        <a className="nav-link" onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} role="button" tabIndex={0}>Home</a>
        <a className="nav-link" onClick={() => { setCurrentPage('herd'); window.scrollTo(0, 0); }} role="button" tabIndex={0}>Meet the Herd</a>
        <a className="nav-link" onClick={() => { setCurrentPage('sessionInfo'); window.scrollTo(0, 0); }} role="button" tabIndex={0}>Session Info</a>
        <a className="nav-link" onClick={() => { setCurrentPage('home'); setTimeout(() => scrollToSection('contact'), 100); }} role="button" tabIndex={0}>Contact</a>
      </nav>

      {currentScreen === 'splash' && (
        <div className="splash-screen">
          <div className="logo-container">
            <img 
              src="/melissa.png" 
              alt="Sacred Fire Reiki with Melissa Lynn - Calgary energy healing and horse therapy practitioner" 
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
        <main style={{position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto'}} role="main">
          
          {currentPage === 'home' && (
          <article id="home" className="fade-in" style={{
            background: 'rgba(0, 0, 0, 0.95)', 
            borderRadius: '20px', 
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 74, 28, 0.2)', 
            padding: '3rem 2.5rem 4rem', 
            textAlign: 'center', 
            backdropFilter: 'blur(10px)'
          }}>

            <div className="home-logo-container" style={{
              width: '400px', 
              height: '400px', 
              margin: '0 auto 2rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.3) 30%, rgba(0, 0, 0, 0) 70%)',
              position: 'relative',
              left: '-10px',
              right: '0'
            }}>
              <img 
                src="/melissa2.png" 
                alt="Sacred Fire Reiki logo featuring Melissa Lynn - Energy healing and equine-assisted therapy in Calgary, Alberta" 
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain', 
                  filter: 'drop-shadow(0 0 10px rgba(30, 41, 59, 0.8)) drop-shadow(0 0 25px rgba(15, 23, 42, 0.6)) drop-shadow(0 0 50px rgba(10, 14, 26, 0.4)) drop-shadow(0 0 80px rgba(0, 0, 0, 0.3))',
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
            
            <div style={{margin: '0 0 2rem'}}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.9rem, 3vw, 1.125rem)', 
                color: '#9AA5B1', 
                fontStyle: 'italic', 
                margin: '0 0 0.5rem', 
                fontWeight: '400',
                letterSpacing: '0.05em'
              }}>
                with
              </p>
              <p style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', 
                color: '#FF8A5C', 
                fontStyle: 'normal', 
                margin: 0, 
                fontWeight: '600',
                letterSpacing: '0.08em'
              }}>
                Melissa Lynn
              </p>
            </div>

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
            <div id="services" style={{
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
              margin: '0 auto 1.5rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden'
            }}>
              <div style={{padding: '2rem 2.5rem'}}>
                <h3 style={{
                  fontFamily: 'Cinzel, serif', 
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
                  color: '#FF6B3D', 
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em'
                }}>
                  One-on-One Sacred Fire Reiki Session
                </h3>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center'}}>
                  <p style={{fontSize: '1rem', color: '#CBD2D9', margin: 0}}>
                    <strong style={{color: '#FF8A5C'}}>Length:</strong> 60 minutes
                  </p>
                  <p style={{fontSize: '1rem', color: '#CBD2D9', margin: 0}}>
                    <strong style={{color: '#FF8A5C'}}>Investment:</strong> $125 CAD
                  </p>
                </div>
                
                <button
                  onClick={() => toggleService('service1')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 107, 61, 0.15)',
                    border: '1px solid rgba(255, 107, 61, 0.3)',
                    borderRadius: '8px',
                    color: '#FF6B3D',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 107, 61, 0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 107, 61, 0.15)'}
                >
                  <span style={{
                    fontSize: '1.25rem',
                    transition: 'transform 0.3s',
                    transform: expandedService === 'service1' ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}>+</span>
                  {expandedService === 'service1' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              {expandedService === 'service1' && (
                <div style={{
                  padding: '0 2.5rem 2.5rem 2.5rem',
                  textAlign: 'left',
                  animation: 'slideDown 0.3s ease-out'
                }}>
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
              )}
            </div>

            {/* Service 2: Sacred Fire Reiki with the Horses */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 1.5rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden'
            }}>
              <div style={{padding: '2rem 2.5rem'}}>
                <h3 style={{
                  fontFamily: 'Cinzel, serif', 
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
                  color: '#FF6B3D', 
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em'
                }}>
                  Sacred Fire Reiki with the Horses
                </h3>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center'}}>
                  <p style={{fontSize: '1rem', color: '#CBD2D9', margin: 0}}>
                    <strong style={{color: '#FF8A5C'}}>Length:</strong> 75 minutes
                  </p>
                  <p style={{fontSize: '1rem', color: '#CBD2D9', margin: 0}}>
                    <strong style={{color: '#FF8A5C'}}>Investment:</strong> $175 CAD
                  </p>
                </div>
                
                <button
                  onClick={() => toggleService('service2')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 107, 61, 0.15)',
                    border: '1px solid rgba(255, 107, 61, 0.3)',
                    borderRadius: '8px',
                    color: '#FF6B3D',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 107, 61, 0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 107, 61, 0.15)'}
                >
                  <span style={{
                    fontSize: '1.25rem',
                    transition: 'transform 0.3s',
                    transform: expandedService === 'service2' ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}>+</span>
                  {expandedService === 'service2' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              {expandedService === 'service2' && (
                <div style={{
                  padding: '0 2.5rem 2.5rem 2.5rem',
                  textAlign: 'left',
                  animation: 'slideDown 0.3s ease-out'
                }}>
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
              )}
            </div>

            {/* Service 3: Travel Sacred Fire Reiki */}
            <div style={{
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              background: 'rgba(255, 74, 28, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 74, 28, 0.2)', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden'
            }}>
              <div style={{padding: '2rem 2.5rem'}}>
                <h3 style={{
                  fontFamily: 'Cinzel, serif', 
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
                  color: '#FF6B3D', 
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em'
                }}>
                  Travel Sacred Fire Reiki — Client or Horse
                </h3>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '0.5rem', justifyContent: 'center'}}>
                  <p style={{fontSize: '1rem', color: '#CBD2D9', margin: 0}}>
                    <strong style={{color: '#FF8A5C'}}>Length:</strong> 60 minutes
                  </p>
                  <p style={{fontSize: '1rem', color: '#CBD2D9', margin: 0}}>
                    <strong style={{color: '#FF8A5C'}}>Investment:</strong> $225 CAD + travel
                  </p>
                </div>
                <p style={{fontSize: '0.85rem', color: '#9AA5B1', fontStyle: 'italic', margin: '0 0 1rem 0', textAlign: 'center'}}>
                  (Travel fee calculated based on distance)
                </p>
                
                <button
                  onClick={() => toggleService('service3')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 107, 61, 0.15)',
                    border: '1px solid rgba(255, 107, 61, 0.3)',
                    borderRadius: '8px',
                    color: '#FF6B3D',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 107, 61, 0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 107, 61, 0.15)'}
                >
                  <span style={{
                    fontSize: '1.25rem',
                    transition: 'transform 0.3s',
                    transform: expandedService === 'service3' ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}>+</span>
                  {expandedService === 'service3' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              {expandedService === 'service3' && (
                <div style={{
                  padding: '0 2.5rem 2.5rem 2.5rem',
                  textAlign: 'left',
                  animation: 'slideDown 0.3s ease-out'
                }}>
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
              )}
            </div>

            <div id="booking" style={{
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
              marginBottom: '1rem', 
              letterSpacing: '0.08em'
            }}>
              SCHEDULE YOUR SESSION
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.125rem)', 
              color: '#9AA5B1', 
              fontStyle: 'italic', 
              margin: '0 0 2.5rem', 
              fontWeight: '500'
            }}>
              Payment accepted via e-transfer
            </p>

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
                      
                      {/* Waiver Agreement */}
                      <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: 'rgba(255, 138, 92, 0.05)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 138, 92, 0.2)'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '1rem'
                        }}>
                          <h4 style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.125rem',
                            color: '#F8FAFB',
                            margin: 0,
                            letterSpacing: '0.05em'
                          }}>
                            Sacred Fire Reiki – Waiver & Informed Consent
                          </h4>
                          <button
                            onClick={() => setShowWaiver(!showWaiver)}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'rgba(255, 138, 92, 0.2)',
                              border: '1px solid rgba(255, 138, 92, 0.3)',
                              borderRadius: '6px',
                              color: '#FF8A5C',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              fontFamily: 'Inter, sans-serif'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 138, 92, 0.3)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 138, 92, 0.2)'}
                          >
                            {showWaiver ? 'Hide' : 'Read Full Waiver'}
                          </button>
                        </div>

                        {showWaiver && (
                          <div style={{
                            padding: '1rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            fontSize: '0.9rem',
                            color: '#CBD2D9',
                            lineHeight: '1.7'
                          }}>
                            <p style={{marginBottom: '1rem', fontSize: '0.95rem', color: '#E5E9ED', fontWeight: '600'}}>
                              By booking a session, I acknowledge and agree to the following:
                            </p>
                            
                            <p style={{marginBottom: '1rem'}}>
                              I understand that Sacred Fire Reiki is a complementary, energy-based practice intended to support relaxation, balance, and overall well-being. Reiki is not a substitute for medical, psychological, psychiatric, or veterinary care, and no diagnosis or treatment is offered or implied. I am responsible for seeking appropriate professional care when needed.
                            </p>

                            <p style={{marginBottom: '1rem'}}>
                              I understand that participation in Reiki sessions is voluntary, and I may withdraw consent or stop a session at any time.
                            </p>

                            <p style={{marginBottom: '1rem'}}>
                              For equine-assisted sessions, I acknowledge that horses are living beings with their own autonomy and responses. I agree to follow all safety guidance and understand the inherent risks of being near horses. Interaction with horses is optional and guided by their consent and well-being.
                            </p>

                            <p style={{marginBottom: '1rem'}}>
                              For travel sessions, I confirm that I am responsible for providing a safe environment for the session. Travel fees are separate and non-refundable once incurred.
                            </p>

                            <p style={{marginBottom: '1rem'}}>
                              I release and hold harmless Sacred Fire Reiki, the practitioner, and any associated horses from liability arising from my participation, except in cases of gross negligence, in accordance with Alberta law.
                            </p>

                            <p style={{marginBottom: '0', fontWeight: '600', color: '#FF8A5C', fontSize: '0.95rem'}}>
                              Minor / Guardian Consent
                            </p>
                            <p>
                              If the participant is under 18 years of age, I confirm that I am the parent or legal guardian and consent to Sacred Fire Reiki sessions on their behalf. I understand and accept full responsibility for the minor's participation.
                            </p>
                          </div>
                        )}

                        <label style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          color: '#E5E9ED',
                          lineHeight: '1.6'
                        }}>
                          <input
                            type="checkbox"
                            checked={waiverAgreed}
                            onChange={(e) => setWaiverAgreed(e.target.checked)}
                            required
                            style={{
                              marginTop: '0.25rem',
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#FF6B3D'
                            }}
                          />
                          <span>
                            I have read and agree to the Sacred Fire Reiki Waiver & Informed Consent and, if applicable, confirm that I am the parent or legal guardian of the minor participant.
                            <span style={{color: '#FF6B3D', fontWeight: '700'}}> *</span>
                          </span>
                        </label>
                      </div>
                      
                      <button 
                        onClick={handleSubmit}
                        disabled={!waiverAgreed}
                        style={{
                          width: '100%', 
                          padding: '1.25rem 2rem',
                          marginTop: '1.5rem',
                          background: waiverAgreed ? 'linear-gradient(135deg, #FF4A1C, #FF6B3D)' : 'rgba(82, 96, 109, 0.5)',
                          color: waiverAgreed ? 'white' : '#52606D',
                          border: 'none', 
                          borderRadius: '12px', 
                          fontSize: '1.25rem', 
                          fontWeight: '700', 
                          cursor: waiverAgreed ? 'pointer' : 'not-allowed',
                          boxShadow: waiverAgreed ? '0 8px 24px rgba(255, 74, 28, 0.4)' : 'none',
                          transition: 'all 0.3s', 
                          fontFamily: 'Cinzel, serif', 
                          letterSpacing: '0.05em',
                          opacity: waiverAgreed ? 1 : 0.6
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
          </article>
          )}

          {/* Meet the Herd Page */}
          {currentPage === 'herd' && (
            <div className="fade-in" style={{
              background: 'rgba(0, 0, 0, 0.95)', 
              borderRadius: '20px', 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 138, 92, 0.3)', 
              padding: '3rem 2.5rem 4rem', 
              textAlign: 'center', 
              backdropFilter: 'blur(10px)',
              minHeight: '80vh'
            }}>
              
              <h1 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
                color: '#FF8A5C', 
                fontWeight: '700', 
                marginBottom: '1rem', 
                letterSpacing: '0.1em'
              }}>
                MEET THE HERD
              </h1>

              <div style={{
                width: '100px', 
                height: '3px', 
                background: 'linear-gradient(to right, transparent, #FF8A5C, transparent)', 
                margin: '1.5rem auto 2rem'
              }}></div>

              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                color: '#CBD2D9', 
                fontStyle: 'italic', 
                margin: '0 auto 4rem',
                maxWidth: '700px',
                lineHeight: '1.8'
              }}>
                Our horses are sacred partners in this healing work. Each one brings their own gentle wisdom, grounded presence, and intuitive knowing to the space.
              </p>

              {/* Horse Grid */}
              <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2.5rem',
                padding: '0 1rem',
                justifyItems: 'center'
              }}>
                {[
                  {name: 'DC', img: '/dc.jpg', desc: 'DC carries a calm, stabilizing fire shaped by ancient, ancestral wisdom—an energy that remembers the rhythm of the earth and the intelligence of stillness. Through Sacred Fire Reiki, his presence anchors the Root chakra while gently opening the Heart, allowing fear, tension, and emotional holding to release with trust. He holds sacred space as a quiet elder, guiding clients back into embodied safety, balance, and inner knowing.', title: 'Sacred Guardian of Grounded Fire'},
                  {name: 'Dally', img: '/dally.jpg', desc: 'Dally carries Sacred Fire as joyful innocence. Her energy flows through the sacral, heart, and solar plexus chakras, supporting emotional openness, confidence, and playful curiosity. She brings lightness and renewal into the healing space, reminding the body how to trust joy and new beginnings. With Dally, Sacred Fire dances as a bright, youthful flame, awakening vitality, freedom, and gentle self-expression.', title: 'Bright, Youthful Flame'},
                  {name: 'Rose', img: '/rose.jpg', desc: 'Rose holds a gentle yet powerful Sacred Fire. Her presence grounds the body, softens the heart, and restores a deep sense of safety. Working through stillness, she supports emotional release, nervous system regulation, and heart-centered healing. With Rose, Sacred Fire flows as a calm, warming flame—reminding us that true healing is quiet, rooted, and deeply transformative.', title: 'Calm, Warming Flame'},
                  {name: 'Wyatt', img: '/wyatt.jpg', desc: 'Wyatt carries Sacred Fire as strength in motion. His energy works through the root, solar plexus, and throat chakras, grounding the body, awakening personal power, and restoring clear energetic boundaries. He supports confidence, courage, and aligned self-expression. With Wyatt, Sacred Fire moves as a steady, guiding flame—activating clarity, protection, and forward momentum.', title: 'Steady, Guiding Flame'},
                  {name: 'Luka', img: '/luka.jpg', desc: 'Luka carries Sacred Fire as calm integration. His energy flows through the heart, root, and third eye chakras, supporting emotional balance, grounded awareness, and inner clarity. He helps settle the nervous system and bridge heart and mind. With Luka, Sacred Fire feels steady and reassuring—a harmonizing flame that restores peace, presence, and trust.', title: 'Harmonizing Flame'},
                  {name: 'Lost', img: '/lost.jpg', desc: 'Lost carries Sacred Fire as untamed remembrance. His energy works through the root, sacral, and heart chakras, awakening instinct, resilience, and emotional truth. He gently mirrors themes of belonging, trust, and self-discovery. With Lost, Sacred Fire feels wild yet innocent—a flickering flame of becoming, guiding the journey home to self.', title: 'Flickering Flame of Becoming'},
                  {name: 'Gypsy', img: '/gypsy.jpg', desc: 'Gypsy carries Sacred Fire as intuitive flow. Her energy moves through the sacral, heart, and crown chakras, supporting emotional release, creative expression, and spiritual connection. She gently dissolves old patterns and invites trust, softness, and inner listening. Restoring harmony, intuition, and soulful alignment.', title: 'Intuitive Flow'}
                ].map((horse) => (
                  <div key={horse.name} style={{
                    background: 'rgba(255, 138, 92, 0.08)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 138, 92, 0.2)',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '380px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 138, 92, 0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                  }}>
                    <img 
                      src={horse.img}
                      alt={`${horse.name} - ${horse.title}, Sacred Fire Reiki healing horse`}
                      style={{width: '100%', height: '280px', objectFit: 'cover'}} 
                    />
                    <div style={{padding: '2rem'}}>
                      <h2 style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '1.75rem',
                        color: '#FF8A5C',
                        marginBottom: '0.75rem',
                        letterSpacing: '0.05em'
                      }}>
                        {horse.name}
                      </h2>
                      <p style={{
                        fontSize: '1rem',
                        color: '#E5E9ED',
                        lineHeight: '1.8',
                        marginBottom: '1rem'
                      }}>
                        {horse.desc}
                      </p>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#FF8A5C',
                        fontStyle: 'italic',
                        fontWeight: '600'
                      }}>
                        {horse.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back to Home Button */}
              <button
                onClick={() => setCurrentPage('home')}
                style={{
                  marginTop: '4rem',
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #FF4A1C, #FF6B3D)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(255, 74, 28, 0.4)',
                  transition: 'all 0.3s',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 74, 28, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 74, 28, 0.4)';
                }}
              >
                ← Back to Home
              </button>

            </div>
          )}

          {/* Session Info Page */}
          {currentPage === 'sessionInfo' && (
            <div className="fade-in" style={{
              background: 'rgba(0, 0, 0, 0.95)', 
              borderRadius: '20px', 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(94, 234, 212, 0.3)', 
              padding: '3rem 2.5rem 4rem', 
              textAlign: 'center', 
              backdropFilter: 'blur(10px)',
              minHeight: '80vh'
            }}>
              
              <h1 style={{
                fontFamily: 'Cinzel, serif', 
                fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
                color: '#5EEAD4', 
                fontWeight: '700', 
                marginBottom: '1rem', 
                letterSpacing: '0.1em'
              }}>
                SESSION INFORMATION
              </h1>

              <div style={{
                width: '100px', 
                height: '3px', 
                background: 'linear-gradient(to right, transparent, #5EEAD4, transparent)', 
                margin: '1.5rem auto 3rem'
              }}></div>

              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                color: '#CBD2D9', 
                fontStyle: 'italic', 
                margin: '0 auto 4rem',
                maxWidth: '700px',
                lineHeight: '1.8'
              }}>
                Everything you need to know to prepare for and receive the fullness of your Sacred Fire Reiki session.
              </p>

              {/* Info Sections Container */}
              <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'left'}}>
                
                {/* Session Preparation */}
                <div style={{
                  marginBottom: '2rem',
                  background: 'rgba(13, 59, 74, 0.15)',
                  borderRadius: '16px',
                  border: '1px solid rgba(94, 234, 212, 0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden'
                }}>
                  <div style={{padding: '2rem 2.5rem'}}>
                    <h2 style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      color: '#5EEAD4',
                      marginBottom: '1.5rem',
                      letterSpacing: '0.05em',
                      textAlign: 'center'
                    }}>
                      Session Preparation
                    </h2>
                    <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.8', marginBottom: '1.5rem'}}>
                      To support the fullness of your session, please arrive in comfortable clothing, stay hydrated, and minimize heavy meals beforehand. If possible, set an intention or reflect on what you'd like to receive or release during your time together.
                    </p>
                    <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.8'}}>
                      For equine sessions, appropriate footwear is recommended, and an openness to being guided by the horse's energy is encouraged.
                    </p>
                  </div>
                </div>

                {/* What to Expect */}
                <div style={{
                  marginBottom: '2rem',
                  background: 'rgba(13, 59, 74, 0.15)',
                  borderRadius: '16px',
                  border: '1px solid rgba(94, 234, 212, 0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden'
                }}>
                  <div style={{padding: '2rem 2.5rem'}}>
                    <h2 style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      color: '#5EEAD4',
                      marginBottom: '1.5rem',
                      letterSpacing: '0.05em',
                      textAlign: 'center'
                    }}>
                      What to Expect
                    </h2>
                    <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.8', marginBottom: '1.5rem'}}>
                      Each session begins with a brief check-in to clarify intentions and ensure comfort. Reiki is then offered through gentle, non-invasive energy work, either hands-on or hands-off depending on preference and consent.
                    </p>
                    <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.8', marginBottom: '1.5rem'}}>
                      Clients may experience sensations such as warmth, relaxation, emotional release, imagery, or deep stillness. Horses may shift posture, yawn, rest, move away, or engage—all responses are respected and honored.
                    </p>
                    <p style={{fontSize: '1.05rem', color: '#E5E9ED', lineHeight: '1.8'}}>
                      Sessions close with grounding and integration, offering space for reflection or questions.
                    </p>
                  </div>
                </div>

                {/* Disclaimer */}
                <div style={{
                  marginBottom: '2rem',
                  background: 'rgba(26, 34, 53, 0.15)',
                  borderRadius: '16px',
                  border: '1px solid rgba(203, 210, 217, 0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden'
                }}>
                  <div style={{padding: '2rem 2.5rem'}}>
                    <h2 style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      color: '#CBD2D9',
                      marginBottom: '1.5rem',
                      letterSpacing: '0.05em',
                      textAlign: 'center'
                    }}>
                      Gentle Reiki Disclaimer
                    </h2>
                    <p style={{fontSize: '1rem', color: '#9AA5B1', lineHeight: '1.8', marginBottom: '1rem'}}>
                      Sacred Fire Reiki is a complementary, energy-based practice intended to support relaxation, balance, and overall well-being. It is not a substitute for medical, veterinary, psychological, or professional care. No diagnosis or treatment is offered or implied. Clients are encouraged to seek appropriate professional support for medical or veterinary concerns.
                    </p>
                    <p style={{fontSize: '1rem', color: '#9AA5B1', lineHeight: '1.8', fontStyle: 'italic'}}>
                      All sessions honor consent, autonomy, and the innate wisdom of both human and horse.
                    </p>
                  </div>
                </div>

              </div>

              {/* Back to Home Button */}
              <button
                onClick={() => setCurrentPage('home')}
                style={{
                  marginTop: '3rem',
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #5EEAD4, #14B8A6)',
                  color: '#0A0E1A',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(94, 234, 212, 0.4)',
                  transition: 'all 0.3s',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(94, 234, 212, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(94, 234, 212, 0.4)';
                }}
              >
                ← Back to Home
              </button>

            </div>
          )}

        </main>

        {/* Cancellation Policy */}
        <section id="policies" style={{
          maxWidth: '800px',
          margin: '3rem auto',
          padding: '0 2rem'
        }}>
          <div style={{
            background: 'rgba(26, 34, 53, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(203, 210, 217, 0.2)',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{padding: '2rem 2.5rem'}}>
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                color: '#F8FAFB',
                marginBottom: '1rem',
                letterSpacing: '0.05em',
                textAlign: 'center'
              }}>
                Booking & Cancellation Policy
              </h3>
              
              <button
                onClick={() => toggleInfo('cancellation')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(203, 210, 217, 0.15)',
                  border: '1px solid rgba(203, 210, 217, 0.3)',
                  borderRadius: '8px',
                  color: '#CBD2D9',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(203, 210, 217, 0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(203, 210, 217, 0.15)'}
              >
                <span style={{
                  fontSize: '1.25rem',
                  transition: 'transform 0.3s',
                  transform: expandedInfo === 'cancellation' ? 'rotate(45deg)' : 'rotate(0deg)',
                  display: 'inline-block'
                }}>+</span>
                {expandedInfo === 'cancellation' ? 'Show Less' : 'Read Policy'}
              </button>
            </div>

            {expandedInfo === 'cancellation' && (
              <div style={{
                padding: '0 2.5rem 2.5rem 2.5rem',
                textAlign: 'left',
                animation: 'slideDown 0.3s ease-out'
              }}>
                {/* Booking Section */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em'
                }}>
                  Booking
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#E5E9ED',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  All sessions must be booked in advance. Full payment is required at the time of booking to secure your appointment. By booking a session, you acknowledge and agree to the terms outlined below.
                </p>

                {/* Cancellations & Rescheduling */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem'
                }}>
                  Cancellations & Rescheduling
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#E5E9ED',
                  lineHeight: '1.8',
                  marginBottom: '1rem'
                }}>
                  I understand that life happens. If you need to cancel or reschedule, please provide at least 48 hours' notice.
                </p>

                <div style={{marginBottom: '0.75rem'}}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#9AA5B1',
                    lineHeight: '1.7',
                    marginLeft: '1.5rem'
                  }}>
                    • Cancellations or rescheduling requests made with 48 hours' notice will receive a full refund or may be rescheduled without penalty.
                  </p>
                </div>

                <div style={{marginBottom: '0.75rem'}}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#9AA5B1',
                    lineHeight: '1.7',
                    marginLeft: '1.5rem'
                  }}>
                    • Cancellations made within 48 hours or less of the scheduled session are non-refundable.
                  </p>
                </div>

                <div style={{marginBottom: '1rem'}}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#9AA5B1',
                    lineHeight: '1.7',
                    marginLeft: '1.5rem'
                  }}>
                    • No-shows are considered a missed appointment and are non-refundable.
                  </p>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#CBD2D9',
                  fontStyle: 'italic',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  This policy helps honor the time, energy, and preparation reserved for each client and horse.
                </p>

                {/* Late Arrivals */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem'
                }}>
                  Late Arrivals
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#E5E9ED',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  If you arrive late, your session will still end at the originally scheduled time to respect following appointments. The full session fee applies.
                </p>

                {/* Travel Sessions */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem'
                }}>
                  Travel Sessions
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#E5E9ED',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  For travel sessions, cancellations within 48 hours are non-refundable once travel has been confirmed. Travel fees are non-refundable once incurred.
                </p>

                {/* Horse Sessions */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem'
                }}>
                  Horse Sessions
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#E5E9ED',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  All equine-assisted sessions are guided by the horse's consent and well-being. If a horse chooses not to participate on the day of the session, the session may be adapted, at the practitioner's discretion.
                </p>

                {/* Weather & Safety */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem'
                }}>
                  Weather & Safety
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#E5E9ED',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  In the event of unsafe weather or conditions, sessions may be rescheduled to ensure the safety of both clients and horses.
                </p>

                {/* Energetic Boundaries */}
                <h4 style={{
                  fontSize: '1.125rem',
                  color: '#F8FAFB',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem'
                }}>
                  Energetic Boundaries
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#5EEAD4',
                  lineHeight: '1.8',
                  fontStyle: 'italic'
                }}>
                  Sacred Fire Reiki sessions involve intentional energetic preparation. Late cancellations or no-shows disrupt this process and the availability of space for other clients.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer id="contact" role="contentinfo" aria-label="Contact information" style={{
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
