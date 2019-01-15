import React from 'react';

import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  SwCard,
  SwText,
  SwStyleSheet,
} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import {
  Avatar,
  SocialBar,
} from '../../components/index';
import NavigationType from '../../config/navigation/NavigationType';

const moment = require('moment');

export class Article extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Article View'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const articleId = this.props.navigation.getParam('id', 1);
    this.data = data.getArticle(articleId);
  }

  onAvatarPressed = () => {
    this.props.navigation.navigate('Profile', { id: this.data.user.id });
  };

  render = () => (
    <ScrollView style={styles.root}>
      <SwCard swType='article'>
        <Image swCardImg source={this.data.photo} />
        <View swCardHeader>
          <View>
            <SwText style={styles.title} swType='header4'>{this.data.header}</SwText>
            <SwText swType='secondary2 hintColor'>
              {moment().add(this.data.time, 'seconds').fromNow()}
            </SwText>
          </View>
          <TouchableOpacity onPress={this.onAvatarPressed}>
            <Avatar swType='circle' img={this.data.user.photo} />
          </TouchableOpacity>
        </View>
        <View swCardContent>
          <View>
            <SwText swType='primary3 bigLine'>{this.data.text}</SwText>
          </View>
        </View>
        <View swCardFooter>
          <SocialBar />
        </View>
      </SwCard>
    </ScrollView>
  )
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  title: {
    marginBottom: 5,
  },
}));
