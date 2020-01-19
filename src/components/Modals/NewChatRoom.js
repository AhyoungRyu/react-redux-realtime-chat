import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { Form, Input, Dropdown } from 'formik-semantic-ui';
import { useObjectVal } from 'react-firebase-hooks/database';
import styled from 'styled-components';
import * as Yup from 'yup';

import get from 'lodash/fp/get';

import firebase from '../../firebase';
import * as userSelectors from '../../dux/user/selectors';
import { setCurrentChatRoom } from '../../dux/chatRoom/actions';

const ModalFooter = styled(Modal.Actions)`
  margin-top: 20px;
  text-align: right;
`;

const validationSchema = Yup.object().shape({
  chatRoomName: Yup.string()
    .min(1, 'Chat room name is required')
    .required('Required'),
});

const getUserOptions = (userList = {}, currentUserId) => Object.entries(userList)
  .map(([key, { name }]) => ({ key, text: name, value: key}))
  .filter(user => user.key !== currentUserId)

export const ChatRoomModal = ({
  currentUser,
  modalOpened,
  onCloseModal,
 }) => {
  const usersRef = firebase.database().ref('users');
  const [userList, loading] = useObjectVal(usersRef);
  const chatRoomsRef = firebase.database().ref('chatRooms');
  const dispatch = useDispatch();
  return (
    <Modal
      basic
      open={modalOpened}
      onClose={onCloseModal}
    >
      <Modal.Header>
        Create New Chat Room
      </Modal.Header>
      <Form
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          chatRoomName: '',
          members: [],
        }}
        validationSchema={validationSchema}
        onSubmit={({ members, chatRoomName }, formikApi) => {
          const key = chatRoomsRef.push().key;
          const newChatRoom = {
            id: key,
            name: chatRoomName,
            // the channel creator should be included automatically
            members: [...members, get('id', currentUser)],
            createdBy: currentUser,
          }
          chatRoomsRef
            .child(key)
            .update(newChatRoom)
            .then(() => {
              formikApi.setSubmitting(false);
              dispatch(setCurrentChatRoom(newChatRoom));
              onCloseModal();
            })
            .catch(error => console.error(error));
        }}
        render={({ handleSubmit }) => (
          <form handleSubmit={handleSubmit}>
            <Modal.Content>
              <Form.Field>
                <Input
                  fluid
                  name="chatRoomName"
                  inputProps={{
                    placeholder: 'Name of Chat Room',
                  }}
                />
              </Form.Field>
              <Dropdown
                name="members"
                fluid
                options={getUserOptions(userList, currentUser.id)}
                inputProps={{
                  placeholder: 'Invite users to this chat room',
                  multiple: true,
                  search: true,
                  selection: true,
                  loading,
                }}
              />
            </Modal.Content>
            <ModalFooter>
              <Button color="red" inverted onClick={onCloseModal}>
                <Icon name="remove"/> Cancel
              </Button>
              <Button type="submit" color="green" inverted>
                <Icon name="checkmark" /> Create
              </Button>
            </ModalFooter>
          </form>
        )}
      />
    </Modal>
  )
}

ChatRoomModal.propTypes = {
  // from connect
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
}

ChatRoomModal.defaultProps = {
  // from connect
  currentUser: PropTypes.shape({
    id: '',
    name: '',
    avatar: '',
  }),
}
export default connect(state => ({
  currentUser: userSelectors.getCurrentUser(state),
}))(ChatRoomModal);

