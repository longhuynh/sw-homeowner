import React from 'react';
import { TouchableHighlight, View, ScrollView, Platform, StyleSheet} from 'react-native';
import { SwStyleSheet, SwText, SwTheme} from 'sw-react-native-ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar} from '../../components/index';
import { FontAwesome } from '../../assets/icons';
import NavigationType from '../../config/navigation/NavigationType';
import { CurrentUser } from '../../services/LoginService';
import { PageNames } from '../../config/AppConstants';

const MenuRoutes =  [
  {
    id: PageNames.Dashboard,
    title: 'Dashboard',
    icon: 'tachometer-alt',
  },
  {
    id: 'AccountMenu',
    title: 'Account',
    icon: 'dollar-sign'
  },
  {
    id: 'ArchitecturalMenu',
    title: 'Architecturals',
    icon: 'hammer'
  },
  {
    id: 'WorkOrderMenu',
    title: 'Work Orders',
    icon: 'wrench'
  },
  {
    id: 'ViolationMenu',
    title: 'Violation',
    icon: 'exclamation-triangle'
  },
  {
    id: PageNames.Settings,
    title: 'Settings',
    icon: 'cog'
  },
];

export class SideMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  user = CurrentUser;

  getFullName(){
    const fullName = this.user.FirstName + ' ' + this.user.LastName;
    return fullName.length < 20 ? fullName : fullName.substring(0, 15) + ' ...';
  }

  onMenuItemPressed = (item) => {
    this.props.navigation.navigate(item.id);
  };

  onProfilePressed = () => {
    this.props.navigation.navigate('Profile');
  };

  renderAvatar = () => (
    <Avatar 
      style={styles.avatar} 
      swType='circle' 
      img={require('../../data/img/avatars/no-avatar.png')} />
  );

  renderMenu = () => MenuRoutes.map(this.renderMenuItem);

  renderMenuItem = (item) => (
    <TouchableHighlight
      style={styles.container}
      key={item.id}
      underlayColor={SwTheme.current.colors.button.underlay}
      activeOpacity={1}
      onPress={() => this.onMenuItemPressed(item)}>
      <View style={styles.content}>
        <View style={styles.content}>
          <FontAwesome5 name={item.icon} size={20} style={styles.icon} />
          <SwText>{item.title}</SwText>
        </View>
        <SwText swType='awesome small'>{FontAwesome.chevronRight}</SwText>
      </View>
    </TouchableHighlight>
  );

  render = () => (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableHighlight   
          underlayColor={SwTheme.current.colors.button.underlay}
          activeOpacity={1}
          onPress={() => this.onProfilePressed()}>
          <View style={[styles.container, styles.content]}>
            {this.renderAvatar()}      
            <View style={styles.userInfo}>
              <SwText numberOfLines={1} swType='header5'>{this.getFullName()}</SwText>
              <SwText numberOfLines={1} swType='secondary4'>{this.user.Email}</SwText>          
            </View>
          </View>
        </TouchableHighlight>
        {this.renderMenu()}
      </ScrollView>
    </View>
  )
}

const styles = SwStyleSheet.create(theme => ({
  container: {
    height: 80,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: theme.colors.screen.base,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
  },
  userInfo: {
    marginLeft: 20,
  },
  img: {
    margin: 0,
  },
  icon: {
    marginRight: 13,
    color: theme.colors.primary
  },
}));
