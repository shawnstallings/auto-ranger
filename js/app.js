$(function() {

    /*var edmundsAPI = "https://api.edmunds.com/api/vehicle/v2/makes?state=used&view=basic&fmt=json&callback=jsonp&api_key=exsk9q7jzebzyqtetmeyu5r5"  
    $.getJSON( edmundsAPI, function(data) {
        console.log(data);
    })*/

    $.ajax({
        type: 'GET',
        url: "https://api.edmunds.com/api/vehicle/v2/makes?state=used&view=basic&api_key=exsk9q7jzebzyqtetmeyu5r5",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback'
        });

});

    
function jsonpcallback(result) {
    console.log(result);

    $.each(result.makes, function(i, val) {
        
        var make = result.makes[i];
        $('.makes').append("<option value='" + make.niceName +"'>" + make.name + "</option>");
    })
}
   
