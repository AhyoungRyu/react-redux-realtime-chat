import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import { Input, Form } from 'formik-semantic-ui';

import styled from 'styled-components';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import * as chatRoomSelectors from '../../dux/chatRoom/selectors';
import * as userSelectors from '../../dux/user/selectors';

import ImageFileUploadModal from '../Modals/ImageFileUpload';

const StyledSegment = styled(Segment)`
  margin-top: 16px;
`;
export const MessageForm = ({ currentChatRoomId, currentUser }) => {
  const messagesRef = firebase.database().ref('messages');
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <Form
      enableReinitialize
      ignoreLoading
      initialValues={{
        message: '',
      }}
      onSubmit={({ message }, formikApi) => {
        if (message && currentChatRoomId) {
          messagesRef
          .child(currentChatRoomId)
          .push()
          .set({
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: currentUser,
            content: message,
          })
          .then(() => {
            formikApi.setSubmitting(false);
            formikApi.resetForm();
          })
          .catch(error => {
            console.error({error});
            formikApi.setSubmitting(false);
          })
        }
      }}
      render={() => (
        <StyledSegment>
          <Input
            fluid
            name="message"
            inputProps={{
              type:'text',
              icon:'add',
              iconPosition: 'left',
              placeholder: 'Write your message',
              style: { marginBottom: '0.7em' },
            }}
          />
          <Button.Group icon fluid width="2">
            <Button
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              type="submit"
            />
            <Button
              color="teal"
              content="Upload Media File"
              labelPosition="right"
              icon="file image outline"
              onClick={() => setModalOpened(true)}
            />
          </Button.Group>
          <ImageFileUploadModal
            modalOpened={modalOpened}
            onCloseModal={() => setModalOpened(false)}
          />
        </StyledSegment>
      )}
    />
  )
}

MessageForm.propTypes = {
  // From connect
  currentChatRoomId: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
}

MessageForm.defaultProps = {
  // From connect
  currentChatRoomId: '',
  currentUser: {},
}

export default connect(state => ({
  currentChatRoomId: chatRoomSelectors.getCurrentChatRoomId(state),
  currentUser: userSelectors.getCurrentUser(state),
}))(MessageForm);
