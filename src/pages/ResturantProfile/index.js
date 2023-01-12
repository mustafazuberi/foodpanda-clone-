import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import "./style.css"

import { Modal } from 'antd'
import { TextField, InputLabel, Select, MenuItem, FormControl, IconButton, Button } from '@mui/material'


const Index = () => {
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


    return (
        <div>
            <Navbar />

            <div className="adItemDiv">
                <h1>Add Items In Your Resturant </h1>
                <button className='addItemBtn' data-bs-toggle="modal" data-bs-target="#loginDiv" data-bs-dismiss="modal" onClick={showModal}>Add Item</button>
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
                okButtonProps={{ disabled: false , className:'d-none'}}
                cancelButtonProps={{ disabled: true ,className:'d-none' }}
            >
                <div className="mt-4">
                    <TextField label="Item Name" type={'text'} placeholder={'e.g: Pizza'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Price" type={'number'} placeholder={'In PKR'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Description" type={'text'} placeholder={' Meat can be smoky, spicy, tender, juicy, or aged.'} variant="outlined" size='small' className='addItemModalInp' />
                </div>
                <div className="inpDivModalAddItem">
                    <TextField label="Item Serving Size" type={'text'} placeholder={'Amount of Food .'} variant="outlined" size='small' className='addItemModalInp' />
                </div>

                <div className="inpDivModalAddItem">
                    <FormControl className='addItemModalInp' >
                        <InputLabel >Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="restCountry"
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
                <button className="createItemBtn mt-4">Create Item</button>

            </Modal>

            {/*  */}



        </div>
    )
}

export default Index


