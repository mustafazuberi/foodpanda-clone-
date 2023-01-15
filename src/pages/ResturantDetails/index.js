import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, db, getDoc, } from '../../config/firebase'
import Navbar from '../../components/Navbar'
const Index = () => {
    const { detailRestId } = useParams()
    console.log(detailRestId)

    let [restDetail, setRestDetail] = useState("")
    useEffect(() => {
        const getProfileDetails = async () => {
            const docRef = doc(db, "Resturants", `${detailRestId}`)
            const data = await getDoc(docRef)
            setRestDetail(data.data())
        }
        getProfileDetails()

    }, [])
    
    console.log(restDetail)
    return (
        <>
            <Navbar />
            <br /><br /><br /><br /><br />
            <div>Resturant Details</div>
        </>
    )
}

export default Index