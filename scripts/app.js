"use strict";var vm=new Vue({el:"#app",data:{origin:"",destination:"",airports:"",airportName:[],airportNameLatLong:[],distance:[],lat1:"",lat2:"",long1:"",long2:"",totalDistance:"",indexOfOrigin:"",indexOfDestination:"",show:"false"},ready:function(){this.getData()},methods:{getData:function(){var t="../scripts/data.json";this.$http.get(t,function(t){this.$set("airports",t),this.getAirports(),this.typeData(),this.getIndex()})},getAirports:function(){for(var t=this.airports,i=0;i<t.length;i++)this.airportName.push(t[i].an+" ( "+t[i].ac+" ) ")},typeData:function(){var t=function(t){return function(i,n){var a;a=[];var e=new RegExp(i,"i");$.each(t,function(t,i){e.test(i)&&a.push(i)}),n(a)}},i=this.airportName;$("#destination .typeahead").typeahead({hint:!1,highlight:!1,minLength:1},{name:"a",source:t(i)}),$("#origin .typeahead").typeahead({hint:!1,highlight:!1,minLength:1},{name:"a",source:t(i)})},getIndex:function(){var t=this.airportName.indexOf(this.origin),i=this.airportName.indexOf(this.destination);this.$set("indexOfOrigin",t),this.$set("indexOfDestination",i)},initCounter:function(){var t={useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""},i=new CountUp("counter",0,this.totalDistance,0,2.5,t);i.start()},getDistance:function(t,i){function n(t){return Math.round(10*t)/10}function a(t){var i=t*Math.PI/180;return i}this.getIndex();var e,s,o,r;if(t>-1&&i>-1){document.getElementById("hide").style.display="none",this.show=!this.show,e=this.airports[t].la,s=this.airports[t].lo,o=this.airports[i].la,r=this.airports[i].lo,this.$set("lat1",e),this.$set("long1",s),this.$set("lat2",o),this.$set("long2",r),e=a(e),s=a(s),o=a(o),r=a(r);var h=3961,u=r-s,p=o-e,c=Math.pow(Math.sin(p/2),2)+Math.cos(e)*Math.cos(o)*Math.pow(Math.sin(u/2),2),g=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)),l=h*g,d=n(l);this.$set("totalDistance",d),this.$nextTick(function(){this.initCounter()})}else console.log("Please Select an Airport")},resetCounter:function(){this.show=!this.show,this.origin="",this.destination="",this.$nextTick(function(){this.typeData()})}}});Vue.transition("bounce",{type:"animation",enterClass:"rotateIn",leaveClass:"fadeOutDownBig"});