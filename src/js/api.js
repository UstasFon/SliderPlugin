import $ from "jquery";

export let getAlbums = function ({ userId, apiKey }) {
    return $.get("https://www.flickr.com/services/rest",
        {
            method: "flickr.photosets.getList",
            api_key: apiKey,
            user_id: userId,
            format: "json",
            nojsoncallback: "1"
        });
};

export let getAlbumImages = function (id, { userId, apiKey }) {
        return $.get("https://www.flickr.com/services/rest/",
            {
               method: "flickr.photosets.getPhotos",
               api_key: apiKey,
               photoset_id: id,
               user_id: userId,
               format: "json",
               nojsoncallback: "1"
            });
};

export let getImage = function (photoId, { apiKey }) {
    return $.get("https://www.flickr.com/services/rest/?",
        {
            method: "flickr.photos.getSizes",
            api_key: apiKey,
            photo_id: photoId,
            format: "json",
            nojsoncallback: 1
        })
};
