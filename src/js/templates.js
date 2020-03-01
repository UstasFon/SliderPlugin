// TODO -  rename DISABLE_ARROW to DISABLE_ARROW_CLASS
import { PLUGIN_NAME, DISABLE_ARROW } from "./constants";

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

export const getPlugin = (albumsTape, view, photoTape, albumSelect) => (
    `<div>
         ${albumSelect}
         ${albumsTape}
         ${view}
         ${photoTape}
     </div>`
);

export const getAlbumsTape = (albumsList, pluginName) => (
    `<div id="${pluginName}Album" class="plugin_tape__album">${albumsList}</div>`
);

export const getView = ({ sizes }, pluginName, FUL_SIZE_NAME) => {
    const currentViewSize = sizes.find((elem) => elem.label === FUL_SIZE_NAME);
    const viewElement =
        `<div id="view" class="plugin_view">
            <div id="${PLUGIN_NAME}ArrowLeftWrapper" class="view_wrapper__left ${DISABLE_ARROW}">
                <div id="${PLUGIN_NAME}ArrowLeft" class="view_arrow left"></div>
            </div>
            <div class="view_image__wrapper">
                <img src="${currentViewSize.source}" alt="" class="view_image">
            </div>
            <div id="${PLUGIN_NAME}ArrowRightWrapper" class="view_wrapper__right">
                <div id="${PLUGIN_NAME}ArrowRight" class="view_arrow right"></div>
            </div>
        </div>`;

    return viewElement;
};

export const getPhotos = (firstPagePhotos) => (
    `<div id="${PLUGIN_NAME}Images" class="plugin_tape__photo">${firstPagePhotos}</div>`
);


export const getAlbumsSelect = (albums) => {
    let albumsReducer =  (options, { title: {_content: title }, id: albumID})=> {
        const option =
        `<option value="${albumID}">
            <p class="tape_item__name">${title}</p>
         </option>`;

        return options + option;
    };
    const albumsList = albums.reduce(albumsReducer, '');
    const albumSelect =
        `<select id="${PLUGIN_NAME}SelectAlbum" class="plugin_tape__album-select">
             ${albumsList}
        </select>`;



    return albumSelect;
};