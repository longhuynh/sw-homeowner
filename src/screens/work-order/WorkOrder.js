
import React from 'react';
import { View } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';

export class WorkOrder extends React.Component {
  static navigationOptions = {
    title: 'Work Order Detail'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const workOrder = this.props.navigation.getParam('workOrder', {});

    console.log(workOrder)

    this.state = {
      id: workOrder.WorkOrderIdEncrypted || '',
      workOrder: workOrder
    }
  }

  onMapsButtonPressed() {
    this.props.navigation.navigate('WorkOrderMap');
  }

  onCommentsButtonPressed() {
    this.props.navigation.navigate(PageNames.Comments, {
      pageName: PageNames.WorkOrder,
      referenceId: this.state.id
    });
  }

  onDocumentsButtonPressed() {
    this.props.navigation.navigate(PageNames.Documents, {
      pageName: PageNames.WorkOrder,
      referenceId: this.state.id
    });
  }
  
  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <View style={styles.section}>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Category</SwText>
            <SwText swType='secondary2 header5'>{this.state.workOrder.WoCategoryName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Sub Category</SwText>
            <SwText swType='secondary2 header5'>{this.state.workOrder.WoSubCategoryName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Status</SwText>
            <SwText swType='secondary2 header5'>{this.state.workOrder.WoStatusTypeName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Priority</SwText>
            <SwText swType='secondary2 header5'>{this.state.workOrder.WoPriorityTypeName}</SwText>
          </View>
          <View style={styles.heading}>
            <SwText swType='primary header4'>Description</SwText>
            <SwText numberOfLines={5} swType='secondary2 header5'>{this.state.workOrder.Description}</SwText>
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
              <Badge value={this.state.workOrder.DocumentCount} status="success" textStyle={{ fontSize: 15 }}
                badgeStyle={{ width: 30, height: 30, borderRadius: 300 }}
                containerStyle={{ position: 'absolute', top: 20, right: -10 }} />
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
