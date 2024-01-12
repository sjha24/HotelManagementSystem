import React from 'react'
import { Card, CardBody, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RoomCard = ({room}) => {

  return (
    <Col key={room.id} className='mb-4' xs={12}>
        <Card>
            <Card.Body className='d-flex flex-wrap align-item-center'>
                <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>
                    <Link to={`/book-room/${room.id}`}>
                        <Card.Img 
                        variant='top' 
                        src={`data:image/png;base64, ${room.photo}`}
                        alt='room=photo'
                        style={{width:"100%",maxWidth:"200px",maxHeight:"auto"}}
                        />
                    </Link>
                </div>

                <div className='flex-grow-1 ml-3 px-5'>
                    <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                    <Card.Title className='room-price'>{room.roomPrice}</Card.Title>
                    <Card.Text className='hotel-color'>Some Room Information goes here for the guest to read</Card.Text>
                </div>

                <div className='flex-shrink-0 mt-3'>
                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                        Book Now
                    </Link>
                </div>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default RoomCard