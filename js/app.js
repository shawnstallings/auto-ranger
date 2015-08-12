$(function() {

    //Page loads and this AJAX request gets the Edmunds API data for makes
    $.ajax({
        type: 'GET',
        url: "https://api.edmunds.com/api/vehicle/v2/makes?state=used&view=basic&api_key=exsk9q7jzebzyqtetmeyu5r5",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback'
        });

});

/* Functions List */

//This takes the makes and creates the list in the form's first field 
function jsonpcallback(result) {
    console.log(result);

    $.each(result.makes, function(i, val) {
        
        var make = result.makes[i];
        $('.makes').append("<option value='" + make.niceName +"'>" + make.name + "</option>");
    })
}
   
