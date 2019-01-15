// import React from 'react';
// import { View } from 'react-native';
// import {
//   SwComponent,
//   SwText,
//   SwTheme,
//   SwStyleSheet,
// } from 'sw-react-native-ui';
// import { VictoryPie } from 'victory-native';
// import { Svg, Text as SvgText } from 'react-native-svg';
// import { scale } from '../../utils/scale';

// export class ProgressChart extends SwComponent {
//   state = {
//     percents: 72,
//   };
//   size = 120;
//   fontSize = 25;

//   componentDidMount() {
//     this.setStateInterval = setInterval(this.updatePercent, 1500);
//   }

//   componentWillUnmount() {
//     clearInterval(this.setStateInterval);
//   }

//   updatePercent = () => {
//     let positive = Math.random() > 0.5;
//     if (this.state.percents > 95) {
//       positive = false;
//     } else if (this.state.percents < 60) {
//       positive = true;
//     }
//     this.setState({
//       percents: positive ? this.state.percents + 1 : this.state.percents - 1,
//     });
//   };

//   getChartData = () => [
//     { x: 1, y: this.state.percents },
//     { x: 2, y: 100 - this.state.percents },
//   ];

//   onChartFill = (data) => {
//     const themeColor = SwTheme.current.colors.charts.followersProgress;
//     return data.x === 1 ? themeColor : 'transparent';
//   };

//   render = () => (
//     <View>
//       <SwText swType='header4'>FOLLOWERS</SwText>
//       <View style={styles.chartContainer}>
//         <Svg width={scale(this.size)} height={scale(this.size)}>
//           <VictoryPie
//             labels={[]}
//             padding={0}
//             standalone={false}
//             width={scale(this.size)}
//             height={scale(this.size)}
//             style={{ data: { fill: this.onChartFill } }}
//             data={this.getChartData()}
//             cornerRadius={scale(25)}
//             innerRadius={scale(40)}
//           />
//           <SvgText
//             textAnchor='middle'
//             verticalAnchor='middle'
//             x={scale(this.size / 2)}
//             y={scale(this.size / 2)}
//             height={scale(this.fontSize)}
//             fontSize={scale(this.fontSize)}
//             fontFamily={SwTheme.current.fonts.family.regular}
//             stroke={SwTheme.current.colors.text.base}
//             fill={SwTheme.current.colors.text.base}>
//             {`${this.state.percents}%`}
//           </SvgText>
//         </Svg>
//         <View>
//           <SwText swType='header4'>REACH</SwText>
//           <SwText swType='header2'>1 500 356</SwText>
//           <SwText swType='secondary2'>+6 per day in average</SwText>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = SwStyleSheet.create(() => ({
//   chartContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginTop: 10,
//   },
// }));
