import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Icon,
  Input,
 } from 'semantic-ui-react';
import styled from 'styled-components';

import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import noop from 'lodash/fp/noop';

import userFirebaseImageUpload from '../reusable/hooks/userFirebaseImageUpload';

const ModalFooter = styled(Modal.Actions)`
  text-align: right;
`;
const FileUploadModal = ({ modalOpened, onCloseModal }) => {
  // setting up the hook to upload file and track its progress
  const [
    { fileData, isLoading, progress: { value } },
    setStartUploading,
    setFileData,
    clearData
  ] = userFirebaseImageUpload();
  useEffect(() => {
    if (value === 100){
      onCloseModal();
      setStartUploading(false);
    }
    // Clear data on unmount
    return () => clearData();
  }, [value])
  return (
    <Modal basic open={modalOpened} onClose={onCloseModal}>
      <Modal.Header>
        Select an Image File
      </Modal.Header>
      <Input
        fluid
        name="file"
        type="file"
        accept="image/*"
        placeholder="Supported file types: .jpg .jpef .png .gif"
        onChange={flow(
          get('target.files[0]'),
          setFileData
        )}
        validator
      />
      <ModalFooter>
        <Button
          color="red"
          inverted
          onClick={onCloseModal}
        >
          <Icon name="remove"/> 
          Cancel
        </Button>
        <Button
          color="green"
          inverted
          loading={isLoading}
          disabled={!fileData || isLoading}
          onClick={() => setStartUploading(true)}
        >
          <Icon name="checkmark" /> 
          Upload
        </Button>
      </ModalFooter>
    </Modal>
  );
}

FileUploadModal.propTypes = {
  // from parent
  modalOpened: PropTypes.bool,
  onCloseModal: PropTypes.func,
}

FileUploadModal.defaultProps = {
  // from parent
  modalOpened: false,
  onCloseModal: noop,
}
export default FileUploadModal;