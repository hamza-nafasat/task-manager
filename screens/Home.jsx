import { useEffect, useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Dialog, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import Task from "../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadUser } from "../redux/action";
import { clearError, clearMessage, clearTaskError, clearTaskMessage } from "../redux/reducer";

const Home = () => {
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.messageReducer);
    const { user, message: userMessage, error: userError } = useSelector((state) => state.authReducer);
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // open dialog and close
    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
        setTitle("");
        setDescription("");
    };
    // add task handler
    const addTaskHandler = async () => {
        await dispatch(addTask(title, description));
        await dispatch(loadUser());
        handleOpenDialog();
        setTitle("");
        setDescription("");
    };
    // showing message from redux and error
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearTaskError());
        }
        if (message) {
            alert(message);
            dispatch(clearTaskMessage());
        }
        if (userMessage) {
            alert(userMessage);
            dispatch(clearMessage());
        }
        if (userError) {
            alert(userError);
            dispatch(clearError());
        }
    }, [error, message, dispatch]);

    return (
        <>
            <View style={styles.main}>
                <ScrollView>
                    <SafeAreaView>
                        <Text style={styles.heading}>Your All Tasks</Text>
                        {user?.tasks?.map((task, i) => (
                            <Task
                                key={i}
                                taskId={task?._id}
                                title={task?.title}
                                description={task?.description}
                                status={task?.completed}
                            />
                        ))}
                        <TouchableOpacity style={styles.addTaskIcon} onPress={handleOpenDialog}>
                            <Icon name="add-to-list" size={20} color={"#900"} />
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </View>
            <Dialog visible={openDialog} onDismiss={handleOpenDialog}>
                <Dialog.Title style={{ textAlign: "center" }}>Add A Task</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={{ marginBottom: 15 }}
                        label="Title"
                        mode="outlined"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <TextInput
                        style={{ marginBottom: 20 }}
                        label="Description"
                        mode="outlined"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <View
                        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}
                    >
                        <Button textColor="#900" style={styles.cancelBtn} onPress={handleOpenDialog}>
                            Cancel
                        </Button>
                        <Button
                            // disabled={!title || !description}
                            textColor="white"
                            style={styles.addBtn}
                            onPress={addTaskHandler}
                        >
                            Add
                        </Button>
                    </View>
                </Dialog.Content>
            </Dialog>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 5,
    },
    heading: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 25,
        marginBottom: 20,
        color: "white",
        paddingVertical: 15,
        backgroundColor: "#900",
    },
    addTaskIcon: {
        backgroundColor: "white",
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 100,
        marginVertical: 20,
        elevation: 10,
    },
    cancelBtn: {
        backgroundColor: "white",
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        marginHorizontal: 10,
        elevation: 10,
    },
    addBtn: {
        backgroundColor: "#900",
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        marginHorizontal: 10,
        elevation: 10,
    },
});
