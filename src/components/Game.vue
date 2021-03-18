<template>
<div>
  <h3> 
    Choose your {{totalNumbersToPlay}} numbers below, or if you're feeling lucky, choose the 
      <span class="highlight">
          Lucky Dip
      </span> 
      button
  </h3>

  <div class="info-text">
    Press "Start Game" after choosing your numbers to play
  </div>
  
  <div>
    <button 
      type="button" 
      class="margin-y"
      @click="activateLuckyDip" 
      :disabled="disableCheckbox || disableLuckyDip"
      > 
        Lucky Dip
    </button>
  </div>

  <span 
    v-for="(number,index) in checkboxNumbers" 
    :key="index"  
    class="input-wrapper"
    >
      <input 
        class="number-input" 
        type="checkbox" 
        :id="index" 
        :name="number" 
        :value="number"
        :disabled="disableCheckbox"
        @change="getNumbersFromInput"
        v-model="chosenNumbers[index+1]"
        > 
    <label :for="index">
      {{number}}
    </label>
  </span>

  <div>
    <button 
      type="button"
      class="margin-y"
      @click="startGame"
      :disabled="playerNumbers.length != totalNumbersToPlay"
      > 
      Start Game 
    </button>
  </div>

  <h3 v-if="playerNumbers.toString() != '' ">
    Your numbers are: 
    <span class="number-results">
      {{playerNumbers.toString()}} 
    </span>
  </h3>
  
  <div v-if="loterryNumbers.toString() != '' ">
    <h3>
      The loterry numbers are: 
      <span class="number-results">
        {{loterryNumbers.toString()}}
      </span>
    </h3>

    <div class="info-text"> 
      You've made {{matches}} matches this game
    </div>

    <div> 
      You've won {{points}} points this game
    </div>

    <div class="highlight">
        Total points: {{totalPoints}} 
    </div>
  </div>
  
 <div class="margin-y"> 
    <button 
      type="button"
      @click="resetGame"
      > 
      Reset Game 
    </button>
  </div>

</div>
</template>

<script>
import {default as game} from '@/logic/game.js';

export default game;
</script>

<style>

  .input-wrapper {
    display: inline-grid;;
  }

  .margin-y {
    margin: 2% 0 2% 0;
  }

  .highlight {
    color: rgb(139, 216, 25);
    font-weight: bold;
  }

  .number-results {
    font-size: 115%;
  }

  .number-input {
    min-width: 50px;
    min-height: 50px;
    border: 1px solid black;
  }

  .info-text {
    font-size: 90%;
  }

</style>