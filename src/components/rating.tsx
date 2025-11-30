import React from 'react'

export default function Rating({ value }: { value: number }){
  const stars = Math.round(value)
  return (
    <div className="text-yellow-500" aria-label={`Rating ${value}`}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </div>
  )
}
