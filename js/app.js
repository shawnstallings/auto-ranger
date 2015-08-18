var edmunds = [];
var styles = [];


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
        //console.log(makenN);
        var modelnN = $('#model option:selected').attr('value');
        //console.log(modelnN);
        
        $.ajax({
        type: 'GET',
        url: "https://api.edmunds.com/api/vehicle/v2/" + makenN + '/' + modelnN + "/years?state=used&view=basic&api_key=exsk9q7jzebzyqtetmeyu5r5",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpyear'
        });
            jsonpyear();
    
})

$('#search-button').on('click', function(event) {
    event.preventDefault();
    styles = [];
        var makenN = $('#make option:selected').attr('value');
        var modelnN = $('#model option:selected').attr('value');
        var yearStart = $('#year-start option:selected').text();
        //console.log(yearStart);
        var yearEnd = $('#year-end option:selected').text();
        //console.log(makenN + " " + modelnN + " " + yearStart + " " + yearEnd);
        var years = [];
            while(yearStart <= yearEnd){
                years.push(yearStart);
                yearStart++;
                //console.log(yearStart);
                //console.log(typeof yearStart);
            }
            
        for (var i = 0; i < years.length; i++) {
            
            $.ajax({
            type: 'GET',
            url: "https://api.edmunds.com/api/vehicle/v2/" + makenN + '/' + modelnN + "/" + years[i] + "/styles?state=used&view=full&api_key=exsk9q7jzebzyqtetmeyu5r5",
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpstyle'
            })               
                .done(function(data) {
                    //console.log(data);
                    //styles.push(data);
                })
                //console.log(styles);
               
                
        }
        jsonpstyle();
})

        
});


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
    //console.log(result);
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

function jsonpstyle(result) {
    console.log(result);
   
    var styleid = result.styles[0].year.id;
    var year = result.styles[0].year.year;
    var price = "$" + result.styles[0].price.usedTmvRetail + ".00";
    console.log(styleid);
    console.log(year);

    var clone = $('.car-data').clone().appendTo('#results-body').attr({'id': styleid });
        
        clone.find($('.year p')).text(year);
        clone.find($('.price p')).text(price);


}
   

