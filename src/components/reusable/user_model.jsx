import React from "react";
import { dateFormat,format} from "src/utils/common";


export default function UserModel(props) {
  return (
    <>
      <div className="card">
        <img alt="" src={props.details.pic} className="avatar-image" />
        <br />
        <ul className="profile-list">
          <li>
            <b>Name</b> : {props.details.name}
          </li>
          <li>
            <b>Unique ID</b> : {props.details.uId}
          </li>
          <li>
            <b>Mobile</b> : {props.details.mobile}
          </li>
          <li>
            <b>Join@</b> : {dateFormat(props?.details?.createdAt, format[1])}
          </li>
          <li>
            <b>Last Modified@</b> :
            {dateFormat(props?.details?.lastModified, format[0])}
          </li>
          <li>
            <b>Status</b> : {props.details.userState}
          </li>
          <li>
            <b>Last login</b> : {props.details.lastLogin}
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
