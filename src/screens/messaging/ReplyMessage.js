import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwTextInput, SwCard } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { CurrentUser } from '../../services/LoginService';
import { UnitService } from '../../services/UnitService';
import { StorageService } from '../../services/StorageService';
import { GradientButton } from '../../components/index';

import _ from 'lodash';
const moment = require('moment');

export class ReplyMessage extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Reply Message',
  };

  constructor(props) {
    super(props);   
    const message = this.props.navigation.getParam('message', {});  

    console.log(message);

    this.unitService = new UnitService();

    this.state = {
      refreshing: false,
      message: message,
      comment: '',
      unit: StorageService.unit
    };
  }

  async componentWillMount() {
  }

  async refreshData() {
  
  }

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });
  };

  render = () => {
    return (
      <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.comment}>
          <SwText swType='header5'>Reply message for {this.state.message.Title}</SwText>
          <SwTextInput
            value={this.state.comment}
            swType='bordered'
            onChangeText={this.onCommentInputChanged}
            multiline={true}
            numberOfLines={5} />
        </View>

        <GradientButton swType='small' style={styles.saveButton} text='Save' onPress={this.onSaveButtonPressed} />
      </SwCard>
    </View>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: theme.colors.screen.scroll,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 15,
    borderColor: theme.colors.border.card,
    backgroundColor: theme.colors.screen.base,
  },
  comment: {
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  saveButton: {
    width: 120,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    alignSelf: 'flex-end'
  },
}));
