import React from 'react';
import { View, StyleSheet} from 'react-native';
import { SwTextInput, SwStyleSheet} from 'sw-react-native-ui';
import { data } from '../../../data/DataProvider';

export class MailingInfo extends React.Component {
  user = data.getUser();

  state = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    country: this.user.country,
    phone: this.user.phone,
    address: this.user.address,
    city: this.user.city,
    state: this.user.state,
    zipcode: this.user.zipcode,
  };

  onAddressInputChanged = (text) => {
    this.setState({ address: text });
  };

  onCityInputChanged = (text) => {
    this.setState({ city: text });
  };

  onStateInputChanged = (text) => {
    this.setState({ state: text });
  };

  onZipCodeInputChanged = (text) => {
    this.setState({ zipcode: text });
  };

  render = () => (
    <View>
      <View style={styles.row}>
        <SwTextInput
          label='Address'
          returnKeyType='next'
          value={this.state.address}
          swType='right clear'
          onChangeText={this.onAddressInputChanged}
        />
      </View>
      <View style={styles.row}>
        <SwTextInput
          label='City'
          returnKeyType='next'
          value={this.state.city}
          swType='right clear'
          onChangeText={this.onCityInputChanged}
        />
      </View>
      <View style={styles.row}>
        <SwTextInput
          label='State'
          returnKeyType='next'
          value={this.state.state}
          swType='right clear'
          onChangeText={this.onStateInputChanged}
        />
      </View>
      <View style={styles.row}>
        <SwTextInput
          label='Zip Code'
          returnKeyType='next'
          value={this.state.zipcode}
          swType='right clear'
          onChangeText={this.onZipCodeInputChanged}
        />
      </View>
    </View>
  );
}

const styles = SwStyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  }
}));
