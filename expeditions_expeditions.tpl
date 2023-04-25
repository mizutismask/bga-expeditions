{OVERALL_GAME_HEADER}

<div id="score">
    <div id="table-wrapper">
        <table>
            <thead>
                <tr id="scoretr"></tr>
            </thead>
            <tbody id="score-table-body">
            </tbody>
        </table>
    </div>
</div>

<div id="map-zoom-wrapper">
    <div id="resized">
        <div id="main-line">
            <div id="map-and-borders">
                <div id="map-zoom" class="disable-scrollbars">
                    <div id="map"></div>
                </div>
                <div id="zoom-button"></div>
                <div id="map-destination-highlight-shadow"></div>
            </div>

            <div id="train-car-deck">
                <div id="shared-destination-deck">
                    <div id="shared-destination-stock"></div>
                </div>       
            </div>

        </div>
         <div id="destination-deck" class="hidden">
            <div id="destination-stock"></div>
        </div>
    </div>
</div>

<audio id="audiosrc_ttr-completed-in-game" src="{GAMETHEMEURL}img/completed-in-game.mp3" preload="none" autobuffer></audio>
<audio id="audiosrc_o_ttr-completed-in-game" src="{GAMETHEMEURL}img/completed-in-game.ogg" preload="none" autobuffer></audio>

{OVERALL_GAME_FOOTER}
