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
        let infoWindow = new AMap.InfoWindow();

        for(let i = 0; i < locations.length; i++){
            let position = locations[i].position;
            let title = locations[i].title;
            fault.push(title);
            let marker = new AMap.Marker({
                icon: defaultIcon,
                map: map,
                position: position,
                title: title
            });
            markers.push(marker);
            markers[i].setMap(null);
            marker.content = '这里是' + title;
            marker.on('click', function () {
                detailInformation(marker, infoWindow);
            });
            //marker.on('click', markerClick);
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
            $.each([$('ul li')], function (index, data) {
                $(this).click(function (event) {
                    let place = this.innerHTML;
                    $.each(markers,function (i, value) {
                        this.setIcon(defaultIcon);
                        if(place === value.F.title){
                            value.setAnimation('AMAP_ANIMATION_DROP');
                            value.setIcon(highlightedIcon);
                            infoWindow.setContent(value.content);
                            infoWindow.open(map, value.getPosition());
                        }
                    });
                })
            })
        });

        function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }


        function detailInformation(marker, infowindow) {
            if (infowindow.marker !== marker){
                infowindow.setContent('');
                infowindow.marker = marker;

                let title = marker.title, content = [];
                content.push("<img src='90sheji_linggan_13091671.png'>地址：武汉");
                content.push("电话：010-64733333");
                let Options = {
                    isCustom: true,
                    content: createInfoWindow(title, content.join("<br />")),
                    offset: new AMap.Pixel(16, -45)
                };
                infowindow.setContent(Options);
            }

            infowindow.open(map, marker);
        }

        function createInfoWindow(title, content) {
            let info = document.createElement("div");
            info.className = "info";

            //定义顶部标题
            var top = document.createElement("div");
            var titleD = document.createElement("div");
            var closeX = document.createElement("img");
            top.className = "info-top";
            titleD.innerHTML = title;
            closeX.src = "https://webapi.amap.com/images/close2.gif";
            closeX.onclick = closeInfoWindow;

            top.appendChild(titleD);
            top.appendChild(closeX);
            top.appendChild(top);

            //定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.style.backgroundColor = 'white';
            middle.innerHTML = content;
            info.appendChild(middle);

            //定义底部内容
            var bottom = document.createElement("div");
            bottom.className = "info-bottom";
            bottom.style.position = 'relative';
            bottom.style.top = '0';
            bottom.style.margin = '0 auto';
            var sharp = document.createElement("img");
            sharp.src = "https://webapi.amap.com/images/sharp.png";
            bottom.appendChild(sharp);
            info.appendChild(bottom);
            return info;
        }

        function closeInfoWindow() {
            map.clearInfoWindow();
        }
        map.setFitView();

    }
    init();
};