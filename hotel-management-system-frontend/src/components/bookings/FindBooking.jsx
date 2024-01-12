import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {
    const[confirmationCode,setConfirmationCode]=useState("")
    const[successMessage,setSuccessMessage] = useState("")
    const[error,setError]=useState("")
    const[isLoading,setIsLoading]=useState(false)
    const[isDeleted,setIsDeleted] = useState(false);
    
    const[bookingInfo,setBookingInfo]=useState({
        bookingID:"",
        roomId:"",
        bookingConfirmationCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuest:""
    })

    const clearBookingInfo={
        bookingID:"",
        roomId:"",
        bookingConfirmationCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuest:""
    }

    const handleInputChange=(e)=>{
        setConfirmationCode(e.target.value);
    }
    
    const handleFormSubmit= async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const data = await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(data);
        }catch(error){
            setBookingInfo(clearBookingInfo);
            if(error.response && error.response.status===404){
                console.log(error);
                setError(error.response.data.message);
                
            }else{
                setError(error.message)
            }
        }
        setTimeout(()=>{
            setIsLoading(false);
        },2000)
    }

    const handleBookingCancelation= async (bookingID)=>{
        try{
            await cancelBooking(bookingInfo.bookingID)
            setIsDeleted(true);
            setSuccessMessage("Booking has been cancelld successfully!")
            setBookingInfo(clearBookingInfo);
            setConfirmationCode("");
            setError("");
        }catch(error){
            setError(error.message);
        }

        setTimeout(()=>{
            setSuccessMessage("");
            setIsDeleted(false);
        },3000)
    }

    return (
        <>
            <div className='container mt-5 d-flex flex-column jsutify-content-center align-items-center'>
                <h2>Find My Booking</h2>
                <form className='col-md-6' onSubmit={handleFormSubmit}>
                    <div className='input-group mt-3'>
                        <input
                            className='form-control'
                            type='text'
                            name='confirmationCode'
                            id='confirmationCode'
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder='Enter the booking confirmation code'
                            />
                        
                        <button className='btn btn-hotel input-group-text'>Find Booking</button>
                    </div>
                </form>
                    {isLoading ? (<div>Finding Booking..</div>
                    
                    ):error ? (<div className='text-danger'>{error}</div>
                    
                    ):bookingInfo.bookingConfirmationCode ? (
                        <div className='col-md-6 mt-4 mb-5'>
                            <h3>Booking Infromation</h3>
                            <p>Booking Confirmation Code :{bookingInfo.bookingConfirmationCode}</p>
                            <p>Booking ID: {bookingInfo.bookingID}</p>
                            <p>Room No: {bookingInfo.roomId}</p>
                            <p>Room Type: {bookingInfo.roomType}</p>
                            <p>Check In Date: {bookingInfo.checkInDate}</p>
                            <p>Check Out Date: {bookingInfo.checkOutDate}</p>
                            <p>Full Name: {bookingInfo.guestFullName}</p>
                            <p>Email Address: {bookingInfo.guestEmail}</p>
                            <p>Adults: {bookingInfo.numOfAdults}</p>
                            <p>Children: {bookingInfo.numOfChildren}</p>
                            <p>Toatal Guest: {bookingInfo.totalNumOfGuest}</p>
                            
                            {!isDeleted &&(
                                <button className='btn btn-danger' onClick={()=>handleBookingCancelation(bookingInfo.bookingID)}>Cancel Booking</button>
                            )}
                        </div>
                    ):(
                        <div>Finding Booking...</div>
                    )}

                    {isDeleted && (
                        <div className='alert alert-success mt-3' role='alert'>
                            {successMessage}
                        </div>
                    )}
            </div>
        </>
    )
}

export default FindBooking