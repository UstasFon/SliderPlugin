import jquery from 'jquery';

import { getAlbums, getAlbumImages, getImage } from './api';
import { getPhotoIds } from './helper';
import { albumReducer, prevImagesReducer, getPlugin, getAlbumsTape, getView, getPhotos } from './templates';
import index from '../styles/styles.scss';
import { pluginWrapp } from './constants';


class Plugin {
    constructor() {
        this.albumsPageSize = 5;
        this.albumPage = 1;
        this.photoPageSize = 5;
        this.photoPage = 1;
        this.getAlbumsCollection();
        // const bla2 = `<div></div>`;
        // const bla = `<div>${bla2}</div>`;
    }

    getAlbumsCollection() {
        getAlbums()
            .then((data) => {
                this.albums = data.photosets.photoset;

                if (this.albums[0]) {
                    return getAlbumImages(this.albums[0].id);
                }
            })
            .catch(() => {
                alert("We fuck up! Sorry, our best samurai are already fixing the problem")
            })
            .then((album) => {
                this.album = album;
                this.photos = album.photoset.photo;
                console.log(this.photos);
                let photoIds = getPhotoIds(this.photos, this.photoPageSize, this.photoPage);
                return Promise.all(
                    photoIds.map((id) => getImage(id))
                );
            })
            .catch(() => {
                alert("Sorry, damned nakers stole photos from the gallery. But we hired a witcher and he will soon solve the problem");
            })
            .then((data) => {
                this.photosArr = data;
                console.log(this.photosArr);
                const albumsList = this.albums.reduce(albumReducer, '');
                const firstPagePhotos = this.photosArr.slice(0, 5).reduce(prevImagesReducer, '');
                const albumTape =  getAlbumsTape(albumsList);
                const photoTape = getPhotos(firstPagePhotos);
                const view =  getView(this.photosArr[0]);
                const plugin = getPlugin(albumTape, view, photoTape);
                pluginWrapp.innerHTML = plugin;
            })
            .catch(() => {

            })
            .then(this.attachEvents);

    }

    attachEvents() {

    }
}

export const slider = new Plugin();







