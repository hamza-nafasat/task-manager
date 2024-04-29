import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, TextInput } from "react-native-paper";
import { registerUser } from "../redux/action";
import mime from "mime";
import { useDispatch } from "react-redux";

const Register = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    const registerHandler = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (imageUrl) {
            formData.append("avatar", {
                uri: imageUrl,
                type: mime.getType(imageUrl),
                name: imageUrl.split("/").pop(),
            });
        }
        dispatch(registerUser(formData));
    };
    const selectImageHandler = () => {
        navigation.navigate("camera", { updateProfile: false });
    };

    useEffect(() => {
        setImageUrl(route.params?.image);
    }, [route.params?.image]);

    return (
        <View style={styles.mainView}>
            <Avatar.Image source={{ uri: imageUrl }} size={100} style={{ backgroundColor: "#900" }} />
            <TouchableOpacity onPress={selectImageHandler}>
                <Text style={{ color: "#900" }}>Select Avatar</Text>
            </TouchableOpacity>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginVertical: 15 }}
                    label="Name"
                    mode="outlined"
                    placeholder="John Doe"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={{ marginBottom: 15 }}
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    placeholder="example@gamil.com"
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={{ marginBottom: 30 }}
                    label="Password"
                    secureTextEntry
                    mode="outlined"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    placeholder="**********"
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    disabled={!email || !password || !name ? true : false}
                    style={styles.loginBtn}
                    onPress={registerHandler}
                >
                    <Text style={{ color: "white", fontSize: 15 }}>Register</Text>
                </TouchableOpacity>
                <Text style={{ marginVertical: 10, textAlign: "center" }}>Or</Text>
                <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate("login")}>
                    <Text style={{ color: "#900", fontSize: 15 }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight + 20,
        justifyContent: "center",
        backgroundColor: "#fff",
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
