import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner  = ({ content }) => (
  <Dimmer active>
    <Loader size="huge" content={content} />
  </Dimmer>
);

Spinner.propTypes = {
  content: PropTypes.string,
}
Spinner.defaultProps = {
  content: '',
}
export default Spinner;
