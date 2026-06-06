// import React from 'react'


// const HeroSection = ({ heading, subheading }) => {
//   const styling = heading === "Crisis Support"
//     ? 'text-4xl font-bold p-4 text-red-500'
//     : 'text-4xl font-bold p-4'

//   return (
//     <div>
//       <h1 className={styling}>{heading}</h1>
//       <p className='text-lg text-gray-600'>{subheading}</p>
//     </div>
//   )
// }

// export default HeroSection
// heroSection.jsx — kept lightweight, styling handled in Home.jsx
import React from 'react';

const HeroSection = ({ heading, subheading }) => {
  const isRed = heading === 'Crisis Support';
  return (
    <div>
      <h1 style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 700,
        color: isRed ? '#dc2626' : '#111827',
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
        marginBottom: 8,
      }}>
        {heading}
      </h1>
      <p style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 400, lineHeight: 1.6 }}>
        {subheading}
      </p>
    </div>
  );
};

export default HeroSection;