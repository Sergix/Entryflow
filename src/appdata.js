import Vue from 'vue'
import fs from 'fs'
import jf from 'jsonfile'
import sidebar from './vue/sidebar'
import editor from './vue/editor'
import open from './vue/open'
const { app, dialog } = require('electron').remote

jf.spaces = 4

const appData = app.getPath('appData')
const appPath = appData + '\\Entryflow'
const projectFile = appPath + '\\project.json'
let jsonData = {'open_project': null, 'projects': []}

const exportAppData = () => {
  jf.writeFileSync(projectFile, jsonData)
}

const createAppData = () => {
  fs.mkdirSync(appPath)

  jf.writeFileSync(projectFile, jsonData)
}

const checkAppData = () => {
  if (!fs.existsSync(appPath)) createAppData()

  jsonData = jf.readFileSync(projectFile)
  open.data.projects = jsonData.projects

  if (jsonData.open_project !== null) {
    returnToEditor()

    for (let i = 0; i < jsonData.projects.length; i++) {
      if (jsonData.projects[i].project_name === jsonData.open_project) {
        editor.data.project = jsonData.projects[i]
        sidebar.data.project_name = jsonData.projects[i].project_name
        sidebar.methods.generateFileList()
        break
      }
    }
  } else {
    selectOption()
  }
}

const setAppProject = (dir) => {
  jsonData.open_project = dir
  nextLoaderPage(0)
}

const newProject = (settings) => {
  jsonData.projects.push(settings)
  jsonData.open_project = settings.project_name
  editor.data.project = settings
  exportAppData()
  checkAppData()
}