var airData = "../javascripts/data.json";

var vm = new Vue({

    el: "#app",

    data: {
        origin: '',
        destination: '',
        airports: '',
        airportName: [],
        distance: []
    },

    ready: function() {
        this.getData();
        this.getDistance();

    },
    methods: {

        getData: function() {
            this.$http.get(airData, function(data) {
                this.$set('airports', data);
                this.getAirports();
                this.typeData();
            });
        },
        getAirports: function() {
            var airportData = this.airports;
            for (var i = 0; i < airportData.length; i++) {

                this.airportName.push(airportData[i].an + ' ( ' + airportData[i].ac + ' ) ');
                //                this.$set('airportName', airportData.a[i]);

            }
        },

        typeData: function() {

            var a = vm._data.airportName;

            $('#the-basics .typeahead').typeahead({
                hint: false,
                highlight: false,
                minLength: 1
            }, {
                name: 'a',
                source: substringMatcher(a)
            });

            $('#origin .typeahead').typeahead({
                hint: false,
                highlight: false,
                minLength: 1
            }, {
                name: 'a',
                source: substringMatcher(a)
            });


        },

        getDistance: function(origin, destination) {
            var apiKey, url, origin, destination;

            var origin = 'Seattle';
            var destination = 'San+Francisco';

            this.$set('origin', origin);
            this.$set('destination', destination);
            apiKey = 'AIzaSyDnzIlVM67hNWLuBmw2HPlFL7Apsk8Pbhw';
            url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination + '&outputFormat=application/json&key=' + apiKey;    
            
            this.$http.jsonp(url).then(function(response) {
            
                var data = response.data,
                    status = response.status,
                    headers = response.headers,
                    config = response.config;
                    console.log(data,status,headers,config);
                
                return data; 
                
                }, function(response) {

                }, {
                    'jsonp': 'callback'
                }

            );
            
            

        }

    },
    
    http: {
        headers: { // options
            method: 'get',
            params: {},
            data: '',
            xhr: null,
            jsonp: 'callback',
            beforeSend: null,
            crossOrigin: null,
            emulateHTTP: false,
            emulateJSON: false
        }
    }

})



var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

