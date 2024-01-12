import './App.css'
import AddRoom from './components/room/AddRoom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ExistingRooms from './components/room/ExistingRooms';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import CheckOut from './components/bookings/CheckOut';
import BookingSuccess from './components/bookings/BookingSuccess';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import { AuthProvider } from './components/auth/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element= {<Home/>}/>
            <Route path="/edit-room/:roomId" element= {<EditRoom/>}/>
            <Route path="/existing-rooms" element= {<ExistingRooms/>}/>
            <Route path="/add-rooms" element= {<AddRoom/>}/>
            <Route path="/book-room/:roomId" element= {<CheckOut/>}/>
            <Route path="/broswe-all-room" element= {<RoomListing/>}/>
            <Route path="/admin" element= {<Admin/>}/>
            <Route path="/booking-success" element= {<BookingSuccess/>}/>
            <Route path="/existing-bookings" element= {<Bookings/>}/>
            <Route path="/find-booking" element= {<FindBooking/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/register" element= {<Registration/>}/>
            <Route path="/profile" element= {<Profile/>}/>
          </Routes>
        </Router>
        <Footer/>
      </main>
    </AuthProvider>
  )
}

export default App
