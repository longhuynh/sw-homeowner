
import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export class WorkOrder extends React.Component {
  static navigationOptions = {
    title: 'Work Order Detail'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const workOrderId = this.props.navigation.getParam('id', 1);
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('WorkOrderMap');
  }

  onCommentsButtonPressed() {
    this.props.navigation.navigate('Comments');
  }

  onDocumentsButtonPressed() {
    this.props.navigation.navigate('Documents');
  }

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.section}>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Category</SwText>
            <SwText swType='secondary2 header5'>Pool</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Sub Category</SwText>
            <SwText swType='secondary2 header5'>Cleaning</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Status</SwText>
            <SwText swType='secondary2 header5'>Assigned</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Priority</SwText>
            <SwText swType='secondary2 header5'>Medium</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Description</SwText>
            <SwText numberOfLines={5} swType='secondary2 header5'>
              Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes (also known as modes of discourse), along with exposition, argumentation, and narration.
              </SwText>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.row}>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onMapsButtonPressed() }}>
              <Icon name='globe' size={35} style={styles.icon} />
            </SwButton>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onCommentsButtonPressed() }}>
              <Icon name='comment' size={35} style={styles.icon} />
            </SwButton>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onDocumentsButtonPressed() }}>
              <SwText swType='moon large primary'>3</SwText>
            </SwButton>
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
