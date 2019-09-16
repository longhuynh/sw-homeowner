import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { SwStyleSheet, SwText, SwTextInput, SwCard } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { GradientButton } from '../../components/index';
import { PageNames } from '../../config/AppConstants';
import { ViolationService } from '../../services/ViolationService';
import { ArcService } from '../../services/ArcService';
import { WorkOrderService } from '../../services/WorkOrderService';
import { CommentService } from '../../services/CommentService';
import { CurrentUser } from '../../services/LoginService';
import { StorageService } from '../../services/StorageService';

const moment = require('moment');
import guid from '../../utils/guid';
import { HeaderBackButton } from 'react-navigation';

export class Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    let pageName = navigation.state.params ? navigation.state.params.pageName : undefined;

    return ({
      headerTitle: 'Comments',
      headerLeft: Comments.renderNavigation(navigation, pageName),
    });
  };
  
  constructor(props) {
    super(props);
    const pageName = this.props.navigation.getParam('pageName', '');
    const referenceId = this.props.navigation.getParam('referenceId', '');    

    this.arcService = new ArcService();
    this.violationService = new ViolationService();
    this.workOrderService = new WorkOrderService();
    this.commentService = new CommentService();

    const comments = this.commentService.getComments();
    
    this.state = {
      referenceId: referenceId,
      comments: comments,
      pageName: pageName,
      showLoading: false,
      disabledSendButton: true,
      comment: ''
    };
  }

  onSaveButtonPressed = async () => {
    if(this.state.comment.trim() == ''){
      alert('Please enter comment');
      return;
    }    

    this.setState({ showLoading: true });
    this.setState({disabledSendButton: true});     

    const pageName = this.state.pageName;
    const unit = StorageService.unit;

    switch (pageName) {
      case PageNames.Violation:      
         await this.saveViolationComment(CurrentUser.UserIdEncrypted);
        break;
      case PageNames.Architectural:
        await this.saveArcComment(CurrentUser.UserIdEncrypted, unit.AssociationIdEncrypted);
        break;
      // case PageNames.WorkOrder:
      //   await this.saveWoComment(CurrentUser.UserIdEncrypted);
      //   break;
      default:
        break;
    }

    this.setState({disabledSendButton: false});   
    this.setState({ showLoading: false });
  };

  reloadComments(){
    let comments = this.state.comments;
    comments.splice(0, 0, {
      IdEncrypted: guid(),
      CreatedDate: moment(new Date()).format('MM/DD/YYYY'),
      CreatedByUser: `${CurrentUser.FirstName} ${CurrentUser.LastName}`,
      Text: this.state.comment
    });

    this.setState({comments: comments});
    this.commentService.setComments(comments);    
    this.setState({ comment: '' });
  }

  async saveViolationComment(userIdEncrypted) {
    await this.violationService.saveComment(this.state.referenceId, this.state.comment, userIdEncrypted)
      .then(response => {
        if(response != null){
          this.reloadComments();
        }         
      })
      .catch(error => {
        console.log(error);
      });
  }

  async saveArcComment(userIdEncrypted, associationIdEncrypted) {
    const projectHistoryDto = {
      AssociationIdEncrypted: associationIdEncrypted,
      MakePublic: true,
      ProjectIdEncrypted: this.state.referenceId,
      SendToApprovers: false,
      SendToOffice: true,
      Text: this.state.comment,
      UserIdEncrypted: userIdEncrypted
    };

    await this.arcService.saveComment(projectHistoryDto)
      .then(response => {
        console.log(response);
        if(response != null){
          this.reloadComments();
        }         
      })
      .catch(error => {
        console.log(error);
      });
  }

  async saveWoComment(userIdEncrypted) {
    await this.workOrderService.saveComment(userIdEncrypted, 
            this.state.referenceId , this.state.comment)
      .then(response => {
        console.log(response);
        if(response != null){
          this.reloadComments();
        }   
      })
      .catch(error => {
        console.log(error);
      });
  }

  extractItemKey = (item) => guid();

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });

    const disabled = this.state.comment.trim() == '';
    this.setState({disabledSendButton: disabled}); 
  };

  static renderNavigation = (navigation, pageName) => (
    <HeaderBackButton onPress={() => { navigation.navigate(pageName, {refresh: true});}} backTitleVisible={ Platform.OS === 'ios'}/>
  );

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderLoading(){
    if(this.state.showLoading)
      return <ActivityIndicator size="large" color="#00ff00" />

    return  <SwTextInput
      value={this.state.comment}
      swType='bordered'
      onChangeText={this.onCommentInputChanged}
      multiline={true}
      numberOfLines={4} />
  }

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5'>{moment(new Date(item.CreatedDate.toString())).format('MM/DD/YYYY')} ({item.CreatedByUser})</SwText>
          <SwText swType='secondary4 hintColor'></SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{item.Text}</SwText>
      </View>
    </View>
  );

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.comment}>
          <SwText swType='header5'>Add comment</SwText>
          {this.renderLoading()}
        </View>      

        <GradientButton 
          swType='small' 
          disabled={this.state.disabledSendButton} 
          style={styles.saveButton} text='Save' 
          onPress={this.onSaveButtonPressed} />   

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
  button:{
    flexDirection: 'row',
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
