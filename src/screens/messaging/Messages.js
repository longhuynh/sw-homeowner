import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, Platform } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard, SwButton } from 'sw-react-native-ui';
import { Button } from 'react-native-elements';
import { CornerLabel } from '../../components/index';
import NavigationType from '../../config/navigation/NavigationType';
import { CurrentUser } from '../../services/LoginService';
import { UnitService } from '../../services/UnitService';
import { StorageService } from '../../services/StorageService';
import { Icon } from 'react-native-elements'
import _ from 'lodash';
import guid from '../../utils/guid';
import { PageNames } from '../../config/AppConstants';
import { HeaderBackButton } from 'react-navigation';

const moment = require('moment');

export class Messages extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: 'Recent Messages',
      headerLeft: Messages.renderNavigation(navigation),
    });
  };

  constructor(props) {
    super(props);
    const data = this.props.navigation.getParam('messages', {});

    const messages = this.bindData(data);

    this.unitService = new UnitService();

    this.state = {
      refreshing: false,
      items: messages,
      unit: StorageService.unit
    };
  }


  hasUpdate = false;

  async shouldComponentUpdate(nextProps) {
    let refresh = nextProps.navigation.state.params.refresh;

    if (refresh != undefined && refresh && !this.hasUpdate) {
      this.refreshData();
      this.hasUpdate = true;
    }

    return this.hasUpdate;
  }

  async componentWillMount() {
  }

  bindData(data) {
    let messages = [];

    const projectNotes = data.ProjectNotes || [];

    projectNotes.forEach(t => {
      messages.push({
        Id: guid(),
        Title: t.Title,
        Notes: t.Notes,
        CreatedByUserName: t.CreatedByUserName,
        CreatedDate: t.CreatedDate,
        ReferenceId: t.ProjectIdEncrypted,
        Color: '#3498db',
        CornerLabel: 'Arc'
      });
    });

    const serviceNotes = data.ServiceNotes || [];

    serviceNotes.forEach(t => {
      messages.push({
        Id: guid(),
        Title: t.Title,
        Notes: t.Notes,
        CreatedByUserName: t.CreatedByUserName,
        CreatedDate: t.CreatedDate,
        ReferenceId: t.ActivityIdEncrypted,
        Color: '#D3AC2B',
        CornerLabel: 'General'
      });
    });

    const violationNotes = data.ViolationNotes || [];

    violationNotes.forEach(t => {
      messages.push({
        Id: guid(),
        Title: t.Title,
        Notes: t.Notes,
        CreatedByUserName: t.CreatedByUserName,
        CreatedDate: t.CreatedDate,
        ReferenceId: t.ActivityIdEncrypted,
        Color: '#6AB33A',
        CornerLabel: 'Violations'
      });
    });

    messages = _.reverse(_.sortBy(messages, 'CreatedDate'));

    return messages;
  }

  async refreshData() {
    this.setState({ refreshing: true });

    const unit = this.state.unit;

    await this.unitService.getResidentIncomingNotes(unit.UnitIdEncrypted, CurrentUser.UserIdEncrypted)
      .then(response => {

        if (response != null) {
          const data = response.GetResidentIncomingNotesResult;
          const messages = this.bindData(data);

          this.setState({ items: messages });
          this.setState({ refreshing: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ refreshing: false });
      });
  }

  async replyMessage(item) {
    this.hasUpdate = false;
    this.props.navigation.navigate(PageNames.ReplyMessage, { message: item });
  }

  static renderNavigation = (navigation) => (
    <HeaderBackButton onPress={() => { navigation.navigate(PageNames.Dashboard, {refresh: true});}} backTitleVisible={ Platform.OS === 'ios'}/>
  );

  renderItem = (item) => (
    <TouchableOpacity onPress={() => this.replyMessage(item)} key={item.Id}>
      <SwCard style={styles.itemContainer}>
        <View style={styles.content}>
          <SwText swType='header4' numberOfLines={1}>{item.Title}</SwText>
          <SwText swType='secondary2' numberOfLines={3}>{item.Notes}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2 header6'>{moment(new Date(item.CreatedDate)).format('MM/DD/YY hh:mm A')}</SwText>
            <View style={styles.right}>
              <Button
                buttonStyle={{ height: 27 }}
                titleStyle={{fontSize: 13, marginTop: -5}}
                onPress={() => this.replyMessage(item)}
                title='Reply'
              />
            </View>
          </View>
        </View>
        <CornerLabel
          cornerRadius={70}
          alignment={'right'}
          style={{ backgroundColor: item.Color, height: 24, }}
          textStyle={{ color: '#fff', fontSize: 12, }}>
          {item.CornerLabel}
        </CornerLabel>
      </SwCard>
    </TouchableOpacity>
  );

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.refreshData()} />
    )
  }

  render = () => {
    return (
      <View style={styles.root}>
        <ScrollView style={styles.screen} refreshControl={this.refreshControl()}>
          <View style={styles.container} >
            {this.state.items.map(this.renderItem)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  screen: {
    backgroundColor: theme.colors.screen.scroll,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  itemContainer: {
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    alignItems: 'stretch'
  },
  detail: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  right: {
    alignSelf: 'flex-end'
  },
}));
