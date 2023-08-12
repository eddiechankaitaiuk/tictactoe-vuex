import {ICON, WINLINE, GAMESTATE} from '../../tictactoe_types.js'


const initial_gameSetting = {
    state: GAMESTATE.PLAY,
    buttonsStatus: ["","","","","","","","",""],
    currentIcon: ICON.CROSS,
    winLine: WINLINE.NOTHING,
    winVerticalPosition:0,
    winHorizontalPosition:0
}

const state = {
    gameSetting: initial_gameSetting
}


const getters = {
    gameSetting: (state) => state.gameSetting
}

const actions = {
    reset: ({commit}) => {commit('reset')},
    buttonClick: ({commit}, iButtonID) => {
        commit('buttonClick', iButtonID)
    }
}

const fnCheckWin = (arrButtonsStatus) => {
    //Button array is 0-based index from 0 to 8, listed from top to buttom, left to right.
    //Just need to check button 1, 3, 4, 5, 7 if they have been clicked and then further their neigbouring button.

    const arrButtonsForChecking = [1,3,4,5,7];
    const iTicTacToeLength = 3;
    //let bWinTemp = false
    let objWinStatus = {winLine: WINLINE.NOTHING, vertical_position:0, horizontal_position: 0}
    arrButtonsForChecking.forEach( (iCurrentButtonIndex, index) => {    
        //const iCurrentButtonIndex = checkingItem;
        const strButtonStatus = arrButtonsStatus[iCurrentButtonIndex];

        if(strButtonStatus === ICON.CROSS || strButtonStatus === ICON.CIRCLE) {

            //if iRow = 1, do the horizontal checking
            const iRow = Math.floor(iCurrentButtonIndex / iTicTacToeLength);                    
            //if iColumn = 1, do the vertical checking
            const iColumn = iCurrentButtonIndex % iTicTacToeLength;
            //if both iRow and iColumn are 1, do all horizontal, vertical and diagonal checking

            if(iRow === 1) {
                //Vertical Checking - check previous row (i.e. currentIndex - TicTacToeLength) and next row (i.e. currentIndex + TicTacToeLength) if all status are matched to either cross or circle
                if(arrButtonsStatus[iCurrentButtonIndex - iTicTacToeLength] === arrButtonsStatus[iCurrentButtonIndex + iTicTacToeLength] && arrButtonsStatus[iCurrentButtonIndex - iTicTacToeLength] === strButtonStatus) {
                    objWinStatus.winLine |= WINLINE.VERTICAL
                    objWinStatus.vertical_position = iColumn
                }
            }

            if(iColumn === 1) {
                //Horizontal Checking - check previous column (i.e. currentIndex - 1) and next column (i.e. currentIndex + 1) if all status are matched to either cross or circle
                if(arrButtonsStatus[iCurrentButtonIndex - 1] === arrButtonsStatus[iCurrentButtonIndex + 1] && 
                arrButtonsStatus[iCurrentButtonIndex - 1] === strButtonStatus) {
                  objWinStatus.winLine |= WINLINE.HORIZONTAL
                  objWinStatus.horizontal_position = iRow
                }
            }

            if(iRow === 1 && iColumn === 1) {

                if(arrButtonsStatus[iCurrentButtonIndex - 1 - iTicTacToeLength] === arrButtonsStatus[iCurrentButtonIndex + 1 + iTicTacToeLength] && 
                    arrButtonsStatus[iCurrentButtonIndex - 1 - iTicTacToeLength] === strButtonStatus) {
                    objWinStatus.winLine |= WINLINE.BACKSLASHDIAGONAL
                }

                if(arrButtonsStatus[iCurrentButtonIndex + 1 - iTicTacToeLength] === arrButtonsStatus[iCurrentButtonIndex - 1 + iTicTacToeLength] && arrButtonsStatus[iCurrentButtonIndex + 1 - iTicTacToeLength] === strButtonStatus) {
                    objWinStatus.winLine |= WINLINE.SLASHDIAGONAL
                }

            }

        }

    })
    //if(bWinTemp) { setBWin(bWinTemp);  }
    return objWinStatus
  
}



const mutations = {
    reset: (state) => state.gameSetting = initial_gameSetting,
    buttonClick: (state, iButtonID) => {

        const prevGameSetting = state.gameSetting
        const newButtonsStatus = prevGameSetting.buttonsStatus.map((icon, index) => index === iButtonID ? prevGameSetting.currentIcon : icon)

        
        const objWinStatus = fnCheckWin(newButtonsStatus)
        console.log(objWinStatus)
        if(objWinStatus.winLine > 0) {
            console.log("Condition 1")
            state.gameSetting =  {
                ...prevGameSetting,
                state: GAMESTATE.WIN,
                buttonsStatus: newButtonsStatus,
                winLine: objWinStatus.winLine,
                winVerticalPosition: objWinStatus.vertical_position,
                winHorizontalPosition: objWinStatus.horizontal_position        
            }
            console.log(state.gameSetting)            
        }
        else if(newButtonsStatus.filter(val => val === "").length === 0) {
            console.log("Condition 2")
            state.gameSetting = {
                ...prevGameSetting,
                state: GAMESTATE.DRAW,
                buttonsStatus: newButtonsStatus,
            }
        } else {
            console.log("Condition 3")
            state.gameSetting = {
                ...prevGameSetting,
                buttonsStatus: newButtonsStatus,
                currentIcon: prevGameSetting.currentIcon === ICON.CROSS ? ICON.CIRCLE : ICON.CROSS
            }
        }
    }
}

export default { state, getters, actions, mutations}