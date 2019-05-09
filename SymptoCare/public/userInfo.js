
var userSymptoms;
var userInfo;

const databaseAPI = require('../assets/js/databaseConnector.js');

function getUserInfo(){
    userAge = document.getElementById("agetxt").value;
    userGender = $("input[name='gender']:checked").val();

    localStorage.setItem("age", userAge);
    localStorage.setItem("gender", userGender);

}

function getSymptomInfo(){
    userSymptoms = new Array();
    $.each($("input[name='Symptom']:checked"), function(){            
        userSymptoms.push($(this).val());
    });
}

function sendInfo(){
    const getAge = localStorage.getItem("age");
    const getGender = localStorage.getItem("gender");
    userInfo = {
        "Age": getAge,
        "Gender": getGender,
        "Symptom1": userSymptoms[0],
        "Symptom2": userSymptoms[1],
        "Symptom3": userSymptoms[2]
    }
    localStorage.setItem("info", userInfo);
    $.post('http://localhost:3000/illness', userInfo, function(data, status) {
        console.log("back to front end");
        localStorage.setItem("returnedSQL", data);
    });
}

function initiateQuery(){
    getSymptomInfo();
    sendInfo();
}

function buildHTMLTable(selector){
    var obj = JSON.parse(localStorage.getItem("returnedSQL"));
    if(obj === null){
        console.log(obj);
        return;
    }
    var columns = addAllColumnHeaders(obj, selector);

    for (var i = 0; i < obj.length; i++) {
        var row$ = $('<tr style="text-align:center"/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = obj[i][columns[colIndex]];
                if (cellValue == null) cellValue = "";
                    row$.append($('<td style="text-align:center"/>').html(cellValue));
    }
    $(selector).append(row$);
    }
    console.log(localStorage.getItem("returnedSQL"));
}
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr style="text-align:center"/>');
  
    for (var i = 0; i < myList.length; i++) {
      var rowHash = myList[i];
      for (var key in rowHash) {
        if ($.inArray(key, columnSet) == -1) {
          columnSet.push(key);
          headerTr$.append($('<th style="text-align:center"/>').html("<h3>"+key+"</h3>"));
        }
      }
    }
    $(selector).append(headerTr$);
  
    return columnSet;
}

exports.getIllness1 = function(jsonInfo){
    var localjson = jsonInfo;
    return databaseAPI.getIllness(localjson).then(res => {
        console.log("1");
        return res;
    });
};
