<template>
    <h1>{{ title }} <button @click="reset">Reset</button>
        <span v-show="bShowResultPane" id="resultPane"><span v-html="fnResultHtml"></span></span>
    </h1>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'
import { GAMESTATE } from '../../tictactoe_types'

export default({
    name: 'Title',
    props: {
        title: String,
        result: String
    }, 
    computed: {
        ...mapGetters(['gameSetting']),
        fnResultHtml() {
            if(this.gameSetting.state === "draw") {
                return "Draw!!!"
            } else if(this.gameSetting.state === "win") {
                return "<img src='/images/" + this.gameSetting.currentIcon + ".png' /> wins."
            } else {
                return ""
            }
        },
        bShowResultPane() {
            return this.gameSetting.state !== GAMESTATE.PLAY
        }
    },
    methods: {
        ...mapActions(['reset'])
    }

})

</script>