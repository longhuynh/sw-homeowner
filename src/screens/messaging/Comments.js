import React from 'react';
import { FlatList, View, StyleSheet} from 'react-native';
import { SwStyleSheet, SwText, SwTextInput} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import NavigationType from '../../config/navigation/NavigationType';
import { GradientButton } from '../../components/index';
import { scale } from '../../utils/scale';

const moment = require('moment');

export class Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Comments'.toUpperCase(),
  };

  state = {
    comment: ''
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId', 1);
    this.state = {
      data: data.getComments(postId),
    };
  }

  extractItemKey = (item) => `${item.id}`;

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  onSaveButtonPressed = () => {
    //this.props.navigation.navigate('Login');
  };

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5'>01/10/2019 ({`${item.user.firstName} ${item.user.lastName}`})</SwText>
          <SwText swType='secondary4 hintColor'>            
          </SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{item.text}</SwText>
      </View>
    </View>
  );

  render = () => (
    <View style={styles.root}>    
      <View style={styles.comment}>
        <SwText swType='header5'>Add comment</SwText>
        <SwTextInput          
          value={this.state.comment}
          swType='bordered clear'
          onChangeText={this.onCommentInputChanged}
          multiline = {true}
          numberOfLines = {4}/>
      </View>     
      
      <GradientButton swType='small' style={styles.saveButton} text='Save' onPress={this.onSaveButtonPressed} />

      <FlatList
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
    </View>
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
  comment: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  saveButton: {
    width: scale(120),
    marginTop: scale(10),
    marginRight: scale(20),
    marginBottom: scale(10),
    alignSelf: 'flex-end'
  },
}));
