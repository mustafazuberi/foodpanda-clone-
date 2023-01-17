import React, { useEffect, useState } from 'react'
import "./style.css"
import Navbar from '../../components/Navbar'
import { getDocs, collection, db } from '../../config/firebase'

import { useSelector } from 'react-redux'

const Index = () => {

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
    }, [])
    console.log(resturantOrders)




    return (
        <>
            <Navbar />

        </>
    )
}

export default Index