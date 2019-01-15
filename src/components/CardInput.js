import React from 'react';
import {
  SwButton,
  SwTextInput,
  SwText,
  SwStyleSheet,
} from 'sw-react-native-ui';
import { FontAwesome } from '../assets/icons';

export class CardInput extends React.Component {
  state = {
    hidden: true,
    cardNumber: '',
  };

  formatCreditNumber = (number, isHidden) => (
    isHidden
      ? number.replace(/\D/g, '')
      : number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
  );

  onInputLabelPressed = () => {
    this.setState({
      hidden: !this.state.hidden,
      cardNumber: this.formatCreditNumber(this.state.cardNumber, !this.state.hidden),
    });
  };

  onInputChanged = (text) => {
    this.setState({
      cardNumber: this.formatCreditNumber(text, this.state.hidden),
    });
  };

  renderInputLabel = () => (
    <SwButton
      style={styles.button}
      swType='clear'
      onPress={this.onInputLabelPressed}>
      <SwText style={styles.icon} swType='awesome secondaryColor'>{FontAwesome.slashEye}</SwText>
    </SwButton>
  );

  render = () => (
    <SwTextInput
      autoCapitalize='none'
      swType='bordered rounded iconRight'
      autoCorrect={false}
      label={this.renderInputLabel()}
      secureTextEntry={this.state.hidden}
      onChangeText={this.onInputChanged}
      value={this.state.cardNumber}
      keyboardType='numeric'
      maxLength={19}
      {...this.props}
    />
  );
}

let styles = SwStyleSheet.create({
  icon: {
    fontSize: 24,
  },
  button: {
    right: 17,
  },
});
