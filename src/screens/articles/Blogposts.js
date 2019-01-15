import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  SwCard, SwStyleSheet,
  SwText,
} from 'sw-react-native-ui';
import { Avatar } from '../../components/index';
import { data } from '../../data/DataProvider';
import NavigationType from '../../config/navigation/NavigationType';

const moment = require('moment');

export class Blogposts extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Blogposts'.toUpperCase(),
  };

  state = {
    data: data.getArticles('post'),
  };

  extractItemKey = (item) => `${item.id}`;

  onItemPressed = (item) => {
    this.props.navigation.navigate('Article', { id: item.id });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.onItemPressed(item)}>
      <SwCard swType='blog' style={styles.card}>
        <Image swCardImg source={item.photo} />
        <View swCardHeader style={styles.content}>
          <SwText style={styles.section} swType='header4'>{item.title}</SwText>
        </View>
        <View swCardContent>
          <View>
            <SwText swType='primary3 mediumLine' numberOfLines={2}>{item.text}</SwText>
          </View>
        </View>
        <View swCardFooter>
          <View style={styles.userInfo}>
            <Avatar style={styles.avatar} swType='circle small' img={item.user.photo} />
            <SwText swType='header6'>{`${item.user.firstName} ${item.user.lastName}`}</SwText>
          </View>
          <SwText swType='secondary2 hintColor'>{moment().add(item.time, 'seconds').fromNow()}</SwText>
        </View>
      </SwCard>
    </TouchableOpacity>
  );

  render = () => (
    <FlatList
      data={this.state.data}
      renderItem={this.renderItem}
      keyExtractor={this.extractItemKey}
      style={styles.container}
    />
  );
}

const styles = SwStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}));
