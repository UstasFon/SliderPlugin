import $ from "jquery";

const apiKey = "5de920292755500b8a793e755f255045";

export let getAlbums = function () {
    return $.get("https://www.flickr.com/services/rest",
        {
            method: "flickr.photosets.getList",
            api_key: apiKey,
            user_id: "186386015@N03",
            format: "json",
            nojsoncallback: "1"
        });
};

export let getAlbumImages = function (id) {
        return $.get("https://www.flickr.com/services/rest/",
            {
               method: "flickr.photosets.getPhotos",
               api_key: apiKey,
               photoset_id: id,
               user_id: "186386015@N03",
               format: "json",
               nojsoncallback: "1"
            });
};

export let getImage = function (photoId) {
    return $.get("https://www.flickr.com/services/rest/?",
        {
            method: "flickr.photos.getSizes",
            api_key: apiKey,
            photo_id: photoId,
            format: "json",
            nojsoncallback: 1
        })
};
