/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
	MainContainer,
	Sidebar,
	Search,
	ConversationList,
	Conversation,
	Avatar,
	ChatContainer,
	ConversationHeader,
	VoiceCallButton,
	Message,
	MessageInput,
	VideoCallButton,
	InfoButton,
	MessageSeparator,
	TypingIndicator,
	MessageList,
} from '@chatscope/chat-ui-kit-react';
import { height } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
import avatar from './images/demo-user.png';
import MenuBar from '../../components/menubar/MenuBar';

export default function Chat() {
	const [messageInputValue, setMessageInputValue] = React.useState('');
	const [messages, setMessages] = React.useState([]);
	const [job, setJob] = React.useState(null);
	const [refresh, setRefresh] = React.useState(false);
	const token = useSelector((state) => state.user.token);
	const profile = useSelector((state) => state.user.profile);

	const location = useLocation();
	const jobId = location.jobId || '';

	useEffect(() => {
		axios
			.get(`${API_URL}/messages`, {
				params: {
					jobId: jobId,
				},
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
	}, []);

	useEffect(() => {
		axios
			.get(`${API_URL}/get-job`, {
				params: {
					jobId: jobId,
				},
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
			to: job.serviceProvider,
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
		setRefresh(!refresh);
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
				<ChatContainer
					style={{
						height: '90vh',
					}}
				>
					<ConversationHeader>
						<ConversationHeader.Back />
						<Avatar src={avatar} name="Zoe" />
						<ConversationHeader.Content
							userName="Zoe"
							info="Active 10 mins ago"
						/>
					</ConversationHeader>
					<MessageList
						style={{
							marginTop: '15px',
						}}
					>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'single',
							}}
						>
							<Avatar src={avatar} name="Zoe" />
						</Message>

						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Patrik',
								direction: 'outgoing',
								position: 'single',
							}}
							avatarSpacer
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'first',
							}}
							avatarSpacer
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'normal',
							}}
							avatarSpacer
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'normal',
							}}
							avatarSpacer
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'last',
							}}
						>
							<Avatar src={avatar} name="Zoe" />
						</Message>

						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Patrik',
								direction: 'outgoing',
								position: 'first',
							}}
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Patrik',
								direction: 'outgoing',
								position: 'normal',
							}}
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Patrik',
								direction: 'outgoing',
								position: 'normal',
							}}
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Patrik',
								direction: 'outgoing',
								position: 'last',
							}}
						/>

						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'first',
							}}
							avatarSpacer
						/>
						<Message
							model={{
								message: 'Hello my friend',
								sentTime: '15 mins ago',
								sender: 'Zoe',
								direction: 'incoming',
								position: 'last',
							}}
						>
							<Avatar src={avatar} name="Zoe" />
						</Message>
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
