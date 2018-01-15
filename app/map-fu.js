//map.js
module.exports = function () {
    let map;
    let markers = [];
    let defaultIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
    let highlightedIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png';

    function init() {
        map = new AMap.Map('container', {
            resizeEnable: true,
            zoom:12,
            center: [114.364322, 30.536048]
        });
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
        let locations = [
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
        let fault = [];
        for(let i = 0; i < locations.length; i++){
            //let position = locations[i].position;
            let title = locations[i].title;
            let position = [];
            let address = '';
            let tel = '';
            let type = '';

            fault.push(title);
            let marker = new AMap.Marker({
                icon: defaultIcon,
                map: map,
                position: position,
                title: title,
                address: address,
                tel: tel,
                type: type
            });

            let placeSearch;
            AMap.service(["AMap.PlaceSearch"], function () {
                placeSearch = new AMap.PlaceSearch({
                    city: "武汉"
                });
                placeSearch.search(title, function (status, result) {
                    if(status === 'complete' && result.info === 'OK'){
                        console.log(result);
                        /*
                        let poiArr = result.poiList.pois;
                        address = poiArr.address;
                        tel = poiArr.tel || 'null';
                        type = poiArr.type;
                        position.push(poiArr.location.lng);
                        position.push(poiArr.location.lat);
                        */
                    }
                })
            });
            markers.push(marker);
            markers[i].setMap(null);
            marker.content = '这里是' + title;
            AMap.event.addListener(marker, 'click', function () {
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
            //infoWindowContent(marker);
        }
        $(function () {
            $.each([$('ul li')], function () {
                $(this).click(function () {
                    let place = this.innerHTML;
                    $.each(markers,function (i, value) {
                        this.setIcon(defaultIcon);
                        if(place === value.F.title){
                            value.setAnimation('AMAP_ANIMATION_DROP');
                            value.setIcon(highlightedIcon);
                            infoWindow.open(map, value.getPosition());
                        }
                    });
                })
            })
        });
        let infoWindow = new AMap.InfoWindow();
        //单个marker
        function infoWindowContent(marker) {
            let title = marker.title,
                content = [];
            content.push("<img src='https://tpc.googlesyndication.com/simgad/5843493769827749134'>地址"+marker.address);
            content.push("电话："+marker.tel);
            content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");

            infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: createInfoWindow(title, content.join("<br/>")),
                offset: new AMap.Pixel(16, -45)
            });
        }
        /*
        let title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
            content = [];
        content.push("<img src='https://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
        content.push("电话：010-64733333");
        content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");

        infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45)
        });*/
        /*
        let infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45)
        });*/

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

    }
    init();
};