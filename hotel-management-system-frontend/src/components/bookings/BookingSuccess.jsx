import React from 'react'
import { useLocation } from 'react-router-dom'

const BookingSuccess = () => {
    const location = useLocation();
   
    const message = location.state?.message;
    const error = location.state?.error;
  
  return (
    <div className='container'>
        <header title='Booking Success'/>
        <div className='mt-5'>
            {message?(
                <div>
                    <h3 className='text-success'>Booking Success Thank You !!</h3>
                    <p className='text-success'>{message}</p>
                </div>
            ):(
                <div>
                    <h3 className='text-danger'>Error in Booking Rooms !!!</h3>
                    <p className='text-danger'>{error}</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default BookingSuccess