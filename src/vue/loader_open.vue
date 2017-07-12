<template>
    <div id="loader" class="container">
        <h2 class="row">Project Directory: {{ project_dir }}</h2>
        <h1 class="row">Select Changelog and Documentation File Path</h1>
        <div id="form">
            <label class="row"><span class="col-sm-4">Changelog</span><input disabled class="col-sm-4" :value="changelog_path" type="text"><button v-on:click="openChangelog">Browse</button></label>
            <label class="row"><span class="col-sm-4">Documentation</span><input disabled class="col-sm-4" :value="doc_path" type="text"><button v-on:click="openDocs">Browse</button></label>
            <p id="error-text">{{ err }}</p>
            <button id="next" v-on:click="next">Next</button>
        </div>
    </div>
</template>

<script>
import editor from './editor';
import loader from './loader_open';
const { dialog } = require('electron').remote;

export default {
    name: 'loader_open',
    data: {
        project_dir: editor.project_dir,
        changelog_path: '',
        doc_path: '',
        err: ''
    },
    methods: {
        openChangelog: (event) => {
            let path = dialog.showOpenDialog({
                title: 'Select Changelog Path',
                buttonLabel: 'Use',
                properties: ["openDirectory"]
            });

            loader.data.changelog_path = path !== undefined ? path[0] : null;
        },
        openDocs: (event) => {
            let path = dialog.showOpenDialog({
                title: 'Select Documentation Path',
                buttonLabel: 'Use',
                properties: ["openDirectory"]
            });

            loader.data.doc_path = path !== undefined ? path[0] : null;
        },
        next: (event) => {
            if (loader.data.changelog_path === '') {
                loader.data.err = 'Select Changelog Directory';
                return 0;
            } else if (loader.data.doc_path === '') {
                loader.data.err = 'Select Documentation directory';
                return 0;
            }
            nextLoaderPage(1);
        }
    }
}
</script>