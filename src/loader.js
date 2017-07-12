import Vue from 'vue';
import loader_open from './vue/loader_open';
import loader_changelog from './vue/loader_changelog';
import loader_docs from './vue/loader_docs';
import loader_save from './vue/loader_save';

const loader_page1 = new Vue(loader_open);
const loader_page2 = new Vue(loader_changelog);
const loader_page3 = new Vue(loader_docs);
const loader_page4 = new Vue(loader_save);

const nextLoaderPage = (page) => {
    switch (page) {
        case 0:
            loader_page1.$mount('#loader');
            break;
        case 1:
            loader_page2.$mount('#loader');
            break;
        case 2:
            loader_page3.$mount("#loader");
            break;
        case 3:
            loader_page4.$mount("#loader");
        default:
            break;
    }
}