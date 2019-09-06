import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwCard } from 'sw-react-native-ui';

export class ArchitecturalStatus extends React.Component {
  static navigationOptions = {
    title: 'Status History',
  };

  constructor(props) {
    super(props);
    const project = this.props.navigation.getParam('project', '');

    console.log(project);

    this.state = {
      project: project,
    };
  }

  async componentWillMount() {

  }

  render = () => {
    return (
      <View style={styles.screen} >
        <SwCard style={styles.container}>
          <View style={styles.section}>
            <View style={styles.heading}>
              <SwText swType='primary header4'>Status</SwText>
              <SwText swType='secondary2 header5'>{this.state.project.Status}</SwText>
            </View>
            <View style={styles.heading}>
              <SwText swType='primary header4'>Ref</SwText>
              <SwText swType='secondary2 header5'>{this.state.project.Key}</SwText>
            </View>
            <View style={styles.heading}>
              <SwText swType='primary header4'>Application Fee</SwText>
              <SwText swType='secondary2 header5'>{'$' + this.state.project.ApplicationFeeAmount}</SwText>
            </View>
            <View style={styles.heading}>
              <SwText swType='primary header4'>Deposit</SwText>
              <SwText swType='secondary2 header5'>{'$' + this.state.project.DepositAmount}</SwText>
            </View>
          </View>
        </SwCard>
      </View>
    )
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
