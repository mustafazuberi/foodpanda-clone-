import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import FooterResturant from '../../components/FooterResturant';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getDoc, doc, db, setDoc, swal, ref, storage, getDownloadURL, uploadBytes } from '../../config/firebase';
import { useSelector } from 'react-redux';

import ScrollToTop from "react-scroll-to-top";

import "./style.css"

const Index = () => {
    const citiesArray = ["Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"]




    const uploadImage = async (image) => {
        const storageRef = ref(storage, `images/${image.name}`)
        const snapshot = await uploadBytes(storageRef, image)
        const url = await getDownloadURL(snapshot.ref)
        return url
    }
    const [restName, setRestName] = useState("")
    const [restPhoneNumber, setRestPhoneNumber] = useState("")
    const [restDeliveryCharges, setRestDeliveryCharges] = useState("")
    const [restImage, setRestImage] = useState("")
    const [restCity, setRestCity] = useState("")
    const [restObj, setRestObj] = useState("")

    useEffect(() => {
        const getProfileDetails = async () => {
            const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`)
            const data = await getDoc(docRef)
            setRestObj(data.data())
            setRestName(data.data().restName)
            setRestCity(data.data().restCity)
            setRestPhoneNumber(data.data().restPhoneNumber)
            setRestImage(data.data().restImage)
            if (data.data().restDeliveryCharges) {
                setRestDeliveryCharges(data.data().restDeliveryCharges)
            }
        }
        getProfileDetails()
    }, [])

    let [nameUpdateBtn, setNameUpdateBtn] = useState(true)
    let [phoneNumberUpdateBtn, setPhoneNumberUpdateBtn] = useState(true)
    let [deliveryChargesUpdateBtn, setDeliveryChargesUpdateBtn] = useState(true)
    let [imageUpdateBtn, setImageUpdateBtn] = useState(true)
    let [cityUpdateBtn, setCityUpdateBtn] = useState(true)
    const nameChangeHandler = (e) => {
        setRestName(e.target.value)
        setNameUpdateBtn(false)
    }
    const phoneNumberChangeHandler = (e) => {
        setRestPhoneNumber(e.target.value)
        setPhoneNumberUpdateBtn(false)
    }

    const deliveryChargesChangeHandler = (e) => {
        setRestDeliveryCharges(e.target.value)
        setDeliveryChargesUpdateBtn(false)
    }
    const imageChangeHandler = (e) => {
        restDeliveryCharges(e.target.value)
        setDeliveryChargesUpdateBtn(false)
    }
    const handleChangeCity = (e) => {
        setCityUpdateBtn(false)
        setRestCity(e.target.value)
    }



    const imageHandler = async (e) => {
        setImageUpdateBtn(false)
        const url = await uploadImage(e.target.files[0])

        setRestImage(url)

    }
    const updateImage = async (e) => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`)
        await setDoc(docRef, { ...restObj, restImage })
        swal("Image Updated Successfully")
    }

    const userData = useSelector(state => state.myAuth)

    const updateResturantName = async () => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`)
        await setDoc(docRef, { ...restObj, restName })
        swal("Returant name updated Successfully")
    }
    const updateResturantPhoneNumber = async () => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`)
        await setDoc(docRef, { ...restObj, restPhoneNumber })
        swal("Returant phone number updated Successfully")
    }
    const updateResturantCity = async () => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`)
        await setDoc(docRef, { ...restObj, restCity })
        swal("Returant city updated Successfully")
    }

    const updateRestDeliveryCharges = async () => {
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`)
        await setDoc(docRef, { ...restObj, restDeliveryCharges })
        swal("Returant dellivery added Successfully")
    }


   

    return (
        <>
            <Navbar />

            <div className="profileDetailsPage">

                <div className="updateInpDivs">
                    <TextField id="standard-basic" onChange={nameChangeHandler} value={restName} label="Update Resturant Name" variant="standard" />
                    <button className={nameUpdateBtn ? "pencilDiv" : "pencilDiv btnPink"} disabled={nameUpdateBtn} onClick={updateResturantName} ><CreateRoundedIcon fontSize='large' className='pencilIcons' /></button>
                </div>
                <div className="updateInpDivs">
                    <TextField id="standard-basic" onChange={phoneNumberChangeHandler} label="Update Phone Number" value={restPhoneNumber} type={'number'} variant="standard" />
                    <button className={phoneNumberUpdateBtn ? "pencilDiv" : "pencilDiv btnPink"} disabled={phoneNumberUpdateBtn} onClick={updateResturantPhoneNumber}><CreateRoundedIcon fontSize='large' className='pencilIcons' /></button>
                </div>
                <div className="updateInpDivs">
                    <TextField id="standard-basic" onChange={deliveryChargesChangeHandler} label="Add Delivery Charges" value={restDeliveryCharges} type={'number'} placeholder='In PKR' variant="standard" />
                    <button className={deliveryChargesUpdateBtn ? "pencilDiv" : "pencilDiv btnPink"} disabled={deliveryChargesUpdateBtn} onClick={updateRestDeliveryCharges}><CreateRoundedIcon fontSize='large' className='pencilIcons' /></button>
                </div>
                <div className="updateInpDivs" >
                    {/* selector City*/}
                    <FormControl style={{ width: "180px" }} >
                        <InputLabel >City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="restCity"
                            value={restCity}
                            name='city'
                            label="Age"
                            onChange={handleChangeCity}
                        >
                            {citiesArray.map((item, index) => {
                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                            })}

                        </Select>
                    </FormControl>
                    <button className={cityUpdateBtn ? "pencilDiv" : "pencilDiv btnPink"} disabled={cityUpdateBtn} onClick={updateResturantCity}><CreateRoundedIcon fontSize='large' className='pencilIcons' /></button>

                </div>
                <div className="updateInpDivs updateImageDiv">
                    <h5>Update Resturant Image</h5>
                    <div className="restImageDivProfile"><img src={restImage} alt="" style={{ width: "100%", height: "100%", borderRadius: "15px " }} /></div>
                    <div className="profUpdateDiv">
                        <input className="form-control" onChange={imageHandler} onSelect={imageChangeHandler} type="file" id="imageToUpdate" />
                        <Button variant="contained" disabled={imageUpdateBtn} onClick={updateImage} style={{ backgroundColor: "#e21b70" }}>Update</Button>
                    </div>

                </div>

            </div>
            <br /><br /><br /><br /><br /><br />
            <FooterResturant />



        </>
    )
}

export default Index