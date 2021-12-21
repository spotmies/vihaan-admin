import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form'
// Material
import { Modal, Button, Typography, Box, Stack, TextField, InputAdornment, Input } from '@mui/material';
// Icons
import { MdOutlineAdd } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
// 
import {nanoid} from 'nanoid';
import {useStores} from "../../../state_management/store/index";

// -----------------------
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY:"auto",
	overflowX:'hidden',
    height:'90%',
    // maxHeight: 500,
};

// -----------------

export default function AddNewProduct({isEdit=false,editData={}}) {

    const [open, setOpen] = useState(null);

	const {ProductStore} =  useStores()

    const handleOpen = (event) => {
		setOpen(event.currentTarget);
    };

    const handleClose = () => {
		setOpen(null);
	};

	const { register, handleSubmit,reset,setValue  } = useForm();
    const [fileName, setfileName] = useState(" ")
    const [coverImg, setCoverImg] = useState("cover")

	const setPayLoad = (data) =>{
		let payload={
			"basicDetails": {
			  "modelName": data.productName,
			  "price": data.price,
			  "qty": data.quantity,
			  "media": [
				{
				  "mediaType": "image",
				  "mediaUrl": "https://www.boommotors.com/assets/img/bike/g1.png"
				},
				{
				  "mediaType": "image",
				  "mediaUrl": "https://images.livemint.com/img/2021/11/11/1600x900/BannerImage_1636628301470_1636628312411.png"
				},
				{
				  "mediaType": "image",
				  "mediaUrl": "https://www.uptobrain.com/wp-content/uploads/2021/11/Boom-Corbett-Electric-Two-Wheeler.jpg"
				},
				{
				  "mediaType": "image",
				  "mediaUrl": "https://media.zigcdn.com/media/model/2021/Nov/rear-tyre-view-471062162_930x620.jpg"
				},
				{
				  "mediaType": "image",
				  "mediaUrl": "https://media.zigcdn.com/media/model/2021/Nov/front-tyre-view-1820462742_600x400.jpg"
				}
			  ],
			  "description": data.description,
			  "company": data.companyName
			},
		  "colorDetails": {
			"primaryColor": data.color,
			"secondaryColor": "red accent"
		  },
		  "categoryId": data.categoryId,
		  "modelId": data.modelId,
		  "productId": data.productId,
		  "sort":"0",
		
		}
		return payload

	}
    
    const setData=(data)=>{
		let payload = setPayLoad(data)
		payload={...payload,
			"techDetails": {
				"highSpeed": "",
				"acceleation": "",
				"torque": "",
				"isBluetoothConnected": false,
				"isWifiConnected": false,
				"isUsbConnected": false,
				"batteryCapacityVoltage": "",
				"batteryCapacityPower": "",
				"batteryType": "",
				"ridingRange": [],
				"chargingTime": [],
				"chargingType": "",
				"dimensions": "",
				"maxWeight": "",
				"bootSpacingCapacity": "",
				"bootSpacingType": "",
				"bootSpacingHeight": "",
				"bootSpacingWidth": "",
				"bootSpacingDepth": "",
				"breakType": "",
				"rimType": "",
				"tyreType": "",
				"tyreSize": "",
				"displayType": "",
				"isTouchScreen": false,
				"isReverse": false,
				"lockType": "",
				"isGpsConnected": false,
				"gpsType": ""
			  },
			  "warrantyDetails": {
				"warrantyOnVehicle": "",
				"warrantyOnAccessories": "",
				"warrantyOnBattery": "",
				"warrantyOnMotor": "",
				"isExternalWarranty": false
			  },
			  "reviews": [],
			  "_id": nanoid(),
			  "likes": [],
			  "isActive": true,
			  "isDeleted": false,
			  "createdAt": 1638875008225,
			  "lastModified": 1639977952674,
			  "updatedAt": "2021-12-20T05:25:52.674Z",
			  "__v": 0,
			  "companyLogo": []
		}
		
        ProductStore.addProductToLocalStore(payload)	
		
        
	}
    const setEditData=(data)=>{
		// observableProductStore.updateProduct(data)	
		let body = setPayLoad(data)
		ProductStore.editProductLocalStore(editData?._id,body)	
		
       	
        
	}

	let structreEditdata = {}
	if(isEdit===true){
		structreEditdata={
			"companyName": editData?.basicDetails?.company,
			"productName": editData?.basicDetails?.modelName,

			"quantity": editData?.basicDetails?.qty,
			"price": editData?.basicDetails?.price,
			"color": editData?.colorDetails?.primaryColor,
			"dataSheet": {},
			"coverImage": {},
			"categoryId": editData?.categoryId,
			"modelId": editData?.modelId,
			"productId": editData?.productId,
			"description": editData?.basicDetails?.description,
			"speed": "",
			"ridingRange": "",
			"batteryCapacity": "",
			"charging": ""
		}
		Object.keys(structreEditdata).map(key=>setValue(key,structreEditdata[key]) )
	}
	   
    const checkOperation =(formData)=>{
		if(isEdit){
			setEditData(formData)			
        }else{
			setData(formData)
        }
		reset()
		handleClose()
    }

    return(
			<>
			{
				isEdit?(
					<Button
						color="inherit"
						disableRipple
						onClick={handleOpen}
						startIcon={<AiFillEdit/>}
						sx={{fontWeight:400}}
						>
							Edit				
					</Button>
				):(
					<Button
						color="inherit"
						disableRipple
						onClick={handleOpen}
						endIcon={<MdOutlineAdd/>}
						>
							Add				
					</Button>
				)
			}
			
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} >
					<form onSubmit={handleSubmit(checkOperation)}>
						<Stack direction="row" flexWrap="wrap-reverse"  justifyContent="space-around" >
						<Stack>
						<TextField
							label="Company Name"
							id="standard-basic"
							variant="standard"
							sx={{ m: 1,  }}
							{...register("companyName")}
							required
							// {comanyname: value}
														
							/>
						<TextField
							label="Product name"
							id="standard-basic"
							variant="standard"
							sx={{ m: 1, width: "25ch" }}
							{...register("productName")}						
							required

							
							/>
						<TextField
							label="Quantity"
							id="standard-basic"
							variant="standard"
							sx={{ m: 1, width: "25ch" }}
							{...register("quantity")}
							required				
							type="number"
							/>
						<TextField
							label="Price"
							id="standard-basic"
							variant="standard"
							sx={{ m: 1, width: "25ch" }}
							{...register("price")}
							required
							type="number"
								/>
						<TextField
								label="Color"
								id="standard-basic"
								variant="standard"
								sx={{ m: 1, width: "5ch" }}
								{...register("color")}
								required
								type="color"
								
								/>
						<TextField
						label="Category Id"
						id="standard-basic"
						variant="standard"
						sx={{ m: 1, width: "25ch" }}
						{...register("categoryId")}						
						required
						
					/>
										
				</Stack>
				{/* Second ROw */}
				<Stack sx={{mx:2}} alignItems={"center"} justifyContent="space-around">


					<label htmlFor="contained-button-file">
					<input accept="image/*" {...register("coverImage")} onChangeCapture={e=>setCoverImg(URL.createObjectURL(e.target.files[0]))} id="contained-button-file"  type="file"  style={{display:"none"}}/>
					<span style={{position:"absolute",zIndex:"10", textAlign:"center"}}>CoverImage</span>
					<img style={{height:"120px",width:"150px" ,position:"relative",borderRadius:".75rem"}} src={coverImg} alt="" />
					
					</label>

					<TextField
						label="Model Id"
						id="standard-basic"
						variant="standard"
						sx={{ m: 1, width: "25ch" }}
						{...register("modelId")}	
						required					
						
					/>
					
					<TextField
						label="Product Id"
						id="standard-basic"
						variant="standard"
						sx={{ m: 1, width: "25ch" }}
						{...register("productId")}
						required						
						
					/>
				

				{/* <InputLabel>Description</InputLabel> */}
				<TextField 
				label="Description"
				InputProps={{
						multiline: true,
						rows: 4,
						
						maxLength:'1'
				}}
					{...register("description")}
					
				
					type="text"
					
					sx={{ width: "25ch" }}
				/>
				</Stack>
				</Stack>
				<Typography sx={{my:2}}>Specifications</Typography>
				<Stack direction="row" flexWrap="wrap" justifyContent="space-between">
						<TextField
						label="Speed"
						id="standard-adornment-amount"
						InputProps={{

								endAdornment:<InputAdornment position="end">Kmph</InputAdornment>
						}}
						variant="standard"
						sx={{ m: 1, width: "15ch" }}
						{...register("speed")}
						
						type="number"
						
						/>
						<TextField
						label="Riding Range"
						id="standard-adornment-amount"
						InputProps={{

								endAdornment:<InputAdornment position="end">km</InputAdornment>
						}}
						variant="standard"
						sx={{ m: 1, width: "15ch" }}
						{...register("ridingRange")}
						
						type="number"
						
						/>
						<TextField
						label="Battery Capacity"
						id="standard-adornment-amount"
						InputProps={{
								
								endAdornment:<InputAdornment position="end">kWh</InputAdornment>
						}}
						variant="standard"
						sx={{ m: 1, width: "20ch" }}
						{...register("batteryCapacity")}
						
						type="number"
						
						/>
						<TextField
						label="Charging"
						id="standard-adornment-amount"
						InputProps={{

								endAdornment:<InputAdornment position="end">h</InputAdornment>
						}}
						variant="standard"
						sx={{ m: 1, width: "15ch" }}
						{...register("charging")}
						
						type="number"
						
						/>
				</Stack>
						<Button type="submit" sx={{px:4 ,m:2, float:"right"}} variant='contained'>Save</Button>
					</form>
        </Box>

			</Modal>
			</>
    );
    
}