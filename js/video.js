'use strict'
class Video {
    constructor(video) {
        this._id = video.id.videoId;
        this._title = video.snippet.title;
        this._thumbnail = video.snippet.thumbnails.default.url;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get thumbnail() {
        return this._thumbnail;
    }
}