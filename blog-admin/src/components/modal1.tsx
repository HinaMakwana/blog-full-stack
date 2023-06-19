import React, { useRef, useState,ChangeEvent, useEffect } from "react";
import { Modal, Text,Button, Input, FormElement} from "@nextui-org/react";
import { getCookie } from "cookies-next";

export default function Modal1() {
  const cancelButtonRef = useRef(null)
	const [form, setForm] = useState({ categoryName : ''})
	const token = getCookie('authToken')
	const submit = async () => {
		// e.preventDefault()
		const a = await fetch('http://127.0.0.1:3000/category',{
		  method: 'POST',
		  headers :{
			'Content-Type' :'application/json',
			'Authorization' : `Bearer ${token}`
			},
		  body: JSON.stringify(form)
		})
		const content = await a.json()

		if(a.status === 201) {
		  alert('category added')
		} else if(a.status === 500) {
		  alert('something went wrong')
		} else if(a.status === 409) {
      alert('category name already exists')
    }
	  }
	  const handleChange = (e: ChangeEvent<FormElement>) => {
      const { name, value } = e.target;
      setForm((preform) => ({
        ...preform,
        [name]: value,
      }));
    };
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <button onClick={handler} className="bg-gray-600 text-slate-200 h-[53px] rounded p-2 border border-slate-300 rounded-md pl-9 focus:outline-none focus:ring-1" id="modal">
        Add Category
      </button>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Category
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            required
            bordered
            fullWidth
            size="lg"
            name="categoryName"
            id="categoryName"
            type="text"
            placeholder="Category name"
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onPress={closeHandler} color='error'>
            Close
          </Button>
          <Button auto onPress={submit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
