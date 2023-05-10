/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
	MainContainer,
	Avatar,
	ChatContainer,
	ConversationHeader,
	Message,
	MessageInput,
	MessageList,
	Sidebar,
	Conversation,
	ConversationList,
	Search,
} from '@chatscope/chat-ui-kit-react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
import MenuBar from '../../components/menubar/MenuBar';

export default function Chat() {
	const [messageInputValue, setMessageInputValue] = React.useState('');
	const [refreshCount, setRefreshCount] = React.useState(0);
	const [messages, setMessages] = React.useState([]);
	const [job, setJob] = React.useState(null);
	const [currentJobProposal, setCurrentJobProposal] = React.useState(null);
	const token = useSelector((state) => state.user.token);
	const profile = useSelector((state) => state.user.profile);

	const avatar = profile.picture;
	const params = useParams();
	const jobId = params.jobId || '';
	// console.log(job);

	useEffect(() => {
		setInterval(() => {
			setRefreshCount((prevCount) => prevCount + 1);
		}, 5000);
	}, []);

	useEffect(() => {
		axios
			.get(`${API_URL}/messages?_id=${profile._id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				if (response.data.message) {
					const firstJobProposal = Object.keys(
						response.data.message,
					)[0];
					setCurrentJobProposal(
						response.data.message[firstJobProposal],
					);
					setMessages(
						response.data.message[firstJobProposal].messages,
					);
				}
			});
	}, [refreshCount]);

	useEffect(() => {
		axios
			.get(`${API_URL}/users/get-job?jobId=${jobId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				if (response.data.message) {
					setJob(response.data.message);
				}
			});
	}, []);

	const handleMessageSend = async () => {
		const messageBody = {
			from: profile._id,
			to: job.serviceProvider._id,
			message: messageInputValue,
			job: jobId,
		};
		const messageCreateRequest = await fetch(`${API_URL}/messages`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(messageBody),
		});
		const messageCreationResp = await messageCreateRequest.json();
		setMessageInputValue('');
		axios
			.get(`${API_URL}/messages?jobId=${jobId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				if (response.data.message) {
					setMessages(response.data.message);
				}
			});
	};

	return (
		<div>
			<MenuBar />
			<MainContainer
				responsive
				style={{
					height: '100%',
				}}
			>
				<Sidebar
					position="left"
					style={{
						height: '90vh',
					}}
					scrollable={false}
				>
					<ConversationList>
						<Conversation
							name="Joe"
							lastSenderName="Joe"
							info="Yes i can do it for you"
						>
							<Avatar src={avatar} name="Joe" />
						</Conversation>

						<Conversation
							name="Emily"
							lastSenderName="Emily"
							info="Yes i can do it for you"
						>
							<Avatar src={avatar} name="Emily" />
						</Conversation>
					</ConversationList>
				</Sidebar>
				<ChatContainer
					style={{
						height: '90vh',
					}}
				>
					<ConversationHeader>
						<ConversationHeader.Back />
						<Avatar
							src={job && job.serviceProvider.primaryImage}
							name={job && job.serviceProvider.name}
						/>
						<ConversationHeader.Content
							userName={job && job.serviceProvider.name}
						/>
					</ConversationHeader>
					<MessageList
						style={{
							marginTop: '15px',
						}}
					>
						{messages &&
							messages
								.slice()
								.reverse()
								.map((message) => {
									if (message.from === profile._id) {
										return (
											<Message
												model={{
													message: message.message,
													direction: 'outgoing',
													position: 'single',
												}}
											/>
										);
									}
									if (
										job &&
										message.from === job.serviceProvider._id
									) {
										return (
											<Message
												model={{
													message: message.message,
													direction: 'incoming',
													position: 'single',
												}}
											>
												<Avatar
													src={
														job &&
														job.serviceProvider
															.primaryImage
													}
													name={
														job &&
														job.serviceProvider.name
													}
												/>
											</Message>
										);
									}
								})}
					</MessageList>
					<MessageInput
						placeholder="Type message here"
						value={messageInputValue}
						onChange={(val) => setMessageInputValue(val)}
						onSend={handleMessageSend}
						attachButton={<div></div>}
					/>
				</ChatContainer>
			</MainContainer>
		</div>
	);
}
