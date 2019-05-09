var userAge;
var userGender;
var userSymptoms;

function getUserInfo(){
    userAge = document.getElementById("agetxt").value;
    userGender = $("input[name='gender']:checked").val();
}

function getSymptomInfo(){
    userSymptoms = new Array();
    $.each($("input[name='Symptom']:checked"), function(){            
        userSymptoms.push($(this).val());
    });
}

function sendInfo(){
    var userInfo = {
        "Age": userAge,
        "Gender": userGender,
        "Symptom1": userSymptoms[0],
        "Symptom2": userSymptoms[1],
        "Symptom3": userSymptoms[2]  
    }
}

function initiateQuery(){
    getSymptomInfo();
    // sendInfo();
    console.log(userSymptoms);
}
