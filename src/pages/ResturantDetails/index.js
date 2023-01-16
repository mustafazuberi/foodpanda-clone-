import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, db, getDoc, getDocs, collection, swal } from '../../config/firebase'
import Navbar from '../../components/Navbar'
import FooterResturant from '../../components/FooterResturant'
import "./style.css"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'antd'


import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"
import { useSelector } from 'react-redux'

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { sendUserDashboardItems } = bindActionCreators(actionCreators, dispatch)
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
    const addToDashboard = (item) => {
        setDashboardItems([...dashboardItems, item])
    }







    return (
        <>
            <Navbar />



            <div className="restCover" style={{ backgroundImage: `url(${restDetail.restImage})` }}>

            </div>

            <div className="dashBtn"><button onClick={showModal}>Dashboard</button></div>

            <div className="allItems">
                {
                    resturantItems.map((item, index) => {
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
                    })
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
                    dashboardItems.map((item, index) => {
                        return <div className="dashBoardItem" key={index}>
                            <div className="name">
                                <h6 style={{color:"#d12b73"}}>{item.itemName}</h6>
                                <h6>$${item.itemCategory}</h6>
                            </div>
                            <div className="price">
                                <h6>Rs {item.itemPrice}</h6>
                                <h6><DeleteIcon/></h6>
                            </div>

                        </div>
                    })
                }
            </Modal>



            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <FooterResturant />
        </>
    )
}

export default Index