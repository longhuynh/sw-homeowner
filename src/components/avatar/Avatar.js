import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import {
  SwComponent,
  SwText,
  SwTheme,
} from 'sw-react-native-ui';
import { FontAwesome } from '../../assets/icons';

export class Avatar extends SwComponent {
  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    badge: {},
    badgeText: {},
  };

  getBadgeStyle = (badgeProps) => {
    switch (badgeProps) {
      case 'like':
        return {
          symbol: FontAwesome.heart,
          backgroundColor: SwTheme.current.colors.badge.likeBackground,
          color: SwTheme.current.colors.badge.likeForeground,
        };
      case 'follow':
        return {
          symbol: FontAwesome.plus,
          backgroundColor: SwTheme.current.colors.badge.plusBackground,
          color: SwTheme.current.colors.badge.plusForeground,
        };
      default: return {};
    }
  };

  renderImg = (styles) => (
    <View>
      <Image style={styles.image} source={this.props.img} />
      { this.props.badge && this.renderBadge(styles.badge)}
    </View>
  );

  renderBadge = (style, textStyle) => {
    const badgeStyle = this.getBadgeStyle(this.props.badge);
    return (
      <View style={[style, { backgroundColor: badgeStyle.backgroundColor }]}>
        <SwText swType='awesome' style={[textStyle, { color: badgeStyle.color }]}>
          {badgeStyle.symbol}
        </SwText>
      </View>
    );
  };

  render() {
    const { container, ...other } = this.defineStyles();
    return (
      <View style={[container, this.props.style]}>
        {this.renderImg(other)}
      </View>
    );
  }
}
