<template>
<div id="content" class="container">
    <div id="loader" class="active container">
        <h1 class="row">Save Project</h1>
        <div id="form" class="form-inline">
            <div class="form-group"><span>Enter project name:</span><input v-model="project_name" class="form-control" type="text"></div>
            <p id="error-text">{{ err }}</p>
            <button id="next" v-on:click="next">Finish</button>
        </div>
    </div>
</div>
</template>

<script>
import editor from './editor'
import loader from './loader_save'
import changelog from './loader_changelog'
import docs from './loader_docs'
import open from './loader_open'
const { dialog } = require('electron').remote

export default {
    name: 'loader_changelog',
    data: {
        project_name: '',
        err: ''
    },
    methods: {
        next: (event) => {
            if (loader.data.project_name === '') {
                loader.data.err = 'Enter the name of the project'
                return 0
            }
            console.log(changelog.data.file_path)
            let project_settings = {
                'project_name': loader.data.project_name,
                'changelog_path': changelog.data.file_path === '' ? open.data.changelog_path : changelog.data.file_path,
                'changelog_header': changelog.data.header_format,
                'changelog_direction': changelog.data.entry_direction,
                'doc_path': docs.data.file_path === '' ? open.data.doc_path : docs.data.file_path,
                'doc_options': docs.data.doc_options
            }

            newProject(project_settings)
            returnToEditor()
        }
    }
}
</script>