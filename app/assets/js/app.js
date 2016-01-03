/**
 * Main app js
 * Created by uxjulia on 12/28/15.
 */

(function($, window, document){
  'use strict';
  function logHistory(button) {
    var $el = $(button);
    var val = $el.text();
    var iden = $el.attr("id");
    var target = $("div#rolls");
    var idx = function() {
      return $("span.history-text").length;
    };
    var setValue = function(val){
      var n;
      var obj = $("span.history-text");
      var l = obj.length;
      if (l == 0) {
        n = val;
      } else {
        n = val + ", ";
      }
      return n;
    };
    var p = $("<span/>",{
      text: setValue(val),
      "class": "history-text",
      id: idx
    });
    $(p).data("arrayId", {id: iden});
    $(p).prependTo(target);
  }

  function displayUsers(n) {
    if (n==0) {
      nextUp(0);
    } else {
      var i;
      for (i = 0; i < n; i++) {
        var span = $("<span/>", {
          "class": "glyphicon glyphicon-user",
          id: i + 1
        });
        var target = $("div.user-icons");
        $(span).appendTo(target)
      }
    }
  }

  function displayUserInputs(n) {
    var target = $("div#playerNameInputs");
    $(target).empty();
    if (n==0){
      console.log("No Players");
    } else {
      var i;
      for (i = 0; i < n; i++) {
        var ix = i + 1;
        var input = $("<input/>", {
          "class": "form-control",
          id: ix
          //placeholder: "Player " + ix + "'s Name"
        });
        var label = $("<label/>", {
          "class":"control-label",
          "for": input.id,
          text: "Player " + ix + "'s Name"
        });
        var group = $("<div/>", {
          "class":"form-group"
        });
        $(label).appendTo(group);
        $(input).appendTo(group);
        $(group).appendTo(target);
      }
    }
  }

  function highlightUser() {
    var currentUser = $(".turn");
    var next;
    var removeTurn = function(x) {
      $(x).removeClass('turn');
    };
    if ($(currentUser).length == "0") {
      $("span.glyphicon-user:first-child").addClass('turn');
    } else {
      if ($(currentUser).attr("id") == $(".glyphicon-user").length) {
        removeTurn(currentUser);
        next = "1";
      } else {
        var u = parseFloat(($(currentUser).attr("id")));
        removeTurn(currentUser);
        next = (u + 1);
      }
    }
    $("span#" + next + ".glyphicon-user").addClass('turn');
    if ($("span.glyphicon-user").length != "0") {
      nextUp(next);
    }
  }

  function nextUp(x) {
    var label = $("label#nextUp");
    if (x == undefined) {
      x = "1";
    }
    if ( x == "0" ) {
      $("div#nextUpContainer").attr("style","display:none");
      return;
    }
    var name = $("#playerNameInputs").find("input#" + x).val();
    if (name == "") {
      name = "Player " + x;
    }
    $(label)
      .parent().attr("style", "display:block")
      .end()
      .text("Next up: " + name);
  }

  function setUser(elem) {
    $("span.turn").removeClass('turn');
    $(elem).addClass('turn');
  }

  $(document).ready(function() {
    $.material.init();
    var data = {
      labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: "1",
          fillColor: "rgba(114,166,202,0.2)",
          strokeColor: "rgba(114,166,202,.8)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };

    var ctx = $("#diceChart").get(0).getContext("2d");
    var lineChart = new Chart(ctx).Bar(data, {
      responsive: true,
      tooltipTemplate: "Total: <%= value %>"
    });

    var resetData = function() {
      var bar = lineChart.datasets[0].bars;
      $.each(bar, function(idx,el){
        el.value = 0;
      });
      lineChart.update();
      $("span.history-text").remove();
      $("span#total-txt").empty();
    };
    var calcTotal = function(id) {
      var current = lineChart.datasets[0].bars[id].value;
      return current + 1;
    };

    var deleteOne = function(id){
      var current = lineChart.datasets[0].bars[id].value;
      lineChart.datasets[0].bars[id].value = current - 1;
      lineChart.update();
    };

    var logDiceRoll = function(button) {
      var $el = $(button);
      var id = $($el).attr("id");
      lineChart.datasets[0].bars[id].value = calcTotal(id);
      lineChart.update();
    };

    var setTotalRolls = function() {
      var count = $("span.history-text").length;
      $("span#total-txt").html("Total Rolls: " + count);
    };

    var numbers = $("button.digit");

    $(numbers).on('click', function () {
      logDiceRoll(this);
      logHistory(this);
      setTotalRolls();
      highlightUser();
    });

    $("button#settingsBtn").on('click',function() {
      var settingsBtnSpan = $("span#settingsText");
      if (settingsBtnSpan.html() == "Show Settings") {
        settingsBtnSpan.html("Hide Settings");
      } else {
        settingsBtnSpan.html("Show Settings");

      }
    });
    $("button#reset").on('click', function () {
      resetData();
      setUser($("span.glyphicon-user:first-child"));
      nextUp(1);
    });

    $(".user-icons").on('click','span.glyphicon-user', function(){
      setUser(this);
      nextUp(this.id);
    });

    $("button#undo").on('click', function(){
      var target = $("span.history-text:first-child");
      var v = target.data("arrayId");
      var arrayId = $.map(v, function(idx, el) {
        return idx;
      });
      deleteOne(arrayId);
      target.remove();
      setTotalRolls();
    });

    $("select#users").on('change', function() {
      var target = $("div.user-icons");
      $(target).empty();
      var n = $(this).val();
      displayUserInputs(n);
      displayUsers(n);
      highlightUser();
    });

  });
})(jQuery);
