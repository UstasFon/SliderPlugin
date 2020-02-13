export const albumReducer = ((albums, { title: { _content: title }, id: albumID}) => {
    const albumTemplate =
        `<div class="plugin_tape__item">
                <img id="${albumID}" src="../../images/folder.png" alt="" class="tape_item__album">
                <p class="tape_item__name">${title}</p>
         </div>`;
    return  albums + albumTemplate;
});

export const prevImagesReducer = (images, { sizes: { size } }) => {
    const sizeName = 'Small';
    const currentSize =  size.find((elem) => elem.label === sizeName);
    const imageTemplate =
        `<div class="plugin_tape__item">
             <img src="${currentSize.source}" alt="" class="tape_item__image">
         </div>`
    return images + imageTemplate;
};

export const getPlugin = (albumsTape, view, photoTape) => (
    `<div> 
         ${albumsTape}
         ${view}
         ${photoTape}
     </div>`
);

export const getAlbumsTape = (albumsList) => (
    `<div id="" class="plugin_tape">${albumsList}</div>`
);

export const getView = ({ sizes: { size }}) => {
    const fulSizeName = 'Original';
    const currentViewSize = size.find((elem) => elem.label === fulSizeName);
    const viewElement =
        `<div id="view" class="plugin_view">
            <div class="view_wrapper">
                <div class="view_arrow right"></div>
            </div>
            <div class="view_image__wrapper">
                <img src="${currentViewSize.source}" alt="" class="view_image">
            </div>
            <div class="view_wrapper">
                <div class="view_arrow left"></div>
            </div>
        </div>`;

    return viewElement;
};

export const getPhotos = (firstPagePhotos) => (
    `<div id="image" class="plugin_tape">${firstPagePhotos}</div>`
);