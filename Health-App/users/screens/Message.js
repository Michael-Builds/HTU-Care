import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const Messages = () => {
  const navigation = useNavigation();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const headingRef = useRef(null);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newId = todos.length + 1;
      const newTodoObj = {
        id: newId,
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, title) => {
    setEditingTodoId(id);
    setEditingTodoText(title);
  };

  const handleSaveEditTodo = () => {
    if (editingTodoText.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodoId ? { ...todo, title: editingTodoText } : todo
        )
      );
      setEditingTodoId(null);
      setEditingTodoText("");
    }
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => handleToggleTodo(item.id)}
        style={styles.checkbox}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      {editingTodoId === item.id ? (
        <TextInput
          style={styles.editTodoInput}
          value={editingTodoText}
          onChangeText={setEditingTodoText}
          autoFocus
        />
      ) : (
        <Text style={styles.todoTitle}>{item.title}</Text>
      )}

      {editingTodoId === item.id ? (
        <TouchableOpacity
          onPress={() => handleSaveEditTodo(item.id)}
          style={styles.saveEditButton}
        >
          <Ionicons name="checkmark" size={25} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleEditTodo(item.id, item.title)}
          style={styles.editButton}
        >
          <Ionicons name="pencil" size={25} color="#000" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => handleDeleteTodo(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-bin" size={25} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  const animateHeader = () => {
    headingRef.current?.bounceIn(1000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Home" isHome={true} navigation={navigation} />
      <View style={styles.container}>
        <Animatable.View
          style={styles.headerContainer}
          animation="fadeIn"
          duration={1000}
          delay={500}
          onAnimationEnd={animateHeader}
        >
          <Animatable.Text
            ref={headingRef}
            style={styles.heading}
            animation="bounceIn"
            duration={1000}
          >
            Todo List
          </Animatable.Text>
          <Text style={styles.slogan}>Stay Healthy, Stay Productive</Text>
        </Animatable.View>

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.todoList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a new todo"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Image
              source={require("../../assets/images/add.png")}
              style={styles.addButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  addButtonImage: {
    width: 22,
    height: 22,
    tintColor: "#fff",
  },
  slogan: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 10,
    marginTop: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  todoList: {
    flexGrow: 1,
    marginTop: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  checkmark: {
    fontSize: 16,
    color: "green",
  },
  todoTitle: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    marginLeft: 8,
  },
  deleteButton: {
    marginLeft: 8,
  },
  editTodoInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#075eec",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
export default Messages;
