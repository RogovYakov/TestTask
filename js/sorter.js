'use strict'
class Sorter {
    sort(videos, order) {
        videos.sort((first, second) => {
            const firstTitle = first.title.toLowerCase();
            const secondTitle =  second.title.toLowerCase();

            if(firstTitle > secondTitle) {
                return 1;
            }

            if(firstTitle < secondTitle) {
                return -1;
            }

            return 0;
        });
        
        if(order == 'desc') {
            videos.reverse();
        }
    }
}