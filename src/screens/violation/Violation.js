
import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwButton } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { PageNames } from '../../config/AppConstants';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';

export class Violation extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Violation Detail'.toUpperCase(),
  };
log
  constructor(props) {
    super(props);
    const query = this.props.navigation.getParam('query', '');
    const id = this.props.navigation.getParam('id', '');

    this.bindData(query);
    
    this.state = {
      query: query,
      id: id,
      violation: {}
    };
  }

  componentWillMount() {

  }

  async bindData(query){
    if(query == undefined || query == '')
      return;

    console.log(query);  
    
    await ViolationServiceInstance.getViolation(query)
      .then(response => {
        if (response != null && response != undefined) {
          const dataValue = Object.values(response);
          const violation = JSON.parse(dataValue);

          console.log(violation);

          this.setState({ violation: violation });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('ViolationMap');
  }

  onCommentsButtonPressed() {
    this.props.navigation.navigate('Comments', {
      pageName: PageNames.Violation,
      referenceId: this.state.id
    });
  }

  onDocumentsButtonPressed() {
    this.props.navigation.navigate(PageNames.Documents, {
      pageName: PageNames.Violation,
      referenceId: this.state.id
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
              <FontAwesome5 name='globe' size={35} style={styles.icon} />
            </SwButton> */}
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onCommentsButtonPressed() }}>
            <FontAwesome5 name='comments' size={35} style={styles.icon} />
            </SwButton>
            <View>
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onDocumentsButtonPressed() }}>
                <FontAwesome5 name='file' size={35} style={styles.icon} />
              </SwButton>
              <Badge value={this.state.violation.NumberOfDocument} status="success" textStyle={{ fontSize: 15 }}
                badgeStyle={{ width: 30, height: 30, borderRadius: 300 }}
                containerStyle={{ position: 'absolute', top: 20, right: -10 }} />
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
