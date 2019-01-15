import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  SwText,
  SwCard,
  SwStyleSheet,
} from 'sw-react-native-ui';
import { SocialBar } from '../../components/index';
import { data } from '../../data/DataProvider';
import NavigationType from '../../config/navigation/NavigationType';


export class Articles extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Article List'.toUpperCase(),
  };

  state = {
    data: data.getArticles(),
  };

  extractItemKey = (item) => `${item.id}`;

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.props.navigation.navigate('Article', { id: item.id })}>
      <SwCard swType='horizontal' style={styles.card}>
        <Image swCardImg source={item.photo} />
        <View swCardContent>
          <SwText numberOfLines={1} swType='header6'>{item.header}</SwText>
          <SwText swType='secondary6 hintColor'>
            {`${item.user.firstName} ${item.user.lastName}`}
          </SwText>
          <SwText style={styles.post} numberOfLines={2} swType='secondary1'>{item.text}</SwText>
        </View>
        <View swCardFooter>
          <SocialBar swType='space' showLabel />
        </View >
      </SwCard>
    </TouchableOpacity>
  );

  render = () => (
    <View>
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
        style={styles.container}
      />
    </View>
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
  post: {
    marginTop: 13,
  },
}));
