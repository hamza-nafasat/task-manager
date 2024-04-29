import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { forgetPassword } from "../redux/action";

const ForgetPassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.messageReducer);
    const [email, setEmail] = useState("");

    const forgetPasswordHandler = async () => {
        await dispatch(forgetPassword(email));
        navigation.navigate("resetPassword");
    };

    return loading ? (
        <Loader />
    ) : (
        <View style={styles.mainView}>
            <Text style={styles.welcomeText}>FORGET PASSWORD</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginBottom: 30 }}
                    label="Email"
                    mode="outlined"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="example@gmail.com"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity disabled={!email} style={styles.otpHandler} onPress={forgetPasswordHandler}>
                    <Text style={{ color: "white", fontSize: 15 }}>Send Otp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    welcomeText: {
        fontSize: 25,
        marginBottom: 50,
        color: "#900",
        fontWeight: "bold",
    },
    otpHandler: {
        backgroundColor: "#900",
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        elevation: 30,
    },
});
