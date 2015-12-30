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

  $(document).ready(function() {
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

    var numbers = $("button").not(".reset");

    $(numbers).on('click', function () {
      logDiceRoll(this);
      logHistory(this);
      setTotalRolls();
    });

    $("button#reset").on('click', function () {
      resetData();
    });

    $("button#undo").on('click', function(){
      var target = $("span.history-text:first-child");
      var v = target.data("arrayId");
      var arrayId = $.map(v, function(idx, el) {
        return idx;
      });
      deleteOne(arrayId);
      target.remove();
    });
  });
})(jQuery);