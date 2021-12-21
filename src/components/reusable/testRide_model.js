import React from "react";
import { Link } from 'react-router-dom';


export default function TestRideModel(props) {
  // const lat = {props.details.bookingLocation[0]};
  // const long = {props.details.bookingLocation[1]};
  // const Src = "https://google.co.in/maps/place" + lat + "," + long ;
  return (
    <>
      <div className="card">
        <div style={{ display: "inline-flex" }}>
          <img alt="" src={props.userDet.pic} className="avatar-image" />
          {props.details.identityProof.map((aadhar) => (
            <img alt="" src={aadhar} className="avatar-image" />
          ))}
        </div>
        <br />
        <ul className="profile-list">
          <li>
            <b>Name</b> : {props.userDet.name}
          </li>
          <li>
            <b>mobile</b> : {props.userDet.mobile}
          </li>
          <li>
            <b>Model</b> : {props.details.createdAt}
          </li>
          <li>
            <b>Delivery At</b> : {props.details.schedule}
          </li>
          <li>
            <b>Location</b> : {props.details.bookingPlace.addressLine}, {props.details.bookingPlace.locality}, {props.details.bookingPlace.city}, {props.details.bookingPlace.postalCode}
          </li>
          <li>
            <b>Created At</b> : {props.details.schedule}
          </li>
          <li>
            <b>URL</b> :<a href={`https://google.co.in/maps/place/${props.details.bookingLocation[0]},${props.details.bookingLocation[1]}`} target="blank">Click here</a>
            {/* <b>URL:</b><Link to="#" >Click here</Link> */}
          </li>
        </ul>
        <button
          type="button"
          className="close-btn"
          onClick={() => {
            props.onClose();
          }}
        >
          X
        </button>
      </div>
    </>
  );
}
