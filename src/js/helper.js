import $ from "jquery";

export let getPhotoIds = function (arr, size, page) {
    let firstIndex = size * page - 1;
    let lastIndex = size * (page + 1) - 1;
    let pagePhoto = [];

    for (let i = firstIndex; i < lastIndex; i++ ) {
       pagePhoto.push(arr[i].id);
    }

    return pagePhoto;
};

// TODO - add reducers here example 'albumsReduces' which will be first param for deduce method
// TODO - move functions with templates to separate file templates.js

// export const photos = albums.reduce((item) =>
//     (`<img src="${item.url}" alt="" class="tape_item__album">`)
// );

