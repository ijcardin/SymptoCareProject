const sql = require("mssql");
const fs = require("fs");

// \\DESKTOP-KU90VG2"
var dbconfig = {
    server: "localhost",
    database: "symptocaredb",
    user: "ijcardin",
    password: "Password123"
}

exports.getIllness = function(userInfo){
    return new Promise(function(resolve, reject){
        sql.connect(dbconfig).then(pool => {
            // Query
            console.log(userInfo);
            var age = userInfo.Age;
            var strAge = age.toString();
            var gender = userInfo.Gender;
            var symptom1 = userInfo.Symptom1;
            var symptom2 = userInfo.Symptom2;
            var symptom3 = userInfo.Symptom3;
            return pool.request()
            .query('SELECT illness_name AS Illness, symptom AS \'Common Symptoms\', ' +
                   'remedy_description AS \'Naturopathic Recommendation\', ' +
                   'prod_name AS \'Over the Counter Recommendation\' ' +
                   'FROM possible_illness AS PI, naturopathic AS N, over_the_counter AS O ' +
                   'WHERE (PI.rec_id = N.rec_id AND PI.rec_id = O.rec_id) ' +
                   'AND PI.gender LIKE ' + '\'%' + gender + '%\' ' +
                   'AND PI.age LIKE ' + '\'%' + strAge + '%\' ' +
                   'AND (symptom LIKE ' +'\'%'+ symptom1 +'%\' ' +
                   'OR symptom LIKE ' + '\'%' + symptom2 + '%\' ' +
                   'OR symptom LIKE ' + '\'%' + symptom3 + '%\')')
        }).then(result => {
            resolve(result);
        }).catch(function (err) {
            console.log(err);
        });
    });
}

// function test() {
//     sql.connect(dbconfig, function (err) {
//
//         if (err) console.log(err);
//
//         // create Request object
//         var request = new sql.Request();
//
//         // query to the database and get the records
//         request.query('select illness_name as Illness from possible_illness ', function (err, recordset) {
//
//             if (err) console.log(err)
//
//             // send records as a response
//             res.send(recordset);
//
//         });
//     });
// }




