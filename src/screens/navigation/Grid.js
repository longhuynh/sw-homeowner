import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { SwButton, SwStyleSheet, SwText } from 'sw-react-native-ui';
import { MainRoutes } from '../../config/navigation/Routes';
import NavigationType from '../../config/navigation/NavigationType';

const paddingValue = 8;

export class GridV1 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Grid Menu',
  };

  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get('window').width;
    this.itemSize = {
      width: (screenWidth - (paddingValue * 6)) / 2,
      height: (screenWidth - (paddingValue * 6)) / 2,
    };
  }

  onItemPressed = (item) => {
    this.props.navigation.navigate(item.id);
  };

  renderItems = () => MainRoutes.map(route => (
    <SwButton
      swType='square shadow'
      style={{ ...this.itemSize }}
      key={route.id}
      onPress={() => this.onItemPressed(route)}>
      <SwText style={styles.icon} swType='primary moon menuIcon'>
        {route.icon}
      </SwText>
      <SwText>{route.title}</SwText>
    </SwButton>
  ));

  render = () => (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContainer}>
      {this.renderItems()}
    </ScrollView>
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.scroll,
    padding: paddingValue,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    marginBottom: 16,
  },
}));
