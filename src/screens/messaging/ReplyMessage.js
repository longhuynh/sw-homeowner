import React from 'react';
import { View, Picker } from 'react-native';
import { SwText, SwStyleSheet, SwTextInput, SwCard, SwPicker } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { CurrentUser } from '../../services/LoginService';
import { UnitService } from '../../services/UnitService';
import { StorageService } from '../../services/StorageService';
import { GradientButton } from '../../components/index';
import { ArcService } from '../../services/ArcService';
import { ViolationService } from '../../services/ViolationService';
import { PageNames } from '../../config/AppConstants';

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
    this.arcService = new ArcService();
    this.violationService = new ViolationService();

    this.state = {
      refreshing: false,
      message: message,
      disabledSendButton: true,
      comment: '',
      noteTypes: [],
      unit: StorageService.unit,
      noteTypeIdEncrypted: null
    };
  }

  async componentWillMount() {
    await this.unitService.getServiceNoteTypes(CurrentUser.ManagementIdEncrypted)
    .then(response => {
      console.log(response.GetServiceNoteTypesResult);
      if (response != null) {
        let noteTypes = response.GetServiceNoteTypesResult;

        noteTypes.splice(0, 0, {
          EnumNameIdEncrypted: 'OyXYmMh4EZ7TPw',
          EnumValueManagementIdEncrypted: null,
          ManagementIdEncrypted: '7lGQkpEuXCr1ZQ',
          Name: ' -- Select Type --'
        });
        this.setState({noteTypes: noteTypes});
      }
    })
    .catch(error => {
      console.log(error);
     
    });
  }

  async refreshData() { 

  }

  onSendButtonPressed = async () => {
    if(this.state.comment.trim() == ''){
      alert('Please enter comment');
      return;
    }    
      
    const noteType = this.state.message.CornerLabel;

    let savedNote = null;

    switch (noteType) {
      case 'Violations':      
        savedNote = await this.saveViolationNote();
        break;
      case 'Arc':
        savedNote = await this.saveArcNote();
        break;
      case 'General':
        savedNote = await this.saveGeneralNote();
        break;
      default:
        break;
    }

    if(savedNote != null){
      this.props.navigation.navigate(PageNames.Messages, {refresh: true});
    }   
  };

  async saveViolationNote() {
    let savedNote = null;

    await this.violationService.saveComment(this.state.message.ReferenceId,
      this.state.comment, CurrentUser.UserIdEncrypted)
      .then(response => {
        if(response != null){
          savedNote = response;
        }         
      })
      .catch(error => {
        console.log(error);
      });

      return savedNote;
  }

  async saveArcNote() {
    let savedNote = null;

    const projectHistoryDto = {
      AssociationIdEncrypted: this.state.unit.AssociationIdEncrypted,
      MakePublic: true,
      ProjectIdEncrypted: this.state.message.ReferenceId,
      SendToApprovers: false,
      SendToOffice: true,
      Text: this.state.comment,
      UserIdEncrypted: CurrentUser.UserIdEncrypted
    };

    await this.arcService.saveComment(projectHistoryDto)
      .then(response => {
        console.log(response);
        if(response != null){
          savedNote = response;
        }         
      })
      .catch(error => {
        console.log(error);
      });

      return savedNote;
  }

  async saveGeneralNote() {
    let savedNote = null;    
    await this.unitService.saveNote(CurrentUser.UserIdEncrypted, this.state.comment,  
        this.state.unit.OwnerIdEncrypted, this.state.noteTypeIdEncrypted)
      .then(response => {
        console.log(response);
        savedNote = response;
      })
      .catch(error => {
        console.log(error);
      });

      return savedNote;
  }

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });

    const disabled = (this.state.noteTypeIdEncrypted == null && this.state.message.CornerLabel == 'General') 
        || this.state.comment.trim() == '';
    this.setState({disabledSendButton: disabled});       
  };

  onNoteTypeChanged = (itemValue, itemIndex) => {
    this.setState({noteTypeIdEncrypted: itemValue});

    const disabled = (itemValue == null && this.state.message.CornerLabel == 'General') 
            || this.state.comment.trim() == '';
    this.setState({disabledSendButton: disabled});        
  }

  renderNoteTypePicker(){
    if(this.state.message.CornerLabel == 'General'){
      return <Picker
        selectedValue={this.state.noteTypeIdEncrypted}
        style={{height: 50}}
        onValueChange={this.onNoteTypeChanged}>
        {this.state.noteTypes.map(this.renderItem)}
      </Picker>
    }
  }

  renderItem(item){
    return <Picker.Item 
        key={item.EnumValueManagementIdEncrypted} 
        label={item.Name} 
        value={item.EnumValueManagementIdEncrypted} 
    />;
  }

  render = () => {
    return (
      <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.messageTitle}>
          <SwText swType='header4'>Answer to {this.state.message.Title}</SwText>
          <SwText swType='secondary2'>
            {this.state.message.CreatedByUserName} ({moment(new Date(this.state.message.CreatedDate)).format('MM/DD/YY')}) :  {this.state.message.Notes} 
          </SwText>
          <SwTextInput
            value={this.state.comment}
            swType='bordered'
            returnKeyType='done'
            onChangeText={this.onCommentInputChanged}
            multiline={true}
            numberOfLines={5} />
        </View>

        {this.renderNoteTypePicker()}

        <GradientButton 
          swType='small'
          disabled={this.state.disabledSendButton} 
          style={styles.sendButton} text='Send' 
          onPress={this.onSendButtonPressed} />

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
  messageTitle: {
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  messageContent: {
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  sendButton: {
    width: 120,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    alignSelf: 'flex-end'
  },
}));
