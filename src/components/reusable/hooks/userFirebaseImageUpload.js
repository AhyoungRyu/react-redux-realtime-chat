import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uuidv4 from 'uuid/v4';
import mime from 'mime-types';
import get from 'lodash/fp/get';

import firebase from '../../../firebase';

// Custom hook for uploading an image file to Firebase Storage
// Got an idea from 
// https://medium.com/better-programming/how-to-build-a-react-hook-to-upload-files-to-firebase-ac1ddee5cc3a
const FirebaseFileUploadApi = () => {
  const [data, setData] = useState();
  const [fileData, setFileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState({});
  const [startUploading, setStartUploading] = useState(false);
  const currentChatRoomId = useSelector(get('chatRoom.currentChatRoom.id'));
  const currentUser = useSelector(get('user.currentUser'));

  const clearData = () => {
    setData(null);
  };

  const generateFromImage = (
    img,
    MAX_WIDTH = 300,
    MAX_HEIGHT = 300,
    quality = 1
  ) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const image = new Image();

      image.onerror = error => {
        reject(error);
      };

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0, width, height);

        // IMPORTANT: 'jpeg' NOT 'jpg'
        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        resolve(dataUrl);
      };
      image.src = img;
    });
  };

  useEffect(() => {
    const storageRef = firebase.storage().ref();
    const uploadData = async () => {
      // initialize upload information
      setIsError(false);
      setIsLoading(true);
      setProgress({ value: 0 });
      try {
        const ref = storageRef.child(`chat/public/${uuidv4()}.jpg`);
        const uploadTask = ref.put(fileData, {
          contentType: mime.lookup(fileData.name),
        });

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          _progress => {
            const value = Math.round((_progress.bytesTransferred / _progress.totalBytes) * 100);
            setProgress({ value });
          },
          _error => {
            setIsLoading(false);
            setIsError(_error);
          },
          async _complete => {
            setIsError(false);
            setIsLoading(false);

            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
            const messagesRef = firebase.database().ref('messages').child(currentChatRoomId);
            messagesRef
              .push()
              .set({
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: currentUser,
                image: downloadUrl,
              })
            const storageData = {
              downloadUrl,
              name: uploadTask.snapshot.metadata.name,
              image: {
                ref: uploadTask.snapshot.ref.fullPath,
                size: uploadTask.snapshot.metadata.size,
                contentType: uploadTask.snapshot.metadata.contentType,
                timeCreated: uploadTask.snapshot.metadata.timeCreated
              }
            };

            // save to collection
            const docSaved = await onSave(storageData);

            // get document
            const docData = await docSaved.get();
            setData({
              ...docData.data(),
              id: docData.id
            });

            setProgress({});
          }
        );
      } catch (_error) {
        setIsLoading(false);
        setIsError(_error);
      }
    };

    fileData && startUploading && uploadData();
  }, [fileData, startUploading]);

  /**
   *
   * @param {*} _data
   */
  const onSave = async _data => {
    const thumb = await generateFromImage(fileData.dataUrl);
    const collectionRef = firebase
      .firestore()
      .collection('image-file');
    return await collectionRef.add({
      ..._data,
      thumb,
      createdOn: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  return [
    { data, fileData, isLoading, isError, progress },
    setStartUploading,
    setFileData,
    clearData
  ];
}

export default FirebaseFileUploadApi;