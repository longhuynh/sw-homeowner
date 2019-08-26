
import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { PageNames } from '../../config/AppConstants';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';
import _ from 'lodash';
import { ViolationService } from '../../services/ViolationService';
import { CommentService } from '../../services/CommentService';
import { DocumentService } from '../../services/DocumentService';


export class Violation extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    let name = navigation.state.params ? navigation.state.params.name : '';

    return ({
      headerTitle: Violation.renderNavigationTitle(name)
    });
  };

  constructor(props) {
    super(props);
    const associationIdEncrypted = this.props.navigation.getParam('associationIdEncrypted', {});
    const violationIdEncrypted = this.props.navigation.getParam('violationIdEncrypted', {});

    this.violationService = new ViolationService();
    this.commentService = new CommentService();
    this.documentService = new DocumentService();

    this.state = {
      refresh: false,
      associationIdEncrypted: associationIdEncrypted,
      violationIdEncrypted: violationIdEncrypted,
      violation: {},
      activity: {}
    };
  }

  shouldUpdate = false;

  async shouldComponentUpdate(nextProps) {
    let refresh = nextProps.navigation.state.params.refresh;

    console.log(refresh + " " + this.shouldUpdate);

    if (refresh != undefined && refresh && !this.shouldUpdate) {
      await this.bindData();
      this.shouldUpdate = true;
      console.log("Refresh ...");
    }

    return this.shouldUpdate;
  }


  async componentWillMount(){   
    await this.bindData();
  }

  async bindData(){
    await this.violationService.getViolationItemById(this.state.associationIdEncrypted,
      this.state.violationIdEncrypted)
    .then(async (respone) => {
      const violation = respone.GetViolationItemByIdResult;
      
      this.setState({violation: violation});
      this.setState({activity: violation.Activities[0]});    
    })
    .catch(error => {
      console.log(error);
    });
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('ViolationMap');
  }

  onCommentsButtonPressed() {
    const comments = this.violationService.getComments(this.state.violation);
    this.commentService.setComments(comments);

    this.props.navigation.navigate('Comments', {
      pageName: PageNames.Violation,
      referenceId: this.state.activity.ActivityIdEncrypted
    });
  }

  onDocumentsButtonPressed() {
    const documents = this.violationService.getDocuments(this.state.violation);
    console.log(documents);
    this.documentService.setDocuments(documents);

    this.props.navigation.navigate(PageNames.Documents, {
      pageName: PageNames.Violation,
      referenceId: this.state.violationIdEncrypted,
      activityId: this.state.activity.ActivityIdEncrypted
    });
  }

  static renderNavigationTitle = (name) => {
    return (
      <View>
        <View style={styles.header}>
          <SwText swType='header4 center' numberOfLines={1}>{name}</SwText>
          <SwText swType='secondary2 secondaryColor center'>Detail</SwText>
        </View>
      </View>
    )
  }

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.section}>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Category</SwText>
            <SwText swType='secondary2 header5'>{this.state.violation.CategoryName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Sub Category</SwText>
            <SwText swType='secondary2 header5'>{this.state.violation.SubCategoryName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Location</SwText>
            <SwText swType='secondary2 header5'>{this.state.violation.LocationName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Stage</SwText>
            <SwButton style={styles.stageButton} swType='icon circle'>
              <SwText swType='moon large primary'>{this.state.activity.StageCode}</SwText>
            </SwButton>
          </View>
          {/* <View style={styles.heading}>
            <SwText swType='primary header4'>Call to Action</SwText>
            <SwText numberOfLines={10} swType='secondary2 header5'>
              {'this.state.activity.CallToAction'}
            </SwText>
          </View> */}
        </View>

        <View style={styles.bottom}>
          <View style={styles.row}>
            {/* <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onMapsButtonPressed() }}>
              <FontAwesome5 name='globe' size={35} style={styles.icon} />
            </SwButton> */}
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onCommentsButtonPressed() }}>
              <FontAwesome5 name='comments' size={35} style={styles.icon} />
            </SwButton>
            <View>
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onDocumentsButtonPressed() }}>
                <FontAwesome5 name='file' size={35} style={styles.icon} />
              </SwButton>
              {/* <Badge value={this.state.violation.NumberOfDocument} status="success" textStyle={{ fontSize: 15 }}
                badgeStyle={{ width: 30, height: 30, borderRadius: 300 }}
                containerStyle={{ position: 'absolute', top: 20, right: -10 }} /> */}
            </View>
          </View>
        </View>
      </SwCard>
    </View>
  )
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
  header: {
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    alignItems: 'center',
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24,
  },
  switch: {
    marginVertical: 14,
  },
  circleButton: {
    width: 65,
    height: 65,
    marginTop: 27.5,
    alignSelf: 'center',
  },
  stageButton: {
    height: 40,
    width: 40,
    marginTop: 10
  },
  icon: {
    alignSelf: 'center',
    color: theme.colors.primary
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  }
}));
