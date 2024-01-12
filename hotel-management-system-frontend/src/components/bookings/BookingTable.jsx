import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider';

const BookingTable = ({bookingInfo,handleBookingCancelation}) => {
    const[filterBookings,setFilterBookings] = useState(bookingInfo);

    const filter_Bookings = (startDate,endDate)=>{
        let filtered = bookingInfo;
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking)=>{
                const bookingStartDate = parseISO(booking.checkInDate);
                const bookingEndDate = parseISO(booking.checkOutDate);
                return bookingStartDate>=startDate 
                && bookingEndDate <= endDate 
                && bookingEndDate >startDate
            })
            setFilterBookings(filtered);
        }
    }

    useEffect(()=>{
        setFilterBookings(bookingInfo);
    },[bookingInfo])

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filter_Bookings} onFilterChange={filter_Bookings}/>
            <table className='table table-border table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking Id</th>
                        <th>Room Id</th>
                        <th>Check In Date</th>
                        <th>Check Out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filterBookings.map((booking,index)=>(
                        <tr key={booking.Id}>
                            <td>{index+1}</td>
                            <td>{booking?.bookingID}</td>
                            <td>{booking?.roomId}</td>
                            <td>{booking?.checkInDate}</td>
                            <td>{booking?.checkOutDate}</td>
                            <td>{booking?.guestFullName}</td>
                            <td>{booking?.guestEmail}</td>
                            <td>{booking?.numOfAdults}</td>
                            <td>{booking?.numOfChildrent}</td>
                            <td>{booking?.totalNumOfGuest}</td>
                            <td>{booking?.bookingConfirmationCode}</td>
                            <td>
                                <button
                                className='btn btn-danger btn-sm'
                                    onClick={()=>handleBookingCancelation(booking?.bookingID)}>
                                        Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filter_Bookings.length===0 && <p>No Booking Found for a selected dates</p>}
        </section>
    )
}

export default BookingTable