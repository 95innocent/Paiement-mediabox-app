import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import React, { useState, useEffect } from "react";
import { Image, useWindowDimensions, ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import CreateUserScreen from './CreateUserScreen';
import LoginOneScreen from './LoginOneScreen';
const TopBar = createMaterialTopTabNavigator()
export default function HommeScreen() {
    return (
        <>
        <View style={{marginTop:30}}></View>
        <TopBar.Navigator>
            <TopBar.Screen name="connexion" component={LoginOneScreen} />
            <TopBar.Screen name="inscription" component={CreateUserScreen} />
        </TopBar.Navigator>
        </>
        

    );

}

const styles = StyleSheet.create({

})