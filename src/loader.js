import Vue from 'vue'
import open from './vue/open'
import select from './vue/select'
import editor from './vue/editor'
import settings from './vue/settings'
import github_login from './vue/github_login'
import loader_open from './vue/loader_open'
import loader_changelog from './vue/loader_changelog'
import loader_docs from './vue/loader_docs'
import loader_save from './vue/loader_save'

const loader_page1 = new Vue(loader_open)
const loader_page2 = new Vue(loader_changelog)
const loader_page3 = new Vue(loader_docs)
const loader_page4 = new Vue(loader_save)

const setEditor = () => {
  editor.data.file_editor = ace.edit("file-editor")
  editor.data.file_editor.setTheme("ace/theme/iplastic")
  editor.data.file_editor.getSession().setUseSoftTabs(true)
  editor.data.file_editor.$blockScrolling = Infinity
}

const returnToEditor = () => {
  new Vue(editor).$mount('#content')
  if (!$('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
  setEditor()
  document.getElementById("file-editor").addEventListener("keydown", editor.methods.keyCheck)
  feather.replace()
}

const openProject = () => {
  new Vue(open).$mount('#content')
  if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
  feather.replace()
}

const openSettings = () => {
  new Vue(settings).$mount('#content')
  if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
}

const selectOption = () => {
  new Vue(select).$mount('#content')
  if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
}

const openLogin = () => {
  new Vue(github_login).$mount('#content')
  if ($('#wrapper').hasClass('toggled')) $('#wrapper').toggleClass('toggled')
}

const nextLoaderPage = (page, redir) => {
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
