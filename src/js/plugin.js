import jquery from 'jquery';

import { getAlbums, getAlbumImages, getImage } from './api';
import { getPhotoIds, albumReducer } from './helper';
import index from '../styles/styles.scss';


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
                let photoIds = getPhotoIds(this.photos, this.photoPageSize, this.photoPage);
                return Promise.all(
                    photoIds.map((id) => getImage(id))
                );
            })
            .catch(() => {
                alert("Sorry, damned nakers stole photos from the gallery. But we hired a witcher and he will soon solve the problem");
            })
            .then((data) => {
                const albumsList = this.albums.reduce(albumReducer, '');
                console.log(albumsList);
            });
    }
}

export const slider = new Plugin();







