'use strict'
class Filter {
    filter(query, videos) {
        const filtered = [];

        for(let video of videos) {
            if(video.title.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(video);
            }
        }

        return filtered;
    }
}