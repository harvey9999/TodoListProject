<template>
  <div id="todo">
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center align-center>
          <v-text-field label="Add Todo" @keydown.enter="createTodo" v-model="inputTodo">

            <!-- <v-icon slot="append" color="blue" > mdi-plus </v-icon> -->
          </v-text-field>
          <v-text-field
                  label="Due Date"
                  type="date"
                  v-model="dueDate"
              ></v-text-field>
              <div class="text-right">
           <v-btn @click="createTodo">
              Add Task
            </v-btn>
            </div>
            <div class="text-left">
           <p> <v-btn></v-btn> Active: {{ taskActive }}
             </p>

            <p> <v-btn></v-btn> Completed: {{ taskCompleted }}
             </p>
             <strong class="mx-3 black--text"> Task Completed {{ taskCompleted }} % </strong>
              <v-progress-circular :value="calculateProgress"></v-progress-circular>
            </div>
            <br>
         <v-card v-for="(items,key) in todos" v-bind:key="key" :todoname="key" :todovalue="items" v-model="inputTodo">
            <v-card-title>
     <v-checkbox v-model="items.isDone" v-on:change ="update(key , items.isDone ,'isDone')" color="black">

       <div
                  slot="label"
                  :class="(items.isDone && 'text-decoration-line-through') || 'text--primary'"
                  v-text="items.text"
              >Line-through text
              </div>
     </v-checkbox>

    <v-list-item-title>Due Date: {{ items.dueDate }}</v-list-item-title>
    <v-spacer></v-spacer>
    <v-btn>
    <v-icon color="blue">mdi-plus</v-icon>
    </v-btn>
    <v-btn @click='deleteTodo(key)'>
    <v-icon  color="red">mdi-delete</v-icon>
    </v-btn>
    </v-card-title>
          </v-card>
          <v-divider></v-divider>
          <br>
          <v-btn @click="clearCompleted"> Clear </v-btn>
          <div class="text-right">
          <v-btn @click.prevent="signOut"> Sign Out </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/database';

export default {
  name: 'Todos',
  data() {
    return {
      todoRef: null,
      todos: Object,
      dueDate: '',
      inputTodo: '',
      tasks: [],
      todovalue: Object,
      todoname: String,

    };
  },
  created() {
    this.todoRef = firebase.database().ref(`/users/${this.$store.state.auth.user.data.uid}`);
    this.$store.dispatch('todos/setTodoRef', this.todoRef);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      this.todos = snapshot.val();
      this.$store.dispatch('todos/setTodo', this.todos);
    });
  },
  computed: {
    taskCompleted() {
      return this.tasks.filter((tasks) => tasks.isDone).length;
    },
    taskActive() {
      return this.tasks.filter((tasks) => !tasks.isDone).length;
    },
    calculateProgress() {
      if ((Number.isNaN(this.taskCompleted / this.tasks.length) * 100)) {
        return 100;
      }
      return (this.taskCompleted / this.tasks.length) * 100;
    },
  },
  methods: {
    clearCompleted() {
      console.log(1);
      this.$store.dispatch('todos/clearCompleted');
    },
    createTodo() {
      this.todoRef.push({
        text: this.inputTodo.trim(),
        isDone: false,
        dueDate: this.dueDate,
      });
      this.inputTodo = '';
      this.dueDate = '';
    },
    deleteTodo(id) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.data.uid}/${id}`)
        .set({});
    },
    update(id, check, status) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.data.uid}/${id}/${status}`)
        .set(check);
      console.log(`users/${this.$store.state.auth.user.data.uid}/${id}/${status}`);
      console.log(check);
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/userLogout', null);
          this.$router.replace({
            name: 'Login',
          });
        });
    },
  },
};
</script>
<style scoped>
</style>
