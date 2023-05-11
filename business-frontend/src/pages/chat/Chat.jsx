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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
import MenuBar from '../../components/menubar/MenuBar';

export default function Chat() {
	const [messageInputValue, setMessageInputValue] = React.useState('');
	const [refreshCount, setRefreshCount] = React.useState(0);
	const [messages, setMessages] = React.useState([]);
	const [messagesData, setMessagesData] = React.useState(null);
	const [proposals, setProposals] = React.useState([]);

	const [job, setJob] = React.useState(null);
	const [currentJobProposal, setCurrentJobProposal] = React.useState(null);
	const token = useSelector((state) => state.business.token);
	const profile = useSelector((state) => state.business.profile);
	const navigate = useNavigate();
	const avatar = profile.picture;
	const params = useParams();

	const [activeProposal, setActiveProposal] = React.useState(
		params.jobId || '',
	);

	useEffect(() => {
		setInterval(() => {
			setRefreshCount((prevCount) => prevCount + 1);
		}, 7000);
	}, []);

	useEffect(() => {
		axios
			.get(`${API_URL}/messages?_id=${profile._id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				if (response.data.message) {
					setMessagesData(response.data.message);
					setProposals(Object.keys(response.data.message));
					setMessages(response.data.message[activeProposal].messages);
				}
			});
	}, [refreshCount]);

	const handleMessageSend = async () => {
		const messageBody = {
			from: profile._id,
			to: messagesData[activeProposal].user._id,
			message: messageInputValue,
			jobProposalId: activeProposal,
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
		//refresh messages
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
						{proposals &&
							proposals.map((proposal) => {
								const msg = messagesData[proposal];
								return (
									<Conversation
										name={msg.jobName}
										active={proposal === activeProposal}
										onClick={() => {
											navigate(`/chat/${proposal}`);
											setActiveProposal(proposal);
											setRefreshCount(
												(prevCount) => prevCount + 1,
											);
										}}
									>
										{/* <Avatar
											src={
												msg.serviceProvider.primaryImage
											}
											name={msg.serviceProvider.name}
										/> */}
									</Conversation>
								);
							})}
					</ConversationList>
				</Sidebar>
				<ChatContainer
					style={{
						height: '90vh',
					}}
				>
					<ConversationHeader>
						<ConversationHeader.Back />
						{/* <Avatar
							src={
								messagesData &&
								messagesData[activeProposal].serviceProvider
									.primaryImage
							}
							name={
								messagesData &&
								messagesData[activeProposal].serviceProvider
									.name
							}
						/> */}
						<ConversationHeader.Content
							userName={
								messagesData &&
								messagesData[activeProposal].jobName
							}
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
										messagesData &&
										message.from ===
											messagesData[activeProposal].user
												._id
									) {
										return (
											<Message
												model={{
													message: message.message,
													direction: 'incoming',
													position: 'single',
												}}
											>
												{/* <Avatar
													src={
														messagesData &&
														messagesData[
															activeProposal
														].serviceProvider
															.primaryImage
													}
													name={
														messagesData &&
														messagesData[
															activeProposal
														].serviceProvider.name
													}
												/> */}
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
