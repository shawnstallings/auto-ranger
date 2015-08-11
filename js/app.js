$(function() {

    window.sdkAsyncInit = function() {
            // Instantiate the SDK
            var res = new EDMUNDSAPI('exsk9q7jzebzyqtetmeyu5r5');
            // Optional parameters
            var options = {};
            // Callback function to be called when the API response is returned
            function success(index,value) {
                var name = value.name
                $('.makes').append("<option>" + name + "</option>");
                
            }
            // Oops, Houston we have a problem!
            function fail(data) {
                console.log(data);
            }
            // Fire the API call
            res.api('/api/vehicle/v2/makes', options, success, fail);
            // Additional initialization code such as 
            // adding Event Listeners goes here
        };
    // Load the SDK asynchronously
    (function(d, s, id){
        var js, sdkjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "js/edmunds.api.sdk.js";
        sdkjs.parentNode.insertBefore(js, sdkjs);
    }(document, 'script', 'edmunds-jssdk'));
   
});
   
