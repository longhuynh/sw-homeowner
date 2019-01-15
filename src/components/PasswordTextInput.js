import React from 'react';
import {
  SwButton,
  SwTextInput,
  SwText,
  SwStyleSheet,
} from 'sw-react-native-ui';
import { FontAwesome } from '../assets/icons';

export class PasswordTextInput extends React.Component {
  state = {
    hidden: true,
  };

  onInputLabelPressed = () => {
    this.setState({ hidden: !this.state.hidden });
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
      {...this.props}
    />
  );
}

const styles = SwStyleSheet.create({
  icon: {
    fontSize: 24,
  },
  button: {
    right: 17,
  },
});
