import fs from 'fs';
import jf from 'jsonfile';
import sidebar from './vue/sidebar';
const { app, dialog } = require('electron').remote;

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
        editor.project_dir = loader.project_dir = jsonData.project;
        sidebar.methods.openProjectDir();
    } else {
        let path = dialog.showOpenDialog({
            title: 'Select Project Directory',
            buttonLabel: 'Use',
            properties: ['openDirectory']
        });

        setAppProject(path !== undefined ? path[0] : null);
    }
};

const setAppProject = (dir) => {
    jsonData.project = dir;
    $('#wrapper').toggleClass('toggled');

    nextLoaderPage(0);
};