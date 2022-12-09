import React from "react";
import { Text, View } from "react-native";
import LoginOneScreen from "./screens/auth/LoginOneScreen";
import CreateUserScreen from "./screens/auth/CreateUserScreen";
import HommeScreen from "./screens/auth/HommeScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function AppContainer() {
    return (
        <NavigationContainer>
            <HommeScreen />
        </NavigationContainer>
    )
}