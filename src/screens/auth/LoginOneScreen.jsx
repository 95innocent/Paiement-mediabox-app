import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import React, { useState, useEffect } from "react";
import { Image, useWindowDimensions, ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from "../../styles"
import fetchApi from '../../helpers/fetchApi';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
//const [loading, setLoading] = useState(false);
export default function LoginOneScreen() {
    const [PRENOM, setPrenom] = useState("");
    const [PASSWORD, setPassword] = useState("");
    const { height } = useWindowDimensions()
    const login = async () => {
        //setLoading(true);

        const user = {
            PRENOM,
            PASSWORD,

        };
        console.log(user)

        try {

            const userData = await fetchApi("/users/login", {
                method: "POST",
                body: JSON.stringify(user),
                // body: form,
                headers: { "Content-Type": "application/json" },
            });
            console.log(userData)
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            dispatch(setUserAction(userData));
            //setLoading(false);

        }
        catch (error) {
            console.log(error)
            setErrors(error.errors)
        }
        //setLoading(false);
    }
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.cardLogin}>
                    <Image source={require('../../../assets/images/Mediabox.png')} style={{ ...styles.image, resizeMode: "center", height: (10 * height - StatusBar.currentHeight) / 100 }} />
                    <Text style={styles.title}>Connexion</Text>
                    <Input
                        placeholder='prenom ou numéro de téléphone'
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="alternate-email" size={20} color="#777" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        py={2}
                        borderWidth={0}
                        borderBottomWidth={1}
                        borderBottomColor={'#0a5744'}
                        onChangeText={(prenom) => setPrenom(prenom)}
                        value={PRENOM}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        // onSubmitEditing={() => {
                        //     passwordInputRef.current.focus()
                        // }}
                        autoCompleteType='off'
                    />

                    <Input
                        placeholder='Mot de passe'
                        InputLeftElement={
                            <Icon
                                as={<Ionicons name="lock-closed-outline" size={20} color="#777" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />}
                        // InputRightElement={
                        //     <Icon
                        //         as={<Ionicons name={!showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#777" />}
                        //         size={6}
                        //         mr="2"
                        //         color="muted.400"
                        //         onPress={() => setShowPassword(t => !t)}
                        //     />}
                        // secureTextEntry={!showPassword}
                        onChangeText={(em) => setPassword(em)}
                        value={PASSWORD}
                        py={2}
                        borderWidth={0}
                        borderBottomWidth={1}
                        borderBottomColor={'#0a5744'}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="go"
                        mt={3}
                    // ref={passwordInputRef}
                    />
                    <TouchableOpacity>
                        <Text style={styles.forgetPass}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                    <Button
                        borderRadius={15}
                        isDisabled={!PASSWORD || !PRENOM}
                        //isLoading={loading}
                        onPress={login}
                        mt={5}
                        backgroundColor={"#0a5744"}
                        py={3.5}
                        _text={{ color: '#fff', fontWeight: 'bold' }}
                    >
                        Se connecter
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardLogin: {
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 25,
        marginBottom: 25,
        opacity: 0.8,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    image: {
        maxWidth: '50%',
        alignSelf: 'center',
        marginTop: 30,

    },
    forgetPass: {
        color: "#F58424",
        textAlign: 'right',
        marginTop: 10
    },
})