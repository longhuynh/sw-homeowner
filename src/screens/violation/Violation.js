
import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwButton } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ViolationService } from '../../services/ViolationService';
import { PageNames } from '../../config/AppConstants';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';
import _ from 'lodash';

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
    const violation = this.props.navigation.getParam('violation', {});
    this.violationService = new ViolationService();

    this.state = {
      refresh: false,
      id: violation.ViolationItemIdEncrypted,
      violation: violation,
      documents: violation.Activities[0].Documents
    };
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('ViolationMap');
  }

  onCommentsButtonPressed() {
    const comments = _.flatMap(this.state.violation.Activities[0].Notes,
      (n) => [
        {
          IdEncrypted: n.ActivityNotesCreatedByUserIdEnc,
          CreatedDate: n.CreatedDate,
          CreatedByUser: `${n.CreatedByUserFirstName} ${n.CreateByUserLastName}`,
          Text: n.Text
        }
      ]);

    this.props.navigation.navigate('Comments', {
      pageName: PageNames.Violation,
      referenceId: this.state.violation.Activities[0].ActivityIdEncrypted,
      comments: comments,
    });
  }

  onDocumentsButtonPressed() {
    const documents = _.flatMap(this.state.documents,
      (d) => [
        {
          IdEncrypted: d.DocumentId,
          Name: d.Name,
          Extension: d.Extension,
          Url: d.Href,
          CreatedDate: d.DateStamp,
          CreatedByUser: `${d.CreatedByUserFirstName} ${d.CreateByUserLastName}`,
        }
      ]);

    this.props.navigation.navigate(PageNames.Documents, {
      pageName: PageNames.Violation,
      referenceId: this.state.id,
      activityId: this.state.violation.Activities[0].ActivityIdEncrypted,
      documents: documents
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
      <View style={styles.container}>
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
              <SwText swType='moon large primary'>{this.state.violation.Activities[0].StageCode}</SwText>
            </SwButton>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Call to Action</SwText>
            <SwText numberOfLines={10} swType='secondary2 header5'>
              {/* {this.state.violation.CallToAction} */} N/A
            </SwText>
          </View>
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
      </View>
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
