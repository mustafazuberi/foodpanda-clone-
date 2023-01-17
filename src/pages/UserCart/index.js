import React, { useEffect, useState } from 'react'
import "./style.css"
import Navbar from '../../components/Navbar'
import { getDocs, db, collection } from '../../config/firebase'
import { useSelector } from 'react-redux'

const Index = () => {
    const userData = useSelector(state => state.myAuth)

    let [userCartItems, setUserCartItems] = useState([])
    useEffect(() => {
        const getUserOrders = async () => {
            const querySnapshot = await getDocs(collection(db, "users", `${userData.currentUser.uid}`, "DashboardItems"))
            const cartItems = []
            querySnapshot.forEach((doc) => {
                cartItems.push({ id: doc.id, ...doc.data() })
            })
            setUserCartItems(cartItems)
        }
        getUserOrders()
    }, [])
    console.log(userCartItems)





    return (
        <>
            <Navbar />

            <br />

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
                    >Pending</a>
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
                    >On the way</a
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
                    {userCartItems.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'pending') {
                            // console.log(orders)
                            return <div key={index} style={{ padding: "10px 0px 0px 70px" }}>
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
                                    Total Price : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                </div>
                                <hr />
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
                    {userCartItems.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'on the way') {
                            // console.log(orders)
                            return <div key={index} style={{ padding: "10px 0px 0px 70px" }}>
                                <h5 style={{ color: "black", textDecoration: "underLine" }}>ORDER # {index + 1}</h5>
                                <h5 style={{ color: "#d12b73" }}>ITEMS</h5>
                                {
                                    orders.map((e, index) => {
                                        return <h6 key={index}>{index + 1 + ") " + e.itemName + "  " + `(Rs : ${e.itemPrice})`}</h6>
                                    })
                                }
                                <h6><span style={{ color: "#d12b73" }}>Time</span> : {item.now.time}</h6>
                                <h6><span style={{ color: "#d12b73" }}>Date</span> : {item.now.data}</h6>                                <div style={{ padding: "5px", borderTop: "1px solid grey", display: "inline-block", marginTop: "10px" }}>
                                    Total Price : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                </div>
                                <hr />
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
                    {userCartItems.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'deliver') {
                            // console.log(orders)
                            return <div key={index} style={{ padding: "10px 0px 0px 70px" }}>
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
                                    Total Price : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                </div>
                                <hr />
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
                    {userCartItems.map((item, index) => {
                        let orders = item.userOrder
                        if (item.status === 'rejected') {
                            // console.log(orders)
                            return <div key={index} style={{ padding: "10px 0px 0px 70px" }}>
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
                                    Total Price : <h6 style={{ display: "inline", color: "black" }}>Rs {item.orderPrice}</h6>
                                </div>
                                <hr />
                            </div>

                        }
                    })}
                </div>
            </div>





        </>
    )
}

export default Index