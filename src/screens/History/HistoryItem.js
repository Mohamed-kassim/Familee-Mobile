import React, {Component} from 'react';
import {Block, Divider, Card, Text} from '../../components';
import {theme, mocks, mapStyles} from '../../constants';
import {CircularProgress} from 'react-native-circular-progress';

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  Linking,
} from 'react-native';
import rgba from 'hex-to-rgba';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import axios from 'react-native-axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import moment from 'moment';

export default class HistoryItem extends Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount = () => {
    // this.circularProgress.animate(100, 8000, Easing.quad);
  };
  state = {
    showMap: true,
  };
  toggleState = item => {
    this.setState(prevState => ({
      [item]: !prevState[item],
    }));
  };
  renderShowMapIcon = () => {
    const {showMap} = this.state;
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('Trip', {map: !showMap})}>
        onPress={() => this.toggleState('showMap')}>
        <Text medium accent={showMap} primary={!showMap} transform="uppercase">
          {showMap ? 'show report' : 'show map'}
        </Text>
      </TouchableOpacity>
    );
  };
  renderMarkers = markers =>
    markers.map((station, index) => {
      console.log(station.coords);
      return (
        <Marker
          key={index}
          // rotation={-15}
          anchor={{x: 0.5, y: 0.5}}
          coordinate={{
            latitude: station.coords.latitude ? station.coords.latitude : 0,
            longitude: station.coords.longitude ? station.coords.longitude : 0,
          }}
          // onPress={(details) => {
          //   console.log('details', details)
          //   this.handleMarkerOnPress(station)}}
        >
          <Text bold center caption>
            {station.locationName}
          </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require('../../assets/icons/marker.png')}
              style={{
                height: theme.sizes.base * 1.5,
                width: theme.sizes.base * 1.5,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Marker>
      );
    });
  renderChart = () => {
    const {
      score,
      scoreString,
      duration,
      distance,
      calories,
      speed,
    } = this.props.navigation.state.params.trip;
    console.log(score, scoreString);
    return (
      <Card padding={[15]} style={{borderRadius: theme.sizes.base}}>
        <Block flex={false} center middle>
          <CircularProgress
            size={theme.sizes.base*11}
            fill={score * 10}
            lineCap="round"
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base*.8}
            tintColor={theme.colors.primary} // gradient is not supported :(
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2*.7}>
            {() => (
              <Block center middle>
                <Text h1 bold>
                  {score}
                </Text>
                <Text h2 transform="uppercase">
                  {' '}
                  {scoreString}
                </Text>
              </Block>
            )}
          </CircularProgress>
        </Block>
        <Block flex={false} center>
          <Text title spacing={1} style={{marginVertical: 5}}>
            Burned Calories
          </Text>
          <Text>
            <Text primary>{calories} </Text>
            <Text gray transform="uppercase">
              calorie
            </Text>
          </Text>
        </Block>

        <Divider
          flex={false}
          margin={[theme.sizes.padding * 0.7, theme.sizes.base * 2]}
        />
        <Block flex={false} row>
          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>
              {distance}
            </Text>
            <Text spacing={0.7}>Miles</Text>
          </Block>
          <Block center flex={2}>
            <Text size={20} spacing={1} primary>
              {duration}
            </Text>
            <Text spacing={0.7}>Minutes</Text>
          </Block>

          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>
              {speed}
            </Text>
            <Text spacing={0.7}>km/h</Text>
          </Block>
        </Block>
      </Card>
    );
  };
  renderMap = () => {
    const {
      from,
      to,
      routeCoordinates,
    } = this.props.navigation.state.params.trip;
    return (
      <Card
        padding={[0]}
        style={{overflow: 'hidden', borderRadius: theme.sizes.base}}>
        <MapView
          region={{
            ...routeCoordinates[0],
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}>
          <Polyline coordinates={routeCoordinates} strokeWidth={5} />
          {this.renderMarkers([from, to])}
        </MapView>
      </Card>
    );
  };

  renderTripDetails = () => {
    const {
      from,
      to,
      cash,
      time,
      date,
    } = this.props.navigation.state.params.trip;
    return (
      <Card padding ={[10]} style={{borderRadius: theme.sizes.base}}>
          <Block flex={false}>
            <Text h3 bold center>
              Driving Data
            </Text>
          </Block>
          <Divider
            flex={false}
            style={{marginVertical: theme.sizes.base }}
          />
          <Block
            row
            center
           space={'between'}
           flex={false}
            margin={[0, 0, theme.sizes.padding , 0]}>
            <Text caption bold gray>
              {time.slice(0, 10)}
            </Text>
            <Text caption bold gray spacing={1}>
              {moment.utc(time).format("HH:mm")}
            </Text>
          </Block>
          <Block flex={false}>
            <Block flex={false}  row center space={'between'}>
              <Text>From</Text>
              <Text title primary spacing={1}>
                {from.locationName}
              </Text>
            </Block>
            <Divider
            flex={false}
            style={{marginVertical: theme.sizes.base *1.5}}
          />
            <Block flex={false}row center space={'between'}>
              <Text>To</Text>
              <Text title primary spacing={1}>
                {to.locationName}
              </Text>
            </Block>
            <Divider
            flex={false}
            style={{marginVertical: theme.sizes.base*1.5 }}
          />
            <Block  flex={false} row center middle>
              <Text>{`Total Cash     `}</Text>
              <Text title primary spacing={1}>{`${cash} EGB`}</Text>
            </Block>
          </Block>
      </Card>
    );
  };
  render() {
    console.log(this.props.navigation.state.params);
    const {showMap} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.gray4,
          paddingHorizontal: theme.sizes.base * 0.8,
        }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Current Trip
          </Text>
          {this.renderShowMapIcon()}
        </Block>
        <Block flex={0.52}>
          {showMap ? this.renderMap() : this.renderChart()}
        </Block>
        <Block flex={0.48}>{this.renderTripDetails()}</Block>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.sizes.base,
  },
});
