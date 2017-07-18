<template>
<div id="content" class="container">
    <div id="loader" class="active container">
        <h1 class="row">Documentation Options</h1>
        <div id="form" class="form-inline">
            <div class="form-group"><span>Single documentation file (optional):</span><input disabled class="form-control" :value="file_path" type="text"><button class="btn btn-default" v-on:click="selectFile" type="button">Browse</button></div>
            <span id="doc-title" class="row">Documentation content sections (check all to be included):</span>
            <div id="doc-options" class="row">
                <div class="checkbox"><label><input type="checkbox" id="table-contents" value="table-contents" v-model="doc_options"><span>Table of Contents</span></label></div>
                <div class="checkbox"><label><input type="checkbox" id="changelog" value="changelog" v-model="doc_options"><span>Changelog</span></label></div>
                <div class="checkbox"><label><input type="checkbox" id="build-list" value="build-list" v-model="doc_options"><span>Build List</span></label></div>
                <div class="checkbox"><label><input type="checkbox" id="footer" value="footer" v-model="doc_options"><span>Footer</span></label></div>
            </div>
            <p id="error-text">{{ err }}</p>
            <button id="next" v-on:click="next">Next</button>
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