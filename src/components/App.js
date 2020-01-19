import React, { useState, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import Messages from './Messages';
import SidePanel from './SidePanel';
import NewChatRoomModal from './Modals/NewChatRoom';

const App = () => {
  const [chatRoomModalOpen, setChatRoomModalOpen] = useState(false);
  return (
    <Fragment>
      <Grid
        columns="equal"
        className="app"
      >
        <SidePanel
          setChatRoomModalOpen={setChatRoomModalOpen}
        />
        <Grid.Column
          style={{ marginLeft: 280 }}
        >
          <Messages 
            setChatRoomModalOpen={setChatRoomModalOpen}
          />
        </Grid.Column>
      </Grid>
      <NewChatRoomModal
        modalOpened={chatRoomModalOpen}
        onCloseModal={() => setChatRoomModalOpen(false)}
      />
    </Fragment>
  );
}

export default App;
