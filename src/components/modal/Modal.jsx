import React from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import parse from 'html-react-parser';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



const style = {
  width: "45%",
  minWidth: "700px",
  minHeight:"30%",
  
  background: "white",
  color: "white",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "16px",
  overflow: "scroll",
  opacity: "100%",
  boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
  p: "4",
};

export default function SGModal(props) {
  const [,setOpen] = React.useState(props.open);
  
  const handleClose = () => setOpen(false);

  return (
    
    <div>
      
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <button className="closeBtn" onClick={() => props.setIsOpen(false)}>
               <RiCloseLine style={{ marginBottom: "-3px" }} />
             </button>
        <h5 className="heading">{props.sgID}: {props.sgName} </h5>
             
             
             <div className="modalContent">
                 <h4>Description</h4>
                 <p>{parse(props.sgDescription)}</p>

                 <h4>References</h4>
               {props.sgReferences}
               <h4>Safeguard Type</h4>
               {props.sgType}


               <h4>Stakeholders Role</h4>
               {props.stakeholdersRole}
        
          </div>
        </Box>
      </Modal>
    </div>
  );
}

