import React from 'react';
import { FlatList, View, StyleSheet} from 'react-native';
import { SwStyleSheet, SwText} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import NavigationType from '../../config/navigation/NavigationType';

const moment = require('moment');

export class Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Comments'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId', undefined);
    this.state = {
      data: data.getComments(postId),
    };
  }

  extractItemKey = (item) => `${item.id}`;

  onItemPressed = (item) => {
    const navigationParams = { id: item.user.id };
    this.props.navigation.navigate('Profile', navigationParams);
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5'>01/10/2019 ({`${item.user.firstName} ${item.user.lastName}`})</SwText>
          <SwText swType='secondary4 hintColor'>
            
          </SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{item.text}</SwText>
      </View>
    </View>
  );

  render = () => (
    <FlatList
      style={styles.root}
      data={this.state.data}
      extraData={this.state}
      ItemSeparatorComponent={this.renderSeparator}
      keyExtractor={this.extractItemKey}
      renderItem={this.renderItem}
    />
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
}));
