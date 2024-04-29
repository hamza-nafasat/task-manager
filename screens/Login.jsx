import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action";
import { clearError, clearMessage, clearTaskError, clearTaskMessage } from "../redux/reducer";

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.authReducer);
    const { message: taskMessage, error: taskError } = useSelector((state) => state.messageReducer);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async () => {
        dispatch(login(email, password));
        setEmail("");
        setPassword("");
    };

    // check if any error
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
        if (message) {
            alert(message);
            dispatch(clearMessage());
        }
        if (taskError) {
            alert(taskError);
            dispatch(clearTaskError());
        }
        if (taskMessage) {
            alert(taskMessage);
            dispatch(clearTaskMessage());
        }
    }, [error, dispatch, taskError, taskMessage, message]);

    return (
        <View style={styles.mainView}>
            <Text style={styles.welcomeText}>WELCOME HERE</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginBottom: 15 }}
                    label="Email"
                    mode="outlined"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="example@gmail.com"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    label="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    mode="outlined"
                    placeholder="**********"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={{ marginBottom: 30, marginTop: 10 }}
                    onPress={() => navigation.navigate("forgetPassword")}
                >
                    <Text style={{ fontSize: 15, color: "#900" }}>Forget Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!email || !password ? true : false}
                    style={styles.loginBtn}
                    onPress={loginHandler}
                >
                    <Text style={{ color: "white", fontSize: 15 }}>Login</Text>
                </TouchableOpacity>
                <Text style={{ marginVertical: 10, textAlign: "center" }}>Or</Text>
                <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate("register")}>
                    <Text style={{ color: "#900", fontSize: 15 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

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
    loginBtn: {
        backgroundColor: "#900",
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        elevation: 30,
    },
    registerBtn: {
        backgroundColor: "white",
        height: 40,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
