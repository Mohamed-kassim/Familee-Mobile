import React, { useState, useEffect } from 'react'
import { Alert, Platform, InteractionManager, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import { Block, Badge, Card, Text, Input, Button } from '../../components';
import { styles as blockStyles } from '../../components/Block';
import { useGlobalState } from '../../utils/state';
import { theme } from '../../constants'
import {Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default FamilySetting = () => {

    const [didFinishInitialAnimation, setDidFinishInitialAnimation] = useState(false)
    const [families, setFamilies] = useGlobalState('families')
    useEffect(() => {


        InteractionManager.runAfterInteractions(() => {
            setDidFinishInitialAnimation(true)
        })

        return () => {

        };
    }, []);
    const renderFamilyItem = member => {
        console.log(member);
        return (
            <TouchableOpacity
                key={member.name}
                activeOpacity={0.8}>
                <Card color={(member.name? '#2ecc71': null)}center shadow style={styles.SponsorCard}>

                    <Text title white transform="capitalize" height={22} bold>
                        {member.name}
                    </Text>

                    <Text transform="capitalize" spacing={0.7} accent>
                        {member.type}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };
    const renderGrandParents = () => {
        return (
            (didFinishInitialAnimation) ?
                <Block>
                    <Block
                        flex={0.1}
                        style={{
                            marginTop: theme.sizes.base,
                            marginBottom: theme.sizes.base,
                            paddingHorizontal: theme.sizes.base / 3,
                        }}>
                        <Text center color={'black'} header spacing={0.7} bold transform="uppercase">
                             Grand Parents
              </Text>
                    </Block>
                    <Block flex={0.9}>
                        <FlatList
                            horizontal
                            scrollEnabled
                            // showsHorizontalScrollIndicator={false}
                            decelerationRate={0}
                            scrollEventThrottle={16}
                            data={families[0].members.grandParents}
                            keyExtractor={(item, index) => `${item.name+item.type}`}
                            renderItem={({ item }) => renderFamilyItem(item)}
                        />
                    </Block>
                </Block>
                :
                <ActivityIndicator size="small" color={theme.colors.primary} />
        );
    };
    const renderParents = () => {
        return (
            (didFinishInitialAnimation) ?
                <Block>
                    <Block
                        flex={0.1}
                        style={{
                            marginTop: theme.sizes.base,
                            marginBottom: theme.sizes.base,
                            paddingHorizontal: theme.sizes.base / 3,
                        }}>
                        <Text center color={'black'} header spacing={0.7} bold transform="uppercase">
                             Parents
              </Text>
                    </Block>
                    <Block flex={0.9}>
                        <FlatList
                            horizontal
                            scrollEnabled
                            // showsHorizontalScrollIndicator={false}
                            decelerationRate={0}
                            scrollEventThrottle={16}
                            data={families[0].members.parents}
                            keyExtractor={(item, index) => `${item.name+item.type}`}
                            renderItem={({ item }) => renderFamilyItem(item)}
                        />
                    </Block>
                </Block>
                :
                <ActivityIndicator size="small" color={theme.colors.primary} />
        );
    };
    const renderChilds = () => {
        return (
            (didFinishInitialAnimation) ?
                <Block>
                    <Block
                        flex={0.1}
                        style={{
                            marginTop: theme.sizes.base,
                            marginBottom: theme.sizes.base,
                            paddingHorizontal: theme.sizes.base / 3,
                        }}>
                        <Text color={'black'} center header spacing={0.7} bold transform="uppercase">
                            Childs
              </Text>
                    </Block>
                    <Block flex={0.9}>
                        <FlatList
                            horizontal
                            scrollEnabled
                            // showsHorizontalScrollIndicator={false}
                            decelerationRate={0}
                            scrollEventThrottle={16}
                            data={families[0].members.childs}
                            keyExtractor={(item, index) => `${item.name+item.type}`}
                            renderItem={({ item }) => renderFamilyItem(item)}
                        />
                    </Block>
                </Block>
                :
                <ActivityIndicator size="small" color={theme.colors.primary} />
        );
    };
    return (
        <Block>
            <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 bold>
                    Your Family tree
          </Text>
            </Block>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Block center middle>
                {renderGrandParents()}
                {renderParents()}
                {renderChilds()}
                </Block>
                <Block center middle>
                <Text bold title>GrandPa Weight : <Text primary>15 Points</Text> </Text>
                <Text bold body >Parents Weight : <Text primary>10 Points </Text></Text>
                <Text bold caption >Son Weight : <Text primary>5 Points </Text></Text>
                </Block>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 0.8,
        paddingVertical: theme.sizes.base,
    },
    mapMyLocation: {
        position: 'absolute',
        borderRadius: 4,
        bottom: theme.sizes.base,
        // left: theme.sizes.base,
        right: theme.sizes.base,
        width: theme.sizes.base * 3,
        height: theme.sizes.base * 3,
        backgroundColor: theme.colors.white,
    },
    search: {
        height: theme.sizes.base * 3,
        width: width - theme.sizes.base * 2,
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 3,
        backgroundColor: 'rgba(142, 142, 147, 0.06)',
        borderColor: 'rgba(142, 142, 147, 0.06)',
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: 'transparent',
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base,
        height: theme.sizes.base,
        width: theme.sizes.base,
    },
    SponsorCard: {
        marginRight: theme.sizes.base,
        width: width / 2.568,
    },
    sponsorIcon: {
        height: theme.sizes.base * 4,
        width: theme.sizes.base * 4,
        marginBottom: theme.sizes.base * 0.7,
    },
    tileIcon: {
        height: theme.sizes.base * 2.5,
        width: theme.sizes.base * 2.5,
        marginBottom: theme.sizes.base * 0.5,
    },
});
