/*
* Name: locateinator
* Version: 0.001
* Author: Alejandro Gómez
* Description: Makes a google map to show the location of variuos places by a given address or a position. Also makes a simple select html tag that move the map to their position.
*              Note:It it's recommended to load the locateinator.css located inside the css folder in your page.
*
*       
*
*/



(function($) {

    
    var gMapUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";
    var markers = []; 
    var infoWindows = [];
    var previous = -1;
    var previousClick = -1;
    


    $.fn.locateinator = function(options) {

        var map;
        
        var defaults = {
            width: '500px',
            height:'400px',
            multipleInfo:false,
            mapOptions:{
                zoom: 10,
                center: new google.maps.LatLng(19.993423, -99.2235454)
            },
            locations : [],
            folder : null,            
            mapListCss:{
                "font-size":"18px",
                "border":"none",
            },
            mapCanvasCss:{
                'width':'500px',
                'height':'400px',
                'float':'left',
            },
            mapControllerCss:{
                'width':'300px',
                'height':'400px',
                'float':'left',
            },
            showController:true,
        };
            
        var settings = $.extend(true,{}, defaults,options);


        return this.each( function() {
            var id = this.id;                    
            var map_canvas = id+"-map-canvas";
            var map_controller = id+"-map-controller";

            $(this).append("<div id="+map_canvas+"></div>");
            $(this).append("<div id="+map_controller+"></div>");           


            initMap(map_canvas,settings.mapOptions);                        
            createMarkers(settings.locations,settings.multipleInfo);
            
            if (settings.showController){
                initController($("#"+map_controller));
                $("#"+map_controller).css(settings.mapControllerCss);
                $("#map-controller-list").css(settings.mapListCss);
            }
            
            $("#"+map_canvas).css(settings.mapCanvasCss);
            
            



        });

    }; 

    function createMarkers(locations,multipleInfo){
        
        var info = $(".locateinator-info").clone();
        $(".locateinator-info").remove();

        $.each(locations,function(index,value){          

            var location = value.position ? value.position: byAdress(info,index,value);
            var marker = new google.maps.Marker({
                    position :new google.maps.LatLng(location.lat,location.lng),
                    map:map,
                    title:value.title,
            });
            var infowindow = new google.maps.InfoWindow({
                content:info[index] === undefined ? ( value.desc === undefined ? value.title : value.desc) : info[index]
            });                      
                        
            google.maps.event.addListener(marker, 'click', function() {
            if (previousClick>=0)
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
    function byAdress(info,index,value){
        valueFormatted = value.address.replace(/\s/g,'+');
        var path = gMapUrl+valueFormatted;
        var location = null;
        $.ajax({
            url:path,
            dataType:"json",
            async:false,
            success:function(data){
                if(data.status==="OK"){
                    location = data.results[0].geometry.location;                
                }
            },
        });  
        return location;
    }

    /*
    *   Initialize google map
    */

    function initMap(id,mapOptions){
        map = new google.maps.Map(document.getElementById(id),
              mapOptions);        
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
                var center = new google.maps.LatLng(pos.d,pos.e);
                map.panTo(center);
                infoWindows[index].open(map,markers[index]);

                if (previous>=0)
                    infoWindows[previous].close();
                previous = index;
                

            });

        }).trigger('change');
    }
    
}(jQuery));
