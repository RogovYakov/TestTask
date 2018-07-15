'use strict'

class Initializer {
    constructor() {
        this.key = 'AIzaSyAql1YIt3pTs7oZ118o6oP_vMv8ke_H7sI';
        this.videos = [];
        this.filtered = [];
        this.maxResults = 20;
        this.videosOnPage = 5;
        this.currentPage = 1;
    } 

    get numberOfPages() {
        return Math.ceil(this.filtered.length / this.videosOnPage);
    }

    get pageCreator() {
        return this._pageCreator;
    }

    set pageCreator(pageCreator) {
        this._pageCreator = pageCreator;
    }

    get pagination() {
        return this._pagination;
    }

    set pagination(pagination) {
        this._pagination = pagination;
    }

    get filter() {
        return this._filter;
    }

    set filter(filter) {
        this._filter = filter;
    }

    get sorter() {
      return this._sorter;
    }

    set sorter(sorter) {
      this._sorter = sorter;
    }

    createView() {
        this.pageCreator.createPage(this.filtered.slice(0, 5));
        this.pagination.createPagination(this.numberOfPages);
        this.initPagination(this.filtered);
    }

    initPagination(videos) {
        const btns = document.querySelector('.pagination-container').children;
        const self = this;

        [].forEach.call(btns, btn => btn.addEventListener('click', onClick));

        function onClick(event) {
            document.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');

            const start = self.videosOnPage * (event.target.innerHTML - 1);
            const end = start + self.videosOnPage;

            self._pageCreator.createPage(videos.slice(start, end));
        }
        
        if(btns[0]) {
            btns[0].classList.add('active');
        }
    }

    initFilter() {
        const filter = document.querySelector('.filter');
        filter.addEventListener('input', onInput);
        const self = this;

        function onInput() {
            self.filtered = self.filter.filter(filter.value, self.videos);

            self.createView();
        }
    }


    initSorter() {
        const filter = document.querySelector('.filter');
        const sorter = document.querySelector('#sorter');
        sorter.addEventListener('change', onChange.bind(this));

        function onChange() {
            if(sorter.value !== 'none') {
                this.sorter.sort(this.filtered, sorter.value);
            } else {
                this.filtered = this.filter.filter(filter.value, this.videos);
            }

            this.createView();
        }
    }

    initForm() {
        const form = document.querySelector('form');
        form.addEventListener('submit', onSubmit.bind(this));

        function onSubmit(event) {
            event.preventDefault();
            document.querySelector('.filter').value = '';
            document.querySelector('#sorter').value = 'none';

            const toSearch = encodeURIComponent(document.querySelector('.search-string').value);
            const request = `https://www.googleapis.com/youtube/v3/search?part=snippet` 
                    + `&key=${this.key}&q=${toSearch}&type=video&maxResults=${this.maxResults}`;

            fetch(request)
              .then(response => response.json())
              .then(data => {
                      this.videos = [];
                      for(let item of data.items) {
                          this.videos.push(new Video(item));
                      }
                      this.filtered = [].concat(this.videos);
                      this.createView(); 
                    },
                    error => console.log(`Error: ${error.result.error.message}`)
              );
        }
    }
}

const initializer = new Initializer();
const pageCreator = new PageCreator();
const pagination = new Pagination();
const filter = new Filter();
const sorter = new Sorter();

initializer.pageCreator = pageCreator;
initializer.pagination = pagination;
initializer.filter = filter;
initializer.sorter = sorter;

initializer.initForm();
initializer.initFilter();
initializer.initSorter();
