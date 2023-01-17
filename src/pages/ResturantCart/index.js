import React, { useEffect, useState } from 'react'
import "./style.css"
import Navbar from '../../components/Navbar'

import { getDocs, collection, db, doc, setDoc, swal } from '../../config/firebase'

import { useSelector } from 'react-redux'

const Index = () => {

    // I maked these states to pass in useEffect , takay data dubara ajaye load hookr or accept wala usi ki tab me chala jaye
    const [acceptOrders, setAcceptedOrders] = useState([])
    const [deliveredOrders, setDeliveredOrders] = useState([])
    const [rejectedOrders, setRejectededOrders] = useState([])

    const acceptOrder = async (item) => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`, "DashboardItems", `${item.id}`)
        await setDoc(docRef, { ...item, status: "accepted" })
        const docRefUserCart = doc(db, "users", `${item.userId}`, "DashboardItems", `${item.id}`)
        await setDoc(docRefUserCart, { ...item, status: "accepted" })
        setAcceptedOrders("for re-rendereing")
        swal("Order Accepted!")
    }


    const deliverOrder = async (item) => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`, "DashboardItems", `${item.id}`)
        await setDoc(docRef, { ...item, status: "deliver" })
        const docRefUserCart = doc(db, "users", `${item.userId}`, "DashboardItems", `${item.id}`)
        await setDoc(docRefUserCart, { ...item, status: "deliver" })
        swal("Order Delivered!")

        setDeliveredOrders("for re-rendereing")
    }
    const rejectOrder = async (item) => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`, "DashboardItems", `${item.id}`)
        await setDoc(docRef, { ...item, status: "rejected" })
        const docRefUserCart = doc(db, "users", `${item.userId}`, "DashboardItems", `${item.id}`)
        await setDoc(docRefUserCart, { ...item, status: "rejected" })
        setDeliveredOrders("for re-rendereing")
        swal("Order Rejected!")
    }














    const userData = useSelector(state => state.myAuth)


    const [resturantOrders, setResturantOrders] = useState([])
    useEffect(() => {
        const getUserOrders = async () => {
            const querySnapshot = await getDocs(collection(db, "Resturants", `${userData.currentUser.uid}`, "DashboardItems"))
            const orders = []
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() })
            })
            setResturantOrders(orders)
        }
        getUserOrders()
    }, [acceptOrders,deliveredOrders,rejectedOrders])
    console.log(resturantOrders)



    return (
        <>
            <Navbar />



            <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link active"
                        id="ex3-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex3-tabs-1"
                        role="tab"
                        aria-controls="ex3-tabs-1"
                        aria-selected="true"
                    >Orders</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        id="ex3-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex3-tabs-2"
                        role="tab"
                        aria-controls="ex3-tabs-2"
                        aria-selected="false"
                    >Accepted</a
                    >
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        id="ex3-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex3-tabs-3"
                        role="tab"
                        aria-controls="ex3-tabs-3"
                        aria-selected="false"
                    >Delivered</a
                    >
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        id="ex4-tab-4"
                        data-mdb-toggle="tab"
                        href="#ex4-tabs-4"
                        role="tab"
                        aria-controls="ex4-tabs-4"
                        aria-selected="false"
                    >Rejected</a
                    >
                </li>
            </ul>

            <div className="tab-content" id="ex2-content">
                <div
                    className="tab-pane fade show active"
                    id="ex3-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex3-tab-1"
                >
                    {resturantOrders.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'pending') {
                            // console.log(orders)
                            let mapUrl = `https://maps.google.com/maps?q=${item.userLocation.lat},${item.userLocation.long}&hl=es;&output=embed`
                            return <div className="resturantOrder" key={index}>
                                <div style={{ padding: "10px 0px 0px 70px" }}>
                                    <h5 style={{ color: "black", textDecoration: "underLine" }}>ORDER # {index + 1}</h5>
                                    <h5 style={{ color: "#d12b73" }}>ITEMS</h5>
                                    {
                                        orders.map((e, index) => {
                                            return <h6 key={index}>{index + 1 + ") " + e.itemName + "  " + `(Rs : ${e.itemPrice})`}</h6>
                                        })
                                    }
                                    <h6><span style={{ color: "#d12b73" }}>Time</span> : {item.now.time}</h6>
                                    <h6><span style={{ color: "#d12b73" }}>Date</span> : {item.now.data}</h6>
                                    <div style={{ padding: "5px", borderTop: "1px solid grey", display: "inline-block", marginTop: "10px" }}>
                                        <span className="pnk">Total Price</span> : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                    </div>

                                    {/* <br />
                                <hr /> */}
                                </div>
                                <div className="customerDetail">
                                    <h4>Customer Details</h4>
                                    <h6> <span className="pnk">Name</span> : {item.userName}</h6>
                                    <h6><span className="pnk">Phone No</span>  : {item.userPhone}</h6>
                                    <h6><span className="pnk"> Payment Method</span>  : {item.paymentMethod}</h6>
                                    <div>
                                        <iframe src={mapUrl} className='map' height="200px" width="100%"></iframe>
                                    </div>


                                    <button className='acceptBtn' onClick={() => acceptOrder(item)}>Accept</button>
                                    <button className='rejectBtn' onClick={() => rejectOrder(item)}>Reject</button>
                                </div>

                            </div>

                        }
                    })}
                </div>


                <div
                    className="tab-pane fade"
                    id="ex3-tabs-2"
                    role="tabpanel"
                    aria-labelledby="ex3-tab-2"
                >
                    {resturantOrders.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'accepted') {
                            // console.log(orders)
                            let mapUrl = `https://maps.google.com/maps?q=${item.userLocation.lat},${item.userLocation.long}&hl=es;&output=embed`
                            return <div className="resturantOrder" key={index}>
                                <div style={{ padding: "10px 0px 0px 70px" }}>
                                    <h5 style={{ color: "black", textDecoration: "underLine" }}>ORDER # {index + 1}</h5>
                                    <h5 style={{ color: "#d12b73" }}>ITEMS</h5>
                                    {
                                        orders.map((e, index) => {
                                            return <h6 key={index}>{index + 1 + ") " + e.itemName + "  " + `(Rs : ${e.itemPrice})`}</h6>
                                        })
                                    }
                                    <h6><span style={{ color: "#d12b73" }}>Time</span> : {item.now.time}</h6>
                                    <h6><span style={{ color: "#d12b73" }}>Date</span> : {item.now.data}</h6>
                                    <div style={{ padding: "5px", borderTop: "1px solid grey", display: "inline-block", marginTop: "10px" }}>
                                        <span className="pnk">Total Price</span> : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                    </div>

                                    {/* <br />
                                <hr /> */}
                                </div>
                                <div className="customerDetail">
                                    <h4>Customer Details</h4>
                                    <h6> <span className="pnk">Name</span> : {item.userName}</h6>
                                    <h6><span className="pnk">Phone No</span>  : {item.userPhone}</h6>
                                    <h6><span className="pnk"> Payment Method</span>  : {item.paymentMethod}</h6>
                                    <div>
                                        <iframe src={mapUrl} className='map' height="200px" width="100%"></iframe>
                                    </div>


                                    <button className='acceptBtn' onClick={() => deliverOrder(item)}>Deliver</button>
                                </div>

                            </div>

                        }
                    })}
                </div>
                <div
                    className="tab-pane fade"
                    id="ex3-tabs-3"
                    role="tabpanel"
                    aria-labelledby="ex3-tab-3"
                >
                    {resturantOrders.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'deliver') {
                            // console.log(orders)
                            let mapUrl = `https://maps.google.com/maps?q=${item.userLocation.lat},${item.userLocation.long}&hl=es;&output=embed`
                            return <div className="resturantOrder" key={index}>
                                <div style={{ padding: "10px 0px 0px 70px" }}>
                                    <h5 style={{ color: "black", textDecoration: "underLine" }}>ORDER # {index + 1}</h5>
                                    <h5 style={{ color: "#d12b73" }}>ITEMS</h5>
                                    {
                                        orders.map((e, index) => {
                                            return <h6 key={index}>{index + 1 + ") " + e.itemName + "  " + `(Rs : ${e.itemPrice})`}</h6>
                                        })
                                    }
                                    <h6><span style={{ color: "#d12b73" }}>Time</span> : {item.now.time}</h6>
                                    <h6><span style={{ color: "#d12b73" }}>Date</span> : {item.now.data}</h6>
                                    <div style={{ padding: "5px", borderTop: "1px solid grey", display: "inline-block", marginTop: "10px" }}>
                                        <span className="pnk">Total Price</span> : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                    </div>

                                    {/* <br />
                                <hr /> */}
                                </div>
                                <div className="customerDetail">
                                    <h4>Customer Details</h4>
                                    <h6> <span className="pnk">Name</span> : {item.userName}</h6>
                                    <h6><span className="pnk">Phone No</span>  : {item.userPhone}</h6>
                                    <h6><span className="pnk"> Payment Method</span>  : {item.paymentMethod}</h6>
                                    <div>
                                        <iframe src={mapUrl} className='map' height="200px" width="100%"></iframe>
                                    </div>


                                </div>

                            </div>

                        }
                    })}
                </div>

                <div
                    className="tab-pane fade"
                    id="ex4-tabs-4"
                    role="tabpanel"
                    aria-labelledby="ex4-tab-4"
                >
                    {resturantOrders.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'rejected') {
                            // console.log(orders)
                            let mapUrl = `https://maps.google.com/maps?q=${item.userLocation.lat},${item.userLocation.long}&hl=es;&output=embed`
                            return <div className="resturantOrder" key={index}>
                                <div style={{ padding: "10px 0px 0px 70px" }}>
                                    <h5 style={{ color: "black", textDecoration: "underLine" }}>ORDER # {index + 1}</h5>
                                    <h5 style={{ color: "#d12b73" }}>ITEMS</h5>
                                    {
                                        orders.map((e, index) => {
                                            return <h6 key={index}>{index + 1 + ") " + e.itemName + "  " + `(Rs : ${e.itemPrice})`}</h6>
                                        })
                                    }
                                    <h6><span style={{ color: "#d12b73" }}>Time</span> : {item.now.time}</h6>
                                    <h6><span style={{ color: "#d12b73" }}>Date</span> : {item.now.data}</h6>
                                    <div style={{ padding: "5px", borderTop: "1px solid grey", display: "inline-block", marginTop: "10px" }}>
                                        <span className="pnk">Total Price</span> : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                    </div>

                                    {/* <br />
                                <hr /> */}
                                </div>
                                <div className="customerDetail">
                                    <h4>Customer Details</h4>
                                    <h6> <span className="pnk">Name</span> : {item.userName}</h6>
                                    <h6><span className="pnk">Phone No</span>  : {item.userPhone}</h6>
                                    <h6><span className="pnk"> Payment Method</span>  : {item.paymentMethod}</h6>
                                    <div>
                                        <iframe src={mapUrl} className='map' height="200px" width="100%"></iframe>
                                    </div>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>

        </>
    )
}

export default Index








