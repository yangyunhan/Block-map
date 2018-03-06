//Greeter.js
let data = require('./data.js');
let Map = require('./map.js');

module.exports = function () {
    const initialLocation = data;
    let Location = function (data) {
        this.title = data.title;
        this.position = data.position;
        this.address = data.address;
        this.tel = data.tel;
        this.type = data.type;
    };

    /**
     * description: VM in the knockout
     * @constructor
     */
    function ViewModel() {
        let markers = Map.Markers;
        let defaultIcon = Map.DefaultIcon;
        let highlightedIcon = Map.HighlightedIcon;
        let infoWindowContent = Map.InfoWinCon;
        let self = this;
        self.userSearch = ko.observable("");
        self.locationList = ko.observableArray([]);
        initialLocation.forEach(function (locationItem) {
            self.locationList.push(new Location(locationItem));
        });

        /**
         * description: filter the user's input
         */
        self.inputFilter = ko.computed(function () {
            let filter = self.userSearch();
            if(!filter){
                ko.utils.arrayMap(markers, function (marker) {
                    marker.show();
                });
                return self.locationList()
            } else {
                return ko.utils.arrayFilter(self.locationList(), function (item) {
                    ko.utils.arrayMap(markers, function (marker) {
                        if(ko.utils.stringStartsWith(marker.F.title, filter)){
                            marker.show();
                        }else {
                            marker.hide();
                        }
                    });
                    return ko.utils.stringStartsWith(item.title, filter);
                })
            }
        });

        /**
         * description: display function of the markers
         */
        self.show = function () {
            let title = this.title;
            let address = this.address;
            let tel = this.tel;
            let type = this.type;
            let position = this.position;
            ko.utils.arrayForEach(Map.Markers, function (marker) {
                marker.setIcon(defaultIcon);
                if(title === marker.F.title){
                    marker.setAnimation('AMAP_ANIMATION_DROP');
                    marker.setIcon(highlightedIcon);
                    infoWindowContent(title, address, tel, type, position);
                }
            });
        };

        /**
         * description: open function of the navigator in the left
         */
        self.openNav = function () {
            document.getElementById('options-box').style.marginLeft = '0';
            document.getElementById('map').style.marginLeft = '302px';
            document.getElementById('container').style.marginLeft = '302px';
        };

        /**
         * description: close function of the navigator in the left
         */
        self.closeNav = function () {
            document.getElementById('options-box').style.marginLeft = '-302px';
            document.getElementById('map').style.marginLeft = '0';
            document.getElementById('container').style.marginLeft = '0';
        }
    }

    let model = new ViewModel();
    ko.applyBindings(model);
};