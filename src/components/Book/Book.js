import React, { useContext, useState } from 'react';
import 'date-fns';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider, 
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button, Container } from '@material-ui/core'; 
import { UserContext } from '../../App';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

    const [selectedDate, setSelectedDate] =  useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
     

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkIn = date;
      setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOut = date;
      setSelectedDate(newDate);
      };
    
      const handleBooing = () =>{
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
   
    return (
        <div style={{textAlign: 'center'}}>
            <Container> 
            <h1>{loggedInUser.name} !Let's book a Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
 {/* <MuiPickersUtilsProvider utils={DateFnsUtils}  >
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker 
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check In date"
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Check Out Date"
          format="MM/dd/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
      <Button onClick={handleBooing} variant="contained" color="primary">Book Now</Button>
    </MuiPickersUtilsProvider> */}
    </Container>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;