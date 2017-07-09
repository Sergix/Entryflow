<template>
<div id="sidebar-wrapper">
    <ul id="sidebar-list" class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="#" v-on:click="openProjectDialog">
                <i data-feather="folder"></i>
                Load Project
            </a>
        </li>
        <li id="sidebar-icons" class="row">
            <a v-on:click="settings" href="#"><i data-feather="settings"></i></a>
            <a v-on:click="openGithubSite" href="#"><i data-feather="github"></i></a>
        </li>
        <li v-for="file in project_files" v-bind:key="file"><a v-on:click="openProjectFile" href="#">{{ file }}</a></li>
    </ul>
</div>
</template>

<script>
import Editor from './editor';
import fs from 'fs';
const { dialog, shell } = require('electron').remote;

export default {
    name: 'sidebar',
    data: {
        project_dir: '',
        project_files: []
    },
    methods: {
        openProjectDialog: (event) => {
            let path = dialog.showOpenDialog({
                title: 'Select Project Directory',
                buttonLabel: 'Use',
                properties: ['openDirectory']
            });
            sidebar.project_dir = path !== undefined ? path[0] : null;

            sidebar.openProjectDir();
        },

        openGithubSite: (event) => {
            shell.openExternal('https://github.com/Sergix/Entryflow');
        },
        
        settings: (event) => {

        },

        openProjectDir: () => {
            if (sidebar.project_dir === null || sidebar.project_dir === undefined || sidebar.project_dir === '')
                return undefined;
                      
            fs.readdir(sidebar.project_dir, function (err, files) {
                if (err !== null)
                    return 0;

                for (let i = 0; i < files.length; i++)
                    sidebar.project_files.push(files[i]);
            });
        },

        openProjectFile: (event) => {
            fs.readFile(
                sidebar.project_dir + "\\" + event.toElement.text,
                'utf8',
                function (err, data) {
                    editor.input = data;
            });
        }
    }
}
</script>
