<template>
<div id="app">
  <v-app>
    <v-main>
      <v-theme-provider root :dark="isDark">
        <v-container>
          <v-row justify="center" class="ma-5">
            <v-col xs="12" sm="8">
              <v-card>
                <v-toolbar color="blue darken-4" dark>
                  <v-toolbar-side-icon></v-toolbar-side-icon>
                  <v-toolbar-title class="headline">Todo App</v-toolbar-title>

                  <v-spacer></v-spacer>

                  <!-- <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon @click="isDark = !isDark" v-on="on">
                        <v-icon v-model="isDark">{{ !isDark ? 'mdi-weather-night' : 'mdi-weather-cloudy' }}</v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{ isDark ? 'light mode' : 'dark mode' }}
                    </span>
                  </v-tooltip> -->
                </v-toolbar>

                <v-list two-line subheader>
                  <v-subheader class="headline">{{day}}, {{date}}{{ord}} {{year}}</v-subheader>
                  <p class="mx-12 text-right"><b>{{todos.length}}</b> Tasks</p>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>

                        <v-text-field v-model="newTodo" id="newTodo" name="newTodo" label="Type your task" @keyup.enter="addTodo" />
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>

                <v-list subheader two-line flat>
                  <v-subheader class="subheading" v-if="todos.length == 0">You have 0 Tasks, add some</v-subheader>
                  <v-subheader class="subheading" v-elseif="todos.length == 1">Your Tasks</v-subheader>

                  <v-list-item-group>
                    <v-list-item v-for="(todo, i) in todos" v-bind:key="(todo,i)">
                      <template #default="{ active, toggle }">
                        <v-list-item-action>

                          <v-checkbox v-model="active" @click="toggle"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title :class="{
                  done: active
                  }">{{ todo.title | capitalize }}</v-list-item-title>
                          <v-list-item-subtitle>Added on: {{ date }}{{ ord }} {{ day }} {{ year }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-btn fab ripple small color="red" v-if="active" @click="removeTodo(i)">
                          <v-icon class="white--text">mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
              <p class="subheading">Project 1</p>
            </v-col>
          </v-row>
        </v-container>
      </v-theme-provider>
    </v-main>
  </v-app>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

const LOCAL_STORAGE_KEY = 'todo-app-vue';
export default {
  name: 'todo',
  data () {
    return {
      isDark:true,
      show: true,
      newTodo: '',
      todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
        { text: 'Learn JavaScript ES6+ goodies', isDone: true },
        { text: 'Learn Vue', isDone: false },
        { text: 'Build something awesome', isDone: false },
      ],
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
    }
  },
  methods: {
    addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    todoDay() {
      var d = new Date();
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[d.getDay()];
    },
    nth(d) {
      if(d>3 && d<21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
    createTodo(event) {
      const textbox = event.target;
      this.todos.push({ text: textbox.value.trim(), isDone: false });
      textbox.value = '';
    },
    startEditing(todo) {
      this.editing = todo;
    },
    finishEditing(event) {
      if (!this.editing) { return; }
      const textbox = event.target;
      this.editing.text = textbox.value.trim();
      this.editing = null;
    },
    cancelEditing() {
      this.editing = null;
    },
    destroyTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    clearCompleted() {
      this.todos = this.activeTodos;
    },
  },
  computed: {
    activeTodos() {
      return this.todos.filter((t) => !t.isDone);
    },
    completedTodos() {
      return this.todos.filter((t) => t.isDone);
    },
    // map `this.user` to `this.$store.getters.user`
    // ...mapGetters({
    //   user: 'user',
    // }),
  },
  filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
};
</script>
