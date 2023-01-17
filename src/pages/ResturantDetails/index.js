import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, db, getDoc, getDocs, collection, swal, setDoc } from '../../config/firebase'
import Navbar from '../../components/Navbar'
import FooterResturant from '../../components/FooterResturant'
import "./style.css"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'antd'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"
import { useSelector } from 'react-redux'

const Index = () => {
    const userData = useSelector(state => state.myAuth)

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    // For Modal
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
        getLocation()
    };
    const handleOk = (e) => {
        console.log(e);
        setOpen(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setOpen(false);
    };


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("Geo Location not supported in your browser.")
        }
    }
    function showPosition(position) {
        // alert("Latitude: " + position.coords.latitude +
        //     "\nLongitude: " + position.coords.longitude);
        setUserLocation({ lat: position.coords.latitude, long: position.coords.longitude })
    }
    const showError = (error) => {
        if (error.code == error.PERMISSION_DENIED) {
            console.log(error.message);
            swal("Sorry! We cannnot place order , Allow accessing your location to continue");
            setOpen(false);

        } else if (error.code == error.POSITION_UNAVAILABLE) {
            swal("Order Not Place", "Position Unavailable", "error");
            setOpen(false);
        }
    }



    const { detailRestId } = useParams()
    // console.log(detailRestId)

    let [restDetail, setRestDetail] = useState("")
    let [resturantItems, setResturantItems] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0)
        const getProfileDetails = async () => {
            const docRef = doc(db, "Resturants", `${detailRestId}`)
            const data = await getDoc(docRef)
            setRestDetail(data.data())
        }
        getProfileDetails()


        const gettingMyResturantItems = async () => {
            const querySnapshot = await getDocs(collection(db, "Resturants", `${detailRestId}`, "myResturantItems"))
            const myResturantItems = []
            querySnapshot.forEach((doc) => {
                myResturantItems.push({ id: doc.id, ...doc.data() })
            })
            setResturantItems(myResturantItems)
        }
        gettingMyResturantItems()

    }, [])
    // console.log(restDetail)
    // console.log(resturantItems)




    const [userLocation, setUserLocation] = useState('')
    const [dashboardItems, setDashboardItems] = useState([])
    const [userDashboardTotal, setUserDashboardTotal] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState("")
    const [orderName, setOrderName] = useState('')
    const [orderPhone, setOrderPhone] = useState('')


    const addToDashboard = (item) => {
        setDashboardItems([...dashboardItems, item])
        setUserDashboardTotal(userDashboardTotal + (+item.itemPrice))
        swal("Added To Dashboard")
    }
    const deleteFromDashboard = (item) => {
        setDashboardItems(dashboardItems.filter((e) => e.id != item.id))
        setUserDashboardTotal(userDashboardTotal - (+item.itemPrice))
    }
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
    const handleOrderName = (e) => {
        setOrderName(e.target.value)
    }
    const handleOrderPhone = (e) => {
        setOrderPhone(e.target.value)
    }
    const placeOrder = async () => {
        //    validating
        if (orderName.length == 0) {
            swal("Enter Name Please")
            return
        }
        if (orderPhone.length < 11 || orderPhone.length > 11) {
            swal("Phone number digits should be 11")
            return
        }
        if (paymentMethod.length == 0) {
            swal("Select Payment Pethod please.")
            return
        }
        if (dashboardItems.length == 0) {
            swal("No items selected to place order. Please Select Items")
            return
        }
        ////////////////////////////////
        const dashboardItem = {
            userId: userData.currentUser.uid,
            userEmail: userData.currentUser.email,
            userName: orderName,
            userPhone: orderPhone,
            status: "pending",
            now: { time: new Date().toTimeString(), data: new Date().toDateString() },
            paymentMethod: paymentMethod,
            userLocation: userLocation,
            userOrder: [...dashboardItems],
            orderPrice: userDashboardTotal
        }
        // saving in resturant dashboard
        const itemId = userData.currentUser.uid + Date.now()
        const dashboardItemRef = doc(db, "Resturants", `${detailRestId}`, "DashboardItems", `${itemId}`);
        await setDoc(dashboardItemRef, dashboardItem);

        // saving in user dashboard
        const userDashboardRef = doc(db, "users", `${userData.currentUser.uid}`, "DashboardItems", `${itemId}`);
        await setDoc(userDashboardRef, dashboardItem);

        swal("Order Placed Successfully.")
    }





    return (
        <>
            <Navbar />



            <div className="restCover" style={{ backgroundImage: `url(${restDetail.restImage})` }}>

            </div>

            <div className="dashBtn"><button onClick={showModal}>Dashboard</button></div>
            <h2 className='restHeading'>{restDetail.restName} <span>Items</span></h2>

            <div className="allItems">
                {
                    resturantItems.length > 0 ? resturantItems.map((item, index) => {
                        return <div className="item" key={index}>
                            <div className="itemImg"><img src={item.itemImage} alt="" /></div>
                            <div className="itemDetail">
                                <h4>{item.itemName}</h4>
                                <p className="descItem">{item.itemDescription}</p>
                                <h4>RS {item.itemPrice}</h4>
                                <p style={{ color: "grey" }}>Serving Size : {item.itemServingSize}
                                    <span style={{ marginLeft: "10%", color: "black" }}></span></p>
                            </div>
                            <div>
                                <LocalHospitalIcon style={{ color: "#d12b73", fontSize: "35px", cursor: "pointer" }} onClick={() => addToDashboard(item)} />
                            </div>
                        </div>
                    }) : <h2 style={{ paddingTop: "30px" }}>No Items Added By owner</h2>
                }

            </div>











            <Modal
                title="Add Item in Your Resturant"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: false, className: 'd-none' }}
                cancelButtonProps={{ disabled: true, className: 'd-none' }}
            >
                {
                    dashboardItems.length > 0 ? dashboardItems.map((item, index) => {
                        return <div className="dashBoardItem" key={index}>
                            <div className="name">
                                <h6 style={{ color: "#d12b73" }}>{item.itemName}</h6>
                                <h6>$${item.itemCategory}</h6>
                            </div>
                            <div className="price">
                                <h6>Rs {item.itemPrice}</h6>
                                <h6><DeleteIcon style={{ cursor: "pointer" }} onClick={() => deleteFromDashboard(item)} /></h6>
                            </div>

                        </div>
                    }) : <h5 style={{ paddingTop: "20px" }}>No items added</h5>

                }
                <br /><br />

                <h6 style={{ float: "right", marginRight: "30px", marginTop: "10px" }}>Total Price : Rs {userDashboardTotal}</h6>


                <div className="orderFormDiv">
                    <TextField size='small' label="Enter Your Name" value={orderName} onChange={handleOrderName} type="name" variant="outlined" />
                </div>
                <div className="orderFormDiv">
                    <TextField size='small' label="Enter Your Phone Number" value={orderPhone} onChange={handleOrderPhone} type="number" variant="outlined" />
                </div>
                <div className="orderFormDiv">
                    <FormControl style={{ width: "210px" }} size='small'>
                        <InputLabel >Payment Method</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="restCountry"
                            value={paymentMethod}
                            name='Country'
                            label="Country"
                            onChange={handlePaymentMethod}
                        >
                            <MenuItem value={'On Delivery'}>On Delivery</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <button className="order my-3" onClick={placeOrder} >Place Order</button>

            </Modal>

            <br /><br /><br /><br />
            <FooterResturant />
        </>
    )
}

export default Index