<template>
  <div id="login" class="login-container">
    <div class="login-content">
      <span @click="isClosed = !isClosed" class="close">&#10006;</span>
      <h1>Log in</h1>

      <input
        type="text"
        name="email"
        v-model="input.email"
        placeholder="Username"
      />
      <input
        @keyup.enter="handleLogin()"
        type="text"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />

      <button class="login-button" @click="handleLogin()">Log in</button>
      <button class="login-button" @click="handleTest()">Test</button>
    </div>
  </div>
</template>

<script>
import { authService } from "../services/authService";
import { botService } from "../services/botService";
export default {
  data: function () {
    return {
      isClosed: false,
      error: "",
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      const res = await authService.login();
      console.log("LOGIN " + res);
    },
    async handleTest() {
      const res = await botService.getBots();
      console.log("TEST: " + res);
    },
  },
};
</script>

<style scoped>
.login-container {
  color: #aaaaaa;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-validation-error {
  list-style: inside;
  margin: 0;
  padding: 0;
  margin: 2px;
  font-size: 0.8em;
  color: red;
}
.login-content {
  border: 2px solid #ff652f;
  width: 500px;
  min-height: 350px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  padding: 2em 0;
  position: relative;
}
input[type="text"],
input[type="password"] {
  padding: 3em 3em;
  border: 0;
  border-radius: 20px;
  background: rgb(214, 214, 214);
  padding: 0.7em;
  margin: 2em auto 0;
  width: 50%;
  display: block;
  text-align: center;
  text-decoration: none;
}
input[type="text"]:focus,
input[type="password"]:focus {
  border: 2px solid #13d485;
  outline: 0;
}
input::placeholder {
  padding-left: 0.5em;
  text-align: left;
}
.forgot-password-link {
  font-size: 0.9em;
  cursor: pointer;
  font-weight: 500;
  color: #ff652f;
  text-decoration: none;
}
.login-button {
  color: white;
  font-weight: 700;
  background: #ff652f;
  border: 0;
  border-radius: 20px;
  padding: 0.7em;
  margin: 2em auto;
  width: 50%;
  display: block;
  outline: 0;
  cursor: pointer;
}
.close {
  position: absolute;
  top: 10px;
  right: 17px;
  font-size: 1.3em;
  cursor: pointer;
}
</style>
