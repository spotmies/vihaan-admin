import React from 'react'

export default function UserModel(props) {
    return (
        <>        
                        <div className="card">
                          <img alt='' src={props.details.pic} className='avatar-image' />
                          <br />
                          <ul className='profile-list'>
                          <li><b>Name</b> : {props.details.name}</li>
                          <li><b>mobile</b> : {props.details.mobile}</li>
                          <li><b>join@</b> : {props.details.createdAt}</li>
                          <li><b>status</b> : {props.details.userState}</li>
                          <li><b>last login</b> : {props.details.lastLogin}</li>
                          </ul>
                          <button type="button" className='close-btn' onClick={()=>{props.onClose()}}>X</button>
                        </div>
                    
    
        </>
    )
}
