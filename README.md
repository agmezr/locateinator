Locateinator
============

The simple yet useful plugin to show lots of places in short time

<h1>Introduction</h1>
	
<h3>What's this and why do I need it?</h3>

This is a jquery plugin focused on developers that have a lot of places and want to show them in a map. The locateinator is simple to use and completely customizable so it can adapt to your needs.

<h3>Why doing something so pointless?</h3>

Well, my unimpressive friend, because there is always a benefit from seeing the places graphically in a map. You can have control over your providers, friends, ex-girlfriends, future-girlfriends, etc.

<h3>The name locateinator has something to do with a platypus?</h3>

Yep, but for legal reasons I'm going to deny all

<h1>Example</h1>

<h3>Ok, I’ll give it a try... how do I use it?</h3>

First you need jquery (obviously). To do this remember to download the latest version (although It's tested with versions >= 1.7). If you already have it simply add something like this:

```html
<script type="text/javascript" src="your_path_to_jquery/jquery-1.7.1.min.js"></script> 
```

Second you need to include the Google maps API. Here you can see an <a href="https://developers.google.com/maps/?hl=en"> example </a>

To use the API version 3, simply add:

```html
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
```


There! You are ready to use this plugin.

Ok. I think I'm ready. What's next?

First you need a victim >=), so let’s take this div conveniently named test

```html
<!-- html code !-->

<div id="test"> </div>

<!-- more html code !-->

```
Now, we need to tell the div to initialize the locateinator, but before that let me explain you the structure of the object that the locateinator need.

```javascript
  var myLocations = [
    {
      title: "the title of my place, example: my house",
      desc: "The description of the place, for example: this is where I live",
      address: "Eiffel tower France",
    }
  ];
```

So as you can see, you only need to provide the title , description an address. But let's see another example where I know the position (longitude and latitude) but don't know the place (Yes, THAT can really happen)

```javascript
  var myImprobableCase = [
    {
      title: "this is my new house",
      position:{
        lat: 19.156498,
        lng: -99.15489,
      }
    }
  ];
```

There you go, now you can see my new house.

<h3>But when I will be able to see the map!!!? </h3>

Calm down buddy, to do this simply initialize the locateinator with the locations and voila!

```javascript
  var myLocations = [
    {
      title: "the title of my place, example: my house",
      desc: "The description of the place, for example: this is where I live",
      address: "Eiffel tower France",
    },
    //more and more locations
  ];
  
  $("#test").locateinator({locations:myLocations});

```

You will see something like this


![alt text](https://raw.github.com/agmezr/locateinator/master/img/example1.PNG "Example 1")

<h3>Nice, but the description it's too small. </h3>

Don't worry my new friend. You can create your own div and display it in the <a href="https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=es">info Window </a> of the marker. You only need to indicate that this new div is for the locateinator with the class "locateinator-info".  Let's see an example:

```html
<!-- the same code as before !-->
<div id="test">
  <div class="locateinator-info"> <h1> Look, I'm bigger now </h1> Yes! </div>
</div>
<!-- the same old code !-->
```

And with that you can see this:

![alt text](https://raw.github.com/agmezr/locateinator/master/img/example2.PNG "Example 2")

<h3>Nice.. but wait. What's that ugly thing next to the map? </h3>

I WILL suppose that you are talking about the map-controller (if not, maybe it's a fly). The map-controller it's a simple html select tag. It shows the list of all your locations and if you click them, the map will automatically fly to them.

<h3>Ok, but it's ugly and I don´t like it </h3>

I knew you'll say something like that. For you I have created the following option: showController. With this, you can hide the map-controller. Example:

```javascript
$("#test").locateinator({
    locations:myLocations,
    showController:false,
});
```

aaaand it's gone:

![alt text](https://raw.github.com/agmezr/locateinator/master/img/example3.PNG "Example 3")



<h3> Hey! I said it was ugly, not useless </h3>

Really?, well in that case maybe you only need to give some style, so why don't you give it a try with this: mapListCss.

Example:

```javascript
$("#test").locateinator({
    locations:myLocations,
    mapListCss:{
      "font-size":"20px",
      "width":"500px",
    }
});
```

![alt text](https://raw.github.com/agmezr/locateinator/master/img/example4.PNG "Example 4")

<h3> Nice, but what else can I customize? </h3>

Excellent question. Here is a list of all the options and a brief description

<h4>Options</h4>

|Option   |Description| Type  |
|---------|---------| --------|
|locations | The array of objects to display | Array 
|mapCanvasCss | The css of the div displaying the map| Object literal
|mapControllerCss | The css of the div displaying the list | Object literal
|mapListCss | The css of the list itself, don't confuse it with the mapControllerCss| Object literal
|showController | Indicates if the map-controller shows, default: true | Boolean
|multipleInfo | Indicates if multiples infoWindow can remain open at the same time | Boolean
|mapOptions | The options for creating the google map, example :center, zoom, etc. For more information click here | Object literal


