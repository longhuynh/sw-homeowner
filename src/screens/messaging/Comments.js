import React from 'react';
import { FlatList, View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { SwStyleSheet, SwText, SwTextInput, SwCard } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { GradientButton } from '../../components/index';
import { PageNames } from '../../config/AppConstants';
import { CommentServiceInstance } from '../../services/CommentService';
import { jsonItemsBuilder } from '../../services/jsonBuilder';
import { DbStorageKey } from '../../services/storageKey';

const moment = require('moment');

export class Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Comments'.toUpperCase(),
  };


  constructor(props) {
    super(props);
    const comments = this.props.navigation.getParam('comments', []);
    const pageName = this.props.navigation.getParam('pageName', '');
    const violationId = this.props.navigation.getParam('violationId', '');

    this.state = {
      violationId: violationId,
      comments: comments,
      pageName: pageName,
      comment: 'This is my comments'
    };

    console.log(comments);
  }

  extractItemKey = (item) => `${item.ActivityNotesIdEncrypted}`;

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  onSaveButtonPressed = async () => {
    if(this.state.comment.trim() == ''){
      Alert.alert('Please enter comment');
      return;
    }    
      
    const pageName = this.state.pageName;
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);
   
    switch (pageName) {
      case PageNames.Violation:      
        await this.saveViolationComment(unit.UserIdEncrypted);
        break;
      case PageNames.Architectural:
        break;
      case PageNames.WorkOrder:
        break;
      default:
        break;
    }

    this.props.navigation.navigate(pageName, {refresh: true});
  };
  
  async saveViolationComment(userIdEncrypted) {
    let savedComment = null;

    const pairs = [
      { name: 'ViolationItemIdEncrypted', value: this.state.violationId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment }
    ];
    
    const jsonItems = jsonItemsBuilder(pairs);

    await CommentServiceInstance.saveViolationComment(jsonItems)
      .then(response => {
        savedComment = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.error(error);
      });

      return savedComment;
  }

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5'>{moment(item.CreatedDate.toString()).format('MM/DD/YYYY')} ({item.CreatedByUser})</SwText>
          <SwText swType='secondary4 hintColor'></SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{item.Notes}</SwText>
      </View>
    </View>
  );

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.comment}>
          <SwText swType='header5'>Add comment</SwText>
          <SwTextInput
            value={this.state.comment}
            swType='bordered'
            onChangeText={this.onCommentInputChanged}
            multiline={true}
            numberOfLines={4} />
        </View>

        <GradientButton swType='small' style={styles.saveButton} text='Save' onPress={this.onSaveButtonPressed} />

        <FlatList
          data={this.state.comments}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
        />
      </SwCard>
    </View>
  );

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
  itemContainer: {
    paddingLeft: 5,
    paddingRight: 5,
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
