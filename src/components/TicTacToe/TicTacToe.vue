<template>
    <Title :title="title" />
    <div ref="gridContainer" :class="gridContainerClass">
        <Button v-for="(icon, i) in this.gameSetting.buttonsStatus" :key="i" ref="buttons"
        :buttonID="i" />
        <WinLine v-show="isLineVertical" mode="vertical" :position="this.gameSetting.winVerticalPosition" />
        <WinLine v-show="isLineHorizontal > 0" mode="horizontal" :position="this.gameSetting.winHorizontalPosition" />
        <WinLine v-show="isLineSlashDiagonal" mode="slashDiagonal" />
        <WinLine v-show="isLineBackSlashDiagonal" mode="backslashDiagonal"  />
    </div>
</template>

 <script>

import Title from './Title.vue'
import Button from './Button.vue'
import WinLine from './WinLine.vue'

import { mapGetters, mapActions } from 'vuex'
import {WINLINE, GAMESTATE} from '../../tictactoe_types'

export default {
    name:'TicTacToe',   
    props: {
        title: String
    },
    computed: {
        ...mapGetters(['gameSetting']),
        isLineVertical() {
            return (this.gameSetting.winLine & WINLINE.VERTICAL) > 0
        },
        isLineHorizontal() {
            return (this.gameSetting.winLine & WINLINE.HORIZONTAL) > 0
        },
        isLineSlashDiagonal() {
            return (this.gameSetting.winLine & WINLINE.SLASHDIAGONAL) > 0
        },
        isLineBackSlashDiagonal() {
            return (this.gameSetting.winLine & WINLINE.BACKSLASHDIAGONAL) > 0
        },
        gridContainerClass() {
            return "grid-container " + (this.gameSetting.state === GAMESTATE.PLAY ? this.gameSetting.currentIcon : "")
        }  
    },
    components: {
        Title,
        Button,
        WinLine
    },
    created() {
        
    },
    mounted() {
        //this.$refs.gridContainer.classList.add(this.strCurrentIcon)
        //console.log(this.$refs.gridContainer)
        //this.fnReset()
    },    
    methods: {
        ...mapActions(['reset']),

    }
}

</script>