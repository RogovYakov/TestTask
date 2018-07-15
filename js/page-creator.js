'use strict'
class PageCreator {
    createPage(videos) {
        const templ = document.querySelector('#video-template');
        const container = document.querySelector('.page-container');
        
        if(videos.length === 0) {
            container.replaceChild(document.querySelector('#not-found').content.cloneNode(true),
                container.firstElementChild);
            return;
        }

        const page = document.createElement('article');
        page.classList.add('page');

        for(let video of videos) {
            const link = `https://www.youtube.com/watch?v=${video.id}`;
            const content = templ.content.cloneNode(true);

            content.querySelector('a').setAttribute('href', link);
            content.querySelector('img').setAttribute('src', video.thumbnail);
            content.querySelector('span').innerHTML = video.title;

            page.appendChild(content);
        }

        if(container.firstElementChild === null) {
            container.appendChild(page);
        } else {
            container.replaceChild(page, container.firstElementChild);
        }
    }
}