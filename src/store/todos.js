export default {
  state: {
    currentTaskKey: null,
    task: null,
    todosRef: null,
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    setTask(state, task) {
      state.task = task;
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    setTodosRef(state, ref) {
      state.todosRef = ref;
    },
    setCurrentTaskKey(state, key) {
      state.currentTaskKey = key;
    },
  },
  actions: {
    clearCompleted(context) {
      context.commit('todos/setTodos', context.state.todos.filter((todo) => todo.isDone));
    },
    destroyTodo(context, todo) {
      const index = context.state.todos.indexOf(todo);
      context.commit('todos/removeTodo', index);
    },
    setTask(context, task) {
      context.commit('setTask', task);
    },
    setTodosRef(context, ref) {
      context.commit('setTodosRef', ref);
    },
    setCurrentTaskKey(context, key) {
      context.commit('setCurrentTaskKey', key);
    },
  },
  getters: {
    activeTodos(state) {
      console.log(state.todos);
      return state.todos.filter((todo) => !todo.isDone);
    },
    completedTodos(state) {
      return state.todos.filter((todo) => todo.isDone);
    },
  },
};
