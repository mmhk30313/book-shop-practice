import React, { useContext, useRef } from 'react';
import { UserContext } from '../../App';
import './OrderProceed.css';
const OrderProceed = () => {
    const locationRef = useRef();
    const fromDateRef = useRef();
    const mobileRef = useRef();
    const toDateRef = useRef();
    const dateRef = useRef();
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders] = useContext(UserContext);
    // console.log(userBooks);
    function setUserData(){
        // console.log(loggedInUser.email);
        fetch(`http://localhost:5000/delete/user-books/email?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data){
                setUserBooks([]);
            }
        })

        fetch('http://localhost:5000/all-users-books')
        .then(res => res.json())
        .then(data => setAllUsersBooks(data))
    }

    let date = new Date();
    date.setHours( date.getHours() + 2 );
    let calFTime = date.getHours();
    let fTime = ( calFTime >= 12 ? ((calFTime % 12) + 12) : ( calFTime <10 ? `0${calFTime}` : calFTime) ) + ":00 " ;
    let calToTime = calFTime + 2;
    let tTime = ( calToTime >= 12 ? ((calToTime % 12) + 12) : ( calToTime <10 ? `0${calToTime}` : calToTime) ) + ":00 " ;
    let fromTime = calFTime;
    let toTime = calToTime;
    fromTime = ( calFTime >= 12 ? ((calFTime % 12) === 0 ? 12 : (calFTime  % 12)) : ( calFTime < 10 ? `0${calFTime}` : calFTime) ) + ":00 " + `${calFTime < 12 ? "AM" : "PM"}`;
    toTime = ( calToTime >= 12 ? ((calToTime % 12) === 0 ? 12 : (calToTime % 12)) : (calToTime < 10 ? `0${calToTime}` : calToTime) ) + ":00 " + `${calToTime < 12 ? "AM" : "PM"}`;
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(evt.target.location.value, ' - ', evt.target.mobile.value, " - ", evt.target.date.value, " - ", evt.target.fromTime.value, ' - ', evt.target.toTime.value)

        const orders = {
            location: evt.target.location.value,
            mobile: evt.target.mobile.value,
            fromTime: evt.target.fromTime.value,
            toTime: evt.target.toTime.value,
            userBooks: userBooks,
            userEmail: loggedInUser.email
        }

        fetch('http://localhost:5000/orders', {
            method: "POST",
            body: JSON.stringify(orders),
             headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // locationRef.current.value = null;
            // fromDateRef.current.value = null;
            // mobileRef.current.value = null;
            // toDateRef.current.value = null;
            // dateRef.current.value = null;
            setUserOrders(userOrders);
            setUserData();

        })
        .catch(err => console.log(err, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks))
        // console.log(userOrders);
        // evt.stopPropagation();
    }
    return (
        <div className="w-100 mx-auto my-4">
            <div className="p-3 shadow bg-light card order-proceed-from mx-auto justify-content-center">
                {
                    userBooks.length !== 0 
                    ? <>
                        <h5 className='font-weight-bold'>Enter Your Details:</h5>
                        <form  onSubmit={handleSubmit} id="checkOutForm">
                            <div className="form-group">
                                <label htmlFor="location"></label>
                                <textarea ref={locationRef}  name="location" cols="15" rows="2" className='form-control' id="location" placeholder='@address' required/>    
                            </div>
                            <div className="from-group">
                                <label htmlFor="mobile">Mobile Number</label>
                                <input ref={mobileRef} name="mobile"type="tel" name="mobile" id="mobile" className="form-control" placeholder="+880" required/>
                            </div>
                            <div className="from-group mt-2">
                                <label htmlFor="date">Date</label>
                                <input ref={dateRef} type="date" name="date" id="date" className="form-control" placeholder="date" required/>
                            </div>
                            <p className="mt-3 mb-1">Time</p>
                            <div className="row w-100 mx-auto">
                                <div className="col-md-5 col-sm-12 from-group">
                                    <div className="row">
                                        <input ref={fromDateRef} type="time" name="fromTime" id="time" className="form-control col-md-10" placeholder="time" min={"09:00"} max={fTime} required/>
                                        <span className="validity col-md-2 d-flex align-items-center justify-content-center"></span>
                                    </div>
                                </div>
                                <p className="text-info text-center col-md-2 d-flex justify-content-center align-items-end mt-2">To</p>
                                <div className="col-md-5 col-sm-12 from-group">
                                    <div className="row">
                                        <input ref={toDateRef} type="time" name="toTime" id="time" className="form-control col-md-10" placeholder="time" min={tTime} max="23:00" required/>
                                        <span className="validity col-md-2 d-flex align-items-center justify-content-center"></span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-danger order-time my-2 text-center"> ORDER WILL BE DELIVERED WITHIN <span className="text-success">{ fromTime }</span> to <span className="text-success">{ toTime }</span> ON TODAY</p>
                        </form>
                        <div className="d-flex justify-content-center my-3">
                            <button type="submit" form="checkOutForm" className="btn btn-success">CHECKOUT PROCEED</button>
                        </div>
                    </>
                    : <div className="p-5">
                        <h1 className="text-center text-danger">Sorry!!! Your order is not available</h1>
                        <h3 className="text-center text-info">Please go to the home page to order first</h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default OrderProceed;