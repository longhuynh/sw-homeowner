import React from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
import { SwStyleSheet } from 'sw-react-native-ui';
import PropTypes from 'prop-types';

export class CornerLabel extends React.Component {
  static defaultProps = {
    alignment: 'left',
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    cornerRadius: PropTypes.number.isRequired,
    alignment: PropTypes.oneOf([
      'left',
      'right',
    ])
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.labelHeight = Math.sqrt(Math.pow(props.cornerRadius, 2) / 2);
    this.labelWidth = this.labelHeight * 2;

    let originOffset = Math.sqrt(Math.pow(this.labelHeight / 2, 2) / 2);
    let labelHorizontalPosition = -this.labelWidth / 2 + originOffset;
    let labelVerticalPosition = - this.labelHeight / 2 + originOffset;

    if (props.alignment == 'left') {
      this.labelPosition = { left: labelHorizontalPosition, top: labelVerticalPosition };
      this.labelTransform = { transform: [{ rotate: '-45deg' }] };
    }
    else {
      this.labelPosition = { right: labelHorizontalPosition, top: labelVerticalPosition };
      this.labelTransform = { transform: [{ rotate: '45deg' }] };
    }
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (!React.isValidElement(child)) {
        return <Text style={[styles.text, this.props.textStyle]}>{child}</Text>
      }
      return child
    })
  }

  render() {
    return (
      <View style={[styles.container,
                  this.labelPosition,
                  this.labelTransform,
                  { width: this.labelWidth, height: this.labelHeight, },
            ]}>
        <View style={[styles.label,
                { height: this.labelHeight },
                this.props.style,
              ]}>
          {this.renderChildren()}
        </View>
      </View>
    )
  }
}

let styles = SwStyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
