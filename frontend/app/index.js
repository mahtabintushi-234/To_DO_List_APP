// frontend/app/index.js
// StAuth10244: I Mahtabin Tushi, 000952184 certify that this material is my original work.
// No other person's work has been used without due acknowledgement. I have not made my work available 
// to anyone else.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";

// Web 
const BASE_URL = "http://localhost:3001/";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // ==============================
  // Load todos when app starts
  // ==============================
  useEffect(() => {
    restoreTodos();
  }, []);

  // ==============================
  // Add new todo
  // ==============================
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  // ==============================
  // Delete todo
  // ==============================
  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  // ==============================
  // Start editing
  // ==============================
  const startEdit = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  // ==============================
  // Save edited todo
  // ==============================
  const saveEdit = () => {
    if (inputValue.trim() === "") return;

    const updated = [...todos];
    updated[editIndex] = inputValue;

    setTodos(updated);
    setInputValue("");
    setEditIndex(null);
  };

  // ==============================
  // Save todos to backend
  // ==============================
  const saveTodos = async () => {
    try {
      await axios.post(`${BASE_URL}/save`, todos);
      console.log("Saved to backend");
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // ==============================
  // Restore todos from backend
  // ==============================
  const restoreTodos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/load`);

      console.log("Restored data:", res.data);

      // Ensure response is always an array
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Restore error:", err);
    }
  };

  // ==============================
  // Clear todos (backend + UI)
  // ==============================
  const clearTodos = async () => {
    try {
      await axios.get(`${BASE_URL}/clear`);
      setTodos([]);
      console.log("Todos cleared");
    } catch (err) {
      console.log("Clear error:", err);
    }
  };

  return (
    <View style={styles.container}>

      {/* Top buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.topBtn} onPress={saveTodos}>
          <Text style={styles.topBtnText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topBtn} onPress={restoreTodos}>
          <Text style={styles.topBtnText}>RESTORE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topBtn} onPress={clearTodos}>
          <Text style={styles.topBtnText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      {/* Todo list */}
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => startEdit(index)}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="New TODO"
        value={inputValue}
        onChangeText={setInputValue}
      />

      {/* Add / Edit button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={editIndex === null ? addTodo : saveEdit}
      >
        <Text style={styles.addBtnText}>
          {editIndex === null ? "ADD" : "SAVE EDIT"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },

  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  topBtn: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "30%",
    alignItems: "center",
  },

  topBtnText: { color: "white", fontWeight: "bold" },

  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
  },

  todoText: { fontSize: 16 },

  iconRow: { flexDirection: "row", gap: 10 },

  editIcon: { fontSize: 20 },
  deleteIcon: { fontSize: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  addBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },

  addBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});