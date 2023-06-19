import React, { useRef, useState,ChangeEvent, useEffect } from "react";
import { Modal, Text,Button, Input, FormElement} from "@nextui-org/react";
import { getCookie } from "cookies-next";

interface EditProps {
	blogData : {
		id : string
	}
  }
export default function Edit({blogData}: EditProps) {
	const [form, setForm] = useState({ title : '',description : ''})
	const token = getCookie('jwtToken')
	const submit = async () => {
		// e.preventDefault()
		const a = await fetch('http://127.0.0.1:3000/blog',{
		  method: 'PATCH',
		  headers :{
			'Content-Type' :'application/json',
			'Authorization' : `Bearer ${token}`
			},
		  body: JSON.stringify({...form,id : blogData})
		})
		const content = await a.json()
		console.log(content);
		
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
      	<button onClick={handler} className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-5 mx-4 mr-1 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0">
				Edit
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
            name="title"
            id="title"
            type="text"
            placeholder="enter title"
            onChange={handleChange}
          />
		  <Input
            clearable
            required
            bordered
            fullWidth
            size="lg"
            name="description"
            id="description"
            type="text"
            placeholder="enter description"
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
