import React from 'react'

export default function UserModel(props) {
    return (
        <>        
                        <div className="card">
                          <img alt='' src={props.details.pic} className='avatar-image' />
                          <br />
                          <ul className='profile-list'>
                          <li><b>Name</b> : {props.details.name}</li>
                          <li><b>Unique ID</b> : {props.details.uId}</li>
                          <li><b>Mobile</b> : {props.details.mobile}</li>
                          <li><b>Join@</b> : {props.details.createdAt}</li>
                          <li><b>Lat Modified@</b> : {props.details.lastModified}</li>
                          <li><b>Status</b> : {props.details.userState}</li>
                          <li><b>Last login</b> : {props.details.lastLogin}</li>
                          </ul>
                          <button type="button" className='close-btn' onClick={()=>{props.onClose()}}>X</button>
                        </div>
                    
    
        </>
    )
}
