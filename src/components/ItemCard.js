import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';

import { Modal } from 'antd'
import { TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'

import image from "./partner-bg.png"
import { doc, db, deleteDoc, swal, getDocs, collection, getDoc, setDoc } from "./../config/firebase"
import { useSelector } from 'react-redux';
import items from './../pages/SignupResturant'
import Swal from 'sweetalert2';

export default function MediaCard(props) {
    const userData = useSelector(state => state.myAuth)


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




    let [itemIdToEdit, setItemIdToEdit] = useState('')
    let [itemNameToEdit, setItemNameToEdit] = useState('')
    let [itemPriceToEdit, setItemPriceToEdit] = useState('')
    let [itemDescriptionToEdit, setItemDescriptionToEdit] = useState('')
    let [itemServingSizeToEdit, setItemServingSizeToEdit] = useState('')
    let [itemCategoryToEdit, setItemCategoryToEdit] = useState('')
    let [itemImageToEdit, setItemImageToEdit] = useState('')
    const itemNameToEditHandler = (e) => {
        setItemNameToEdit(e.target.value)
    }
    const itemPriceToEditHandler = (e) => {
        setItemPriceToEdit(e.target.value)
    }
    const itemDescriptionToEditHandler = (e) => {
        setItemDescriptionToEdit(e.target.value)
    }
    const itemServingSizeToEditHandler = (e) => {
        setItemServingSizeToEdit(e.target.value)
    }
    const itemCategoryToEditHandler = (e) => {
        setItemCategoryToEdit(e.target.value)
    }
    const openModelAndSaveIdToEdit = async (id) => {
        setItemIdToEdit(id)
        showModal()
        console.log(id)
        const docRef = doc(db, "Resturants", `${userData.currentUser.uid}`, "myResturantItems", `${id}`);
        const currentItemData = await getDoc(docRef)
        setItemNameToEdit(currentItemData.data().itemName)
        setItemPriceToEdit(currentItemData.data().itemPrice)
        setItemDescriptionToEdit(currentItemData.data().itemDescription)
        setItemServingSizeToEdit(currentItemData.data().itemServingSize)
        setItemCategoryToEdit(currentItemData.data().itemCategory)
        setItemImageToEdit(currentItemData.data().itemImage)

    }


    const editItem = async () => {
        let dataToUpdate = {
            itemName: itemNameToEdit,
            itemPrice: itemPriceToEdit,
            itemDescription: itemDescriptionToEdit,
            itemServingSize: itemServingSizeToEdit,
            itemCategory: itemCategoryToEdit,
            itemImage: itemImageToEdit
        }
        console.log(dataToUpdate)
        const myItemRef = doc(db, "Resturants", `${userData.currentUser.uid}`, "myResturantItems", `${itemIdToEdit}`);
        await setDoc(myItemRef, dataToUpdate);
        await Swal.fire({
            title: 'Item updated successfully.',
            width: 600,
            padding: '3em',
            color: '#e21b70',
            backdrop: `
            #ffeaf2
            left top
            no-repeat
            `
        })
    }





    return (

        <>
            <Card sx={{ minWidth: 270, maxWidth: 300 }} className="mt-5">
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.itemDetails.itemImage}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.itemDetails.itemName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.itemDetails.itemDescription}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" style={{ backgroundColor: "#e21b70", color: "white" }} onClick={() => openModelAndSaveIdToEdit(props.itemDetails.id)}>Edit</Button>
                    <Button size="large" style={{ backgroundColor: "#e21b70", color: "white" }} onClick={() => props.delete(props.itemDetails.id)}>Delete</Button>
                    <span className="price">Price : {props.itemDetails.itemPrice} Rs</span>
                </CardActions>
            </Card>









            <Modal
                title="Edit your resturant item"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: false, className: 'd-none' }}
                cancelButtonProps={{ disabled: true, className: 'd-none' }}
            >
                <div className="mt-4">
                    <TextField label="Item Name" value={itemNameToEdit} onChange={itemNameToEditHandler} type={'text'} id='itemName' placeholder={'e.g: Pizza'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Price" type={'number'} value={itemPriceToEdit} onChange={itemPriceToEditHandler} id='itemPrice' placeholder={'In PKR'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Description" id='itemDescription' value={itemDescriptionToEdit} onChange={itemDescriptionToEditHandler} type={'text'} placeholder={' Meat can be smoky, spicy, tender, juicy, or aged.'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Serving Size" id='itemServingSize' type={'text'} value={itemServingSizeToEdit} onChange={itemServingSizeToEditHandler} placeholder={'Amount of Food .'} variant="outlined" size='small' className='addItemModalInp' />
                </div>

                <div className="inpDivModalAddItem">
                    <FormControl className='addItemModalInp' >
                        <InputLabel >Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="itemCategory"
                            value={itemCategoryToEdit}
                            name='Country'
                            label="Category"
                            onChange={itemCategoryToEditHandler}
                            size={'small'}

                        >
                            <MenuItem value={'Pakistani'} >Pakistani</MenuItem>
                            <MenuItem value={'Chinese'}>Chinese</MenuItem>
                            <MenuItem value={'Indian'}>Indian</MenuItem>
                            <MenuItem value={'Arabian'}>Arabian</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <button className="createItemBtn mt-4" onClick={editItem}>Edit Item</button>
            </Modal>
        </>
    );
}
