import React, { useState } from 'react'
import './style.css'

import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

import { getStorage, ref, uploadBytes, getDownloadURL, storage, setDoc, doc, db, auth, createUserWithEmailAndPassword } from './../../config/firebase'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import { TextField, InputLabel, Select, MenuItem, FormControl, IconButton, Button } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const LoginResturant = () => {

  const navigate = useNavigate()
  // cities of pakistan Array
  const citiesArray = ["Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"]

  let [country, setCountry] = useState("")
  let [city, setCity] = useState("")

  const handleChangeCountry = (e) => {
    setCountry(e.target.value)
  }
  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }


  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`)
    const snapshot = await uploadBytes(storageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    return url
  }
  const createResturant = async () => {
    try {
      // const restImage = document.getElementById("restImage").value
      const restCountry = country
      const restCity = city
      const restName = document.getElementById("restName").value
      const restEmail = document.getElementById("restEmail").value
      const restPsw = document.getElementById("restPsw").value
      const restPhoneNumber = document.getElementById("restPhoneNumber").value
      const restImage = await uploadImage(document.getElementById("restImage").value)

      let resturantData = { restCountry, restCity, restName, restEmail, restPhoneNumber, restPhoneNumber, restImage }
      // Validating
      for (let a in resturantData) {
        if (resturantData[a].length === 0) {
          Swal.fire('Please fill all Inputs!')
          return
        }
      }
      if (restPhoneNumber.length < 11) {
        Swal.fire('Phone Number digits are less than 11!')
        return
      }
      // 
      await createUserWithEmailAndPassword(auth, restEmail, restPsw)
      await setDoc(doc(db, "Resturants", auth.currentUser.uid), resturantData);
      Swal.fire({
        title: 'Congrats! Account Created Successfully.',
        width: 600,
        padding: '3em',
        color: '#e21b70',
        backdrop: `#ffeaf2 left top no-repeat`
      })
      navigate('/loginWithEmail')
      window.scrollTo(0, 0)

    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message,
      })
    }
  }



  return (
    <div >
      <div className='resturanFormMain'>


        <div className="partnerwithUsSection">
          <h1>Partner with us</h1>
          <p>We’re hungry for the best things in life: bringing the best food and redefining the shopping experience to our customers.
          </p>
          <p>foodpanda is multi-national, fast-growing business that maintains its appeal as localised service with community ambition.
          </p>
        </div>

        <div className="resturanFormSection">
          <h2>Interested? Fill in the form below to become our partner and increase your revenue!</h2>



          <div className="restFormInpDiv">
            <TextField id="restName" label="Resturant Name" variant="outlined" className='restFormInp' />
          </div>



          <div className="restFormInpDiv">
            <TextField id="restEmail" label="Email" variant="outlined" type={'email'} className='restFormInp' />
          </div>



          <div className="restFormInpDiv">
            <TextField id="restPsw" label="Password" type={'password'} variant="outlined" className='restFormInp' />
          </div>



          <div className="restFormInpDiv">
            <TextField id="restPhoneNumber" label="Phone Number" type={'number'} variant="outlined" className='restFormInp' />
          </div>




          {/* selector City*/}
          <FormControl style={{ width: "90%", left: '5%', top: "40px" }}>
            <InputLabel >City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="restCity"
              value={city}
              name='city'
              label="Age"
              onChange={handleChangeCity}
            >
              {citiesArray.map((item, index) => {
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              })}

            </Select>
          </FormControl>



          {/* Country */}
          <FormControl style={{ width: "90%", left: '5%', top: "80px" }}>
            <InputLabel >Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="restCountry"
              value={country}
              name='Country'
              label="Country"
              onChange={handleChangeCountry}
            >
              <MenuItem value={'Pakistan'}>Pakistan</MenuItem>
            </Select>
          </FormControl>



          {/* upload image btn */}
          <div className="restFormInpDiv" style={{ marginTop: '110px' }}>
            <Button variant="contained" component="label">
              Upload Resturant Image
              <input hidden accept="image/*" multiple type="file" id='restImage' />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </div>
          <button className="restSubmit" onClick={createResturant}>Submit</button>
        </div>

      </div>


      <div className="restPageFooter">
        <div className="footerLeft">
          <div className="restFooterLogo">
            <img src="https://partner.foodpanda.pk/resource/1669205672000/FoodpandaResource/FoodpandaResource/images/logo-foodpanda.svg"
              style={{ width: "140px" }} alt="" />
          </div>
          <div className="restFooterTerms">
            <h2>Terms and Conditions</h2>
          </div>
          <div className="restFooterProvacy">
            <h2>Privacy Policy</h2>
          </div>
        </div>

        <div className="footerRight">
          <h6>Social</h6>
          <FacebookIcon sx={{ fontSize: "45px", marginRight: '10px' }} />
          <InstagramIcon sx={{ fontSize: "45px", marginRight: '10px' }} />
          <TwitterIcon sx={{ fontSize: "45px", marginRight: '10px' }} />
        </div>
      </div>


    </div>
  )
}

export default LoginResturant






