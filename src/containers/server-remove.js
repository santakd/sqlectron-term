import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';
import { connect } from 'react-redux';
import { removeServer } from '../actions/servers';
import { setStatus } from '../actions/status';


class ServerRemove extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  componentWillMount () {
    const server = this.props.items
      .find(srv => srv.id === this.props.params.id);

    this.props.dispatch(
      setStatus(`Server "${server.client} - ${server.name}" will be removed`)
    );
  }

  onPress (choice) {
    if (choice === 'yes') {
      this.props.dispatch(removeServer(this.props.params.id));
    }
    this.context.history.goBack();
  }

  handleKeypress (ch, key) {
    switch (key.full) {
    case 'tab':
      this.refs.box.screen.focusNext();
      break;
    case 'S-tab':
      this.refs.box.screen.focusPrev();
      break;
    default: return false;
    }
  }

  render () {
    const { items, params } = this.props;
    const { theme } = this.context;
    const server = items.find(srv => srv.id === params.id);
    const styles = merge({}, theme.box.normal, theme.box.focus, theme.danger);
    return (
      <box shrink shadow ref="box" position={{ left: 'center', top: 'center', height: 8 }} border="line" style={styles}>
        <text
          position={{ top: 1 }}
          height={2}
          style={styles}
          content={` Are you sure you want to remove server [${server.client} - ${server.name}]? `}
        />
        <box position={{ left: 'center', bottom: 1, height: 1, width: 10 }} style={styles}>
          <button
            shrink mouse keys input
            position={{ left: 0, bottom: 0 }}
            content=" Yes "
            style={theme.button}
            onKeypress={::this.handleKeypress}
            onPress={this.onPress.bind(this, 'yes')}
          />
          <button
            shrink mouse keys focused
            position={{ left: 6, bottom: 0 }}
            content=" No "
            style={theme.button}
            onKeypress={::this.handleKeypress}
            onPress={this.onPress.bind(this, 'no')}
          />
        </box>
      </box>
    );
  }

}


export default connect(
  state => state.servers
)(ServerRemove);
