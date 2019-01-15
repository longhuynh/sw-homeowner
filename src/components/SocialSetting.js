import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  SwText,
  SwTheme,
} from 'sw-react-native-ui';
import PropTypes from 'prop-types';
import { SwSwitch } from './switch/SwSwitch';

export class SocialSetting extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    selected: PropTypes.bool,
    tintColor: PropTypes.string,
  };
  static defaultProps = {
    selected: true,
    tintColor: SwTheme.current.colors.accent,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }

  onSwitchValueChanged = (value) => {
    this.setState({ selected: value });
  };

  render() {
    const color = this.state.selected ? this.props.tintColor : SwTheme.current.colors.disabled;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <SwText swType='awesome large' style={[styles.icon, { color }]}>{this.props.icon}</SwText>
          <SwText swType='small' style={{ color }}>{this.props.name}</SwText>
        </View>
        <SwSwitch value={this.state.selected} onValueChange={this.onSwitchValueChanged} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    alignItems: 'center',
  },
});
