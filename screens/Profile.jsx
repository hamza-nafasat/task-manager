import mime from "mime";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout, updateProfile } from "../redux/action";
import Loader from "../components/Loader";

const Profile = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.authReducer);
    const [name, setName] = useState(user?.name);
    const [email] = useState(user?.email);
    const [image, setImage] = useState(user?.avatar.url);

    const selectImageHandler = () => {
        navigation.navigate("camera", { updateProfile: true });
    };
    // update user
    const updateHandler = async () => {
        const formData = new FormData();
        if (name) {
            formData.append("name", name);
        }
        if (image) {
            formData.append("avatar", {
                uri: image,
                type: mime.getType(image),
                name: image.split("/").pop(),
            });
        }
        await dispatch(updateProfile(formData));
        dispatch(loadUser());
        // alert("profile Updated Successfully");
    };
    // logout user
    const logoutHandler = async () => {
        await dispatch(logout());
        dispatch(loadUser());
    };
    // use effect for set image from route
    useEffect(() => {
        if (route?.params?.image) {
            setImage(route.params.image);
        }
    }, [route]);
    return loading ? (
        <Loader />
    ) : (
        <View style={styles.mainView}>
            <Avatar.Image source={{ uri: image }} size={120} style={{ backgroundColor: "#900" }} />
            <TouchableOpacity onPress={selectImageHandler}>
                <Text style={{ color: "#900" }}>Edit Avatar</Text>
            </TouchableOpacity>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={{ marginVertical: 25 }}
                    label="Name"
                    mode="outlined"
                    placeholder="John Doe"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={{ marginBottom: 25 }}
                    label="Email"
                    mode="outlined"
                    value={email}
                    disabled
                />
                <TouchableOpacity style={styles.updateBtn} onPress={updateHandler}>
                    <Text style={{ color: "white", fontSize: 15 }}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutBtn} onPress={logoutHandler}>
                    <Text style={{ color: "#900", fontSize: 15 }}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.changePasswordBtn}
                    onPress={() => navigation.navigate("changePassword")}
                >
                    <Text style={{ color: "white", fontSize: 15 }}>Change Password</Text>
                </TouchableOpacity>
                {!user?.verified && (
                    <TouchableOpacity style={styles.verifyBtn} onPress={() => navigation.navigate("verify")}>
                        <Text style={{ color: "#900", fontSize: 15 }}>Verify Your Account</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: "#fff",
    },
    updateBtn: {
        backgroundColor: "#900",
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        elevation: 30,
        marginBottom: 20,
    },
    logoutBtn: {
        backgroundColor: "white",
        height: 40,
        elevation: 10,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    changePasswordBtn: {
        backgroundColor: "#900",
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        elevation: 30,
        marginBottom: 20,
    },
    verifyBtn: {
        // backgroundColor: "#0206e6",
        backgroundColor: "white",
        height: 40,
        elevation: 10,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
