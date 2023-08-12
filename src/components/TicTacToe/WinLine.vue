<template>
    <div :class="fnOverallCssClassString" :style="fnStyleString" ref="line"></div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { ICON, WINLINE, GAMESTATE } from '../../tictactoe_types'

const iTicTacToeLength = 3

export default({
    name: "WinLine",
    props: {
        mode: String,
        position: Number
    },
    data() {
        return {            
            iParentWidth: 0,
            iParentHeight: 0,
            fDegree: 0,
        }
    },
    async mounted() {
        await this.$nextTick()
/*         console.log("nexttick")
        console.log(this.$refs.line)
        console.log(this.$refs.line.parentElement.offsetHeight + " : " + this.$refs.line.parentElement.offsetWidth)
 */     this.setDegree()

        window.addEventListener('resize', this.setDegree)
    },
    unmounted() {
        window.removeEventListener('resize', this.setDegree)
    },
    computed: {
        ...mapGetters(['gameSetting']),
        fnOverallCssClassString() {return "strikethrough " + (this.mode == "vertical" ? "vertical" : "horizontal")},
        fnStyleString() { 
            switch(this.mode) {
                case "vertical" : 
                    return  {
                        left : ((this.position * 2 + 1) / (iTicTacToeLength * 2 ) * 100) + "%" 
                    }

                case "horizontal" : 
                    return  {
                        top : ((this.position * 2 + 1) / (iTicTacToeLength * 2 ) * 100) + "%" 
                    }
                
                case "backslashDiagonal" : 
                    return  {
                        top : "50%",
                        transform: "skew(0, " + this.fDegree + "deg)" 
                    }
                    
                case "slashDiagonal" : 
                    return  {
                        top : "50%",
                        transform: "skew(0, -" + this.fDegree + "deg)" 
                    }
            }
        }
    },
    methods: {
        setDegree() {
            this.iParentWidth = this.$refs.line ? this.$refs.line.parentElement.offsetWidth : iButtonWidth
            this.iParentHeight = this.$refs.line ? this.$refs.line.parentElement.offsetHeight : iButtonHeight
            this.fDegree = Math.atan(this.iParentHeight / this.iParentWidth) * 180 / Math.PI
        }
    }

})
</script>