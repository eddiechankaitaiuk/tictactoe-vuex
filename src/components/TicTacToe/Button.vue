<template>
    <button :data-id="buttonID" @click="buttonClick(buttonID)" :class="this.gameSetting.buttonsStatus[buttonID]" 
    :disabled="isButtonDisabled" ></button>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { ICON, WINLINE, GAMESTATE } from '../../tictactoe_types'

 export default({
    name: 'Button',
    expose: ['onReset'],
    props: {
        buttonID: Number
    },
    computed: {
        ...mapGetters(['gameSetting']),
        //status: () => gameSetting.
        isButtonDisabled() { return this.gameSetting.state !== GAMESTATE.PLAY || this.gameSetting.buttonsStatus[this.buttonID] !== ""},
    },
    created() {
    },
    methods: {
        ...mapActions(['buttonClick']),
    },

 })

</script>