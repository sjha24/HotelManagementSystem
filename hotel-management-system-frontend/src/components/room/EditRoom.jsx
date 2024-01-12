import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {

    const[room,setRoom]  = useState({
        photo:null,
        roomType: "",
        roomPrice: "",
    })

    const [imagePreview,setImagePrivew] = useState("");

    const[successMessage,setSuccessMessage] = useState("");

    const[errorMessage,setErrorMessage] = useState("");

    const{roomId} = useParams();
    const handleImageChange = (e)=>{
        const selectedImage = e.target.files[0];
        setRoom({...room,photo:selectedImage});
        setImagePrivew(URL.createObjectURL(selectedImage));
    }

    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        setRoom({...room,[name]:value});
    }

    useEffect(()=>{
        const fetchRoom = async()=>{
            try{
                const roomData = await getRoomById(roomId);
                console.log(roomData);
                setRoom(roomData);
                setImagePrivew(roomData.photo);
            }catch(error){
                console.error(error);
            }
        }
        fetchRoom();
    },[roomId])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await updateRoom(roomId,room);
            if(response.status === 200){
                setSuccessMessage('Room Updated Successfully');
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePrivew(updatedRoomData.photo);
                setErrorMessage("");
            }else{
                setErrorMessage(`Error Updating Room !!!`);
            }
        }catch(error){
            console.error(error);
            setErrorMessage(error.message);
        }
    }


  return (
    <section className='container mt-5 mb-5'>
            <h2 className='text-center mb-5 mt-5'>Edit Room</h2>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>

                {
                    successMessage && (
                        <div className='alert alert-success fade show'>{successMessage}</div>
                    )
                }
                {
                    errorMessage && (
                        <div className='alert alert-danger fade show'>{successMessage}</div>
                    )
                }

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='roomType' className='form-label hotel-color'>Room Type</label>
                        <input
                            type='text'
                            className='form-control'
                            id='roomType'
                            name='roomType'
                            value={room.roomType}
                            onChange={handleInputChange}
                        >
                        </input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='roomPrice' className='form-label hotel-color'>Room Price</label>
                        <input 
                        className='form-control' 
                        required 
                        id='roomPrice' 
                        type='number'
                        name='roomPrice' 
                        value={room.roomPrice} 
                        onChange={handleInputChange}
                        />
                        
                    </div>
                    <div className='mb-3'>
                            <label htmlFor='roomPhoto' className='form-label'>Room Photo</label>
                            <input className='form-control' 
                            required 
                            id='roomPhoto' 
                            name='roomPhoto'
                            type='file'
                            onChange={handleImageChange}/>
                            {imagePreview && (
                                <img src={`data:image/jpeg;base64,${imagePreview}`} alt='imagePreview'
                                    style={{maxWidth:"400px",maxHeight:"400px"}}
                                    className='mb-3'
                                />
                            )}
                    </div>
                    <div className='d-gird d-md-flex mt-2'>
                        <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>
                            Back
                        </Link>
                        <button className='btn btn-outline-warning'>
                            Edit Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default EditRoom