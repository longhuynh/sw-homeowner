import React from 'react';
import { View } from 'react-native';
import {
  SwText,
  SwButton,
  SwComponent,
} from 'sw-react-native-ui';
import { FontAwesome } from '../../assets/icons';

export class SocialBar extends SwComponent {
  componentName = 'SocialBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {},
  };
  static data = {
    likes: 18,
    comments: 26,
    shares: 5,
  };

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes || SocialBar.data.likes,
      comments: this.props.comments || SocialBar.data.comments,
      shares: this.props.shares || SocialBar.data.shares,
    };
  }

  onLikeButtonPressed = () => {
    const defaultCount = SocialBar.data.likes;
    this.setState({
      likes: this.state.likes === defaultCount ? this.state.likes + 1 : defaultCount,
    });
  };

  onCommentButtonPressed = () => {
    const defaultCount = SocialBar.data.comments;
    this.setState({
      comments: this.state.comments === defaultCount ? this.state.comments + 1 : defaultCount,
    });
  };

  onShareButtonPressed = () => {
    const defaultCount = SocialBar.data.shares;
    this.setState({
      shares: this.state.shares === defaultCount ? this.state.shares + 1 : defaultCount,
    });
  };

  render() {
    const {
      container, section, icon, label,
    } = this.defineStyles();

    const likes = this.state.likes + (this.props.showLabel ? ' Likes' : '');
    const comments = this.state.comments + (this.props.showLabel ? ' Comments' : '');
    const shares = this.state.shares + (this.props.showLabel ? ' Shares' : '');

    return (
      <View style={container}>
        <View style={section}>
          <SwButton swType='clear' onPress={this.onLikeButtonPressed}>
            <SwText swType='awesome primary' style={icon}>{FontAwesome.heart}</SwText>
            <SwText swType='primary primary4' style={label}>{likes}</SwText>
          </SwButton>
        </View>
        <View style={section}>
          <SwButton swType='clear' onPress={this.onCommentButtonPressed}>
            <SwText swType='awesome hintColor' style={icon}>{FontAwesome.comment}</SwText>
            <SwText swType='primary4 hintColor' style={label}>{comments}</SwText>
          </SwButton>
        </View>
        <View style={section}>
          <SwButton swType='clear' onPress={this.onShareButtonPressed}>
            <SwText swType='awesome hintColor' style={icon}>{FontAwesome.user}</SwText>
            <SwText swType='primary4 hintColor' style={label}>{shares}</SwText>
          </SwButton>
        </View>
      </View>
    );
  }
}
