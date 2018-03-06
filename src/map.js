//map.js
import ajax from './ajax.js'
import data from './data.js'

let markers = [];
let map = new AMap.Map('container', {
    resizeEnable: true,
    zoom:12,
    center: [114.364322, 30.596048],
    offset: new AMap.Pixel(0,0)
});
let defaultIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
let highlightedIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png';

/**
 * descriptiong: request data and create information window
 * @param title
 * @param address
 * @param tel
 * @param type
 * @param position
 */
function infoWindowContent(title, address, tel, type, position) {
    let content = [];
    ajax(title, function (data) {
        content.push("<img src='" + data + "'>");
        contentCreate(content, title, address, tel, type, position);
    }, function (error) {
        content.push("图片：" + error);
        contentCreate(content, title, address, tel, type, position);
    });
}

/**
 * description: create the context in the information window
 * @param content
 * @param title
 * @param address
 * @param tel
 * @param type
 * @param position
 */
function contentCreate(content, title, address, tel, type, position) {
    content.push("地址" + address);
    content.push("电话：" + tel);
    content.push("类型：" + type);
    let infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
    });
    infoWindow.open(map, position);
}

/**
 * description: define the style of information window
 * @param title
 * @param content
 * @returns {HTMLDivElement}
 */
function createInfoWindow(title, content) {
    let info = document.createElement("div");

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

/**
 * description: close the information window
 */
function closeInfoWindow() {
    map.clearInfoWindow();
}

module.exports = function () {
    map.plugin(["AMap.ToolBar"], function () {
        map.addControl(new AMap.ToolBar());
    });
    let locations = data;
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
        marker.on('click', function () {
            infoWindowContent(marker.F.title, marker.F.address, marker.F.tel, marker.F.type, marker.F.position);
        });
        marker.on('mouseover', function () {
            $.each(markers, function (index, value) {
                value.setIcon(defaultIcon);
            });
            this.setIcon(highlightedIcon);
        });
        marker.on('mouseout', function () {
            this.setIcon(defaultIcon);
        });
        marker.setAnimation('AMAP_ANIMATION_DROP');/*给marker添加动画*/
        marker.setMap(map);
    }
};

module.exports.Map = map;
module.exports.Markers = markers;
module.exports.DefaultIcon = defaultIcon;
module.exports.HighlightedIcon = highlightedIcon;
module.exports.InfoWinCon = infoWindowContent;