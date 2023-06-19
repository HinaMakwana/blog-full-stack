import { Dropdown, Text, Grid } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useState } from "react";

interface Props {
	categoryData: {
	  categoryName: string;
	};
  }
export default function Active({categoryData}:Props) {
	const [visible, setVisible] = useState(false);
  	const handler = () => setVisible(true);
	const token = getCookie('authToken')
	const changeStatus = async (status:string) => {
		const a = await fetch('http://127.0.0.1:3000/category',{
			method: 'PATCH',
			headers: {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			},
			body: JSON.stringify({name:categoryData.categoryName, status:status })
		})
	}
  return (
	<div>
		<Grid.Container justify="flex-start" gap={2}>
			<Grid>
				<Dropdown placement="bottom-left">
					<Dropdown.Trigger>
						<button onClick={handler}>
							<svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-three-dots-vertical">
								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
							</svg>
						</button>
					</Dropdown.Trigger>
					<Dropdown.Menu aria-label="User Actions">
						<Dropdown.Item key="settings">
							<Text b>
								Make Active/Inactive
							</Text>
						</Dropdown.Item>
						<Dropdown.Item color='success' key="help_and_feedback" withDivider>
							<button onClick={()=> changeStatus('A')}>
								Active
							</button>
						</Dropdown.Item>
						<Dropdown.Item key="logout" color="error" withDivider>
							<button onClick={()=> changeStatus('I')}>
								Inactive
							</button>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Grid>
		</Grid.Container>
	</div>
  );
}
