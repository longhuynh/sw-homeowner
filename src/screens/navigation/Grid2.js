import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {
  SwText,
  SwButton,
  SwStyleSheet,
} from 'sw-react-native-ui';
import { MainRoutes } from '../../config/navigation/Routes';
import NavigationType from '../../config/navigation/NavigationType';

export class GridV2 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Grid Menu'.toUpperCase(),
  };

  state = {
    dimensions: undefined,
  };

  onContainerLayout = (event) => {
    if (this.state.height) {
      return;
    }
    const dimensions = event.nativeEvent.layout;
    this.setState({ dimensions });
  };

  renderItems = () => MainRoutes.map(this.renderItem);

  renderItem = (item) => (
    <SwButton
      swType='tile'
      style={{ height: this.state.dimensions.width / 3, width: this.state.dimensions.width / 3 }}
      key={item.id}
      onPress={() => this.onItemPressed(item)}>
      <SwText style={styles.icon} swType='primary moon xxlarge'>
        {item.icon}
      </SwText>
      <SwText swType='small'>{item.title}</SwText>
    </SwButton>
  );

  onItemPressed = (item) => {
    this.props.navigation.navigate(item.id);
  };

  render() {
    const items = this.state.dimensions === undefined ? <View /> : this.renderItems();
    return (
      <ScrollView
        style={styles.root}
        onLayout={this.onContainerLayout}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  icon: {
    marginBottom: 16,
  },
}));
