
import React from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { DbStorageKey } from '../../services/storageKey';

export class Violation extends React.Component {
  static navigationOptions = {
    title: 'Violation Detail'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const violationId = this.props.navigation.getParam('id', 1);
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('ViolationMap');
  }

  onCommentsButtonPressed() {
    this.props.navigation.navigate('Comments');
  }

  onDocumentsButtonPressed() {
    this.props.navigation.navigate('Documents');
  }

  render = () => (
    <View style={styles.screen} >
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Category - Sub Category</SwText>
            <SwText swType='secondary2 header5'>Pool - Cleaning</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Location</SwText>
            <SwText swType='secondary2 header5'>Front</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Stage</SwText>
            <SwButton style={styles.stageButton} swType='icon circle'>
              <SwText swType='moon large primary'>1</SwText>
            </SwButton>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Call to Action</SwText>
            <SwText numberOfLines={10} swType='secondary2 header5'>
              Please make sure to keep lawn in a clear
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
