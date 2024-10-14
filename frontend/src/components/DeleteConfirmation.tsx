import {Modal, Button} from "react-bootstrap";

export type Props = {
    showDialog: boolean,
    handleClose(): void,
    handleDelete(): void
}

export default function DeleteConfirmation(props: Props) {
  //const recipeContext: RecipeContextType  = React.useContext(RecipeContext) as RecipeContextType;

    const handleDelete = () => {
        props.handleClose();
        props.handleDelete();
    }
  
  return (
    <>
      <Modal show={props.showDialog} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}