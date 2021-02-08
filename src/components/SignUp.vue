<template>
  <div id="app">
  <v-app :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }" :dark="darkTheme" id="inspire">
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  {{ platformName }}
                </h3>
              </v-layout>
            </v-card-title>
            <v-form @submit.prevent="register">
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your email and password:</p>
                <v-text-field
                              outline
                              label="email"
                              type="text"
                              v-model="form.email"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="form.password"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn type='submit' color="info" :large="$vuetify.breakpoint.smAndUp">
                <!-- <v-icon left>lock</v-icon> -->
                Sign Up
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      error: null,
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {
              this.$router.replace({ name: 'Dashboard' });
            });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
