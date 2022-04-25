import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
} from "react-native";
// 17
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => { 
    setCourseGoals((currentGoals) => [
      ...courseGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  // for cancelling the Model
  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      
      {/* adding button to toggle between Modal. 
        After clicking tghe button V also need to manage the state of the modal so that it can be updated in the UI
      */}
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />

      {/* <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} /> */}
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />

      <FlatList
        keyFractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          // 2 wasy to pass data to removeGoalHandler 1. explicitly pass the id as prop to the GoalItem Component  2. use the bind()
          <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete={removeGoalHandler}  />
          // <GoalItem id={itemData.item.id} onDelete={removeGoalHandler.bind(this, itemData.item.id)}  />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  }

});
