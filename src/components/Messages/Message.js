import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Comment, Image } from 'semantic-ui-react';
import moment from 'moment';
import styled from 'styled-components';

import * as userSelectors from '../../dux/user/selectors';

const StyledImage = styled(Image)`
  padding: 1em;
  max-width: 400px;
  max-height: 400px;
`;

const Message  = ({
  message: { user, timestamp, content, image },
  currentUserId,
 }) => (
  <Comment>
    <Comment.Avatar src={user.avatar} />
    <Comment.Content
      style={currentUserId === user.id
        ? { borderLeft: '2px solid orange', paddingLeft: '8px' }
        : {}
      }
    >
      <Comment.Author as="a">{user.name}</Comment.Author>
      <Comment.Metadata>{moment(timestamp).fromNow()}</Comment.Metadata>
      {image
        ? <StyledImage src={image} />
        : <Comment.Text>{content}</Comment.Text>
      }
    </Comment.Content>
  </Comment>
);

Message.propTypes = {
  // From connect
  currentUserId: PropTypes.string,
  // From parent
  message: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    timestamp: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

Message.defaultProps = {
  currentUserId: '',
}

export default connect(state => ({
  currentUserId: userSelectors.getCurrentUserId(state),
}))(Message);
