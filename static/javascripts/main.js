let config = {
    non: 4,
    lower_limit: 0,
    upper_limit: 9,
    target: 24,
    showAnswer: false
  }
  
//   function populate_config() {
//     document.getElementById("non").innerHTML = config.non;
//     document.getElementsByName("lower-limit")[0].value = config.lower_limit;
//     document.getElementsByName("upper-limit")[0].value = config.upper_limit;
//     document.getElementsByName("target")[0].value = config.target;
//     document.getElementsByName("showAnswer")[0].checked = config.showAnswer;
//     setAutoTab();
//   }
  
//   function modify_config() {
//     config.lower_limit = parseFloat(document.getElementsByName("lower-limit")[0].value);
//     config.upper_limit = parseFloat(document.getElementsByName("upper-limit")[0].value);
//     config.target = parseFloat(document.getElementsByName("target")[0].value);
//     config.showAnswer = document.getElementsByName("showAnswer")[0].checked;
//     setAutoTab();
//   }
  
//   function increase_non() {
//     config.non += 1
//     document.getElementById("non").innerHTML = config.non;
//     var node = document.createElement("input");
//     node.classList.add("number");
//     node.value = 0
//     node.type = "number"
//     document.getElementsByClassName("numbers")[0].append(" ");
//     document.getElementsByClassName("numbers")[0].append(node);
//   }
  
//   function decrease_non() {
//     config.non -= 1
//     document.getElementById("non").innerHTML = config.non;
//     let numbers = document.getElementsByClassName("numbers")[0];
//     numbers.removeChild(numbers.lastElementChild);
//   }
  
  function solve_wrap() {
    var n_html = document.getElementsByClassName("number");
    let numbers = [];
    for (var i = 0; i < n_html.length; i++) {
      numbers.push(parseFloat(n_html[i].value));
    }
    document.getElementById('answer').innerHTML = "calculating..."
    setTimeout(function() {
      const ans = solve(numbers, config.target);
      if (ans && config.showAnswer) {
        document.getElementById('answer').innerHTML = ans;
      } else if (ans && !config.showAnswer) {
        document.getElementById('answer').innerHTML = "<details><summary>solution exists (click to show)</summary><br>" + ans + "</details>";
      } else {
        document.getElementById('answer').innerHTML = "no solution";
      }
    }, 10);
  }
  
  function generate_new() {
    var n_html = document.getElementsByClassName("number");
    let solved = false
    while (solved === false) {
      var numbers = [];
      for (var i = 0; i < n_html.length; i++) {
        numbers.push(random_int(0, 10))
      }
      solved = solve(numbers)
    }
    for (var i = 0; i < n_html.length; i++) {
      n_html[i].value = numbers[i]
    }
    // clear answer div
    document.getElementById('answer').innerHTML = ""
  }
  
  function clear_numbers() {
    var n_html = document.getElementsByClassName("number");
    for (var i = 0; i < n_html.length; i++) {
      n_html[i].value = ""
    }
  }
  
  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function random_int(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Don't need
  function toggle_config() {
    var x = document.getElementById("config");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
  // Don't need
  function setAutoTab() {
    var n_html = document.getElementsByClassName("number");
    for (var i = 0; i < n_html.length - 1; i++) {
      let current_element = n_html[i]
      let next_element = n_html[i+1]
      current_element.onkeyup = () => {
        current_value = parseFloat(current_element.value);
        if (current_value === 0 || current_value*10 > config.upper_limit) {
          next_element.focus();
          next_element.select();
        }
      }
    }
  }
  
  (function() {
    generate_new();
    setAutoTab();
  })();