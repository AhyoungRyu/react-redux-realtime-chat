import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header, Dropdown, Icon, Image } from 'semantic-ui-react';

import get from 'lodash/fp/get';

import firebase from '../../firebase';
import * as userSelectors from '../../dux/user/selectors';

const getDropdownOptions = (userName) => [
  {
    key: 'currentUser',
    text: <span>Signed as <strong>{userName}</strong></span>,
    disabled: true,
  },
  {
    key: 'signout',
    text: (
      <span
      onClick={() => firebase
        .auth()
        .signOut()
      }>
        Sign out
      </span>
    ),
  },
];
export const UserPanel = ({ currentUser }) => (
  <Grid>
    <Grid.Column>
      <Grid.Row style={{ padding: '1.2rem', margin: 0 }}>
        {/* Panel Header */}
        <Header
          inverted
          floated="left"
          as="h2"
        >
          <Header.Content>
            <Icon name="talk" />
            KekeTalk
          </Header.Content>
        </Header>
        {/* User Setting Dropdown */}
        <Header style={{ padding: '0.25em' }} as="h4" inverted>
          <Dropdown
            trigger={
            <span>
              <Image src={get('avatar', currentUser)} spaced="right" avatar />
              {get('name', currentUser)}
            </span>
            }
            options={getDropdownOptions(get('name', currentUser))}
          />
        </Header>
      </Grid.Row>
    </Grid.Column>
  </Grid>
);

UserPanel.propTypes = {
  // from connect
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
}

UserPanel.defaultProps = {
  // from connect
  currentUser: PropTypes.shape({
    id: '',
    name: '',
    avatar: '',
  }),
}

export default connect(state => ({
  currentUser: userSelectors.getCurrentUser(state),
}))(UserPanel);
