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

export const albumReducer = ((albums, { title: { _content: title } }) => {
    const albumTemplate =
        `<div class="plugin_tape__item">
                            <img src="" alt="" class="tape_item__album">
                            <p class="tape_item__name">${title}</p>
                         </div>`;
    return  albums + albumTemplate;
});

// TODO - add reducers here example 'albumsReduces' which will be first param for deduce method
// TODO - move functions with templates to separate file templates.js
export const getPlugin = (albumsTape, view, photoTape) => (
    `<div> 
         ${albumsTape}
         ${view}
         ${photoTape}
     </div>`
);

export const getAlbums = (albumsArr) => (
  `<div id="album" class="plugin_tape">${albumsArr}</div>`
);

export const getView = (selectedImageUrl) => (
    `<div id="view" class="plugin_view">
        <div class="view_wrapper">
            <div class="view_arrow right"></div>
        </div>
        <div class="view_image__wrapper">
            <img src="${selectedImageUrl}" alt="" class="view_image">
        </div>
        <div class="view_wrapper">
            <div class="view_arrow left"></div>
        </div>
    </div>`
);

export const getPhotos = (photosArr) => (
  `<div id="image" class="plugin_tape">${imagesArr}</div>`
);

// export const photos = albums.reduce((item) =>
//     (`<img src="${item.url}" alt="" class="tape_item__album">`)
// );

