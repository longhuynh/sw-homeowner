// import React from 'react';
// import {
//   View,
//   ScrollView,
// } from 'react-native';
// import {
//   SwText,
//   SwStyleSheet,
//   SwTheme,
// } from 'sw-react-native-ui';
// import { FontAwesome } from '../../assets/icons';
// import {
//   //ProgressChart,
//   //DoughnutChart,
//   AreaChart,
//   AreaSmoothedChart,
// } from '../../components/';

// export class Statistics extends React.Component {
//   static navigationOptions = {
//     title: 'Dashboard',
//   };

//   state = {
//     data: {
//       items: [
//         {
//           name: 'Stars',
//           value: '4,512',
//           icon: 'github',
//           background: SwTheme.current.colors.dashboard.stars,
//         },
//         {
//           name: 'Tweets',
//           value: '2,256',
//           icon: 'twitter',
//           background: SwTheme.current.colors.dashboard.tweets,
//         },
//         {
//           name: 'Likes',
//           value: '1,124',
//           icon: 'facebook',
//           background: SwTheme.current.colors.dashboard.likes,
//         },
//       ],
//     },
//   };

//   renderStatItem = (item) => (
//     <View style={[styles.itemContainer, { backgroundColor: item.background }]} key={item.name}>
//       <View>
//         <SwText swType='header6' style={styles.itemValue}>{item.value}</SwText>
//         <SwText swType='secondary7' style={styles.itemName}>{item.name}</SwText>
//       </View>
//       <SwText swType='awesome hero' style={styles.itemIcon}>{FontAwesome[item.icon]}</SwText>
//     </View>
//   );

//   render = () => {
//     const chartBackgroundStyle = { backgroundColor: SwTheme.current.colors.control.background };
//     return (
//       <ScrollView style={styles.screen}>
//         <View style={styles.items}>
//           {this.state.data.items.map(this.renderStatItem)}
//         </View>
//         <View style={[styles.chartBlock, chartBackgroundStyle]}>
//           <DoughnutChart />
//         </View>
//         <View style={[styles.chartBlock, chartBackgroundStyle]}>
//           <AreaChart />
//         </View>
//         <View style={[styles.chartBlock, chartBackgroundStyle]}>
//           <ProgressChart />
//         </View>
//         <View style={[styles.chartBlock, chartBackgroundStyle]}>
//           <AreaSmoothedChart />
//         </View>
//       </ScrollView>
//     );
//   };
// }

// const styles = SwStyleSheet.create(theme => ({
//   screen: {
//     backgroundColor: theme.colors.screen.scroll,
//     paddingHorizontal: 15,
//   },
//   items: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 15,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderRadius: 3,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
//   itemIcon: {
//     alignSelf: 'center',
//     marginLeft: 10,
//     color: 'white',
//   },
//   itemValue: {
//     color: 'white',
//   },
//   itemName: {
//     color: 'white',
//   },
//   chartBlock: {
//     padding: 15,
//     marginBottom: 15,
//     justifyContent: 'center',
//   },
// }));

