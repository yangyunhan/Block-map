//Greeter.js
let data = require('./data.js');
let Map = require('./map.js');
module.exports = function () {
    const initialLocation = data;
    let Location = function (data) {
        this.title = data.title;
        this.position = data.position;
    };

    function ViewModel() {
        let self = this;
        self.userSearch = ko.observable("");
        self.locationList = ko.observableArray([]);
        initialLocation.forEach(function (locationItem) {
            self.locationList.push(new Location(locationItem));
        });
        self.inputFilter = ko.computed(function () {
            let filter = self.userSearch();
            let markers = Map.Markers;
            if(!filter){
                ko.utils.arrayMap(markers, function (el) {
                    el.show();
                });
                return self.locationList()
            } else {
                return ko.utils.arrayFilter(self.locationList(), function (item) {
                    ko.utils.arrayMap(markers, function (el) {
                        if(ko.utils.stringStartsWith(el.F.title, filter)){
                            el.show();
                        }else {
                            el.hide();
                        }
                    });
                    return ko.utils.stringStartsWith(item.title, filter);
                })
            }
        });
    }

    let model = new ViewModel();
    ko.applyBindings(model);
};