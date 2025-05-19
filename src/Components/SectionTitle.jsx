import React from 'react'

function SectionTitle({heading, subheading}) {
  return (
    <div className='mb-10 text-center mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4 text-green-700'>{heading}</h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>{subheading}</p>
    </div>
  )
}

export default SectionTitle