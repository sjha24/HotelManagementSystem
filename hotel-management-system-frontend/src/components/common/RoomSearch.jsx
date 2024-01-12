import moment from 'moment';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import RoomTypeSelector from './RoomTypeSelector';
import RoomSearchResult from './RoomSearchResult';
import { getAvailableRooms } from '../utils/ApiFunctions';

const RoomSearch = () => {
    const[errorMessage,setErrorMessage] = useState("");
    const[availableRoom,setAvailableRoom] = useState([]);
    const[isLoading,setIsLoading]=useState(false);
    
    const[searchQuery,setSearchQuery] = useState({
        checkInDate:"",
        checkOutDate:"",
        roomType:""
    });

    const handleSeach =(e)=>{
        e.preventDefault();
        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);
        if(!checkIn.isValid() || !checkOut.isValid()){
            setErrorMessage("Please, Enter Valid Date Range")
            return
        }
        if(!checkOut.isSameOrAfter(checkIn)){
            setErrorMessage("Check In Date must come before Check out date")
            return
        }
        setIsLoading(true);
        getAvailableRooms(searchQuery.checkInDate,searchQuery.checkOutDate,searchQuery.roomType).then((response)=>{
            setAvailableRoom(response);
            setTimeout(()=>{
                setIsLoading(false);
            },3000)
        }).catch((error)=>{
            setErrorMessage(error.message)
        }).finally(()=>{
            setIsLoading(false);
        })
    }


    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        setSearchQuery({...searchQuery,[name]:value})
        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);
        if(checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("");
        }
    }

    const clearSearch=()=>{
        setSearchQuery({
            checkInDate:"",
            checkOutDate:"",
            roomType:""
        })
        setAvailableRoom([])
    }
    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <h3 className='mb-4'>Check Room Availabilty</h3>
                <Form onSubmit={handleSeach}>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label>Check In Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='checkInDate'
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}/>
                                    
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>Check Out Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='checkOutDate'
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}/>                                    
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label>Room Type</Form.Label>
                                <div className='d-flex'>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery}/>
                                        <Button variant='secondary' type='submit' className='ml-2'>Search</Button>
                                </div>
                            </Form.Group>

                        </Col>
                    </Row>
                </Form>

                {isLoading ?(
                    <p className='mt-4'>Finding Available Rooms...</p>
                ): availableRoom ? (
                    <RoomSearchResult
                        results={availableRoom}
                        onClearSearch={clearSearch}/>
                ):(
                    <p className='mt-4'>No Rooms Available for the selected dates and room type</p>
                )}

                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            </Container>
        </>
    )
}

export default RoomSearch