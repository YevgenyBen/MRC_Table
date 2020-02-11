import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ChartComponent from "./ChartComponent";
import "./ModalComponent.css";

export default function CostumModal(props) {
  const data = [
    {
      id: "france",
      color: "hsl(33, 70%, 50%)",
      data: [
        { x: "2020/01/11_T979508.3", y: "87.6404503981272" },
        { x: "2020/01/17_T979508.1", y: "88.817549603326" },
        { x: "2020/01/20_T979421.1", y: "74.692348071507" },
        { x: "2020/01/20_T979427.1", y: "87.7474580492292" },
        { x: "2020/01/20_T979428.1", y: "69.5796933439043" },
        { x: "2020/01/20_T979506.1", y: "85.0722312927246" }
      ]
    },
    {
      id: "yosi",
      color: "hsl(39, 70%, 50%)",
      data: [
        { x: "2020/01/25_T979508.3", y: "87.6404503981272" },
        { x: "2020/01/26_T979508.1", y: "88.817549603326" },
        { x: "2020/04/20_T979421.1", y: "74.692348071507" },
        { x: "2020/05/20_T979427.1", y: "87.7474580492292" },
        { x: "2020/06/20_T979428.1", y: "69.5796933439043" },
        { x: "2020/07/20_T979506.1", y: "85.0722312927246" }
      ]
    }
  ];

  return (
    <Modal
      dialogClassName="modal-size"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ASIAE4P0SA1
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="halfModal">
          <ChartComponent data={data} />
        </div>
        <div className="halfModal">
          <ChartComponent data={data} />
        </div>
      </Modal.Body>
    </Modal>

    // <Modal
    //   dialogClassName="modal-size"
    //   {...props}
    //   size="lg"
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered>
    //   <Modal.Header closeButton>
    //     <Modal.Title id="contained-modal-title-vcenter">
    //       Modal heading
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <ChartComponent data={data} />
    //   </Modal.Body>
    // </Modal>
  );
}
