import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  SwText,
  SwCard,
  SwButton,
  SwStyleSheet,
  SwTheme,
} from 'sw-react-native-ui';
import { LinearGradient } from 'expo';
import { data } from '../../data/DataProvider';
import { PasswordTextInput } from '../../components/PasswordTextInput';
import { UIConstants } from '../../config/AppConstants';
import { scaleVertical } from '../../utils/scale';

export class Cards extends React.Component {
  static navigationOptions = {
    title: 'Cards'.toUpperCase(),
  };

  state = {
    data: data.getCards(),
    modalVisible: false,
  };

  getCardStyle = (type) => {
    switch (type) {
      case 'visa':
        return {
          gradient: SwTheme.current.colors.gradients.visa,
          icon: require('../../assets/icons/visaIcon.png'),
        };
      case 'mastercard':
        return {
          gradient: SwTheme.current.colors.gradients.mastercard,
          icon: require('../../assets/icons/masterCardIcon.png'),
        };
      case 'axp':
        return {
          gradient: SwTheme.current.colors.gradients.axp,
          icon: require('../../assets/icons/americanExpressIcon.png'),
        };
      default: return {};
    }
  };

  formatCurrency = (amount, currency) => {
    switch (currency) {
      case 'usd':
        return `$${amount}`;
      case 'eur':
        return `€${amount}`;
      default: return '';
    }
  };

  prepareCardNo = (cardNo) => {
    const re = /\*+/;
    const parts = cardNo.split(re);
    return {
      firstPart: parts[0],
      lastPart: parts[1],
    };
  };

  renderFooter = () => (
    <View style={styles.footer}>
      <SwButton style={styles.button} swType='circle highlight'>
        <Image source={require('../../assets/icons/iconPlus.png')} />
      </SwButton>
    </View>
  );

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  onItemPressed = () => {
    this.setModalVisible(true);
  };

  extractItemKey = (item) => `${item.id}`;

  renderItem = ({ item }) => {
    const { gradient, icon } = this.getCardStyle(item.type);
    const { firstPart, lastPart } = this.prepareCardNo(item.cardNo);

    return (
      <SwCard swType='credit' style={styles.card}>
        <TouchableOpacity
          delayPressIn={70}
          activeOpacity={0.8}
          onPress={this.onItemPressed}>
          <LinearGradient
            colors={gradient}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.background}>
            <View swCardHeader>
              <SwText swType='header4 inverseColor'>{item.bank}</SwText>
              <Image source={icon} />
            </View>
            <View swCardContent>
              <View style={styles.cardNoContainer}>
                <SwText style={styles.cardNo} swType='header2 inverseColor'>{firstPart}</SwText>
                <SwText style={[styles.cardNo, styles.cardPlaceholder]} swType='header2 inverseColor'>* * * *</SwText>
                <SwText style={[styles.cardNo, styles.cardPlaceholder]} swType='header2 inverseColor'>* * * *</SwText>
                <SwText style={styles.cardNo} swType='header2 inverseColor'>{lastPart}</SwText>
              </View>
              <SwText style={styles.date} swType='header6 inverseColor'>{item.date}</SwText>
            </View>
            <View swCardFooter>
              <View>
                <SwText swType='header4 inverseColor'>{item.currency.toUpperCase()}</SwText>
                <SwText swType='header6 inverseColor'>{item.name.toUpperCase()}</SwText>
              </View>
              <SwText
                swType='header2 inverseColor'>{this.formatCurrency(item.amount, item.currency)}
              </SwText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </SwCard>
    );
  };

  render = () => (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={this.renderFooter}
        keyExtractor={this.extractItemKey}
        data={this.state.data}
        renderItem={this.renderItem}
      />
      <Modal
        animationType='fade'
        transparent
        onRequestClose={() => this.setModalVisible(false)}
        visible={this.state.modalVisible}>
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <View style={styles.popupContent}>
              <SwText style={styles.popupHeader} swType='header4'>Enter security code</SwText>
              <PasswordTextInput />
            </View>
            <View style={styles.popupButtons}>
              <SwButton
                onPress={() => this.setModalVisible(false)}
                style={styles.popupButton}
                swType='clear'>
                <SwText swType='light'>CANCEL</SwText>
              </SwButton>
              <View style={styles.separator} />
              <SwButton
                onPress={() => this.setModalVisible(false)}
                style={styles.popupButton}
                swType='clear'>
                <SwText>OK</SwText>
              </SwButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  list: {
    marginHorizontal: 16,
  },
  card: {
    marginVertical: 8,
  },
  background: {
    borderRadius: 7,
  },
  cardNoContainer: {
    flexDirection: 'row',
  },
  cardNo: {
    marginHorizontal: 8,
  },
  cardPlaceholder: {
    paddingTop: 4,
  },
  date: {
    marginTop: scaleVertical(20),
  },
  footer: {
    marginTop: 8,
    marginBottom: scaleVertical(16),
    alignItems: 'center',
  },
  button: {
    height: 56,
    width: 56,
  },
  popup: {
    backgroundColor: theme.colors.screen.base,
    marginTop: scaleVertical(70),
    marginHorizontal: 37,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: theme.colors.screen.overlay,
    flex: 1,
    marginTop: UIConstants.HeaderHeight,
  },
  popupContent: {
    alignItems: 'center',
    margin: 16,
  },
  popupHeader: {
    marginBottom: scaleVertical(45),
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: theme.colors.border.base,
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    width: 1,
  },
}));
