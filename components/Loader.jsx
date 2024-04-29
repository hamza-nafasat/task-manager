import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator animating={true} size={50} color="#900" />
        </View>
    );
};

export default Loader;
