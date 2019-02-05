
import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenHeight = Dimensions.get('window').height - 120;

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
    <ScrollView style={styles.screen}>
      <View style={styles.container} >
        <SwCard style={styles.card}>
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
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => {this.onMapsButtonPressed()}}>
                <Icon name='globe' size={35} style={styles.icon} /> 
              </SwButton>
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => {this.onCommentsButtonPressed()}}>
                <Icon name='comment' size={35} style={styles.icon} /> 
              </SwButton>
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => {this.onDocumentsButtonPressed()}}>
                <SwText swType='moon large primary'>3</SwText>
              </SwButton>
            </View>          
          </View>
        </SwCard>
      </View>
    </ScrollView>
  )
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  card: {
    borderRadius: 3,
    height: screenHeight,
    paddingHorizontal: 15,
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
    width: 40
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
