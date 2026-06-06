// import React, { useState, useEffect, useCallback } from 'react';
// import { MagnifyingGlassIcon, FunnelIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline';
// import { useAuth } from '../../context/AuthContext'; // 1. IMPORT useAuth

// // Mock data for dropdowns based on images
// const specialties = ['All Specialties', 'Anxiety', 'Depression', 'CBT', 'Trauma', 'Couples Therapy', 'Teen Therapy', 'ADHD'];
// const locations = ['All Locations', 'San Francisco, CA', 'Los Angeles, CA', 'Austin, TX', 'Seattle, WA', 'New York, NY', 'Chicago, IL'];
// const sessionTypes = ['All Types', 'In-Person', 'Video Call', 'Phone Call'];
// const insurances = ['All Insurance', 'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare'];

// // Simple Dropdown Component
// const CustomDropdown = ({ label, options, selectedValue, onChange }) => (
//     <div className="relative">
//         <select
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 appearance-none bg-white pr-8 text-gray-700"
//             value={selectedValue}
//             onChange={onChange}
//             aria-label={label}
//         >
//             {options.map(option => (
//                 <option key={option} value={option}>{option}</option>
//             ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//             </svg>
//         </div>
//     </div>
// );

// // New Component to Display a Single Therapist
// const TherapistCard = ({ therapist }) => (
//     <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 flex flex-col sm:flex-row justify-between hover:shadow-xl transition-shadow">
//         <div className='flex-1'>
//             <h3 className="text-xl font-bold text-gray-800">{therapist.name}</h3>
//             <p className="text-violet-600 font-semibold mb-2">{therapist.specialty}</p>
//             <p className="text-sm text-gray-600 mb-3">{therapist.bio}</p>
            
//             <div className="flex items-center text-sm text-gray-500">
//                 <StarIcon className="w-4 h-4 text-amber-400 mr-1 fill-amber-400" />
//                 <span>{therapist.rating} Rating</span>
//                 <span className="mx-3 text-gray-300">|</span>
//                 <span>{therapist.location}</span>
//             </div>
//         </div>
        
//         <div className='mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex flex-col justify-end items-start sm:items-end space-y-2'>
//             <div className='flex flex-wrap gap-2'>
//                 {therapist.sessions.map(session => (
//                      <span key={session} className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{session}</span>
//                 ))}
//             </div>
//             <button className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors">
//                 View Profile
//             </button>
//         </div>
//     </div>
// );

// const FindTherapistContent = () => {
//     // State for Filters
//     const [specialty, setSpecialty] = useState(specialties[0]); 
//     const [location, setLocation] = useState(locations[0]);
//     const [type, setType] = useState(sessionTypes[0]);
//     const [insurance, setInsurance] = useState(insurances[0]);

//     // State for API Data
//     const [therapistList, setTherapistList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const { getAuthHeader } = useAuth();

//     // Function to fetch data from the backend API
//     const fetchTherapists = useCallback(async () => {
//         setLoading(true);
//         setError(null);

//         // Build query string based on selected filters (matching backend logic)
//         const params = new URLSearchParams();
//         if (specialty !== specialties[0]) params.append('specialty', specialty);
//         if (location !== locations[0]) params.append('location', location);
        
//         // Note: The mock backend only filters by specialty and location, 
//         // but we'll include a placeholder for insurance/type logic if needed later.
        
//         const queryString = params.toString();
//         const apiUrl = `/api/therapists${queryString ? '?' + queryString : ''}`;

//         try {
//             const response = await fetch(apiUrl, {
//                 headers: getAuthHeader()
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setTherapistList(data);
//         } catch (e) {
//             console.error("Error fetching therapists:", e);
//             setError("Failed to load therapist listings. Check if the backend is running.");
//             setTherapistList([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [specialty, location, getAuthHeader]); // Dependencies: Refetch when these filters change

//     // useEffect to trigger the fetch function when filters change
//     useEffect(() => {
//         fetchTherapists();
//     }, [fetchTherapists]);

//     return (
//         <div className='space-y-8'>
            
//             {/* Crisis Warning Banner */}
//             <div className='bg-red-50 border-l-4 border-red-500 rounded-lg p-5 flex justify-between items-center shadow-md'>
//                 <div className='flex items-center'>
//                     <PhoneIcon className='w-6 h-6 text-red-500 mr-4' />
//                     <div>
//                         <p className='text-lg font-semibold text-red-700'>Need immediate support?</p>
//                         <p className='text-sm text-red-600'>Crisis counselors available 24/7</p>
//                     </div>
//                 </div>
//                 <a 
//                     href="/crises-support" 
//                     className="flex items-center px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
//                 >
//                     Get Help Now
//                 </a>
//             </div>

//             {/* Find Your Perfect Match Filters */}
//             <div className='bg-white rounded-2xl shadow-xl p-6'>
//                 <div className='flex items-center mb-6'>
//                     <FunnelIcon className='w-6 h-6 text-violet-600 mr-2' />
//                     <h2 className='text-xl font-bold text-gray-800'>Find Your Perfect Match</h2>
//                 </div>

//                 <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
//                     {/* Search Bar */}
//                     <div className="md:col-span-3 relative">
//                         <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search by name or specialty..."
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500"
//                         />
//                     </div>
                    
//                     {/* Specialty Dropdown */}
//                     <CustomDropdown
//                         label="Specialty"
//                         options={specialties}
//                         selectedValue={specialty}
//                         onChange={(e) => setSpecialty(e.target.value)}
//                     />

//                     {/* Location Dropdown */}
//                     <CustomDropdown
//                         label="Location"
//                         options={locations}
//                         selectedValue={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                     />
                    
//                     {/* Session Type Dropdown */}
//                     <CustomDropdown
//                         label="All Types"
//                         options={sessionTypes}
//                         selectedValue={type}
//                         onChange={(e) => setType(e.target.value)}
//                     />
//                 </div>

//                 <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//                     {/* Insurance Dropdown */}
//                     <CustomDropdown
//                         label="All Insurance"
//                         options={insurances}
//                         selectedValue={insurance}
//                         onChange={(e) => setInsurance(e.target.value)}
//                     />
                    
//                     {/* Placeholder filter */}
//                     <div className='h-full'></div>
                    
//                     {/* Status/Count */}
//                     <div className='h-full flex items-center justify-center md:justify-end'>
//                          <p className='text-md font-semibold text-gray-500'>
//                             {loading ? 'Searching...' : `Found ${therapistList.length} therapists`}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Therapist Listings (Replaces Placeholder Content) */}
//             <div className='p-6 bg-white rounded-2xl shadow-xl space-y-4'>
//                 <h2 className='text-xl font-bold text-gray-800'>Search Results</h2>

//                 {error && <p className='text-red-500 text-center'>{error}</p>}
                
//                 {loading && (
//                     <div className='text-center p-4 text-gray-500'>
//                         <p>Loading therapist matches...</p>
//                     </div>
//                 )}
                
//                 {!loading && therapistList.length > 0 && (
//                     <div className='space-y-6'>
//                         {therapistList.map(therapist => (
//                             <TherapistCard key={therapist.id} therapist={therapist} />
//                         ))}
//                     </div>
//                 )}

//                 {!loading && !error && therapistList.length === 0 && (
//                     <div className='text-center p-4 border border-gray-200 rounded-lg'>
//                         <p className='text-gray-500'>No therapists found matching the selected filters. Try broadening your search criteria.</p>
//                     </div>
//                 )}
//             </div>
            
//         </div>
//     );
// };

// export default FindTherapistContent;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { MagnifyingGlassIcon, StarIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

const specialties = ['All Specialties', 'Anxiety', 'Depression', 'CBT', 'Trauma', 'Couples Therapy', 'Teen Therapy', 'ADHD'];
const locations   = ['All Locations', 'San Francisco, CA', 'Los Angeles, CA', 'Austin, TX', 'Seattle, WA', 'New York, NY', 'Chicago, IL'];
const sessionTypes = ['All Types', 'In-Person', 'Video Call', 'Phone Call'];
const insurances  = ['All Insurance', 'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare'];

/* ── Styled Select ── */
const Select = ({ options, value, onChange, label }) => (
  <div style={{ position: 'relative' }}>
    <select
      value={value}
      onChange={onChange}
      aria-label={label}
      style={{
        width: '100%', padding: '12px 40px 12px 16px',
        background: 'rgba(255,255,255,0.8)',
        border: '1.5px solid rgba(139,108,244,0.15)',
        borderRadius: 14, appearance: 'none',
        fontFamily: 'Instrument Sans, sans-serif',
        fontSize: '0.875rem', fontWeight: 500,
        color: '#1a1025', cursor: 'pointer',
        outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
      onBlur={e =>  { e.target.style.borderColor = 'rgba(139,108,244,0.15)'; e.target.style.boxShadow = 'none'; }}
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
    <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#9b8faa', pointerEvents: 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </div>
);

/* ── Therapist Card ── */
const TherapistCard = ({ therapist, index }) => {
  const cardRef = useRef(null);

  const handleEnter = () => gsap.to(cardRef.current, { y: -5, scale: 1.01, duration: 0.3, ease: 'power2.out' });
  const handleLeave = () => gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' });

  const sessionColors = { 'In-Person': '#22c993', 'Video Call': '#7c3aed', 'Phone Call': '#ec8b3a' };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(255,255,255,0.95)',
        borderRadius: 22,
        padding: '24px 28px',
        boxShadow: '0 4px 28px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 20,
        cursor: 'default', transition: 'box-shadow 0.3s',
      }}
    >
      {/* Left: avatar + info */}
      <div style={{ display: 'flex', gap: 18, flex: 1 }}>
        {/* Avatar */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, hsl(${(index * 67) % 360},60%,60%), hsl(${(index * 67 + 40) % 360},70%,50%))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', fontWeight: 700, color: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}>
          {therapist.name?.charAt(0) || 'T'}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', fontWeight: 700, color: '#1a1025' }}>
              {therapist.name}
            </h3>
            <span style={{
              background: 'rgba(34,201,147,0.12)', color: '#16a07a',
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
              border: '1px solid rgba(34,201,147,0.2)',
            }}>Verified</span>
          </div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#7c3aed', marginBottom: 8 }}>{therapist.specialty}</p>
          <p style={{ fontSize: '0.83rem', color: '#6b6474', lineHeight: 1.6, marginBottom: 12 }}>{therapist.bio}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {[1,2,3,4,5].map(s => (
                <StarSolid key={s} style={{ width: 13, height: 13, color: s <= Math.round(therapist.rating) ? '#f59e0b' : '#e5e7eb' }} />
              ))}
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1025', marginLeft: 4 }}>{therapist.rating}</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#9b8faa' }}>📍 {therapist.location}</span>
          </div>
        </div>
      </div>

      {/* Right: sessions + button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
          {(therapist.sessions || []).map(s => (
            <span key={s} style={{
              padding: '4px 12px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600,
              background: `${sessionColors[s] || '#7c3aed'}18`,
              color: sessionColors[s] || '#7c3aed',
              border: `1px solid ${sessionColors[s] || '#7c3aed'}30`,
            }}>{s}</span>
          ))}
        </div>
        <button
          style={{
            padding: '10px 22px',
            background: 'linear-gradient(135deg, #7c3aed, #9d5cf0)',
            color: 'white', border: 'none', borderRadius: 14,
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '0.875rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.42)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(124,58,237,0.3)'; }}
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const FindTherapistContent = () => {
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [location, setLocation]   = useState(locations[0]);
  const [type, setType]           = useState(sessionTypes[0]);
  const [insurance, setInsurance] = useState(insurances[0]);
  const [therapistList, setTherapistList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const { getAuthHeader }   = useAuth();

  const filterRef  = useRef(null);
  const resultsRef = useRef(null);
  const cardRefs   = useRef([]);

  const fetchTherapists = useCallback(async () => {
    setLoading(true); setError(null);
    const params = new URLSearchParams();
    if (specialty !== specialties[0]) params.append('specialty', specialty);
    if (location  !== locations[0])   params.append('location', location);
    try {
      const res = await fetch(`/api/therapists${params.toString() ? '?' + params : ''}`, { headers: getAuthHeader() });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTherapistList(data);
      // Animate cards in
      setTimeout(() => {
        if (cardRefs.current.length) {
          gsap.fromTo(cardRefs.current.filter(Boolean),
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.55, ease: 'power3.out' }
          );
        }
      }, 50);
    } catch (e) {
      setError('Failed to load therapist listings. Check if the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [specialty, location, getAuthHeader]);

  useEffect(() => { fetchTherapists(); }, [fetchTherapists]);

  useEffect(() => {
    gsap.fromTo(filterRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        .ftc-search-input {
          flex: 1; padding: 13px 18px 13px 44px;
          background: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(139,108,244,0.15);
          border-radius: 14px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.9rem; color: #1a1025;
          outline: none; transition: all 0.2s;
        }
        .ftc-search-input::placeholder { color: #bbb0cc; }
        .ftc-search-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .ftc-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #9b8faa; margin-bottom: 8px;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Crisis Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))',
          border: '1px solid rgba(239,68,68,0.2)',
          borderLeft: '4px solid #ef4444',
          borderRadius: 18, padding: '18px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'rgba(239,68,68,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <PhoneIcon style={{ width: 20, height: 20, color: '#ef4444' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, color: '#b91c1c', fontSize: '1rem' }}>Need immediate support?</p>
              <p style={{ fontSize: '0.82rem', color: '#dc2626', marginTop: 2 }}>Crisis counselors available 24/7 — you are not alone.</p>
            </div>
          </div>
          <a href="/crises-support" style={{
            padding: '10px 22px',
            background: '#ef4444', color: 'white', borderRadius: 14,
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '0.875rem', fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(239,68,68,0.3)',
            transition: 'all 0.2s',
          }}>
            Get Help Now →
          </a>
        </div>

        {/* Filter Section */}
        <div ref={filterRef} style={{
          background: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(139,108,244,0.1)',
          borderRadius: 22, padding: '24px 28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: '1.1rem' }}>✦</span>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', fontWeight: 700, color: '#1a1025' }}>
              Find Your Perfect Match
            </h2>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <MagnifyingGlassIcon style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#bbb0cc' }} />
            <input type="text" placeholder="Search by name, specialty, or approach..." className="ftc-search-input" style={{ width: '100%' }} />
          </div>

          {/* Dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            <div>
              <p className="ftc-label">Specialty</p>
              <Select options={specialties} value={specialty} onChange={e => setSpecialty(e.target.value)} label="Specialty" />
            </div>
            <div>
              <p className="ftc-label">Location</p>
              <Select options={locations} value={location} onChange={e => setLocation(e.target.value)} label="Location" />
            </div>
            <div>
              <p className="ftc-label">Session Type</p>
              <Select options={sessionTypes} value={type} onChange={e => setType(e.target.value)} label="Session Type" />
            </div>
            <div>
              <p className="ftc-label">Insurance</p>
              <Select options={insurances} value={insurance} onChange={e => setInsurance(e.target.value)} label="Insurance" />
            </div>
          </div>

          {/* Count */}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.15)',
              fontSize: '0.8rem', fontWeight: 600, color: '#6b3fd4',
            }}>
              {loading ? 'Searching…' : `${therapistList.length} therapist${therapistList.length !== 1 ? 's' : ''} found`}
            </span>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a1025', marginBottom: 18 }}>
            Search Results
          </h2>

          {error && (
            <div style={{ padding: '16px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, color: '#dc2626', fontSize: '0.875rem' }}>
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', gap: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '3px solid rgba(124,58,237,0.15)',
                borderTop: '3px solid #7c3aed',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ color: '#7c3aed', fontWeight: 600, fontSize: '0.95rem' }}>Finding your matches…</p>
            </div>
          )}

          {!loading && therapistList.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {therapistList.map((t, i) => (
                <div key={t.id} ref={el => cardRefs.current[i] = el}>
                  <TherapistCard therapist={t} index={i} />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && therapistList.length === 0 && (
            <div style={{
              padding: '60px 24px', textAlign: 'center',
              background: 'rgba(139,108,244,0.04)',
              border: '1px dashed rgba(139,108,244,0.2)',
              borderRadius: 20,
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', color: '#1a1025', fontWeight: 600, marginBottom: 6 }}>No matches found</p>
              <p style={{ color: '#9b8faa', fontSize: '0.875rem' }}>Try broadening your search criteria above.</p>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default FindTherapistContent;