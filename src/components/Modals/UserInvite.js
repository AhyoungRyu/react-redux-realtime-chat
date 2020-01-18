import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { Form, Dropdown } from 'formik-semantic-ui';
import { useObjectVal } from 'react-firebase-hooks/database';
import styled from 'styled-components';
import * as Yup from 'yup';

import isArray from 'lodash/fp/isArray';
import noop from 'lodash/fp/noop';

import firebase from '../../firebase';
import * as userSelectors from '../../dux/user/selectors';
import * as chatRoomSelectors from '../../dux/chatRoom/selectors';
import { updateChatRoomMembers } from '../../dux/chatRoom/actions';

const ModalFooter = styled(Modal.Actions)`
  margin-top: 20px;
  text-align: right;
`;

const validationSchema = Yup.object().shape({
  members: Yup.array()
    .min(1, 'Pick at least one user')
});

const getUserOptions = (userList, currentUserId) => isArray(userList)
  ? userList
    .filter(user => user !== currentUserId)
  : Object.entries(userList)
    .map(([key, { name }]) => ({ key, text: name, value: key}))
    .filter(user => user.key !== currentUserId)

const UserInviteModal = ({
  modalOpened,
  onCloseModal,
  currentChatRoomId,
  currentChatRoomMembers,
  currentUserId,
 }) => {
  const usersRef = firebase.database().ref('users');
  const [userList, loading] = useObjectVal(usersRef);
  const chatRoomsRef = firebase.database().ref('chatRooms').child(currentChatRoomId);
  const dispatch = useDispatch();
  return (
    <Modal
      basic
      open={modalOpened}
      onClose={onCloseModal}
    >
      <Modal.Header>
        Invite Members
      </Modal.Header>
      <Form
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          members: getUserOptions(currentChatRoomMembers, currentUserId),
        }}
        validationSchema={validationSchema}
        onSubmit={({ members }, formikApi) => {
          const updatedMembers = [...members, currentUserId];
          chatRoomsRef
            .update({ members: updatedMembers})
            .then(() => {
              formikApi.setSubmitting(false);
              dispatch(updateChatRoomMembers(updatedMembers));
              onCloseModal();
            })
            .catch(error => {
              console.error(error);
              formikApi.setSubmitting(false);
            });
        }}
        render={({ handleSubmit }) => (
          <form handleSubmit={handleSubmit}>
            <Modal.Content>
              <Dropdown
                name="members"
                fluid
                options={getUserOptions(userList, currentUserId)}
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
                <Icon name="checkmark" /> Submit
              </Button>
            </ModalFooter>
          </form>
        )}
      />
    </Modal>
  )
}

UserInviteModal.propTypes = {
  // From connect
  currentUserId: PropTypes.string,
  currentChatRoomId: PropTypes.string,
  currentChatRoomMembers: PropTypes.arrayOf(PropTypes.string),
  // From parent
  modalOpened: PropTypes.bool,
  onCloseModal: PropTypes.func,
}

UserInviteModal.defaultProps = {
  // From connect
  currentUserId: '',
  currentChatRoomId: '',
  currentChatRoomMembers: [],
  // From parent
  modalOpened: false,
  onCloseModal: noop,
}

export default connect(state => ({
  currentUserId: userSelectors.getCurrentUserId(state),
  currentChatRoomId: chatRoomSelectors.getCurrentChatRoomId(state),
  currentChatRoomMembers: chatRoomSelectors.getCurrentChatRoomMembers(state),
}))(UserInviteModal);

