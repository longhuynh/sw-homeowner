import React from 'react';
import { FlatList, View, Platform, Image, TouchableOpacity, Keyboard, InteractionManager} from 'react-native';
import { SwButton, SwText, SwTextInput, SwAvoidKeyboard, SwStyleSheet, SwTheme} from 'sw-react-native-ui';
import _ from 'lodash';
import { FontAwesome } from '../../assets/icons';
import { data } from '../../data/DataProvider';
import { Avatar } from '../../components/avatar/Avatar';
import { scale } from '../../utils/scale';
import NavigationType from '../../config/navigation/NavigationType';

const moment = require('moment');

export class Chat extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = ({ navigation }) => {
    const userId = navigation.state.params ? navigation.state.params.userId : undefined;
    const user = data.getUser(userId);
    return ({
      headerTitle: Chat.renderNavigationTitle(navigation, user),
      headerRight: Chat.renderNavigationAvatar(navigation, user),
    });
  };

  constructor(props) {
    super(props);
    const userId = this.props.navigation.getParam('userId', undefined);
    this.state = {
      data: data.getConversation(userId),
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.listRef.scrollToEnd();
    });
  }

  setListRef = (ref) => {
    this.listRef = ref;
  };

  extractItemKey = (item) => `${item.id}`;

  scrollToEnd = () => {
    if (Platform.OS === 'ios') {
      this.listRef.scrollToEnd();
    } else {
      _.delay(this.listRef.scrollToEnd, 100);
    }
  };

  onInputChanged = (text) => {
    this.setState({ message: text });
  };

  onSendButtonPressed = () => {
    if (!this.state.message) {
      return;
    }
    this.state.data.messages.push({
      id: this.state.data.messages.length, time: 0, type: 'out', text: this.state.message,
    });
    this.setState({ message: '' });
    this.scrollToEnd(true);
  };

  static onNavigationTitlePressed = (navigation, user) => {
    navigation.navigate('ProfileV1', { id: user.id });
  };

  static onNavigationAvatarPressed = (navigation, user) => {
    navigation.navigate('ProfileV1', { id: user.id });
  };

  static renderNavigationTitle = (navigation, user) => (
    <TouchableOpacity onPress={() => Chat.onNavigationTitlePressed(navigation, user)}>
      <View style={styles.header}>
        <SwText swType='header5'>{`${user.firstName} ${user.lastName}`}</SwText>
        <SwText swType='secondary3 secondaryColor'>Online</SwText>
      </View>
    </TouchableOpacity>
  );

  static renderNavigationAvatar = (navigation, user) => (
    <TouchableOpacity onPress={() => Chat.onNavigationAvatarPressed(navigation, user)}>
      <Avatar style={styles.avatar} swType='small' img={user.photo} />
    </TouchableOpacity>
  );

  renderDate = (date) => (
    <SwText style={styles.time} swType='secondary7 hintColor'>
      {moment().add(date, 'seconds').format('LT')}
    </SwText>
  );

  renderItem = ({ item }) => {
    const isIncoming = item.type === 'in';
    const backgroundColor = isIncoming
      ? SwTheme.current.colors.chat.messageInBackground
      : SwTheme.current.colors.chat.messageOutBackground;
    const itemStyle = isIncoming ? styles.itemIn : styles.itemOut;

    return (
      <View style={[styles.item, itemStyle]}>
        {!isIncoming && this.renderDate(item.time)}
        <View style={[styles.balloon, { backgroundColor }]}>
          <SwText swType='primary2 mediumLine chat' style={{ paddingTop: 5 }}>{item.text}</SwText>
        </View>
        {isIncoming && this.renderDate(item.time)}
      </View>
    );
  };

  render = () => (
    <SwAvoidKeyboard
      style={styles.container}
      onResponderRelease={Keyboard.dismiss}>
      <FlatList
        ref={this.setListRef}
        extraData={this.state}
        style={styles.list}
        data={this.state.data.messages}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
      <View style={styles.footer}>
        <SwButton style={styles.plus} swType='clear'>
          <SwText swType='awesome secondaryColor'>{FontAwesome.plus}</SwText>
        </SwButton>
        <SwTextInput
          onFocus={this.scrollToEnd}
          onBlur={this.scrollToEnd}
          onChangeText={this.onInputChanged}
          value={this.state.message}
          swType='row sticker'
          placeholder='Add a comment...'
        />
        <SwButton onPress={this.onSendButtonPressed} style={styles.send} swType='circle highlight'>
          <Image source={require('../../assets/icons/sendIcon.png')} />
        </SwButton>
      </View>
    </SwAvoidKeyboard>

  )
}

const styles = SwStyleSheet.create(theme => ({
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end',
  },
  balloon: {
    maxWidth: scale(250),
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7,
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
}));
