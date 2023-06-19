import React, { useRef, useState,ChangeEvent, useEffect } from "react";
import { Modal, Text,Button, Input, FormElement} from "@nextui-org/react";
import { getCookie } from "cookies-next";

interface EditProps {
	userData : {
		email : string
	}
  }
export default function Edituser({userData}: EditProps) {
	const [form, setForm] = useState({ firstName : '',lastName : '',email  :''})
	const token = getCookie('authToken')
	const submit = async () => {
		// e.preventDefault()
		const a = await fetch('http://127.0.0.1:3000/user',{
		  method: 'PATCH',
		  headers :{
			'Content-Type' :'application/json',
			'Authorization' : `Bearer ${token}`
			},
		  body: JSON.stringify({...form,oldEmail : userData.email})
		})
		const content = await a.json()

		if(a.status === 200) {
		  alert('user updated')
		} else if(a.status === 500) {
		  alert('something went wrong')
		} else if(a.status === 404) {
		  alert('user not found')
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
            Edit User
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            required
            bordered
            fullWidth
            size="lg"
            name="firstName"
            id="firstName"
            type="text"
            placeholder="first name"
            onChange={handleChange}
          />
		  <Input
            clearable
            required
            bordered
            fullWidth
            size="lg"
            name="lastName"
            id="lastName"
            type="text"
            placeholder="last name"
            onChange={handleChange}
          />
		  <Input
            clearable
            required
            bordered
            fullWidth
            size="lg"
            name="email"
            id="email"
            type="email"
            placeholder="email"
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
