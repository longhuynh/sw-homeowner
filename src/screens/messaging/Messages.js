import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SwStyleSheet, SwCard, SwText, SwTextInput } from 'sw-react-native-ui';
import { Avatar } from '../../components/index';
import { FontAwesome } from '../../assets/icons';
import { data } from '../../data/DataProvider';
import NavigationType from '../../config/navigation/NavigationType';
import _ from 'lodash';

const moment = require('moment');

export class Messages extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Messages',
  };

  state = {
    data: {
      original: data.getChatList(),
      filtered: data.getChatList(),
    },
  };

  extractItemKey = (item) => `${item.withUser.id}`;

  onInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const chats = _.filter(this.state.data.original, chat => {
      const filterResult = {
        firstName: chat.withUser.firstName.search(pattern),
        lastName: chat.withUser.lastName.search(pattern),
      };
      return filterResult.firstName !== -1 || filterResult.lastName !== -1 ? chat : undefined;
    });
    this.setState({
      data: {
        original: this.state.data.original,
        filtered: chats,
      },
    });
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderInputLabel = () => (
    <SwText swType='awesome'>{FontAwesome.search}</SwText>
  );

  renderItem = ({ item }) => {
    const last = item.messages[item.messages.length - 1];
    return (
      <View style={styles.itemContainer}>
        {/* <Avatar swType='circle' style={styles.avatar} img={item.withUser.photo} /> */}
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <SwText swType='header5'>{`${item.withUser.firstName} ${item.withUser.lastName}`}</SwText>
            <SwText swType='secondary4 hintColor'>
              {moment().add(last.time, 'seconds').format('LT')}
            </SwText>
          </View>
          <SwText numberOfLines={2} swType='primary3 mediumLine' style={{ paddingTop: 5 }}>
            {last.text}
          </SwText>
        </View>
      </View>
    );
  };

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <FlatList
          style={styles.root}
          data={this.state.data.filtered}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
        />
      </SwCard>
    </View>
  );
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: theme.colors.screen.scroll,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 15,
    borderColor: theme.colors.border.card,
    backgroundColor: theme.colors.screen.base,
  },
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  itemContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
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
