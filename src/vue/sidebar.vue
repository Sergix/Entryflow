<template>
<div id="sidebar-wrapper">
    <ul id="sidebar-list" class="sidebar-nav">
        <li id="sidebar-icons" class="row">
            <a v-on:click="settings" href="#"><i data-feather="settings"></i></a>
            <a v-on:click="github" href="#"><i data-feather="github"></i></a>
        </li>
        <li class="sidebar-brand">
            <a href="#" v-on:click="openProjectDialog">
                <i data-feather="folder"></i>
                Load Project
            </a>
        </li>

        <li v-for="file in project_files" v-bind:key="file"><a v-on:click="openProjectFile" href="#">{{ file }}</a></li>
    </ul>
</div>
</template>

<script>
import editor from './editor';
import fs from 'fs';
const { dialog, shell } = require('electron').remote;

export default {
    name: 'sidebar',
    data: {
        project_files: []
    },
    methods: {
        openProjectDialog: (event) => {
            let path = dialog.showOpenDialog({
                title: 'Select Project Directory',
                buttonLabel: 'Use',
                properties: ['openDirectory']
            });
            editor.data.project_dir = path !== undefined ? path[0] : null;

            setAppProject(editor.data.project_dir);

            sidebar.openProjectDir();
        },

        github: (event) => {
            shell.openExternal('https://github.com/Sergix/Entryflow');
        },
        
        settings: (event) => {

        },

        openProjectDir: () => {
            if (editor.data.project_dir === null || editor.data.project_dir === undefined || editor.data.project_dir === '')
                return undefined;

            fs.readdir(editor.data.project_dir, (err, files) => {
                if (err)
                    return 0;

                sidebar.project_files = [];

                for (let i = 0; i < files.length; i++) {
                    // if (fs.readdir(filename, (err, files) => {
                    //     if (files === undefined) // Is not a directory
                    //         return 1;
                    //     else
                    //         return 0;
                    // }))
                    
                    sidebar.project_files.push(files[i]);
                    // else {

                    // }
                }
            });
        },

        openProjectFile: (event) => {
            let filename = editor.data.project_dir + "\\" + event.toElement.text;

            fs.readdir(filename, (err, files) => {
                if (files !== undefined) { // Is a directory
                    sidebar.extendProjectFolder();
                }
            });

            fs.readFile(
                filename,
                'utf8',
                (err, data) => {
                    editor.data.input = data;
            });
        },

        extendProjectFolder: () => {
            
        }
    }
}
</script>
