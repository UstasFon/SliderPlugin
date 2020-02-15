import {pluginName} from "./constants";

export const albumReducer = ((albums, { title: { _content: title }, id: albumID}) => {
    const albumTemplate =
        `<div album-id="${albumID}" class="plugin_tape__item">
                <p class="tape_item__name">${title}</p>
         </div>`;
    return  albums + albumTemplate;
});

export const prevImagesReducer = (images, { sizes, id: photoId  }) => {
    const sizeName = 'Small';
    const currentSize =  sizes.find((elem) => elem.label === sizeName);
    const imageTemplate =
        `<div photo-id="${photoId}" class="plugin_tape__item">
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

export const getAlbumsTape = (albumsList, pluginName) => (
    `<div id="${pluginName}Album" class="plugin_tape">${albumsList}</div>`
);

export const getView = ({ sizes }, pluginName) => {
    const fulSizeName = 'Original';
    //TODO - move this shit(fulSizeName) to global const
    const currentViewSize = sizes.find((elem) => elem.label === fulSizeName);
    const viewElement =
        `<div id="view" class="plugin_view">
            <div class="view_wrapper">
                <div id="${pluginName}ArrowLeft" class="view_arrow left"></div>
            </div>
            <div class="view_image__wrapper">
                <img src="${currentViewSize.source}" alt="" class="view_image">
            </div>
            <div class="view_wrapper">
                <div id="${pluginName}ArrowRight" class="view_arrow right"></div>
            </div>
        </div>`;

    return viewElement;
};

export const getPhotos = (firstPagePhotos, pluginName) => (
    `<div id="${pluginName}Images" class="plugin_tape">${firstPagePhotos}</div>`
);
