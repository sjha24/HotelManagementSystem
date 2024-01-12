import React, { useEffect, useState } from 'react'
// import { deleteRoomById, getAllRooms } from '../utils/ApiFunctions';
import { Col, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';

const ExistingRooms = () => {
    const[rooms,setRooms] = useState([]);
    const[currentPage,setCuurentPage] = useState(1);
    const[roomsPerPage] = useState(8);
    const[isLoading,setIsLoading] = useState(false);
    const[filteredRooms,setFilteredRooms] = useState([]);
    const[selectedRoomType,setSelectedRoomType] = useState("");
    const[successMessage,setSuccessMessage] = useState("");
    const[errorMessage,setErrorMessage] = useState("");


    useEffect(()=>{
        fetchRoom();
    },[])
    const fetchRoom = async()=>{
        setIsLoading(true);
        try{
            const result = await getAllRooms();
            console.log(result);
            setRooms(result);
            setIsLoading(false);
        }catch(error){
            setErrorMessage(error.message);
        }
    }

    useEffect(()=>{
        if(selectedRoomType === ""){
            setFilteredRooms(rooms);
        }else{
            const filtered = rooms.filter((room)=>room.roomType===selectedRoomType)
            setFilteredRooms(filtered);

        }
        setCuurentPage(1);

    },[rooms,selectedRoomType])

    const calculatesTotalPages = (filteredRooms,roomsPerPage,rooms)=>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms/roomsPerPage);
    }

    const handelePaginationClick = (pageNumber)=>{
        setCuurentPage(pageNumber);
    }

    const handleDelete =async(roomID)=>{
        try{
            const result = await deleteRoom(roomID);
            if(result === ""){
                setSuccessMessage(`Room number ${roomID} was Deleted Successfully`);
                fetchRoom();
            }else{
                console.error(`Error Deleting Room : ${result.message}`)
            }
        }catch(error){
            setErrorMessage(error.message);
        }

        setTimeout(()=>{
            setSuccessMessage("");
            setErrorMessage("");
        },4000)
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const cuurentRooms = filteredRooms.slice(indexOfFirstRoom,indexOfLastRoom);


  return (
    <>
        <div className='container col-md-8 col-lg-6'>
            {successMessage && <p className='alert alert-success mt-5'>{successMessage}</p>}
            {errorMessage && <p className='alert alert-danger mt-5'>{errorMessage}</p>}
        </div>
        {isLoading ? (
            <p>Loading Existing Rooms</p>
        ):(
            <section className='mt-5 mb-5 container'>
                <div className='d-flex justify-content-center mb-4'>
                    <h2>Existing Rooms</h2>
                </div>

                <Row>
                
                    <Col md={6} className='mb-3 mb-md-0'>
                        <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                    </Col>
                    <Col md={2} className='d-flex justify-content-end'>
                        <Link to='/add-rooms'>
                            <FaPlus/>Add New Room
                        </Link>
                    </Col>
                </Row>
                <table className='table table-border table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuurentRooms.map((room)=>(
                            <tr key={room.id} className='text-center'>
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td className='gap-2'>
                                   <Link to={`/edit-room/${room.id}`}>
                                        <span className='btn btn-info'>
                                            <FaEye/>
                                        </span>
                                        <span className='btn btn-warning'>
                                            <FaEdit/>
                                        </span>
                                    </Link>
                                    <button className='btn btn-danger btn-sm'
                                        onClick={()=>handleDelete(room.id)}
                                    >
                                        <FaTrashAlt/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <RoomPaginator 
                    currentPage={currentPage}
                    totalPages={calculatesTotalPages(filteredRooms,roomsPerPage,rooms)}
                    onpageChange={handelePaginationClick}
                />

            </section>
        )}
    </>
  )
}

export default ExistingRooms