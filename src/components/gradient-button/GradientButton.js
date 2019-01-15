import React from 'react';
import { LinearGradient } from 'expo';
import {
  SwButton,
  SwText,
  SwComponent,
} from 'sw-react-native-ui';

export class GradientButton extends SwComponent {
  componentName = 'GradientButton';
  typeMapping = {
    button: {},
    gradient: {},
    text: {},
  };

  renderContent = (textStyle) => {
    const hasText = this.props.text === undefined;
    return hasText ? this.props.children : this.renderText(textStyle);
  };

  renderText = (textStyle) => (
    <SwText style={textStyle}>{this.props.text}</SwText>
  );

  render() {
    const { button, gradient, text: textStyle } = this.defineStyles();
    const { style, swType, ...restProps } = this.props;
    const colors = this.props.colors || this.extractNonStyleValue(gradient, 'colors');
    return (
      <SwButton
        swType='stretch'
        style={[button, style]}
        {...restProps}>
        <LinearGradient
          colors={colors}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[gradient]}>
          {this.renderContent(textStyle)}
        </LinearGradient>
      </SwButton>
    );
  }
}
