import React from 'react';
import { FlatList, View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { SwStyleSheet, SwText, SwTextInput, SwCard } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { GradientButton } from '../../components/index';
import { Badge } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';
import { jsonItemsBuilder } from '../../services/jsonBuilder';
import { DbStorageKey } from '../../services/storageKey';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { ArcServiceInstance } from '../../services/ArcService';
import { WorkOrderServiceInstance } from '../../services/WorkOrderService';

const moment = require('moment');

export class Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Comments',
  };
  
  constructor(props) {
    super(props);
    const pageName = this.props.navigation.getParam('pageName', '');
    const referenceId = this.props.navigation.getParam('referenceId', '');

    this.state = {
      referenceId: referenceId,
      comments: [],
      pageName: pageName,
      comment: ''
    };

    this.bindData();
  }

  bindData = async () => {
    if(this.state.referenceId.trim() == ''){     
      return;
    }    
      
    const pageName = this.state.pageName;
   
    switch (pageName) {
      case PageNames.Violation:      
        await this.getViolationComments();
        break;
      case PageNames.Architectural:
        await this.getArcComments();
        break;
      case PageNames.WorkOrder:
        await this.getWoComments();
        break;
      default:
        break;
    }
  };

  async getViolationComments() {
    const idEncrypted = this.state.referenceId;

    await ViolationServiceInstance.getComments(idEncrypted)
      .then(response => {      
        this.generateData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getArcComments() {
    const idEncrypted = this.state.referenceId;

    await ArcServiceInstance.getComments(idEncrypted)
      .then(response => {      
        this.generateData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getWoComments() {
    const idEncrypted = this.state.referenceId;

    await WorkOrderServiceInstance.getComments(idEncrypted)
      .then(response => {      
        console.log(response);
        this.generateData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
    
  generateData(response) {
    console.log(response);

    if (response != null && response != undefined) {
      const dataValue = Object.values(response);
      const comments = JSON.parse(dataValue);

      this.setState({ comments: comments });
    }
  }

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
        await this.saveArcComment(unit.UserIdEncrypted, unit.AssociationIdEncrypted);
        break;
      case PageNames.WorkOrder:
        await this.saveWoComment(unit.UserIdEncrypted);
        break;
      default:
        break;
    }

    this.props.navigation.navigate(pageName, {refresh: true});
  };

  async saveViolationComment(userIdEncrypted) {
    let savedComment = null;

    const pairs = [
      { name: 'ViolationItemIdEncrypted', value: this.state.referenceId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment }
    ];
    
    const jsonItems = jsonItemsBuilder(pairs);

    await ViolationServiceInstance.saveComment(jsonItems)
      .then(response => {
        savedComment = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });

      return savedComment;
  }

  async saveArcComment(userIdEncrypted, associationIdEncrypted) {
    let savedComment = null;

    const pairs = [
      { name: 'ProjectIdEncrypted', value: this.state.referenceId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment },
      { name: 'AssociationIdEncrypted', value: associationIdEncrypted }
    ];

    const jsonItems = jsonItemsBuilder(pairs);

    console.log(jsonItems);

    await ArcServiceInstance.saveComment(jsonItems)
      .then(response => {
        savedComment = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });

      return savedComment;
  }

  async saveWoComment(userIdEncrypted) {
    let savedComment = null;

    const pairs = [
      { name: 'WorkOrderIdEncrypted', value: this.state.referenceId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment }
    ];
    
    const jsonItems = jsonItemsBuilder(pairs);

    await WorkOrderServiceInstance.saveComment(jsonItems)
      .then(response => {
        savedComment = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });

      return savedComment;
  }

  extractItemKey = (item) => `${item.IdEncrypted}`;

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5'>{moment(new Date(item.CreatedDate.toString())).format('MM/DD/YYYY')} ({item.CreatedByUser})</SwText>
          <SwText swType='secondary4 hintColor'></SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{item.Notes}</SwText>
      </View>
    </View>
  );

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
      {/* <Badge value={this.state.comments.length} status="success" textStyle={{ fontSize: 25 }}
          badgeStyle={{ width: 50, height: 50, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -15, right: -15 }} /> */}

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
