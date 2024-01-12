import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions';
import BookingTable from './BookingTable';

const Bookings = () =>{
    const[bookingInfo,setBookingInfo] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const[errorMessage,setErrorMessage] = useState("");
    
    useEffect(()=>{
      setTimeout(()=>{
        getAllBookings().then((data)=>{
          setBookingInfo(data);
          setIsLoading(false);
        }).catch((error)=>{
          setErrorMessage(error.message);
        })
      },3000)
    },[])

    const handleBookingCancelation = async (bookingId)=>{
      try{
        await cancelBooking(bookingId);
        const data = await getAllBookings()
        setBookingInfo(data);
      }catch(error){
        setErrorMessage(error.message);
      }
    }
  return(
      <section className='container' style={{backgroundColor:"whitesmoke"}}>
        <header title={"Existing Bookings"}/>
        {errorMessage && (
          <div className='text-danger'>{errorMessage}</div>
        )}
        {isLoading ?( <div>
          Loading Existing Bookings..
        </div>):(
          <BookingTable bookingInfo={bookingInfo} handleBookingCancelation={handleBookingCancelation}/>
        )}
      </section>
    )
}

export default Bookings