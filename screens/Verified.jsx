import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/reducer";
import { loadUser, otpVerification } from "../redux/action";

const Verified = () => {
    const dispatch = useDispatch();
    const { error, user, message } = useSelector((state) => state.authReducer);
    const [otp, setOtp] = useState("");

    const verifyHandler = async () => {
        if (otp) {
            await dispatch(otpVerification(otp));
            dispatch(loadUser());
        }
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
            <Text style={styles.welcomeText}>VERIFY YOUR ACCOUNT</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginBottom: 30 }}
                    label="Otp"
                    mode="outlined"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter Your Otp"
                    value={otp}
                    keyboardType="numeric"
                    onChangeText={(text) => setOtp(text)}
                />
                <TouchableOpacity disabled={!otp} style={styles.verifyBtn} onPress={verifyHandler}>
                    <Text style={{ color: "white", fontSize: 20 }}>Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Verified;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    welcomeText: {
        fontSize: 22,
        marginBottom: 50,
        color: "#900",
        fontWeight: "bold",
    },
    verifyBtn: {
        backgroundColor: "#900",
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        elevation: 30,
    },
});
