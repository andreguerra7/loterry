export default {
  data() {
    return {
      minNumber: 1,
      maxNumber: 59,
      totalNumbersToPlay: 6,
      checkboxNumbers: [],
      chosenNumbers: [],
      playerNumbers: [],
      loterryNumbers: [],
      matches: 0,
      points: 0,
      totalPoints: 0,
      disableCheckbox: false,
      disableLuckyDip: false
    }
  },

  mounted() {
    this.checkboxNumbers = Array.from(Array(this.maxNumber)).map((e,i)=>i+1);
  },

  watch: {
    chosenNumbers(val) {
      if(Object.keys(val).length >= 6 ) {
        this.disableCheckbox = true;
      }
      if(Object.keys(val).length >= 1 ) {
        this.disableLuckyDip = true;
      }
    }
  },

  methods: {

    activateLuckyDip() {
      this.playerNumbers = this.generateRandomNumbers();
      this.disableCheckbox = true;
    },

    getNumbersFromInput() {
       if(Object.keys(this.chosenNumbers).length != 0){
          let currentChosenNumbers = [];

          Object.keys(this.chosenNumbers).forEach(key => {
            currentChosenNumbers.push(parseInt(key));
          });

        this.playerNumbers = currentChosenNumbers.sort((a, b) => a - b);
      }
    },
    
    startGame() {
      this.loterryNumbers = this.generateRandomNumbers();
      
      // Maybe use a callback here to make sure the numbers will be generated before checking the matches
      let matches = this.playerNumbers.filter(num => this.loterryNumbers.includes(num));
      this.matches = matches.length;
      this.calculatePoints(this.matches);

    },

    calculatePoints(length) {
      if (length < 3)
        this.points = 0
      else if (length === 3 )
        this.points = 50
      else if (length === 4)
        this.points = 100
      else if (length === 5)
        this.points = 200
      else if (length === 6)
        this.points = 500
      else  // error
        this.points = 0

      this.totalPoints += this.points;
    },

    resetGame() {
      // Ideally ask with a modal if the user really wants to restart
      this.chosenNumbers = [];
      this.playerNumbers = this.loterryNumbers = [];
      this.points = this.totalPoints = this.matches = 0;
      this.disableCheckbox = false;
      this.disableLuckyDip = false;
    },

    generateRandomNumbers() {
      let randomNumbers = []
    
       for (var i = 0; i < this.totalNumbersToPlay; i++) {
          const minNumber = Math.ceil(this.minNumber);
          const maxNumber = Math.floor(this.maxNumber);
          let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
          
          if (!randomNumbers.includes(randomNumber)) 
          {
            randomNumbers.push(randomNumber);
          } 
          else
          {
            i--;
          }
      }
      return randomNumbers.sort((a, b) => a - b);
    }
  
  }

}