$(document).ready(function() {
    var airports = "javascripts/data.json";
    $.getJSON(airports).done(function(data) {

        var data;
        var airportName = [];
        var airportLong = [];
        var airportLat = [];

        for (var i in data) {

            airportName.push(data[i].Airport_Name);
            airportLong.push(data[i].Longitude);
            airportLat.push(data[i].Latitute);

        };

        $("#origin,#end").autocomplete({
            source: airportName
        });


        $("#btnSubmit").click(function() {

            var valOrigin = $("#origin").val();
            var valEnd = $("#end").val();
            var indexForOrigin = airportName.indexOf(valOrigin);
            var indexForDest = airportName.indexOf(valEnd);

            var lon1, long2, lat1, lat2;

            long1 = airportLong[indexForOrigin];
            lat1 = airportLat[indexForOrigin];
            long2 = airportLong[indexForDest];
            lat2 = airportLat[indexForDest];

            // round to the nearest 1/1000
            function round(x) {
                return Math.round(x * 10) / 10;
            }

            // convert degrees to radians
            function deg2rad(deg) {
                rad = deg * Math.PI / 180; // radians = degrees * pi/180
                return rad;
            }

            function calculateDist() {

                // convert coordinates to radians
                lat1 = deg2rad(lat1);
                long1 = deg2rad(long1);
                lat2 = deg2rad(lat2);
                long2 = deg2rad(long2);

                var R = 3961; //miles
                var dlon = long2 - long1;
                var dlat = lat2 - lat1;

                //var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(originLat) * Math.cos(destLat) * Math.pow((Math.sin(dlon/2)),2);
                var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; //(where R is the radius of the Earth)
                var dm = round(d);

                console.log(d);
                console.log(dm);


                $('#total').text(dm + " M");

            };

            calculateDist();
            //Testing purposes
            console.log(lat1 + " " + long1 + " " + lat2 + " " + long2);

        });

    });

    $('#logo').animate({
        width: '15%',
    }, 5000).removeClass('logo').addClass('logo-animate')


    $('.wrapper').show(5000)
});
