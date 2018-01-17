//map.js

var ajax = require('././ajax.js');
ajax('武汉长江大桥');
module.exports = function () {
    let markers = [];
    let defaultIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
    let highlightedIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png';
    let infoWindow = new AMap.InfoWindow();
    let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:12,
        center: [114.364322, 30.536048],
        offset: new AMap.Pixel(0,0)
    });
    map.plugin(["AMap.ToolBar"], function () {
        map.addControl(new AMap.ToolBar());
    });
    let locations = [
        {
            title: '黄鹤楼',
            position: [114.306165, 30.543333],
            address: '蛇山西山坡特1号',
            tel: '027-88875096',
            type: '风景名胜；国家级景点'
        },
        {
            title: '中山公园',
            position: [114.271554, 30.586691],
            address: '解放大道1265号',
            tel: '027-85780746',
            type: '风景名胜；公园广场；公园'
        },
        {
            title: '武汉长江大桥',
            position: [114.287254, 30.550217],
            address: '临江大道19附近',
            tel: 'null',
            type: '风景名胜'
        },
        {
            title: '武汉东湖海洋世界',
            position: [114.413148, 30.548737],
            address: '沿湖大道20号（东湖梨园旁）',
            tel: '027-86776578',
            type: '风景名胜；公园广场；水族馆'
        },
        {
            title: '东湖生态旅游风景区',
            position: [114.375306, 30.567554],
            address: '沿湖大道16号',
            tel: '027-86793760',
            type: '风景名胜；国家级景点'
        },
        {
            title: '武汉海昌极地海洋公园',
            position: [114.277853,30.664527],
            address: '金银潭大道96号',
            tel: '027-85699999',
            type: '风景名胜；公园广场；水族馆'
        },
        {
            title: '武汉动物园',
            position: [114.259137,30.545404],
            address: '蛇山西山坡特1号',
            tel: '027-88875096',
            type: '风景名胜'
        },
        {
            title: '古琴台',
            position: [114.263843, 30.554304],
            address: '琴台大道10号',
            tel: '027-84834187',
            type: '风景名胜'
        },
        {
            title: '归元禅寺',
            position: [114.259137, 30.545404],
            address: '归元寺路20号',
            tel: '027-84841434',
            type: '风景名胜；寺庙道观'
        }
        ];

    for (let i = 0; i < locations.length; i++) {
        let title = locations[i].title;
        let position = locations[i].position;
        let address = locations[i].address;
        let tel = locations[i].tel;
        let type = locations[i].type;
        /* 尝试从别的文件中生成数据再导入数据
        let address;
        let tel;
        let type;
        let placeSearch;
        AMap.service(["AMap.PlaceSearch"], function () {
            placeSearch = new AMap.PlaceSearch({
                city: "武汉"
            });
            placeSearch.search(title, function (status, result) {
                if(status === 'complete' && result.info === 'OK'){
                    let poiArr = result.poiList.pois[0];
                    address = poiArr.address;
                    tel = poiArr.tel || 'null';
                    type = poiArr.type;
                    console.log(title);
                    console.log(address);
                    console.log(tel);
                    console.log(type);
                }
            })
        });
        */
        let marker = new AMap.Marker({
            icon: defaultIcon,
            map: map,
            position: position,
            title: title,
            address: address,
            tel: tel,
            type: type
        });
        markers.push(marker);
        markers[i].setMap(null);

        AMap.event.addListener(marker, 'click', function () {
            infoWindowContent(marker.F.title, marker.F.address, marker.F.tel, marker.F.type);
            infoWindow.open(map, marker.getPosition());
        });
        marker.on('mouseover', function () {
            this.setIcon(highlightedIcon);
        });
        marker.on('mouseout', function () {
            this.setIcon(defaultIcon);
        });
        marker.setAnimation('AMAP_ANIMATION_DROP');
        marker.setMap(map);
    }
    $(function () {
        $.each([$('ul li')], function () {
            $(this).click(function () {
                let place = this.innerHTML;
                $.each(markers, function (i, value) {
                    this.setIcon(defaultIcon);
                    if (place === value.F.title) {
                        value.setAnimation('AMAP_ANIMATION_DROP');
                        value.setIcon(highlightedIcon);
                        infoWindow.open(map, value.getPosition());
                    }
                });
            })
        })
    });


    function infoWindowContent(title, address, tel, type) {
        let content = [];
        let url = ajax(title);
        console.log(url);
        content.push("<img src='"+url+"'>地址" + address);
        content.push("电话：" + tel);
        content.push("类型：" + type);
        console.log(content);
        infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45)
        });
    }

    function createInfoWindow(title, content) {
        let info = document.createElement("div");
        info.className = "info";
        //定义顶部标题
        let top = document.createElement("div");
        let titleD = document.createElement("div");
        let closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "https://webapi.amap.com/images/close2.gif";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        //定义中部内容
        let middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        //定义底部内容
        let bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0';
        bottom.style.margin = '0 auto';
        let sharp = document.createElement("img");
        sharp.src = "https://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }

    function closeInfoWindow() {
        map.clearInfoWindow();
    }
        //map.setFitView();
};

