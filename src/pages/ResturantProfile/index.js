import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import "./style.css"

import { Modal } from 'antd'
import { TextField, InputLabel, Select, MenuItem, FormControl, IconButton, Button } from '@mui/material'

import { getDocs, storage, ref, uploadBytes, getDownloadURL, swal, doc, db, setDoc, DocRef, collection } from '../../config/firebase'
import { useSelector } from 'react-redux'

import ItemCard from './../../components/ItemCard'

const Index = () => {
    const userData = useSelector(state => state.myAuth)
    const [items,setItems] = useState([])
    useEffect(() => {
        const gettingMyResturantItems = async () => {
            const querySnapshot = await getDocs(collection(db, "Resturants", `${userData.currentUser.uid}`, "myResturantItems"))
            const myResturantItems = []
            querySnapshot.forEach((doc) => {
                myResturantItems.push({ id: doc.id, ...doc.data() })
            })
            setItems(myResturantItems)

        }
        gettingMyResturantItems()
    }, [])


    // For Modal
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = (e) => {
        console.log(e);
        setOpen(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setOpen(false);
    };
    //  
    let [category, setCategory] = useState("")
    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }







    const uploadImage = async (image) => {
        const storageRef = ref(storage, `images/${image.name}`)
        const snapshot = await uploadBytes(storageRef, image)
        const url = await getDownloadURL(snapshot.ref)
        return url
    }
    const createItem = async () => {
        const itemName = document.getElementById("itemName").value
        const itemPrice = document.getElementById("itemPrice").value
        const itemDescription = document.getElementById("itemDescription").value
        const itemServingSize = document.getElementById("itemServingSize").value
        const itemCategory = category
        if (!document.getElementById("itemImage").files[0]) {
            swal("Select Image to Create Item.")
            return
        }
        const itemImage = await uploadImage(document.getElementById("itemImage").files[0])

        const returantItem = { itemName, itemPrice, itemDescription, itemServingSize, itemCategory, itemImage }
        const itemId = userData.currentUser.uid + Date.now()
        const myItemRef = doc(db, "Resturants", `${userData.currentUser.uid}`, "myResturantItems", `${itemId}`);
        await setDoc(myItemRef, returantItem);
        console.log(itemName, itemPrice, itemDescription, itemServingSize, itemCategory, itemImage)
        alert("send")
    }





    return (
        <div>
            <Navbar />

            <div className="adItemDiv">
                <h1>Add Items In Your Resturant </h1>
                <button className='addItemBtn' onClick={showModal}>Add Item</button>
            </div>
            <div className="myResturantItems">
            {items.map((item,index)=>{
                return <ItemCard key={index} itemDetails = {item}/>
            })}
                {/* <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard /> */}
            </div>


            {/* Ant design Add Item Modal */}
            {/* <Button type="primary" onClick={showModal}>
                Open Modal with customized button props
            </Button> */}
            <Modal
                title="Add Item in Your Resturant"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: false, className: 'd-none' }}
                cancelButtonProps={{ disabled: true, className: 'd-none' }}
            >
                <div className="mt-4">
                    <TextField label="Item Name" type={'text'} id='itemName' placeholder={'e.g: Pizza'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Price" type={'number'} id='itemPrice' placeholder={'In PKR'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Description" id='itemDescription' type={'text'} placeholder={' Meat can be smoky, spicy, tender, juicy, or aged.'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Serving Size" id='itemServingSize' type={'text'} placeholder={'Amount of Food .'} variant="outlined" size='small' className='addItemModalInp' />
                </div>

                <div className="inpDivModalAddItem">
                    <FormControl className='addItemModalInp' >
                        <InputLabel >Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="itemCategory"
                            value={category}
                            name='Country'
                            label="Category"
                            onChange={handleChangeCategory}
                            size={'small'}

                        >
                            <MenuItem value={'Pakistani'} >Pakistani</MenuItem>
                            <MenuItem value={'Chinese'}>Chinese</MenuItem>
                            <MenuItem value={'Indian'}>Indian</MenuItem>
                            <MenuItem value={'Arabian'}>Arabian</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {/* upload image btn */}
                <div className="inpDivModalAddItem" >
                    <span className="uploadImageHeading">Upload Image</span>
                    <input className="form-control" type="file" id="itemImage" />
                </div>
                <button className="createItemBtn mt-4" onClick={createItem}>Create Item</button>
            </Modal>



        </div>
    )
}

export default Index


