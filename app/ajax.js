//ajax.js

module.exports = function (place) {
    function getPhotosFromFlickr () {
        const url = 'https://api.flickr.com/services/rest/';
        const key = '264125a5cd570b52b80d6e6f6983b4a8';
        const params = $.param({
            tags: `${place}`,
            api_key: key,
            method: 'flickr.photos.search',
            format: 'json'
        });
        const endpoint = `${url}?${params}`;
        //window.open(endpoint);
        axios.get(endpoint).then(data => {
            return jsonp(data)
        }).catch(error => {
            console.log(error);
        })
    }
    function jsonp(data) {
        const photos = data.data.substring(14,data.data.length-1);
        let objPho = JSON.parse(photos);
        let infoPho = objPho.photos.photo[0];
        let farm = infoPho.farm;
        let id = infoPho.id;
        let secret = infoPho.secret;
        let server = infoPho.server;
        let url = 'https://farm' + farm + '.staticflickr.com/' + server +
            '/' + id + '_' + secret + '_m.jpg';
        console.log(url);
        return url;
    }
    console.log(getPhotosFromFlickr());
};