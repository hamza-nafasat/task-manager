import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { resetPassword } from "../redux/action";
import { clearTaskError, clearTaskMessage } from "../redux/reducer";

const ResetPassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.messageReducer);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordHandler = async () => {
        if (otp && password && confirmPassword) {
            if (password !== confirmPassword) {
                alert("password not match");
                return;
            }
            await dispatch(resetPassword(otp, password));
        }
        navigation.navigate("login");
    };

    // check if any error or message
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearTaskError());
        }
        if (message) {
            alert(message);
            dispatch(clearTaskMessage());
        }
    }, [error, dispatch, message]);

    return loading ? (
        <Loader />
    ) : (
        <View style={styles.mainView}>
            <Text style={styles.welcomeText}>RESET PASSWORD</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginBottom: 30 }}
                    label="Otp"
                    mode="outlined"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter Your Otp"
                    value={otp}
                    keyboardType="number-pad"
                    onChangeText={(text) => setOtp(text)}
                />
                <TextInput
                    style={{ marginBottom: 30 }}
                    label="New Password"
                    mode="outlined"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    placeholder="***********"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={{ marginBottom: 30 }}
                    label="Confirm Password"
                    mode="outlined"
                    autoCapitalize="none"
                    secureTextEntry
                    autoCorrect={false}
                    placeholder="***********"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity
                    disabled={!otp || !password || !confirmPassword}
                    style={styles.otpHandler}
                    onPress={resetPasswordHandler}
                >
                    <Text style={{ color: "white", fontSize: 15 }}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ResetPassword;

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
