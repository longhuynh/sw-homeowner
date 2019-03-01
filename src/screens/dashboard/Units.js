import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SwText, SwButton, SwStyleSheet } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { PageNames } from '../../config/AppConstants';
import { FontIcons } from '../../assets/icons';

export class Units extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Change Units'.toUpperCase(),
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

  items = [
    {
      id: '1',
      address: '6910 Pine Top Ln'
    },
    {
      id: '2',
      address: '9202 Elk Mountain Ct'
    },
    {
      id: '3',
      address: '5406 Pecan Leaf Dr'
    },    
    {
      id: '4',
      address: '5510 Pointed Leaf Ct'
    },
    {
      id: '5',
      address: '2309 Bullhorn Trl'
    }    
  ];
  

  renderItems = () => this.items.map(this.renderItem);

  renderItem = (item) => (
    <SwButton
      swType='tile'
      style={{ height: this.state.dimensions.width / 3, width: this.state.dimensions.width / 3 }}
      key={item.id}
      onPress={() => this.onItemPressed(item)}>
      <SwText style={styles.icon} swType='primary moon xxlarge'>
        {FontIcons.theme}
      </SwText>
      <SwText swType='small center'>{item.address}</SwText>
    </SwButton>
  );

  onItemPressed = (item) => {
    this.props.navigation.navigate(PageNames.Dashboard, {address: item.address});
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
