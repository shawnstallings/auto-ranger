var edmunds = []

$(function() {


    //Page loads and this AJAX request gets the Edmunds API data for makes
    $.ajax({
        type: 'GET',
        url: "https://api.edmunds.com/api/vehicle/v2/makes?state=used&view=basic&api_key=exsk9q7jzebzyqtetmeyu5r5",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback'
        }); 
    jsonpcallback();
 

 $('#make').change(function() {
    
        var make = $('.makes option:selected').text();
        //console.log(edmunds.makes);
        for (var i = 0; i < edmunds.makes.length; i++) {
            // console.log(edmunds.makes[i]);
            // console.log(edmunds.makes[i].name);
            if (make == edmunds.makes[i].name) {
                //console.log("it was found");
                //console.log(edmunds.makes[i].models);
                $("#model").empty();
                $("#model").append("<option value='' disabled selected>Select Model</option>")
                $.each(edmunds.makes[i].models, function(x, val) {
            
                    $("#model").append("<option value='" + val.niceName + "'>" + val.name + "</option>");
                })
                break;
            }
           
        }
})

$('#model').change(function() {
        var makenN = $('#make option:selected').attr('value');
        console.log(makenN);
        var modelnN = $('#model option:selected').attr('value');
        console.log(modelnN);
        
        $.ajax({
        type: 'GET',
        url: "https://api.edmunds.com/api/vehicle/v2/" + makenN + '/' + modelnN + "/years?state=used&view=basic&api_key=exsk9q7jzebzyqtetmeyu5r5",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpyear'
        });
    jsonpyear() ;
    





        //var makes = edmunds.makes;
        //console.log(model);
        //console.log(makes);
        
        //$.each(edmunds.makes, function(i,makes) {
          //  console.log(makes);
           
               
                
                //for (var i = 0; i < makes.models.length; i++) {
                   // console.log(makes.models[i]);
                    //if (model == makes.models[i].name) {
                        //console.log(models.name);
                        //console.log(.years[i]);
                        //$.each(makes.models, function(i,models) {
                        //console.log(models);
                          //  $.each(models.years, function(i,models) {
                        //$.each(makes.models[i].name, function(x,val) {
                            //console.log(val.year);
                //})
                //break; }}

                //console.log(makes.models[i].years);
                  // $("#year-start #year-end").empty();
                        
                })

                
               // })
                
           // })
        

});

//})

/* Functions List */

//This takes the makes and creates the list in the form's first field 
function jsonpcallback(result) {
    //console.log(result);
    edmunds = result;
    
    $.each(result.makes, function(i, val) {
        var make = result.makes[i];
        $('.makes').append("<option value='" + make.niceName +"'>" + make.name + "</option>");
    })
}

function jsonpyear(result) {
    console.log(result);
    $('#year-start').empty();
    $('#year-end').empty();
    $('#year-start').append("<option value='' disabled selected>Select Starting Year</option>");
    $('#year-end').append("<option value='' disabled selected>Select Ending Year</option>");

    $.each(result.years, function(i,val) {
        var years = result.years[i];
       
        $('#year-start').append("<option>" + years.year + "</option>");
        $('#year-end').append("<option>" + years.year + "</option>");

    })  
}
   

