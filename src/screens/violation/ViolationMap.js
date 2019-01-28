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
  createMarker(2),
  createMarker(3),
  createMarker(4),
  createMarker(-1),
  createMarker(-2),
  createMarker(-3),
  createMarker(-4),
];

const DefaultPadding = { top: 40, right: 40, bottom: 40, left: 40 };

export class ViolationMap extends React.Component {
  static navigationOptions = {
    title: 'Violation Map'.toUpperCase(),
  };

  static propTypes = {
    provider: ProviderPropType,
  };

  constructor(props) {
    super(props);   
  }

  fitPadding() {
    this.map.fitToCoordinates([Markers[2], Markers[3]], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }

  fitBottomTwoMarkers() {
    this.map.fitToCoordinates([Markers[2], Markers[3]], {
      edgePadding: DefaultPadding,
      animated: true,
    });
  }

  fitAllMarkers() {
    this.map.fitToCoordinates(Markers, {
      edgePadding: DefaultPadding,
      animated: true,
    });
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
            <Image source={require('../../assets/images/houses/houseGreen.png')} />
          </Marker>
        ))}
      </MapView>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.fitPadding()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Fit Bottom Two Markers with Padding</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.fitBottomTwoMarkers()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Fit Bottom Two Markers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.fitAllMarkers()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Fit All Markers</Text>
        </TouchableOpacity>
      </View> */}
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
