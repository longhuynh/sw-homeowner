import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { data } from '../../data/DataProvider';
import { Avatar } from '../../components/avatar/Avatar';
import NavigationType from '../../config/navigation/NavigationType';

export class Dashboard extends React.Component {
  static navigationOptions = {
    title: 'Dashboard'.toUpperCase(),
  };

  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    const userId = 1;
    const user = data.getUser(userId);
    return ({
      headerTitle: Dashboard.renderNavigationTitle(navigation, user),
      headerLeft: Dashboard.renderNavigationAvatar(navigation, user),
    });
  };

  state = {
    data: {
      items: [
        {
          name: 'Balance',
          screen: 'AccountSummary',
          value: '$4,512',
          icon: 'dollar-sign',
          background: 'rgb(134, 19, 136)'
        },
        {
          name: 'Arc/Arb',
          screen: 'Architecturals',
          value: '4',
          icon: 'hammer',
          background: 'rgb(59, 157, 214)'
        },
        {
          name: 'Work Orders',
          screen: 'WorkOrders',
          value: '12',
          icon: 'wrench',
          background: 'rgb(255, 127, 29)'
        },
        {
          name: 'Violations',
          screen: 'Violations',
          value: '5',
          icon: 'exclamation-triangle',
          background: 'rgb(102, 188, 69)'
        }
      ],
    },
  };

  gotoScreen(screen) {
    this.props.navigation.navigate(screen);
  }

  static onNavigationTitlePressed = (navigation, user) => {
    navigation.navigate('Units');
  };

  static onNavigationAvatarPressed = (navigation, user) => {
    navigation.navigate('Profile', { id: user.id });
  };

  static renderNavigationTitle = (navigation, user) => (
    <TouchableOpacity onPress={() => Dashboard.onNavigationTitlePressed(navigation, user)}>
      <View style={styles.header}>
        <SwText swType='header5'>{`${user.firstName} ${user.lastName}`}</SwText>
        <SwText swType='secondary2 secondaryColor'>{`${user.address}`}</SwText>
      </View>
    </TouchableOpacity>
  );

  static renderNavigationAvatar = (navigation, user) => (
    <TouchableOpacity onPress={() => Dashboard.onNavigationAvatarPressed(navigation, user)}>
      <Avatar style={styles.avatar} swType='small' img={user.photo} />
    </TouchableOpacity>
  );

  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => {this.gotoScreen(item.screen) }} key={item.screen}>
      <View style={[styles.container, { backgroundColor: item.background }]} >
        <View>
          <SwText swType='header2' style={styles.name}>{item.name}</SwText>
          <SwText swType='secondary1' style={styles.value}>{item.value}</SwText>
        </View>
        <FontAwesome5 name={item.icon} size={50} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  render = () => {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.items} >
          {this.state.data.items.map(this.renderStatItem)}
        </View>
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 20,    
  },
  items: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  value: {
    color: 'white',
  },
  name: {
    color: 'white',
  },
}));
