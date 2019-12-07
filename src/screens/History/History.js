import React, {useState, useEffect} from 'react';
import {Block, Badge, Card, Text, Input} from '../../components';
import {ActivityIndicator, InteractionManager} from 'react-native'
import {theme, mocks, mapStyles} from '../../constants';
import moment from 'moment'
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
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import { useGlobalState } from '../../utils/state';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default History = ({navigation}) => {
const [reports, setReports] = useState([])
const [userData, setuserData] = useGlobalState('userData')
const [isLoading, setIsLoading] = useState(false)
const BASE_URL = Config.BASE_URL
console.log('BASE_URL', BASE_URL)
console.log('userData is ',userData)
const url = `${BASE_URL}reports`



  const ClearAll = ()=> {
    
    setReports([])
  }
  const renderClearAll = () => (
    <TouchableOpacity onPress={ClearAll} flex={false}>
      <Image
        resizeMode="contain"
        source={require('../../assets/icons/Menu.png')}
        style={{width: 20, height: 24}}
      />
      <Badge
        size={13}
        color={theme.colors.accent}
        style={{position: 'absolute', top: -4, right: -4}}
      />
    </TouchableOpacity>
  );
  const renderTrip = trip => {
    console.log(trip)
    console.log()
    console.log(new Date(trip.time) )
    console.log(new Date(trip.time).getDate())
    return (
    <TouchableOpacity key={`trip-${trip.id}`} onPress={()=> { navigation.navigate('HistoryItem',{trip})}}>
      <Card shadow >
        <Block row space="between" style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.5}body>{trip.time.slice(0, 10)}</Text>
          <Text spacing={0.5} body medium primary>{`${trip.distance} km`}</Text>
          <Text spacing={0.5} body>{moment.utc(trip.time).format("HH:mm")}</Text>
        </Block>
        <Block row center>
          <Badge color={'rgba(46, 204, 113,0.4)'} size={14} style={{ marginRight: 8 }}>
            <Badge color={'rgba(39, 174, 96,1.0)'} size={8} />  
          </Badge>
          <Text spacing={0.5} color="gray">{trip.from.locationName}</Text>
        </Block>
        <Block row center style={{ paddingVertical: 4 }}>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
        </Block>
        
        <Block row center>
          <Badge color={rgba(theme.colors.primary, '0.2')} size={14} style={{ marginRight: 8 }}>
            <Badge color={theme.colors.primary} size={8} />  
          </Badge>
          <Text spacing={0.5} color="gray">{trip.to.locationName}</Text>
        </Block>
      </Card>
      </TouchableOpacity>
    )
  }
  const renderTrips = ()=> {
    return (
      <React.Fragment>
        <Block style={{marginBottom: theme.sizes.base}}>
        <Text spacing={0.4} transform="uppercase">
            Recent Trips
          </Text>
        </Block>

        {reports.map(trip => renderTrip(trip))}
      </React.Fragment>
    );
  }

    const empty = (!reports.length == 0 || !reports === undefined)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.gray4,
          paddingHorizontal: theme.sizes.base * 0.8,
        }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Cart
          </Text>

          {empty && renderClearAll()}
        </Block>
        {(isLoading)? <ActivityIndicator size="small" color={theme.colors.primary} /> :(!empty)?
        <Block center middle>
          <Text spacing={0.4} transform="uppercase" bold  middle primary center>
            you have no Items in Cart
          </Text>
          <Text>
          You are a son u can gain <Text bold primary>5 Points</Text> on your Cart
          </Text>
          <Text bold>
          Remeber: Ask your <Text bold primary>parents</Text> to order to get more points
          </Text>
        </Block>
        :
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          {renderTrips()}
        </ScrollView>
        }
      </SafeAreaView>
    );
  }

  History.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.sizes.base,
  },
});
