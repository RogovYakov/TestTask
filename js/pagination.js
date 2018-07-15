'use strict'
class Pagination {
    createPagination(numberOfPages) {
        const container = document.querySelector('.pagination-container');
        const length = container.children.length;
        
        for(let i = 0; i < length; i++) {
            container.firstElementChild.remove();
        }

        if(numberOfPages === 1) {
            return;
        }
        
        for(let i = 0; i < numberOfPages; i++) {
            const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.innerHTML = `${i + 1}`;
            btn.classList.add('page-btn');
            
            container.appendChild(btn);
        }
    }
}