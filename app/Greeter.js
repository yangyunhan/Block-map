//Greeter.js
//var style = require('./Greeter.css');
//var config = require('./config.json');

module.exports = function () {
    const initialLocation = [
        {title: '黄鹤楼', position: [114.306165, 30.543333]},
        {title: '中山公园', position: [114.271554, 30.586691]},
        {title: '武汉长江大桥', position: [114.287254, 30.550217]},
        {title: '武汉东湖海洋世界', position: [114.413148, 30.548737]},
        {title: '东湖生态旅游风景区', position: [114.375306, 30.567554]},
        {title: '武汉海昌极地海洋公园',position: [114.277853,30.664527]},
        {title: '武汉动物园', position: [114.259137,30.545404]},
        {title: '古琴台', position: [114.263843, 30.554304]},
        {title: '归元禅寺', position: [114.259137, 30.545404]}
    ];

    let Location = function (data) {
        this.title = ko.observable(data.title);
        this.position = ko.observableArray(data.position);
    };

    function ViewModel() {
        let self = this;
        self.userSearch = ko.observable("");
        self.locationList = ko.observableArray([]);
        initialLocation.forEach(function (locationItem) {
            self.locationList.push(new Location(locationItem));
        });

        self.display = function () {
            self.locationList([]);
            if(self.userSearch()){
                initialLocation.forEach(function (locationItem) {
                    if(locationItem.title === self.userSearch()){
                        self.locationList.push(new Location(locationItem));
                    }
                });
            }else {
                initialLocation.forEach(function (locationItem) {
                    self.locationList.push(new Location(locationItem));
                });
            }
            return self.locationList();
        };
    }

    let model = new ViewModel();
    ko.applyBindings(model);
};
