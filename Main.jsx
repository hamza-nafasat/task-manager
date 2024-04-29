import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { loadUser } from "./redux/action";
import CameraScreen from "./screens/CameraScreen";
import ChangePassword from "./screens/ChangePassword";
import ForgetPassword from "./screens/ForgetPassword";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Verified from "./screens/Verified";
import ResetPassword from "./screens/ResetPassword";

const Stack = createNativeStackNavigator();

const Main = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.authReducer);
    // get user by token when he come to app
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
                <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="verify" component={Verified} options={{ headerShown: false }} />
                <Stack.Screen name="camera" component={CameraScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="forgetPassword"
                    component={ForgetPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="resetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen
                    name="changePassword"
                    component={ChangePassword}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
            {isAuthenticated && <Footer />}
        </NavigationContainer>
    );
};

export default Main;
