import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt} from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel';


const CheckOut = () => {
  const [error,setError] = useState("");
  const[Isloading,setIsLoading] = useState(true);
  const[roomInfo,setRoomInfo] = useState({
    photo :"",
    roomType :"",
    roomPrice:""
  })
  const {roomId} = useParams();
  useEffect(()=>{
    setTimeout(()=>{
      getRoomById(roomId).then((response)=>{
        setRoomInfo(response);
        setIsLoading(false);
      }).catch((error)=>{
        setError(error);
        setIsLoading(false);
      })
    },2000)
  },[roomId])
  return (
    <div>
      <section className='container'>
        <div className='row flex-column flex-md-row align-items-center'>
          <div className='col-md-4 mt-5 mb-5'>
            {Isloading ? (
              <p>Loading Room information..</p>
            ):error ?(
              <p>{error}</p>
            ):(
              <div className='room-info'>
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`} 
                  alt='roomPhoto'
                  style={{width:"100%",height:"200px"}}/>
                  <table className='table table-borderd'>
                    <tbody>
                      <tr>
                        <th>Room Type :</th>
                        <th>{roomInfo.roomType}</th>
                      </tr>
                      <tr>
                        <th>Room Price :</th>
                        <th>{roomInfo.roomPrice}</th>
                      </tr>
                      <tr>
                          <th>Room Services:</th>
                          <td>
                          <ul className='list-unstyled'>
                            <li><FaWifi/> Wifi</li>
                            <li><FaTv/> Netflix Premium</li>
                            <li><FaUtensils/> Breakfast</li>
                            <li><FaWineGlassAlt/> Mini bar refreshment</li>
                            <li><FaCar/> Car Service</li>
                            <li><FaParking/> Parking Space</li>
                            <li><FaTshirt/> Laundry</li>
                          </ul>
                          </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            )}
          </div>

          <div style={{width:"50vw"}}>
            <BookingForm/>
          </div>
        </div>
      </section>
      <div className='container'>
        <RoomCarousel/>
      </div>
    </div>
  )
}
export default CheckOut