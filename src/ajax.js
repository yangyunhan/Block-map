//ajax.js
//module.exports = function(place, callback){}
module.exports = function getPhotosFromFlickr (place, callback1, callback2) {
    const url = 'https://api.flickr.com/services/rest/';
    const key = '264125a5cd570b52b80d6e6f6983b4a8';
    const params = $.param({
        tags: `${place}`,
        api_key: key,
        method: 'flickr.photos.search',
        format: 'json'
    });
    const endpoint = `${url}?${params}`;
    axios.get(endpoint).then(data => {
        callback1(jsonp(data));
        /*
        const error = new Error(data.data.description);
        error.data = data.data;
        error.response = data;
        console.log(error);*/
    }).catch(function(){
        callback2(noImg());
        //console.log(typeof error);
        //console.log(error);
    });

    function jsonp(data) {
        let photos = data.data.substring(14,data.data.length-1);
        let objPho = JSON.parse(photos);
        let infoPho = objPho.photos.photo[1];
        let farm = infoPho.farm;
        let id = infoPho.id;
        let secret = infoPho.secret;
        let server = infoPho.server;
        return 'https://farm' + farm + '.staticflickr.com/' + server +
            '/' + id + '_' + secret + '_m.jpg';
    }
    function noImg() {
        return '没有相关的图片';
    }
};