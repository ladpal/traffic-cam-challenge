// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    }

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var trafficCams;
    var markers = [];

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            trafficCams = data;

            data.forEach(function(trafficCam) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(trafficCam.location.latitude),
                        lng: Number(trafficCam.location.longitude)
                    },
                    map: map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var picUrl = trafficCam.imageurl.url;
                    var html = '<h2>'+ trafficCam.cameralabel +'</h2>';
                    html += '<img src="' + picUrl + '">';
                    console.log(html);
                    map.panTo(marker.getPosition(trafficCam));
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            });
        })
        .fail(function(error) {
            alert("Request Failed!");
        });

    $("#search").bind('search keyup', function(trafficCam) {
        trafficCams.forEach(function(trafficCam, index) {
            var label = trafficCam.cameralabel.toLowerCase();
            console.log(label);
            console.log($("input").val());
            var exists = label.indexOf($("input").val().toLowerCase());
            console.log(exists);
            if (exists == -1) {
                markers[index].setMap(null);
            } else {
                markers[index].setMap(map);
            }
        });
    });
});
 //doc ready

//every object has a camera label and has description of where camera is
//1. figure out which object to show
//got and array.. iterate over the array and use .indexOf to compare search and stuff. ignore case
//if camera doesn't match string how to remove associated marker: use index
// for each(item, itemindex)
