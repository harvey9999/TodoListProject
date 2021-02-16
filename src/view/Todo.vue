<template>
  <div id="todo">
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center align-center>
          <v-text-field label="What needs to be done?" @keydown.enter="createTodo" v-model="inputTodo">

            <!-- <v-icon slot="append" color="blue" > mdi-plus </v-icon> -->
          </v-text-field>
          <v-text-field
                  label="Due Date"
                  type="date"
                  v-model="finishDate"
              ></v-text-field>
              <div class="text-right">
           <v-btn @click="createTodo">
              Add Task
            </v-btn>
            </div>
            <div class="text-left">
           <p> <v-btn></v-btn> Active: 1
             </p>

            <p> <v-btn></v-btn> Completed: 1
             </p>
             <strong class="mx-3 black--text"> Task Completed {{ taskCompleted }} % </strong>
              <v-progress-circular :value="calculateProgress"></v-progress-circular>
            </div>
            <br>
         <v-card v-for="(items,key) in todos" v-bind:key="key" :todoname="key" :todovalue="items" v-model="inputTodo">
            <v-card-title>
     <v-checkbox v-model="items.done" color="black">
       <div
                  slot="label"
                  :class="(items.done && 'text-decoration-line-through') || 'text--primary'"
                  v-text="items.text"
              >Line-through text
              </div>
     </v-checkbox>

    <v-list-item-title>Due Date: {{ items.finishDate }}</v-list-item-title>
    <v-spacer></v-spacer>
    <v-btn>
    <v-icon color="blue">mdi-plus</v-icon>
    </v-btn>
    <v-btn>
    <v-icon color="red">mdi-delete</v-icon>
    </v-btn>
    </v-card-title>
          </v-card>
          <v-divider></v-divider>
          <br>
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
      finishDate: '',
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
      return this.tasks.filter((tasks) => tasks.done).length;
    },
    calculateProgress() {
      if ((Number.isNaN(this.taskCompleted / this.tasks.length) * 100)) {
        return 100;
      }
      return (this.taskCompleted / this.tasks.length) * 100;
    },
  },
  methods: {
    createTodo() {
      this.todoRef.push({
        text: this.inputTodo.trim(),
        isDone: false,
        finishDate: this.finishDate,
      });
      this.inputTodo = '';
      this.finishDate = '';
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
