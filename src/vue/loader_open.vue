<template>
<div id="content">
    <div id="loader" class="active">
        <h1 class="text-center col-sm-12">Select Changelog and Documentation File Path</h1>
        <div id="form" class="form">
            <div class="row form-group">
                <label for="changelog-input" class="col-sm-2 control-label text-right">Changelog</label>
                <input disabled class="col-sm-6 form-control" :value="changelog_path" id="changelog-input" type="text" placeholder="Click Browse...">
                <button v-on:click="openChangelog" class="col-sm-2 btn btn-default">Browse</button>
            </div>
            <div class="row form-group">
                <label for="doc-input" class="col-sm-2 control-label text-right">Documentation</label>
                <input disabled class="col-sm-6 form-control" :value="doc_path" id="doc-input" type="text" placeholder="Click Browse...">
                <button v-on:click="openDocs" class="col-sm-2 btn btn-default">Browse</button>
            </div>
            <p id="error-text">{{ err }}</p>
            <button id="next" class="btn btn-default" v-on:click="next">Next</button>
        </div>
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
            if (loader.data.changelog_path === '' || loader.data.changelog_path === undefined) {
                loader.data.err = 'Select Changelog Directory';
                return 0;
            } else if (loader.data.doc_path === '' || loader.data.doc_path === undefined) {
                loader.data.err = 'Select Documentation directory';
                return 0;
            }
            nextLoaderPage(1);
        }
    }
}
</script>