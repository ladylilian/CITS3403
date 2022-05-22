
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

// const activearea = document.activeElement.id;
// console.log(activearea);

function disablenumberbutton(e) {
  // var numbers = []
  let numberButtons = Array.from(document.getElementsByClassName('number'));
  let symbolButtons = document.querySelectorAll('.symbol');
  const activearea = document.activeElement.className;
  for(let i = 0; i < symbolButtons.length; i++){
    symbolButtons[i].disabled = false;
    } 
  // console.log(numberButtons);
  // console.log(activearea);
  var selected_numbers = [];
  var selected_symbols = [];
  answer = document.getElementById("answer_1")
  $(document).ready(function(){
    $(".button").click(function() {
      var fired_button = $(this).val();
      alert(fired_button);
      answer.innerText += fired_button;
    });
  });
  // numberButtons.forEach( number => {
  //   number.addEventListener('click', (e) => {
  //     console.log('clicked');
  //     selected_numbers.push(e.target.value);
  //     console.log(selected_numbers);
  //     answer.innerText += e.target.value
  //   });
  // });
  // if (numberButtons.includes(activearea) == true) {
  //   console.log('ok')
  }

//}

// function disablesymbolbutton() {
//   document.getElementByClassName("symbol").disabled = true;
//   document.getElementByClassName("number").disabled = false;
// }


// const resrtButtons = document.querySelectorAll('[reset]')
// function calculation(){
//   var selected_numbers = []
//   var selected_symbols = []
//   while len(selected_numbers) < 4 && len(selected_symbols) < 3 {

//  }
//   var used_number = 4
//   var used_symbol = 3
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

// $(document).ready(function() {
//   $('.number').on('click', function() {
//       if($(this).onclick()) {
//           $('.symbol').prop('disabled', false);
//       } else {
//           $('.symbol').prop('disabled', true);
//       }
//   });
// });

function getValue(e) {
  alert(event.target.nodeName);
}

(function() {
  generate_new();
});