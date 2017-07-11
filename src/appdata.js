import fs from 'fs';
import jf from 'jsonfile';
import sidebar from './vue/sidebar';
const { app } = require('electron').remote;

jf.spaces = 4;

const appData = app.getPath("appData");
const appPath = appData + '\\Entryflow';
const projectFile = appPath + '\\project.data';
let jsonData = {"project": null};

const exportAppData = () => {
    jf.writeFileSync(projectFile, jsonData);
};

const createAppData = () => {
    fs.mkdirSync(appPath);

    jf.writeFileSync(projectFile, jsonData);
};

const checkAppData = () => {
    if (!fs.existsSync(appPath))
        createAppData();

    jsonData = jf.readFileSync(projectFile);

    if (jsonData.project !== null) {
        editor.project_dir = jsonData.project;
        sidebar.methods.openProjectDir();
    }
};

const setAppProject = (dir) => {
    jsonData.project = dir;
    exportAppData();
};