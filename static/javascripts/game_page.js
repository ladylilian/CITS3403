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
  // clear answer div
  // document.getElementById('answer').innerHTML = ""
}

// function clear_numbers() {
//   var n_html = document.getElementsByClassName("number");
//   for (var i = 0; i < n_html.length; i++) {
//     n_html[i].value = ""
//   }
// }

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
var selected_numbers = [];
var selected_symbols = [];
var selected_Numids = [];
var eqution = [];
let numberButtons = Array.from(document.getElementsByClassName('number'));
let symbolButtons = document.querySelectorAll('.symbol');
function calculation(ClickBtnId){
  goal = 24;
  if (document.getElementById(ClickBtnId).value == goal){
    for(var i = 0; i < numberButtons.length; i++){
      selected_numbers = []
      selected_symbols = []
      selected_Numids = []
      eqution = []
      numberButtons[i].style.visibility = "visible";
      generate_new(); 
    };
  }
 else{
  alert("ee")
 };
};

function getNumber(ele) {
  for(let i = 0; i < symbolButtons.length; i++){
    if (selected_numbers.length == 3){
      symbolButtons[i].disabled = true;
    } 
    else{
      symbolButtons[i].disabled = false;
    }
    // numberButtons[i].disabled = true;
    };
  if (ele.id == selected_Numids){


  }
  selected_Numids.push(ele.id);
  var btnNumber = ele.value;
  // var answer = document.getElementById("answer_1");
  // answer.innerText += btnNumber;
  selected_numbers.push(btnNumber);
  eqution.push(btnNumber);
  console.log(eqution);
  var ans = eval(eqution.join('').toString());
  if (eqution.length == 3) {
    eqution = [];
    eqution.push(ans);
    ele.value = ans;
  };
  if (selected_Numids.length == 2) {
    var Clickbtn = selected_Numids;
    buttonAnimation(Clickbtn);
    selected_Numids.shift();
    var ClickBtnId = selected_Numids;
  };
  if (selected_numbers.length == 4) {
    calculation(ClickBtnId)
  };
};

function getSymbol(ele) {
  for(let i = 0; i < symbolButtons.length; i++){
    symbolButtons[i].disabled = true;
    if (selected_Numids.includes(numberButtons[i].id) == true){
      numberButtons[i].disabled = true;
    } 
    // else{
    // numberButtons[i].disabled = false;
    // }
  }
  var btnSymbol = ele.value;
  var answer = document.getElementById("answer_1");
  selected_symbols.push(btnSymbol)
  eqution.push(btnSymbol)
  // answer.innerText += btnSymbol;
  console.log(eqution);
};

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
  $(document).ready(function(){
      $(document.getElementById(id_1)).animate({opacity: 0});
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

// function fadeOut(element) {
//   var timer = setInterval(hide(element),10);
//   element.style.visibility = "hidden";
// }

// function hide(element){
//   var btn = document.getElementById(element);
//   var opacity = 0;
//   opacity = Number(window.getComputedStyle(btn).getPropertyValue("opacity"));
//   if (opacity > 0){
//     opacity = opacity - 0.1;
//     btn.style.opacity = opacity
//   }
//   element.style.opacity = op;
//   element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//   op -= op * 0.2;
//   element.style.transition
//   element.style.zIndex = "-1";
// };
// console.log(getClickBtnPosition(n_one)[0]);
// const resrtButtons = document.querySelectorAll('[reset]')
// function calculation(){
//   while len(selected_numbers) < 4 && len(selected_symbols) < 3 {

//  }

//   var clicked = 0
//   var j = 0
//   while i < used_number && j < used_symbol{
//     if onClick() {
//       if {
//         i--
//       }
//       i++
      
//     }
//   }
//   var = document.getElementsByClassName("s_one");
// }


window.onload = (event) =>{
  generate_new();
};
