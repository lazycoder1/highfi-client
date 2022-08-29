import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ImageModal({src}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img
        src={src}
        style={{
          minWidth: 180,
          maxWidth: 230,
          minHeight: 180,
          maxHeight: 230,
          borderRadius: 6,
          objectFit: "cover",
          cursor: "pointer",
        }}
        referrerPolicy="no-referrer"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex align-items-center justify-content-center w-100 h-100'>
            <img src={src} style={{maxHeight: '100%', maxWidth: '100%'}}/>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageModal;