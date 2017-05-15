/*
* Name: locateinator
* Version: 1.0.5
* Author: Alejandro Gómez
* Description: Makes a google map to show the location of variuos places by a given address or a position. Also makes a simple html select tag that move the map to their position.
*
*       
*
*/




(function ($) {
    var markers, infoWindows, previous, previousClick;
    markers = [];
    infoWindows = [];
    previous = -1;
    previousClick = -1;
    $.fn.locateinator = function (options) {
        var map, defaults, settings;
        defaults = {
            multipleInfo: false,
            mapOptions: {
                zoom: 10,
                center: new google.maps.LatLng(19.993423, -99.2235454)
            },
            locations : [],
            mapListCss: {
                "font-size": "20px",
                "border": "none"
            },
            mapCanvasCss: {
                'width': '500px',
                'height': '400px',
                'float': 'left'
            },
            mapControllerCss: {
                'width': '300px',
                'height': '400px',
                'float': 'left'
            },
            onComplete: function(){},
            showController: true
        };
        settings = $.extend(true, {}, defaults, options);
        return this.each(function () {
            var id, map_canvas, map_controller;
            id = this.id;
            map_canvas = id + "-map-canvas";
            map_controller = id + "-map-controller";

            $(this).append("<div id=" + map_canvas + "></div>");
            $(this).append("<div id=" + map_controller + "></div>");
            initMap(map_canvas, settings.mapOptions);
            createMarkers(settings.locations, settings.multipleInfo);
            if (settings.showController) {
                initController($("#" + map_controller));
                $("#" + map_controller).css(settings.mapControllerCss);
                $("#map-controller-list").css(settings.mapListCss);
            }
            $("#" + map_canvas).css(settings.mapCanvasCss);
            settings.onComplete.call(this);
        });
    };

    function createMarkers(locations, multipleInfo) {
        var info = $(".locateinator-info").clone();
        $(".locateinator-info").remove();
        $.each(locations, function (index, value) {
            var location = value.position || byAddress(info,index,value);
            var marker = new google.maps.Marker({
                    position :new google.maps.LatLng(location.lat,location.lng),
                    map:map,
                    title:value.title,
            });
            var infowindow = new google.maps.InfoWindow({
                content: info[index] || (value.desc || value.title)
            });                        
            google.maps.event.addListener(marker, 'click', function() {
            if (previousClick >=0)
                if (infoWindows[previousClick] && !multipleInfo)
                    infoWindows[previousClick].close();
                infowindow.open(map,marker);
                previousClick = index;
            });                        
                markers.push(marker);  
                infoWindows.push(infowindow);                
        });
    }

    /*
    *   Place the marker by address
    *
    */
    function byAddress(info,index,value){
        var gMapUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";
        var valueFormatted = value.address.replace(/\s/g,'+');
        var path = gMapUrl+valueFormatted;
        var location = null;
        $.ajax({
            url:path,
            dataType:"json",
            async:false,
            success:function(data){                
                location = data.status === "OK" ? data.results[0].geometry.location : {lat:0,lng:0};                
            },
        });  
        return location;
    }

    /*
     *   Initialize google map
    */

     function initMap(id, mapOptions) {
         map = new google.maps.Map(document.getElementById(id),mapOptions);
     }



    /*
    *   Create the select option with all the markers and their positions.
    *
    */

    function initController(map_controller){
        var select = "<select id='map-controller-list' style='height:inherit;' size='"+10+"'>";
        $.each(markers,function(index,value){
            style = "background:";
            style += index%2 == 0 ? "#f5f5f5": "white";
            select+="<option style='"+style+"' value='"+index+"'>"+value.title+"</option>";
        });
        select+="</select>";
        map_controller.append(select);
        $("#map-controller-list").change(function(event){
            $("#map-controller-list option:selected").each(function(){
                var index = $(this).val();          
                var pos = markers[index].position;
                var center = new google.maps.LatLng(pos.lat(),pos.lng());
                map.panTo(center);
                infoWindows[index].open(map,markers[index]);
                if (previous>=0)
                    infoWindows[previous].close();
                previous = index;
            });
        }).trigger('change');
    }
    
}(jQuery));
