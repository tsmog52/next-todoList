import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button 
        className='px-3 py-2 ml-2 bg-blue-400 rounded-md text-black hover:bg-blue-500'
      >
        {props.text} 
      </button>
    </div>
  )
}

export default Button
