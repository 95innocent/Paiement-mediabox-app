import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import React, { useState, useEffect } from "react";
import { Image, useWindowDimensions, ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from "../../styles"
import fetchApi from '../../helpers/fetchApi';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment/moment';
export default function CreateUserScreen() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setPassword] = useState("");
    const [compte, setCompte] = useState("");
    const [montant, setMontant] = useState("");
    const { height } = useWindowDimensions()
    const [myNewdate, setmyNewdate] = useState(new Date());
    const [displaymodetype, setModeType] = useState('date');
    const [isDisplayDateNew, setShowNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const changeSelectedDateNew = (event, selectedDateNew) => {
        const currentDate = selectedDateNew || mydate;
        setShowNew(Platform.OS === "ios");
        setmyNewdate(currentDate);

    };
    const showModeNew = (currentMode) => {
        setShowNew(true);
        setModeType(currentMode); null
    };
    const displayDatepickerNew = () => {
        showModeNew('date');
    };
    const createUser = async () => {
        setIsLoading(true)
        try {
            // console.log(form)

            const userData = await fetchApi("/users", {
                method: "POST",
                body: JSON.stringify({
                    NOM: nom,
                    PRENOM: prenom,
                    PASSWORD: password,
                    DATE_NAISSANCE: moment(myNewdate).format("YYYY/MM/DD"),
                    COMPTE: compte,
                    MONTANT: montant
                }),
                // body: form,
                headers: { "Content-Type": "application/json" },
            });
            setNom("")
            setPrenom("")
            setPassword("")
            setCompte("")
            setMontant("")
            setIsLoading(false)

        }
        catch (error) {
            console.log(error)
        }
        setIsLoading(false)

    }

    return (

        <View style={styles.container}>
            <ScrollView>
                <Image source={require('../../../assets/images/Mediabox.png')} style={{ ...styles.image, resizeMode: "center", height: (10 * height - StatusBar.currentHeight) / 100 }} />
                <Text style={styles.title}>Inscription du client</Text>
                <ScrollView></ScrollView>
                <View style={{ marginBottom: 25 }}>
                    <Input
                        placeholder='Entrer nom'
                        InputLeftElement={
                            <Icon
                                as={<MaterialCommunityIcons name="account" size={24} color="black" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        py={2}
                        onChangeText={(nom) => setNom(nom)}
                        value={nom}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="next"
                        blurOnSubmit={false}

                        autoCompleteType='off'
                    />
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Input
                        placeholder='Entrer Prenom '
                        InputLeftElement={
                            <Icon
                                as={<MaterialCommunityIcons name="account" size={24} color="black" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        py={2}

                        onChangeText={(prenom) => setPrenom(prenom)}
                        value={prenom}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="next"
                        blurOnSubmit={false}

                        autoCompleteType='off'
                    />
                </View>



                <TouchableOpacity style={styles.datePickerButton} onPress={displayDatepickerNew}>
                    <View style={styles.iconDebutName}>
                        <MaterialIcons name="calendar-today" size={18} color="#777" style={styles.icon} />
                        <Text style={styles.debutName}>
                            Date
                        </Text>
                    </View>
                    <View style={styles.rightDate}>
                        <Text>{moment(myNewdate).format("DD-MM-YYYY ")}</Text>
                    </View>
                </TouchableOpacity>
                {isDisplayDateNew && <DateTimePicker
                    testID="dateTimePicker"
                    value={myNewdate}
                    mode={displaymodetype}
                    is24Hour={true}
                    maximumDate={new Date()}
                    display="default"
                    onChange={changeSelectedDateNew}
                />}

                <View style={{ marginBottom: 25 }}>
                    <Input
                        placeholder=' Enter password'
                        InputLeftElement={
                            <Icon
                                as={<Ionicons name="lock-closed-outline" size={20} color="#777" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        py={2}

                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        autoCompleteType='off'
                    />
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Input
                        placeholder='Entrer compte'
                        InputLeftElement={
                            <Icon
                                as={<Foundation name="list-number" size={24} color="black" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        py={2}

                        onChangeText={(compte) => setCompte(compte)}
                        value={compte}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        autoCompleteType='off'
                    />
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Input
                        placeholder='Entrer montant'
                        InputLeftElement={
                            <Icon
                                as={<Foundation name="list-number" size={24} color="black" />}
                                size={6}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        py={2}

                        onChangeText={(montant) => setMontant(montant)}
                        value={montant}
                        _focus={{
                            borderBottomColor: primaryColor
                        }}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        autoCompleteType='off'
                    />
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Button
                        isDisabled={!nom || !prenom || !montant || !compte || !password}
                        isLoading={isLoading}
                        borderRadius={15}
                        //isLoading={loading}
                        onPress={createUser}
                        mt={5}
                        backgroundColor={"#0a5744"}
                        py={3.5}
                        _text={{ color: '#fff', fontWeight: 'bold' }}
                    >
                        Enregistrer
                    </Button>
                </View>
            </ScrollView>
        </View>




    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
    },
    cardLogin: {
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 20,
        marginBottom: 25,
        opacity: 0.8,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    iconDebutName: {
        flexDirection: "row",
        alignItems: 'center'
    },

    datePickerButton: {
        flexDirection: "row",
        borderWidth: 1,
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: "#dde1ed",
        borderColor: "#ddd",
        padding: 9,
        justifyContent: "space-between",
        marginTop: 10,
        // marginHorizontal: 10
    },
    debutName: {
        marginLeft: 10,
        color: '#777'
    },
    image: {
        maxWidth: '50%',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 30,
        width: 30,
        height: 30

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