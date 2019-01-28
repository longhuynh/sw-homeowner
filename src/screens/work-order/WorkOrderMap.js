import React from 'react';
import MapView, { ProviderPropType, Marker } from 'react-native-maps';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 30.502870;
const LONGITUDE = -97.671947;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.001;

function createMarker(modifier = 1) {
  return {
    coordinate: {
      latitude: LATITUDE - (SPACE * modifier),
      longitude: LONGITUDE - (SPACE * modifier)
    }
  };
}

const Markers = [
  createMarker(),
];

export class WorkOrderMap extends React.Component {
  static navigationOptions = {
    title: 'Work Order Map'.toUpperCase(),
  };

  static propTypes = {
    provider: ProviderPropType,
  };

  constructor(props) {
    super(props);   
  }

  render = () => {
    return (
      <View style={styles.container}>
      <MapView
        ref={ref => { this.map = ref; }}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {Markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={marker.coordinate}            
          >
            <Image source={require('../../assets/images/houses/bldgBlack.png')} />
          </Marker>
        ))}
      </MapView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
