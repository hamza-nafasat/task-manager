import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask, loadUser } from "../redux/action";

const Task = ({ title, description, status, taskId }) => {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(status);

    const handleCheckbox = () => {
        setCompleted(!completed);
        dispatch(completeTask(taskId));
    };
    const deleteHandler = async () => {
        await dispatch(deleteTask(taskId));
        dispatch(loadUser());
    };
    return (
        <View style={styles.mainView}>
            <View style={{ width: "70%" }}>
                <Text style={styles.text}>{title}</Text>
                <Text style={{ color: "#414141", textDecorationLine: completed ? "line-through" : "none" }}>
                    {description}
                </Text>
            </View>
            <Checkbox status={completed ? "checked" : "unchecked"} onPress={handleCheckbox} />
            <Icon name="delete" size={20} color="white" style={styles.DeleteIcon} onPress={deleteHandler} />
        </View>
    );
};

export default Task;
const styles = StyleSheet.create({
    mainView: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    text: {
        fontSize: 20,
        marginVertical: 7,
        color: "#900",
    },
    DeleteIcon: {
        backgroundColor: "#900",
        padding: 10,
        borderRadius: 100,
    },
});
