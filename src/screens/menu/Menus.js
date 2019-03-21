/* eslint-disable react/no-multi-comp */
import React from 'react';

import { CategoryMenu } from './CategoryMenu';
import * as Routes from '../../config/navigation/RoutesBuilder';
import NavigationType from '../../config/navigation/NavigationType';

export class LoginMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Login',
  };

  render = () => (
    <CategoryMenu navigation={this.props.navigation} items={Routes.LoginRoutes} />
  );
}

export class NavigationMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Navigation',
  };

  render = () => (
    <CategoryMenu navigation={this.props.navigation} items={Routes.NavigationRoutes} />
  );
}

export class SocialMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Social',
  };

  render = () => (
    <CategoryMenu navigation={this.props.navigation} items={Routes.SocialRoutes} />
  );
}

export class ArticleMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Articles',
  };

  render = () => (
    <CategoryMenu navigation={this.props.navigation} items={Routes.ArticleRoutes} />
  );
}

export class MessagingMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Messaging',
  };
  
  render = () => (
    <CategoryMenu navigation={this.props.navigation} items={Routes.MessagingRoutes} />
  );
}