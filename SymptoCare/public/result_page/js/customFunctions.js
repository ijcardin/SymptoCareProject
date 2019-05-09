
$(document).ready(function() {
    $("#nextbtn").attr("disabled", true);
    // This will actively check if there are any changes in the input tag
    $('input').change(function(){
        //Validate your form here, example:
        var validated = true;
        if($("#agetxt").val() == "" && $("input:radio[name='gender']").is(":checked") == false) 
            validated = false;
        if($("#agetxt").val() < 1 || $("#agetxt").val() > 100){
            alert("Please enter an age between 1 and 100");
            validated = false;
        }
        //If form is validated enable form
        if(validated) 
            $("#nextbtn").attr("disabled", false);                             
  });
  // Ensure user selects only 3 symptoms from the given options
  $('input[type=checkbox]').on('change', function (e) {
    if ($('input[type=checkbox]:checked').length > 3) {
        $(this).prop('checked', false);
        alert("Only 3 Symptoms Allowed");
    }
    });
});