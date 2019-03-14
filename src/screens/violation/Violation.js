
import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwButton } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { PageNames } from '../../config/AppConstants';

export class Violation extends React.Component {
  static navigationOptions = {
    title: 'Violation Detail'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const query = this.props.navigation.getParam('query', '');
    const violationId = this.props.navigation.getParam('id', '');
    const refresh = this.props.navigation.getParam('refresh', '');
    
    console.log('Violation Detail constructor' + refresh);
    this.bindData(query);
    
    this.state = {
      query: query,
      violationId: violationId,
      violation: {},
      comments: [],
      documents: []
    }
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  // async shouldComponentUpdate(nextProps) {
  //   const refresh = nextProps.navigation.state.params.refresh;
  //   // const refresh1 = nextProps.navigation.state.params.refresh1;
  //   // console.log(refresh1);
  //   // console.log(this.state.query);

  //   // if(refresh != undefined && refresh == true)
  //   //   this.bindData(this.state.query);

  //   return refresh != undefined && refresh == true;
  // }

  // componentWillUpdate() {
  //   this.bindData(this.state.query);

  // }


  async bindData(query){
    if(query == undefined || query == '')
    return;

  await ViolationServiceInstance.getViolation(query)
    .then(response => {
      if (response != null || response != undefined) {
        const dataValue = Object.values(response);
        const violation = JSON.parse(dataValue);

        this.setState({ violation: violation });
        this.setState({ comments: violation.Comments || [] });
        this.setState({ documents: violation.Documents || []});
      }
    })
    .catch(error => {
      console.error(error);
    })
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('ViolationMap');
  }

  onCommentsButtonPressed() {
    this.props.navigation.navigate('Comments', {
      comments: this.state.comments, 
      pageName: PageNames.Violation,
      violationId: this.state.violationId
    });
  }

  onDocumentsButtonPressed() {
    this.props.navigation.navigate(PageNames.Documents, {
      documents: this.state.documents,
      violationId: this.state.violationId
    });
  }

  render = () => (
    <View style={styles.screen} >
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Category - Sub Category</SwText>
            <SwText swType='secondary2 header5'>{this.state.violation.ViolationType}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Location</SwText>
            <SwText swType='secondary2 header5'>{this.state.violation.Location}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Stage</SwText>
            <SwButton style={styles.stageButton} swType='icon circle'>
              <SwText swType='moon large primary'>{this.state.violation.Stage}</SwText>
            </SwButton>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Call to Action</SwText>
            <SwText numberOfLines={10} swType='secondary2 header5'>
              {this.state.violation.CallToAction}
            </SwText>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.row}>
            {/* <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onMapsButtonPressed() }}>
              <Icon name='globe' size={35} style={styles.icon} />
            </SwButton> */}
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onCommentsButtonPressed() }}>
              <Icon name='comment' size={35} style={styles.icon} />
            </SwButton>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onDocumentsButtonPressed() }}>
              <SwText swType='moon large primary'>{this.state.documents.length}</SwText>
            </SwButton>
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
