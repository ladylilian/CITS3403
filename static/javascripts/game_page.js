function generate_new() {
  var n_html = document.getElementsByClassName("number");
  let solved = false
  while (solved === false) {
    var numbers = [];
    for (var i = 0; i < n_html.length; i++) {
      numbers.push(random_int(1, 9))
    }
    solved = solve(numbers)
  }
  for (var i = 0; i < n_html.length; i++) {
    n_html[i].value = numbers[i]
  }
  return numbers;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function solve(numbers, goal, expr) {
  goal = (typeof goal !== 'undefined') ?  goal : 24;
  expr = (typeof expr !== 'undefined') ?  expr : [];

  if (expr.length == 0) {
    expr = numbers.slice().map(String);
  }
  if (numbers.length == 1) {
    if (numbers[0] == goal) {
      return numbers[0];
    } else {
      return false;
    }
  };

  if (numbers.length == 2){
    var arr = combinetwo(numbers[0], numbers[1]);
    var answers = arr[0],
      answer_exps = arr[1];
    for (i = 0; i < answers.length; i++) {
      var answer = answers[i];
      if (Math.abs(answer - goal) < 0.00001) {
        return remove_redundant_brackets(convert_expr_to_string(expr[0], expr[1], answer_exps[i]));
      }
    }
    return false;
  } else {
    var pairs = removeDuplicates(getPairs(numbers));
    for (var pair_index = 0; pair_index < pairs.length; pair_index++) {
      var pair = pairs[pair_index];
      var res = combinetwo(pair[0], pair[1]);
      var possible_values = res[0];
      var possible_expr = res[1];
      for (var counter = 0; counter < possible_values.length; counter++) {
        var value = possible_values[counter];
        var expression = possible_expr[counter];
        var a_index = numbers.indexOf(pair[0]);
        var b_index = numbers.indexOf(pair[1]);

        if (a_index == b_index) {
          b_index = numbers.indexOf(pair[1], a_index + 1);
        }

        var expr_string = convert_expr_to_string(expr[a_index], expr[b_index], expression);
        var newlist = numbers.slice();
        var newexpr = expr.slice();

        // replace the two numbers with the combined result
        a_index = newlist.indexOf(pair[0]);
        newlist.splice(a_index, 1);
        b_index = newlist.indexOf(pair[1]);
        newlist.splice(b_index, 1);
        newlist.push(value);

        // order matters
        newexpr.splice(a_index, 1);
        newexpr.splice(b_index, 1);
        newexpr.push(expr_string);
        var result = solve(newlist, goal, newexpr);
        if (result) {
          return remove_redundant_brackets(result);
        }
      }
    }
  }
  return false;
}

function combinetwo(a, b) {
  var result = [a + b, a*b];
  var expr = [[0, '+', 1], [0, '*', 1]];
  if (b > a) {
    result.push(b - a);
    expr.push([1, '-', 0]);
  } else {
    result.push(a - b);
    expr.push([0, '-', 1]);
  }

  if (b != 0) {
    result.push(a / b);
    expr.push([0, '/', 1]);
  }

  if (a != 0) {
    result.push(b / a);
    expr.push([1, '/', 0]);
  }
  return [result, expr];
}

function convert_expr_to_string(a, b, expr) {
  var temp = [a, b];
  var result = '(' + temp[expr[0]].toString() + ')' + expr[1].toString() + '(' + temp[expr[2]].toString() + ')';
  return result;
}

function remove_redundant_brackets(expr) {
  var stack = [];
  // indices to be deleted
  var indices = [];
  for (var i = 0; i < expr.length; i++) {
    var ch = expr[i];
    if (ch == '(') {
      stack.push(i);
    }
    if (ch == ')') {
      var last_bracket_index = stack.pop();
      var enclosed = expr.slice(last_bracket_index + 1, i);
      if (!isNaN(enclosed)) {
        indices.push(i);
        indices.push(last_bracket_index);
      }
    }
  }
  // remove the elements whose indices are in indices list
  var result = [];
  for (var idx = 0; idx < expr.length; idx++) {
    if (!isInArray(idx, indices)) {
      result.push(expr[idx])
    }
  }
  return result.join("");
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function getPairs(arr) {
  var pairs = [];
  var out = [];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i; j < arr.length - 1; j++) {
      out.push([arr[i], arr[j+1]]);
    }
  }
  return out;
}
 // remove the elements whose indices are in indices list
function removeDuplicates(arr) {
  var hash = {};
  var out = [];
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i].join('|');
    if (!hash[key]) {
      out.push(arr[i]);
      hash[key] = 'found'
    }
  }
  return out;
}

// Calculate the click buttons
var selected_Symids = [];
var eqution = [];

let numberButtons = Array.from(document.getElementsByClassName('number'));
let symbolButtons = document.querySelectorAll('.symbol');

// isOperator checking
const operators =  ['+', '-', '*', '/'];
const isOperator = (e) => operators.includes(e);

function calculation(ClickBtnId){
  goal = 24;
  var score = document.getElementById('current_score').innerText;
  let counter = document.getElementById('stageCounter');
  if (document.getElementById(ClickBtnId).value == goal){
    document.getElementById("clear_stage_opener").click();
    counter.addEventListener("click",()=>{
      score = parseInt(score) + 100;
      document.getElementById('current_score').innerText = score;
    });
    selected_numbers = []
    selected_symbols = []
    selected_Numids = []
    eqution = []
    for(var i = 0; i < numberButtons.length; i++){
      numberButtons[i].click();
      if ($(numberButtons[i]).hasClass('invisible')){
      $(numberButtons[i]).removeClass('invisible');
      };
      if ($(numberButtons[i]).hasClass('selectedNum')){
        $(numberButtons[i]).removeClass('selectedNum');
      };
      numberButtons[i].removeAttribute('style');
      generate_new(); 
    };
  }
 else{
   $(document.getElementById('resetBtn')).addClass('fa-spin')
 };
};

var used_numbers = document.getElementsByClassName("invisible");
$(document).ready(function(){
  var selected_numbers = document.getElementsByClassName("selectedNum");
  var toggled_numbers = document.getElementsByClassName("toggledNum");
  var selected_Numids = [];
  var selectedNums = []
  $(".number").toggle(
    function() {
      for(let i = 0; i < symbolButtons.length; i++){
        if (selected_numbers.length == 3){
          symbolButtons[i].disabled = true;
        } 
        else{
          symbolButtons[i].disabled = false;
        }
      };
      $(this).addClass("selectedNum");
      $(this).addClass("toggledNum");
      $(this).closest('div').find(".number").not(this).removeClass('selectedNum');
      // prevent players adding a number right after the first one into eqution, ex: 2,3
      if (typeof eqution[0] !== 'undefined'){
        if ($.isNumeric(eqution[0]) && (isOperator(eqution[1]) == false)){
          eqution.pop();
        };
      };
        selected_Numids.push(this.id);
        selectedNums.push(this.value)
        eqution.push(this.value);

      if (($.isNumeric(eqution[0])) && (isOperator(eqution[1]) == true)) {
        var ans = eval(eqution.join('').toString());
        eqution = [];
        eqution.push(ans);
        selected_numbers[0].value = ans;
        var Clickbtn = selected_Numids.slice(-2);
        buttonAnimation(Clickbtn);
        $(document.getElementById(Clickbtn[0])).addClass('invisible');
        selected_Numids.shift();
        var ClickBtnId = selected_Numids;
        if (used_numbers.length <= 3) {
          for(let i = 0; i < symbolButtons.length; i++){
            if ($(document.getElementById(selected_Symids[i])).hasClass("selectedSym")){
                document.getElementById(selected_Symids[i]).click();
            };
          };
        };
        if (toggled_numbers.length == 4){
          for(var i = 0; i < numberButtons.length; i++){
            numberButtons[i].click();
          };
        };
      };
      if (used_numbers.length == 3) {
        calculation(ClickBtnId)
      };
      console.log(eqution);
    }, 

    function() {
      $(this).removeClass("selectedNum");
      $(this).blur()
      for(let i = 0; i < symbolButtons.length; i++){
        if (selected_numbers.length == 3){
          symbolButtons[i].disabled = false;
        } 
        else{
          symbolButtons[i].disabled = true;
        }
      }
      selected_Numids.pop();
      selectedNums.pop();
      eqution.pop();
      console.log(eqution)
    }
  )
});



// getSymbol
$(document).ready(function(){
  $(".symbol").toggle(
    function() {
      $(this).addClass("selectedSym");
      $(this).closest('div').find(".symbol").not(this).removeClass('selectedSym');
      if (typeof eqution[1] !== 'undefined'){
        if ((eqution.length == 2) && (isOperator(eqution[1]) == true)){
          if ((used_numbers.length <= 2)){
            eqution.pop();
          }
        };
      };
      selected_Symids.push(this.id);
      eqution.push(this.value);
      console.log(eqution)
    },

    function() {
      $(this).removeClass("selectedSym");

      if ((isOperator(eqution[1]) == true) && (eqution[1] !== this.value)) {

        eqution.pop()
        eqution.push(this.value)
      }
      console.log(eqution)
    }
  )
}); 


function buttonAnimation(listOftwoClickBtn){
  var id_1 = listOftwoClickBtn[0];
  var id_2 = listOftwoClickBtn[1];
  var id_2xClickBtnPosition = getClickBtnPosition(id_2)[0];
  var id_2yClickBtnPosition = getClickBtnPosition(id_2)[1];
  var id_1xClickBtnPosition = getClickBtnPosition(id_1)[0];
  var id_1yClickBtnPosition = getClickBtnPosition(id_1)[1];
  var relativexPosition =id_2xClickBtnPosition - id_1xClickBtnPosition
  var relativeyPosition =id_2yClickBtnPosition - id_1yClickBtnPosition
  var translate3dValue = "translate3d(" + relativexPosition + "px, " + relativeyPosition + "px, 0)";
  document.getElementById(id_1).style.transform = translate3dValue;
  document.getElementById(id_1).style.zIndex = -1
  $(document).ready(function(){
    if (used_numbers.length < 2){
      $(document.getElementById(id_1)).animate({opacity: 0});
    };
  });
  document.getElementById(id_2).focus();
  document.getElementById(id_1).style.transition= ".5s ease transform";
};

function getClickBtnPosition(Clickbtn) {
  var Numid = document.getElementById(Clickbtn);
  var position = $(Numid).position();
  var x = position.left;
  var y = position.top;
  return [x,y];
};

// Reset the game
var numbers = []
function reset(){
  // event.preventDefault();
  selected_numbers = []
  selected_symbols = []
  selected_Numids = []
  eqution = []
  $(document.getElementById('resetBtn')).removeClass('fa-spin');
  for(var i = 0; i < numberButtons.length; i++){
    numberButtons[i].click();
    if ($(numberButtons[i]).hasClass('invisible')){
    $(numberButtons[i]).removeClass('invisible');
    };
    if ($(numberButtons[i]).hasClass('selectedNum')){
      $(numberButtons[i]).removeClass('selectedNum');
    };
    numberButtons[i].removeAttribute('style');
  };
  var n_html = document.getElementsByClassName("number");
  for (var i = 0; i < n_html.length; i++) {
    n_html[i].value = numbers[i]
  };
};
 
// Give up button and show the answer
function giveUpShowAns(){
  const ans = solve(numbers, 24);
  document.getElementById('answer').innerHTML = ans;
  generate_new();
  document.getElementById('give_upClose').setAttribute('disabled', '');
  document.getElementById('give_upClose').style.cursor = "default";
  document.getElementById('give_upYes').setAttribute('disabled', '');
  document.getElementById('give_upYes').style.cursor = "default";
  $(document.getElementById('answer')).addClass('active');
  $(document.getElementById('restart')).addClass('active');
}

// Generate four numbers when the window is loaded
$(document).ready(function(){
  numbers = generate_new();
  console.log(numbers);
});
