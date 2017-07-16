<template>
<div id="sidebar-wrapper">
    <ul id="sidebar-list" class="sidebar-nav">
        <li id="sidebar-icons" class="row">
            <a v-on:click="settings" href="#"><i data-feather="settings"></i></a>
            <a v-on:click="github" href="#"><i data-feather="github"></i></a>
        </li>
        <li class="sidebar-brand">
            <a href="#" v-on:click="selectOption">
                <i data-feather="folder"></i>
                {{ project_name }}
            </a>
        </li>

        <li v-for="file in project_files" v-bind:key="file"><a v-on:click="openProjectFile" href="#">{{ file }}</a></li>
    </ul>
</div>
</template>

<script>
import editor from './editor';
import sidebar from './sidebar';
import fs from 'fs';
const { dialog, shell } = require('electron').remote;

export default {
    name: 'sidebar',
    data: {
        project_name: '',
        project_files: []
    },
    methods: {
        github: (event) => {
            shell.openExternal('https://github.com/Sergix/Entryflow')
        },
        
        settings: (event) => {

        },

        selectOption: (event) => {
            selectOption()
        },

        openProjectFile: (event) => {
            // let filename = editor.data.project_dir + "\\" + event.toElement.text;

            // fs.readdir(filename, (err, files) => {
            //     if (files !== undefined) { // Is a directory
            //         sidebar.extendProjectFolder();
            //     }
            // });

            // fs.readFile(
            //     filename,
            //     'utf8',
            //     (err, data) => {
            //         editor.data.input = data;
            // });
        },

        extendProjectFolder: () => {
            
        }
    }
}
</script>
