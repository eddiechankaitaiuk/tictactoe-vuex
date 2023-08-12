<template>
  <TicTacToe title="Tic Tac Toe"/>
</template>

<script>
import TicTacToe from './components/TicTacToe/TicTacToe'
import bootstrap from 'bootstrap';

export default {
  name: 'App',
  components: {
    TicTacToe
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
