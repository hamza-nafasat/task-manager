import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, loadUser } from "../redux/action";
import { clearError } from "../redux/reducer";

const ChangePassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.authReducer);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const ChangePassword = async () => {
        if (oldPassword && newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return alert("New Password and Confirm Password does not match");
            }
            await dispatch(changePassword(oldPassword, newPassword));
        }
        dispatch(loadUser());
    };

    // check if any error
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    return (
        <View style={styles.mainView}>
            <Text style={styles.welcomeText}>Update Password</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginBottom: 25 }}
                    label="Old Password"
                    mode="outlined"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="**********"
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                />
                <TextInput
                    style={{ marginBottom: 35 }}
                    label="New Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    mode="outlined"
                    placeholder="**********"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                    style={{ marginBottom: 35 }}
                    label="Confirm New Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    mode="outlined"
                    placeholder="**********"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />

                <TouchableOpacity
                    disabled={!oldPassword || !newPassword ? true : false}
                    style={styles.loginBtn}
                    onPress={ChangePassword}
                >
                    <Text style={{ color: "white", fontSize: 15 }}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePassword;

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
