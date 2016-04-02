<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Buchs Map</title>
            <link rel="stylesheet" href="css/materialize.css">
            <link rel="stylesheet" href="css/style.css">
            <link rel="stylesheet" href="css/animate.css">
            <link rel="icon" type="image/png" href="icon.png" />
        </head>
    <body>
        <nav class="card-panel teal lighten-2">
            <img src="icon.png" alt="">
        </nav>
        <div class="row">
        <div id="map" class="wow swing"></div>
        </div>
        <div id="destinationForm">
            <div class="row">
                <form method="get" name="direction" id="direction" class="col s12">
                    <div class="row">
                        <p>
                            <input type="checkbox" id="check" />
                            <label for="check">Utiliser la position actuelle comme départ</label>
                        </p>
                        <div class="wow bounceInLeft input-field col s6">
                            <input type="text" name="origin" id="origin">
                            <label>Point de départ :</label>
                            </div>
                        <div class="wow bounceInRight input-field col s6">
                            <input type="text" name="destination" id="destination">
                                <label>Destination :</label>
                            </div>
                        <div class="wow bounceInLeft input-field col s6">
                            <select id="mode">
                                <option selected="selected" value="DRIVING">Voiture</option>
                                <option value="BICYCLING">Velo</option>
                                <option value="WALKING">a Pied</option>
                                <option value="TRANSIT">Transport en commun</option>
                            </select>
                            <label>Moyen de Locomotion</label>
                        </div>
                        <input id="save" class="wow bounceInRight col s6 btn waves-effect waves-light orange lighten-2" type="button" value="save" style="margin-bottom: 2px">
                        <div class="clear"></div>
                        </div>
                    <input class="wow bounceInUp col s12 btn waves-effect waves-light" type="button" value="Calculer l'itinéraire" onclick="calculate()">
               </form>
            </div>
            <div id="panel"></div>
                <script async defer
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBX1jdpS588Znn86y8AXEooByxjn3jaeMM&libraries=places&callback=initMap&fullscreenControl=true">
                </script>
                <script src="js/jquery-2.2.2.min.js" ></script>
                <script src="js/materialize.js" ></script>
                <script src="js/js.js" ></script>
                <script src="js/wow.js" ></script>
            </div>
        </body>
</html>