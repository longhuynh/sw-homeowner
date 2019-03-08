import React from 'react';
import { TouchableHighlight, View, ScrollView, Platform, StyleSheet} from 'react-native';
import { SwStyleSheet, SwText, SwTheme} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { Avatar} from '../../components/index';
import { MenuRoutes } from '../../config/navigation/Routes';
import { FontAwesome } from '../../assets/icons';
import NavigationType from '../../config/navigation/NavigationType';

export class SideMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  user = data.getUser();

  onMenuItemPressed = (item) => {
    this.props.navigation.navigate(item.id);
  };

  onProfilePressed = () => {
    this.props.navigation.navigate('Profile');
  };

  renderIcon = () => (
    <Avatar
      img={this.user.photo}
      swType='circle'
      style={styles.avatar}
    />
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
          <SwText
            style={styles.icon}
            swType='moon primary xlarge'>{item.icon}
          </SwText>
          <SwText>{item.title}</SwText>
        </View>
        <SwText swType='awesome secondaryColor small'>{FontAwesome.chevronRight}</SwText>
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
            {this.renderIcon()}      
            <View style={styles.userInfo}>
              <SwText swType='header5'>{`${this.user.firstName} ${this.user.lastName}`}</SwText>
              <SwText swType='secondary4'>{`${this.user.city}, ${this.user.state}`}</SwText>          
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
  },
}));
