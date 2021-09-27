// Main class

console.log('This file represents a small selection from your actual functionality')

console.log('A small class is included that contain some simple functions to call and maintain a state during the tests')

class SimpleMathsClass {
  constructor() {
    this.variable = 0;
  }

  setTo(number) {
    this.variable = number;
  }

  incrementBy(number) {
    this.variable += number;
  }
}

module.exports = {
  SimpleMathsClass
}
