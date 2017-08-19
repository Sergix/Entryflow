<template>
<div id="content">
    <div id="loader" class="active">
        <h1 class="text-center col-sm-12">Documentation Options</h1>
        <div class="form">
            <div class="row form-group">
                <label for="doc-file" class="col-sm-2 control-label text-right">Project file</label>
                <input disabled class="col-sm-6 form-control" id="doc-file" type="text" placeholder="Click Browse..." :value="file_path">
                <button type="button" class="col-sm-2 btn btn-default" v-on:click="selectFile">Browse</button>
            </div>
            <div id="options" class="form-group">
                <label for="doc-options" class="row">Content sections</label>
                <div id="doc-options">
                    <div class="checkbox row">
                        <input type="checkbox" id="table-contents" value="table-contents" v-model="doc_options">
                        <label for="table-contents">Table of Contents</label>
                    </div>
                    <div class="checkbox row">
                        <input type="checkbox" id="changelog" value="changelog" v-model="doc_options">
                        <label for="changelog">Changelog</label>
                    </div>
                    <div class="checkbox row">
                        <input type="checkbox" id="build-list" value="build-list" v-model="doc_options">
                        <label for="build-list">Build List</label>
                    </div>
                    <div class="checkbox row">
                        <input type="checkbox" id="footer" value="footer" v-model="doc_options">
                        <label for="footer">Footer</label>
                    </div>
                </div>
            </div>
            <p id="error-text">{{ err }}</p>
            <button id="next" class="btn btn-default" v-on:click="next">Next</button>
        </div>
    </div>
</div>
</template>

<script>
import editor from './editor'
import loader from './loader_docs'
const { dialog } = require('electron').remote

export default {
    name: 'loader_changelog',
    data: {
        doc_options: [],
        file_path: '',
        err: ''
    },
    methods: {
        selectFile: (event) => {
            let path = dialog.showOpenDialog({
                title: 'Select Documentation File',
                buttonLabel: 'Use',
                properties: ['openFile'],
                filters: [
                    {name: 'Plain Text', extensions: ['txt']},
                    {name: 'Markdown', extensions: ['md']},
                    {name: 'All Files', extensions: ['*']}
                ]
            })

            loader.data.file_path = path !== undefined ? path[0] : null
        },
        next: (event) => {
            if (loader.data.file_path === null || loader.data.file_path === undefined)
                loader.data.file_path = ''

            nextLoaderPage(3)
        }
    }
}
</script>