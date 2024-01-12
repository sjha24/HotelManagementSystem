import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingSumary = ({booking,payment,isFormValid,onConfirm}) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numOfDays = checkOutDate.diff(checkInDate,"days");
    const [isBookingConfirmed,setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment,setIsProcessingPayment] = useState(false);

    const navigate = useNavigate();

    const handleConfirmedBooking =()=>{
        setIsProcessingPayment(true);
        setTimeout(()=>{
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        },3000)
    }

    useEffect(()=>{
        if(isBookingConfirmed){
            navigate("/booking-success" )
        }
    },[isBookingConfirmed,navigate])

  return (
    <div className='card card-body mt-5' style={{width:"25vw"}}>
        <h4>Reservation Summary</h4>
        <p>Full Name : <strong>{booking.guestName}</strong></p>
        <p>Guest Email : <strong>{booking.guestEmail}</strong></p>
        <p>Check In Date : <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
        <p>Check out Date : <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
        <p>Number of Days Booked : <strong>{numOfDays}</strong></p>
        <div>
            <h5>Number of Guest</h5>
            <strong>
                Adult{booking.numOfAdults > 1 ? "s" :" " } :- {booking.numOfAdults}
                <br/>
            </strong>
            <strong>
                Children :- {booking.numOfChildren}
            </strong>
        </div>

        {payment > 0 ? (
            <>
                <p>Total Payment : <strong>{payment}</strong></p>
                {isFormValid && !isBookingConfirmed ?(
                    <Button 
                        variant='success'
                        onClick={handleConfirmedBooking}>
                            {isProcessingPayment ? (
                                <>
                                    <span className='spiner-border spiner-border-sm mr-2'
                                        role='status'
                                        aria-hidden='true'
                                    >
                                    </span>
                                    Booking Confirmed ,redirecting to payment...
                                </>
                            ):(
                                'Confirm Booking and procces to payment'
                            )}
                    </Button>
                ): isBookingConfirmed ? (
                    <div className='d-flex justify-content-center align-item-center'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </div>
                    </div>
                ):null}
            </>
        ):(
            <p className='text-danger'>
                Check out date must be after check in date
            </p>  
        )}
    </div>
  )
}

export default BookingSumary