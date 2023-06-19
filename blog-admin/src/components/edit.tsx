import React, { useRef, useState,ChangeEvent, useEffect } from "react";
import { Modal, Text,Button, Input, FormElement} from "@nextui-org/react";
import { getCookie } from "cookies-next";

interface EditProps {
	categoryData: {
	  categoryName: string;
	};
  }
export default function Edit({categoryData}: EditProps) {
  const cancelButtonRef = useRef(null)
	const [form, setForm] = useState({ newName : ''})
	const [categoryName, setValue] = useState('')
	const token = getCookie('authToken')
	const submit = async () => {
		// e.preventDefault()
		const a = await fetch('http://127.0.0.1:3000/category/edit',{
		  method: 'PATCH',
		  headers :{
			'Content-Type' :'application/json',
			'Authorization' : `Bearer ${token}`
			},
		  body: JSON.stringify({...form,oldName : categoryData.categoryName})
		})
		const content = await a.json()
		console.log(content);
		setValue(content.categoryName)

		if(a.status === 201) {
		  alert('category updated')
		} else if(a.status === 500) {
		  alert('something went wrong')
		} else if(a.status === 404) {
		  alert('category not found')
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
  useEffect(()=> {

  },[])

  return (
    <div>
      <button onClick={handler}>
		<img src="edit.svg" className="h-5 w-5" />
	  </button>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit Category
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            required
            bordered
            fullWidth
            size="lg"
            name="newName"
            id="newName"
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
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
