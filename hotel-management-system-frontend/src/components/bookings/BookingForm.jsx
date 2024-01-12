import React from 'react'
import { useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, FormControl } from 'react-bootstrap';
import BookingSumary from './BookingSumary';

const BookingForm = () => {
    const[isValidate,setIsValidate] = useState(false);
    const[isSubmited ,setIsSubmited] = useState(false);
    const[errorMessage,setErrorMessage] = useState("");
    const[roomPrice,setRoomPrice] = useState(0);
    const[booking,setBooking] = useState({
        guestFullName : "",
        guestEmail : "",
        checkInDate : "",
        checkOutDate : "",
        numOfAdults : "",
        numOfChildren : ""
    })
    
    const [roomInfo,setRoomInfo] = useState({
        photo:"",
        roomType:"",
        roomPrice:""
    })
    const {roomId} = useParams();

    const navigate = useNavigate();

    const handelInputChange=(e)=>{
        const{name,value} = e.target;
        setBooking({...booking,[name]:value});
        setErrorMessage("");
    }

    const getRoomPriceById= async(roomId)=>{
        try{
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        }catch(error){
            throw new Error(error);
        }
    }

    useEffect(()=>{
        getRoomPriceById(roomId);
    },[roomId])

    const calculatePayment=()=>{
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffrenceInDates =  checkOutDate.diff(checkInDate,"days");
        const pricePerDay = roomPrice ? roomPrice : 0;
        return diffrenceInDates * pricePerDay;
    }

    const isGuestValid =()=>{
        const adultsCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultsCount+childrenCount;
        return totalCount >=1 && adultsCount >=1;
    }

    const isCheckOutDateValid=()=>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check out Date must come before check in date");
            return false;
        }else{
            setErrorMessage("");
            return true;
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity()===false || !isCheckOutDateValid() || !isGuestValid()){
            e.stopPropagation();
        }else{
            setIsSubmited(true);
        }
        setIsValidate(true);
    }

    const handleFormSubmit = async()=>{
        try{
            const confirmationCode =  await bookRoom(roomId,booking);
            setIsSubmited(true);
            navigate("/booking-success",{state:{message:confirmationCode}});
        }catch(error){
            const errorMessage = error.message;
            navigate("/booking-success",{state:{error:errorMessage}});
        }
    }


  return (
    <>
        <div className='container mb-5'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='card card-body mt-5'>
                        <h4 className='card card-title'>Reserve Room</h4>
                        <Form noValidate validated = {isValidate} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='guestFullName' className='hotel-color'>Full Name : </Form.Label>
                                <Form.Control 
                                    required
                                    type='text'
                                    id='guestFullName'
                                    name='guestFullName'
                                    value={booking.guestFullName}
                                    placeholder='Enter Your Full Name'
                                    onChange={handelInputChange}/>

                                    <Form.Control.Feedback type = 'invalid'
                                    >Please Enter Your full name</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='guestEmail' className='hotel-color'>Email : </Form.Label>
                                <Form.Control 
                                    required
                                    type='email'
                                    id='guestEmail'
                                    name='guestEmail'
                                    value={booking.guestEmail}
                                    placeholder='Enter Your Email'
                                    onChange={handelInputChange}
                                    />
                                    

                                    <Form.Control.Feedback type = 'invalid'
                                    >Please Enter Your Email</Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{border:"2px"}}>
                                <legend>Lodging Period</legend>
                                <div className='row'>
                                    <div className='col-6'>
                                        <Form.Label htmlFor='checkInDate'>Check In Date : </Form.Label>
                                        <Form.Control 
                                            required
                                            type='date'
                                            id='checkInDate'
                                            name='checkInDate'
                                            value={booking.checkInDate}
                                            placeholder='Check In Date'
                                            onChange={handelInputChange}/>
                                        <Form.Control.Feedback type = 'invalid'
                                        >Please Select a check in date</Form.Control.Feedback>
                                    
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label htmlFor='checkOutDate'>Check Out Date : </Form.Label>
                                        <Form.Control 
                                            required
                                            type='date'
                                            id='checkOutDate'
                                            name='checkOutDate'
                                            value={booking.checkOutDate}
                                            placeholder='Check Out Date'
                                            onChange={handelInputChange}/>
                                        <Form.Control.Feedback type = 'invalid'
                                        >Please Select a check Out date</Form.Control.Feedback>
                                    
                                    </div>
                                    {errorMessage &&<p className='error-message text-danger'>{errorMessage}</p>}
                                </div>
                            </fieldset>

                            <fieldset style={{border:"2px"}}>
                                <legend>Number of Guest</legend>
                                <div className='row'>
                                    <div className='col-6'>
                                        <Form.Label htmlFor='numOfAdults'>Adults : </Form.Label>
                                        <FormControl 
                                            required
                                            type='number'
                                            id='numOfAdults'
                                            name='numOfAdults'
                                            value={booking.numOfAdults}
                                            placeholder='0'
                                            min={1}
                                            onChange={handelInputChange}/>
                                        <FormControl.Feedback type = 'invalid'>
                                            Please Select at least 1 adult.
                                        </FormControl.Feedback>
                                    
                                    </div>
                                    <div className='col-6'>
                                        <Form.Label htmlFor='numOfChildren'>Children : </Form.Label>
                                        <FormControl
                                            type='number'
                                            id='numOfChildren'
                                            name='numOfChildren'
                                           value={booking.numOfChildren}
                                            placeholder='0'
                                            min={0}
                                            onChange={handelInputChange}/>
                                            <Form.Control.Feedback type='invalid'>
                                                Select 0 if no Children
                                            </Form.Control.Feedback>
                                    </div>
                                </div>
                            </fieldset>
                            <div className='form-group mt-2 mb-2'>
                                <button type='submit' className='btn btn-hotel'>Continue</button>
                            </div>
                        </Form>

                    </div>
                </div>
                <div className='col-md-4'>
                    {isSubmited &&(
                        <BookingSumary 
                            booking={booking} 
                            payment={calculatePayment()}
                            isFormValid={isValidate}
                            onConfirm={handleFormSubmit}/>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default BookingForm;