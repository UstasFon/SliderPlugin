import jquery from 'jquery';

import { getAlbums, getAlbumImages, getImage } from './api';
import { getPhotoIds } from './helper';
import { albumReducer, prevImagesReducer, getPlugin, getAlbumsTape, getView, getPhotos } from './templates';
import index from '../styles/styles.scss';
import { PLUGIN_WRAP, PLUGIN_NAME } from './constants';


class Plugin {
    constructor() {
        this.albumsPageSize = 5;
        this.albumPage = 1;
        this.photoPageSize = 5;
        this.photoPage = 1;
        this.getAlbumsCollection();
    }

    getAlbumsCollection(albumId) {
        getAlbums()
            .then(((data) => {
                this.albums = data.photosets.photoset;
                const selectedAlbumIndex = this.albums.findIndex(elem => albumId === elem.id);
                const albumIndex = (selectedAlbumIndex !== -1) ? selectedAlbumIndex : 0;

                if (this.albums[albumIndex]) {
                    return getAlbumImages(this.albums[albumIndex].id);
                }
            }).bind(this))
            .catch(() => {
                console.error("We fuck up! Sorry, our best samurai are already fixing the problem")
            })
            .then(((album) => {
                this.album = album;
                this.photos = album.photoset.photo;
                let photoIds = this.photos.map(elem => elem.id);
                return Promise.all(
                    photoIds.map((id) => getImage(id))
                );
            }).bind(this))
            .catch(() => {
                console.error("Sorry, damned nakers stole photos from the gallery. But we hired a witcher and he will soon solve the problem");
            })
            .then(((data) => {
                this.photos = this.photos.map((elem, i) => {
                    elem.sizes = data[i].sizes.size;
                    return elem;
                });
                const albumsList = this.albums.reduce(albumReducer, '');
                const firstPagePhotos = this.photos.reduce(prevImagesReducer, '');
                const albumTape =  getAlbumsTape(albumsList, PLUGIN_NAME);
                const photoTape = getPhotos(firstPagePhotos, PLUGIN_NAME);
                const view =  getView(this.photos[0], PLUGIN_NAME);
                const plugin = getPlugin(albumTape, view, photoTape);
                let pluginWrap = document.querySelector(PLUGIN_WRAP);
                pluginWrap.innerHTML = plugin;
                this.viewImage = document.querySelector('.view_image');
            }).bind(this))
            .catch(() => {
                console.error();
            })
            .then(this.attachEvents.bind(this));

    }

    attachEvents() {
        let albumsTapeName = `${PLUGIN_NAME}Album`;
        let imagesTapeName = `${PLUGIN_NAME}Images`;
        let viewLeftArrowName = `${PLUGIN_NAME}ArrowLeft`;
        let viewRightArrowName = `${PLUGIN_NAME}ArrowRight`;
        let albumTape = document.getElementById(albumsTapeName);
        let imagesTape = document.getElementById(imagesTapeName);
        let leftArrow = document.getElementById(viewLeftArrowName);
        let rightArrow = document.getElementById(viewRightArrowName);
        leftArrow.onclick = this.previousImage.bind(this);
        rightArrow.onclick = this.nextImage.bind(this);
        albumTape.onclick = this.selectedAlbum.bind(this);
        imagesTape.onclick = this.selectedImage.bind(this);
    };

    selectedAlbum({ target }) {
        const albumId = target.getAttribute('album-id') || (target.parentElement && target.parentElement.getAttribute('album-id'));

        if (albumId) this.getAlbumsCollection(albumId);
    }

    previousImage() {

    }

    nextImage() {

    }

    selectedImage({ target }) {
        const photoId = target.getAttribute('photo-id') || (target.parentElement && target.parentElement.getAttribute('photo-id'));

        if (photoId) this.updateView(photoId);
    }

    updateView(photoId) {
        const fulSizeName = 'Original';
        //TODO - move this shit(fulSizeName) to global const
        const selectedPhotoUrl =
            this.photos
                .find(elem => photoId === elem.id).sizes
                .find(elem => elem.label === fulSizeName).source;
        this.viewImage.setAttribute('src', selectedPhotoUrl);
    }
}


export const slider = new Plugin();







