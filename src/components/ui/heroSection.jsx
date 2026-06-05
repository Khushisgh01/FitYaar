import React from 'react'


const HeroSection = ({ heading, subheading }) => {
  const styling = heading === "Crisis Support"
    ? 'text-4xl font-bold p-4 text-red-500'
    : 'text-4xl font-bold p-4'

  return (
    <div>
      <h1 className={styling}>{heading}</h1>
      <p className='text-lg text-gray-600'>{subheading}</p>
    </div>
  )
}

export default HeroSection