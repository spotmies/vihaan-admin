import React from "react";

export default function TestRideModel(props) {
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
            <b>URL</b> :<a href="https://google.co.in/maps/place/{props.details.bookingLocation[0]},{props.details.bookingLocation[1]}" target="blank">Click here</a>
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
