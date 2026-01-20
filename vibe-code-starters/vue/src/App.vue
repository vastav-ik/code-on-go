<template>
  <div class="hello">
    <h1>Hello Vue!</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Welcome to your Vue.js playground!",
    };
  },
};
</script>

<style>
.hello {
  font-family: sans-serif;
  padding: 20px;
}
</style>
