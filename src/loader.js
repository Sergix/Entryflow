import Vue from 'vue'
import open from './vue/open'
import select from './vue/select'
import editor from './vue/editor'
import loader_open from './vue/loader_open'
import loader_changelog from './vue/loader_changelog'
import loader_docs from './vue/loader_docs'
import loader_save from './vue/loader_save'

const loader_page1 = new Vue(loader_open)
const loader_page2 = new Vue(loader_changelog)
const loader_page3 = new Vue(loader_docs)
const loader_page4 = new Vue(loader_save)

const returnToEditor = () => {
  new Vue(editor).$mount('#content')
  if (!$('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
  feather.replace()
}

const openProject = () => {
  new Vue(open).$mount('#content')
  if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
  feather.replace()
}

const selectOption = () => {
  new Vue(select).$mount('#content')
  if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
}

const nextLoaderPage = (page) => {
  switch (page) {
    case 0:
      loader_page1.$mount('#content')
      if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
      break
    case 1:
      loader_page2.$mount('#content')
      break
    case 2:
      loader_page3.$mount('#content')
      break
    case 3:
      loader_page4.$mount('#content')
      break
    default:
      break
  }
}
