import { Dropdown, Avatar, Text, Grid, User } from "@nextui-org/react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Profile() {
	const token = getCookie('authToken')
	const router = useRouter()
	const logout = async () => {
		const set = await fetch('http://127.0.0.1:3000/admin/logout',{
			method: 'POST',
			headers : {
				'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
			}
		})
		console.log('output',set);
		if(set.status == 201){
			alert('Logout successfully')
			deleteCookie('authToken')
			router.push('/')
		}
	}

	return (
		<div>
			<Grid.Container justify="flex-start" gap={2}>
			<Grid>
				<Dropdown placement="bottom-left">
				<Dropdown.Trigger>
					<User
					bordered
					as="button"
					size="lg"
					name="Admin"
					description="@adminOfBlog"
					src="data:image/png;base64,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"
					/>
				</Dropdown.Trigger>
				<Dropdown.Menu color="primary" aria-label="User Actions">
					<Dropdown.Item key="profile" css={{ height: "$18" }}>
					<Text b color="inherit" css={{ d: "flex" }}>
						Signed in as
					</Text>
					<Text b color="inherit" css={{ d: "flex" }}>
						admin@gmail.com
					</Text>
					</Dropdown.Item>
					<Dropdown.Item key="settings" withDivider>
					My Settings
					</Dropdown.Item>
					<Dropdown.Item key="help_and_feedback" withDivider>
					Help & Feedback
					</Dropdown.Item>
					<Dropdown.Item key="logout" color="error" withDivider>
					 <button onClick={logout}>Logout</button>
					</Dropdown.Item>
				</Dropdown.Menu>
				</Dropdown>
			</Grid>
			</Grid.Container>
		</div>
	);
}
