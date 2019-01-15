import React from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  SwText,
  SwTextInput,
  SwStyleSheet,
  SwAvoidKeyboard,
} from 'sw-react-native-ui';
import { GradientButton } from '../../components/index';
import { PasswordTextInput } from '../../components/PasswordTextInput';
import {
  DatePicker,
  DatePart,
} from '../../components/picker/DatePicker';
import { CardInput } from '../../components/CardInput';
import { scale } from '../../utils/scale';
import NavigationType from '../../config/navigation/NavigationType';

export class AddToCardForm extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Add Card'.toUpperCase(),
  };

  state = {
    nameOnCard: '',
    cardCode: '',
    expireYear: 2017,
    expireMonth: 8,
    pickerVisible: false,
  };

  onDatePickerConfirm = (date) => {
    this.setState({
      expireMonth: date.month.key,
      expireYear: date.year,
      pickerVisible: false,
    });
  };

  onDatePickerCancel = () => {
    this.setState({ pickerVisible: false });
  };

  onAddButtonPressed = () => {
    this.props.navigation.goBack();
  };

  render = () => (
    <SwAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={[styles.formContent]}>
        <View>
          <View>
            <View style={[styles.textRow]}>
              <SwText swType='subtitle'>Card Number</SwText>
            </View>
            <CardInput />
          </View>

          <View style={[styles.content]}>
            <View style={[styles.textRow]}>
              <SwText swType='subtitle'>Expire date</SwText>
            </View>
            <View style={[styles.expireDateBlock]}>
              <DatePicker
                onConfirm={this.onDatePickerConfirm}
                onCancel={this.onDatePickerCancel}
                selectedYear={this.state.expireYear}
                selectedMonth={this.state.expireMonth}
                visible={this.state.pickerVisible}
                customDateParts={[DatePart.YEAR, DatePart.MONTH]}
              />
              <View style={[styles.expireDateInput, styles.balloon]}>
                <TouchableOpacity onPress={() => this.setState({ pickerVisible: true })}>
                  <SwText swType='medium' style={styles.expireDateInnerInput}>
                    {this.state.expireMonth}
                  </SwText>
                </TouchableOpacity>
              </View>
              <View style={[styles.expireDateDelimiter]} />
              <View style={[styles.expireDateInput, styles.balloon]}>
                <TouchableOpacity onPress={() => this.setState({ pickerVisible: true })}>
                  <SwText swType='medium' style={styles.expireDateInnerInput}>
                    {this.state.expireYear}
                  </SwText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.content]}>
            <View style={[styles.textRow]}>
              <SwText swType='subtitle'>Name On Card</SwText>
            </View>
            <SwTextInput
              swType='rounded'
              onChangeText={(nameOnCard) => this.setState({ nameOnCard })}
              value={this.state.nameOnCard}
            />
          </View>

          <View style={[styles.content]}>
            <View style={[styles.textRow]}>
              <SwText swType='subtitle'>Card Code</SwText>
            </View>
            <PasswordTextInput
              maxLength={3}
              keyboardType='numeric'
              onChangeText={(cardCode) => this.setState({ cardCode })}
              value={this.state.cardCode}
            />
          </View>
        </View>
        <View>
          <GradientButton
            swType='large'
            text='ADD TO CARD'
            onPress={this.onAddButtonPressed}
          />
        </View>
      </View>
    </SwAvoidKeyboard>
  );
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    padding: 15,
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  content: {
    marginTop: 10,
  },
  formContent: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  textRow: {
    marginLeft: 20,
  },
  expireDateBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  expireDateInput: {
    flex: 0.48,
    marginVertical: 10,
  },
  expireDateInnerInput: {
    textAlign: 'center',
  },
  expireDateDelimiter: {
    flex: 0.04,
  },
  balloon: {
    maxWidth: scale(250),
    padding: 15,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: theme.colors.border.solid,
  },
}));
