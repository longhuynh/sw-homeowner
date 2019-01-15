import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SwText, SwButton, SwStyleSheet } from 'sw-react-native-ui';
import { FontAwesome } from '../assets/icons';
import { UIConstants } from '../config/AppConstants';
import NavigationType from '../config/navigation/NavigationType';

export class NavBar extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
    headerProps: PropTypes.shape().isRequired,
  };

  onNavigationLeftMenuButtonPressed = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  onNavigationLeftBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  renderTitleItem = (title, options) => {
    const isCustom = options !== undefined;
    return isCustom ? this.renderCustomTitleItem(options) : this.renderNavigationTitleItem(title);
  };

  renderLeftItem = (options) => {
    const isCustom = options !== undefined;
    return isCustom ? this.renderCustomLeftItem(options) : this.renderNavigationLeftItem();
  };

  renderRightItem = (options) => {
    const isCustom = options !== undefined;
    return isCustom ? this.renderCustomRightItem(options) : this.renderNavigationRightItem();
  };

  renderNavigationTitleItem = (title) => (
    <View style={styles.title}>
      <SwText>{title}</SwText>
    </View>
  );

  renderNavigationLeftBackItem = () => (
    <SwButton
      swType='clear'
      style={styles.menu}
      onPress={this.onNavigationLeftBackButtonPressed}>
      <SwText swType='awesome hero'>{FontAwesome.chevronLeft}</SwText>
    </SwButton>
  );

  renderNavigationLeftMenuItem = () => (
    <SwButton
      swType='clear'
      style={styles.menu}
      onPress={this.onNavigationLeftMenuButtonPressed}>
      <SwText swType='awesome'>{FontAwesome.bars}</SwText>
    </SwButton>
  );

  renderNavigationLeftItemContent = (sceneIndex) => {
    const isFirstScene = sceneIndex === 0;
    return isFirstScene ? this.renderNavigationLeftMenuItem() : this.renderNavigationLeftBackItem();
  };

  renderNavigationLeftItem = () => {
    const sceneIndex = _.findIndex(this.props.headerProps.scenes, { isActive: true });
    return (
      <View style={styles.left}>
        {this.renderNavigationLeftItemContent(sceneIndex)}
      </View>
    );
  };

  renderNavigationRightItem = () => undefined;

  renderCustomTitleItem = (options) => (
    <View
      style={styles.title}>
      {options}
    </View>
  );

  renderCustomLeftItem = (options) => (
    <View style={styles.left}>{options}</View>
  );

  renderCustomRightItem = (options) => (
    <View style={styles.right}>{options}</View>
  );

  render() {
    const { options } = this.props.headerProps.scene.descriptor;
    return (
      <View style={styles.layout}>
        <View style={styles.container}>
          {this.renderTitleItem(options.title, options.headerTitle)}
          {this.renderLeftItem(options.headerLeft)}
          {this.renderRightItem(options.headerRight)}
        </View>
      </View>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  layout: {
    backgroundColor: theme.colors.screen.base,
    paddingTop: UIConstants.StatusbarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.base,
  },
  container: {
    flexDirection: 'row',
    height: UIConstants.AppbarHeight,

  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  title: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 40,
  },
}));
