import React, { Fragment, useRef, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useListVals } from 'react-firebase-hooks/database';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Segment, 
  Comment,
  Placeholder,
  Header,
  Icon,
  Button,
 } from 'semantic-ui-react';

import map from 'lodash/fp/map';
import noop from 'lodash/fp/noop';

import firebase from '../../firebase';
import * as chatRoomSelectors from '../../dux/chatRoom/selectors';

import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';

const StyledCommentGroup = styled(Comment.Group)`
  height: 450px;
  overflow-y: scroll;
  max-width: inherit !important;
`; 

const MessageListPlaceholder = ({ isHeader }) => (
  <Placeholder>
    <Placeholder.Header image={!isHeader}>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
  </Placeholder>
);

const displayMessageContent = ({ messages, loading }) => {
  if (loading) {
    return <MessageListPlaceholder />
  }
  if (messages.length > 0) {
    return map(message => <Message key={message.timestamp} message={message} />, messages)
  }
  return <div>Start first conversation from here!</div>
}

export const Messages = ({ currentChatRoomId, setChatRoomModalOpen }) => {
  if (!currentChatRoomId) {
    return (
      <Fragment>
        <Segment placeholder>
          <Header icon>
            <Icon name="rocket" />
            Nothing to be loaded. Create a new channel to start a conversation
          </Header>
          <Button primary onClick={() => setChatRoomModalOpen(true)}>
            New ChatRoom
          </Button>
        </Segment>
      </Fragment>
    )
  }
  const messagesRef = firebase.database().ref('messages').child(currentChatRoomId);
  const [messages, loading] = useListVals(messagesRef);
  const messagesEndRef = useRef(null);
  useEffect(() => {
      // Scroll to the bottom to display the most recent message
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
      })
  }, [messages]);
  return (
    <Fragment>
      <MessageHeader />
      <Segment>
        <StyledCommentGroup>
          {displayMessageContent({ messages, loading })}
          <div ref={messagesEndRef} />
        </StyledCommentGroup>
      </Segment>
      {!loading && <MessageForm />}
    </Fragment>
  )
}

Messages.propTypes = {
  // From connect
  currentChatRoomId: Proptypes.string,
  // From parent
  setChatRoomModalOpen: Proptypes.func,
};

Messages.defaultProps = {
  // From connect
  currentChatRoomId: '',
  // From parent
  setChatRoomModalOpen: noop,
}

export default connect(state => ({
  currentChatRoomId: chatRoomSelectors.getCurrentChatRoomId(state),
}))(Messages);
