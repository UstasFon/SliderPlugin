import jquery from 'jquery';

import { getAlbums, getAlbumImages, getImage } from './api';
import { albumReducer, prevImagesReducer, getPlugin, getAlbumsTape, getView, getPhotos, getAlbumsSelect } from './templates';
import index from '../styles/styles.scss';
import { PLUGIN_WRAP, PLUGIN_NAME, FUL_SIZE_NAME, DISABLE_ARROW } from './constants';

export default class Plugin{
    constructor(params = {}) {
        this.apiKey = "5de920292755500b8a793e755f255045";
        this.userId = "186386015@N03";

        if (!params.userId && !params.apiKey) alert("You didn't enter actual params. Plugin wil use default params");

        Object.assign(this, params);
        this.getAlbumsCollection();
    }

    getAlbumsCollection(albumId) {
        getAlbums(this)
            .then(((data) => {
                this.albums = data.photosets.photoset;
                const selectedAlbumIndex = this.albums.findIndex(elem => albumId === elem.id);
                const albumIndex = (selectedAlbumIndex !== -1) ? selectedAlbumIndex : 0;

                if (this.albums[albumIndex]) return getAlbumImages(this.albums[albumIndex].id, this);
            }).bind(this))
            .catch(() => console.error("We fuck up! Sorry, our best samurai are already fixing the problem"))
            .then(((album) => {
                this.album = album;
                this.photos = album.photoset.photo;
                let photoIds = this.photos.map(elem => elem.id);

                return Promise.all(
                    photoIds.map((id) => getImage(id, this))
                );
            }).bind(this))
            .catch(() => console.error("Sorry, damned nakers stole photos from the gallery. But we hired a witcher and he will soon solve the problem"))
            .then(((data) => {
                this.photos = this.photos.map((elem, i) => {
                    elem.sizes = data[i].sizes.size;
                    return elem;
                });
                const albumsList = this.albums.reduce(albumReducer, '');
                const albumsSelect = getAlbumsSelect(this.albums);
                const firstPagePhotos = this.photos.reduce(prevImagesReducer, '');
                const albumTape = getAlbumsTape(albumsList, PLUGIN_NAME);
                const photoTape = getPhotos(firstPagePhotos, PLUGIN_NAME);
                const view = getView(this.photos[0], PLUGIN_NAME, FUL_SIZE_NAME);
                const plugin = getPlugin(albumTape, view, photoTape, albumsSelect);
                let pluginWrap = document.querySelector(PLUGIN_WRAP);
                pluginWrap.innerHTML = plugin;
                this.viewImage = document.querySelector('.view_image');
                const viewPhotoId = this.photos[0].id;
                this.currentPhotoIndex = this.photos.findIndex(elem => elem.id === viewPhotoId);
                this.leftArrowWraper = document.getElementById(`${PLUGIN_NAME}ArrowLeftWrapper`)
                this.rightArrowWraper = document.getElementById(`${PLUGIN_NAME}ArrowRightWrapper`)
            }).bind(this))
            .catch(() => console.error())
            .then(this.attachEvents.bind(this));

    }

    attachEvents() {
        let albumsTapeName = `${PLUGIN_NAME}Album`;
        let imagesTapeName = `${PLUGIN_NAME}Images`;
        let viewLeftArrowName = `${PLUGIN_NAME}ArrowLeft`;
        let viewRightArrowName = `${PLUGIN_NAME}ArrowRight`;
        let selectAlbumName = `${PLUGIN_NAME}SelectAlbum`;
        let albumTape = document.getElementById(albumsTapeName);
        let imagesTape = document.getElementById(imagesTapeName);
        let leftArrow = document.getElementById(viewLeftArrowName);
        let rightArrow = document.getElementById(viewRightArrowName);
        let selectAlbums = document.getElementById(selectAlbumName);
        selectAlbums.onchange = this.selectedAlbumDropDown.bind(this);
        leftArrow.onclick = this.previousImage.bind(this);
        rightArrow.onclick = this.nextImage.bind(this);
        albumTape.onclick = this.selectedAlbum.bind(this);
        imagesTape.onclick = this.selectedImage.bind(this);
    };

    selectedAlbumDropDown({ target: { value }}) {
        this.getAlbumsCollection(value);
    }

    selectedAlbum({target}) {
        const albumId = target.getAttribute('album-id') || (target.parentElement && target.parentElement.getAttribute('album-id'));

        if (albumId) this.getAlbumsCollection(albumId);
    }

    previousImage() {
        if (this.currentPhotoIndex === 1)  {
            this.toggleArrowClass(this.leftArrowWraper);
        } else {
            if (this.rightArrowWraper.classList.contains(DISABLE_ARROW)) {
                this.toggleArrowClass(this.rightArrowWraper)
            }
        }
        const nextPhoto = this.photos[this.currentPhotoIndex - 1];
        const nextPhotoId = nextPhoto.id;
        this.updateView(nextPhotoId);
    }

    nextImage() {
        if (this.currentPhotoIndex === (this.photos.length - 2)) {
            this.toggleArrowClass(this.rightArrowWraper);
        } else {
            if (this.leftArrowWraper.classList.contains(DISABLE_ARROW)) {
                this.toggleArrowClass(this.leftArrowWraper);
            }
        }
        const nextPhoto = this.photos[this.currentPhotoIndex + 1];
        const nextPhotoId = nextPhoto.id;
        this.updateView(nextPhotoId);
    }

    selectedImage({target}) {
        const photoId = target.getAttribute('photo-id') || (target.parentElement && target.parentElement.getAttribute('photo-id'));

        if (photoId) {
            this.updateView(photoId);
            const isFirstElem = this.currentPhotoIndex === 0;
            const isLastElem = this.currentPhotoIndex === this.photos.length - 1;
            const isLeftArrowEnabled = !this.leftArrowWraper.classList.contains(DISABLE_ARROW);
            const isRightArrowEnabled = !this.rightArrowWraper.classList.contains(DISABLE_ARROW);

            if (isFirstElem) {
                if (isLeftArrowEnabled)  this.toggleArrowClass(this.leftArrowWraper);
                if (!isRightArrowEnabled) this.toggleArrowClass(this.rightArrowWraper);
            }

            if (isLastElem) {
                if (!isLeftArrowEnabled)  this.toggleArrowClass(this.leftArrowWraper);
                if (isRightArrowEnabled) this.toggleArrowClass(this.rightArrowWraper);
            }

            if (!isFirstElem && !isLastElem) {
                if (!isLeftArrowEnabled)  this.toggleArrowClass(this.leftArrowWraper);
                if (!isRightArrowEnabled) this.toggleArrowClass(this.rightArrowWraper);
            }
        }
    }

    updateView(photoId) {
        const selectedPhotoUrl =
            this.photos
                .find(elem => photoId === elem.id).sizes
                .find(elem => elem.label === FUL_SIZE_NAME).source;
        this.viewImage.setAttribute('src', selectedPhotoUrl);
        this.viewImage.setAttribute('image-id', photoId);
        this.currentPhotoIndex = this.photos.findIndex(elem => elem.id === photoId);
    }

    toggleArrowClass(arrow) {
        arrow.classList.toggle(DISABLE_ARROW);
    };
}







