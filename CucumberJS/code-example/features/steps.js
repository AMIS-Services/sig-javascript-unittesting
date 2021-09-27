const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const { SimpleMathsClass } = require("..");

const mathClass = new ComplexMathsClass

Given("a variable set to {int}", function (number) {
  mathClass.setTo(number);
});

When("I increment the variable by {int}", function (number) {
  mathClass.incrementBy(number);
});

Then("the variable should contain {int}", function (number) {
  assert.equal(mathClass.variable, number);
});