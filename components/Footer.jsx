import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Footer = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainView}>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
                <Icon name="home" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Icon name="user" size={30} color="#900" />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    mainView: {
        padding: 30,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-around",
    },
});
