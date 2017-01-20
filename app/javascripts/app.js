var vm = new Vue({

    el: "#app",

    data: {
        origin: '',
        destination: '',
        airports: '',
        airportName: [],
        airportNameLatLong: [],
        distance: [],
        lat1: '',
        lat2: '',
        long1: '',
        long2: '',
        totalDistance: '',
        indexOfOrigin: '',
        indexOfDestination: '',
        show: 'false',
    },

    ready: function() {
        this.getData();

    },
    methods: {

        getData: function() {
            var airData = "../javascripts/data.json";
            this.$http.get(airData, data => {
                this.$set('airports', data);
                this.getAirports();
                this.typeData();
                this.getIndex();
            });
        },
        getAirports: function() {
            const airportData = this.airports;
            for (var i = 0; i < airportData.length; i++) {
              this.airportName.push(`${airportData[i].an} ( ${airportData[i].ac})`) ;
            }
        },

        typeData: function() {

            var a = this.airportName;

            $('#destination .typeahead').typeahead({
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

        getIndex: function() {
            var org = this.airportName.indexOf(this.origin);
            var dest = this.airportName.indexOf(this.destination);
            this.$set('indexOfOrigin', org);
            this.$set('indexOfDestination', dest);
        },


        initCounter: function() {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };
            var count = new CountUp("counter", 0, this.totalDistance, 0, 2.5, options);
            count.start();

        },


        getDistance: function(origin, destination) {

            this.getIndex();

            var lat1, long1, lat2, long2;


            if (origin > -1 && destination > -1) {

                //Hide the ui-widget box
                document.getElementById("hide").style.display = "none";
                this.show = !this.show;

                lat1 = this.airports[origin]['la'];
                long1 = this.airports[origin]['lo'];
                lat2 = this.airports[destination]['la'];
                long2 = this.airports[destination]['lo'];

                // round to the nearest 1/1000
                function round(x) {
                    return Math.round(x * 10) / 10;
                }

                // convert degrees to radians
                function deg2rad(deg) {
                    rad = deg * Math.PI / 180; // radians = degrees * pi/180
                    return rad;
                }

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

                this.$set('totalDistance', dm);

                this.$nextTick(function() {
                    this.initCounter();
                })

            } else {
                console.log('Please Select an Airport');
            }

        },

        resetCounter: function() {
            this.show = !this.show;
            this.origin = '';
            this.destination = '';

            this.$nextTick(function() {
                this.typeData(); //Doesn't populate array with duplicate airports
            })

        }

    }

})

Vue.transition('bounce', { // eslint-disable-line
    type: 'animation',
    enterClass: 'rotateIn',
    leaveClass: 'fadeOutDownBig'
});

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
