import { useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal, ModalBody } from "react-bootstrap";
import { IRow } from "../App";
import { SingleSelectType } from "./SingleSelect";
import Switch from "./Swtich";

interface AddModalProps {
   show: boolean;
   handleClose: () => void;
   handleShow: () => void;
   addNewRow: (props: IRow) => void;
}

//The modal which shows up to add new row.
const AddModal: React.FC<AddModalProps> = ({ show, handleClose, handleShow, addNewRow }) => {
   //To handle data of the modal
   const [data, setData] = useState<IRow>({ boolean: false, id: 0, singleSelect: "low", text: "", url: "" });
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Add new row</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <InputGroup className="mb-3">
               <Form.Label>Boolean</Form.Label>
               <Switch value={data.boolean} onChange={(boolean) => setData({ ...data, boolean })}></Switch>
            </InputGroup>
            <InputGroup className="mb-3">
               <Form.Label>Text</Form.Label>
               <FormControl
                  value={data.text}
                  placeholder="Please enter text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, text: e.target.value })}
               ></FormControl>
            </InputGroup>
            <InputGroup className="mb-3">
               <Form.Label>URL</Form.Label>
               <FormControl
                  value={data.url}
                  placeholder="Please enter the URL"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, url: e.target.value })}
               ></FormControl>
            </InputGroup>
            <InputGroup className="mb-3">
               <Form.Label>Single Select</Form.Label>
               <Form.Select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                     setData({ ...data, singleSelect: e.target.value as SingleSelectType })
                  }
               >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
               </Form.Select>
            </InputGroup>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
            <Button
               variant="primary"
               onClick={() => {
                  handleClose();
                  addNewRow(data);
                  setData({ boolean: false, id: 0, singleSelect: "low", text: "", url: "" });
               }}
            >
               Add
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default AddModal;
