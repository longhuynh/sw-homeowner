import React from 'react';
import { FlatList, View, Image} from 'react-native';
import { SwCard, SwText, SwStyleSheet} from 'sw-react-native-ui';
import { Avatar } from '../../components/avatar/Avatar';
import { SocialBar } from '../../components/social-bar/SocialBar';
import { data } from '../../data/DataProvider';

const moment = require('moment');

export class Feed extends React.Component {
  static navigationOptions = {
    title: 'Feed'.toUpperCase(),
  };

  state = {
    data: data.getArticles('post'),
  };

  extractItemKey = (item) => `${item.id}`;

  renderItem = ({ item }) => (
    <SwCard style={styles.card}>
      <View swCardHeader>
        <Avatar
          swType='small'
          style={styles.avatar}
          img={item.user.photo}
        />
        <View>
          <SwText swType='header4'>{`${item.user.firstName} ${item.user.lastName}`}</SwText>
          <SwText swType='secondary2 hintColor'>{moment().add(item.time, 'seconds').fromNow()}</SwText>
        </View>
      </View>
      <Image swCardImg source={item.photo} />
      <View swCardContent>
        <SwText swType='primary3'>{item.text}</SwText>
      </View>
      <View swCardFooter>
        <SocialBar />
      </View >
    </SwCard>
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
    paddingHorizontal: 10,
  },
  card: {
    marginVertical: 8,
  },
  avatar: {
    marginRight: 16,
  },
}));
