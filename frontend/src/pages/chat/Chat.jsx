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
import avatar from './images/demo-user.png';
import MenuBar from '../../components/menubar/MenuBar';

export default function Chat() {
	const [messageInputValue, setMessageInputValue] = React.useState('');

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
						onSend={() => setMessageInputValue('')}
						attachButton={<div></div>}
					/>
				</ChatContainer>
			</MainContainer>
		</div>
	);
}
