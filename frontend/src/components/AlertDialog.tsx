import { useState } from "react";
import {Modal, Button} from "react-bootstrap";

export type Props = {
    openDialog: boolean,
    isError: boolean, 
    message: string
}

export default function AlertDialog(props: Props) {
    const [showDialog, setShowDialog] = useState<boolean>(props.openDialog);
  //const recipeContext: RecipeContextType  = React.useContext(RecipeContext) as RecipeContextType;

    const handleClose = () => {
        setShowDialog(false);
    }
  
  return (
    <>
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        {props.isError?
            <Modal.Body className="alert-danger">{props.message}</Modal.Body>
            :
            <Modal.Body className="alert-success">{props.message}</Modal.Body>
        }
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}