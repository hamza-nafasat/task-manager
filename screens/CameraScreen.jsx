import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = ({ navigation, route }) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = useState(null);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            requestPermission(status === "granted");
        })();
    });
    if (permission === null) {
        return <View />;
    }
    // open image from gallery function
    // --------------------------------
    const openImagePickerHandler = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required");
            return;
        }
        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspects: [1, 1],
            quality: 1,
        });
        if (route.params.updateProfile) {
            return navigation.navigate("profile", { image: data.assets?.[0]?.uri });
        } else {
            return navigation.navigate("register", { image: data.assets?.[0]?.uri });
        }
    };
    // click picture with camera function
    // ----------------------------------
    const clickPictureHandler = async () => {
        const data = await camera.takePictureAsync();
        if (route.params.updateProfile) {
            return navigation.navigate("profile", { image: data.uri });
        } else {
            return navigation.navigate("register", { image: data.uri });
        }
    };
    // flip camera function
    // --------------------
    const flipCameraHandler = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };
    return (
        <View style={styles.container}>
            <Camera style={{ flex: 1, aspectRatio: 1 }} type={type} ratio="1:1" ref={(e) => setCamera(e)} />
            <View
                style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 10,
                    justifyContent: "space-evenly",
                    width: "100%",
                }}
            >
                <Icon name="image" size={40} color="white" onPress={openImagePickerHandler} />
                <Icon name="camera" size={40} color="white" onPress={clickPictureHandler} />
                <Icon name="flip-camera-android" size={40} color="white" onPress={flipCameraHandler} />
            </View>
        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black",
    },
});
