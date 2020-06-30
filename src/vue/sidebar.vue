<template>
<div id="sidebar-wrapper">
    <ul id="sidebar-list" class="sidebar-nav">
        <li id="sidebar-icons" class="row">
            <a v-on:click="settings" href="#"><i data-feather="settings"></i></a>
            <a v-on:click="github" href="#"><i data-feather="github"></i></a>
            <a v-on:click="save" href="#"><i data-feather="save"></i></a>
        </li>
        <li class="sidebar-brand">
            <a href="#" v-on:click="selectOption">
                {{ project_name }}
            </a>
        </li>

        <li class="sidebar-brand">
            <a href="#doc-files" v-on:click="openIfFile" v-html="doc_content" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="doc-files"></a>
        </li>
        <div id="doc-files">
            <li v-for="file in doc_files" v-bind:key="file">
                <a v-on:click="openDocFile" href="#">{{ file }}</a>
            </li>
        </div>

        <li class="sidebar-brand">
            <a href="#changelog-files" v-on:click="openIfFile" v-html="changelog_content" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="changelog-files"></a>
        </li>
        <div id="changelog-files">
            <li v-for="file in changelog_files" v-bind:key="file">
                <a v-on:click="openChangelogFile" href="#">{{ file }}</a>
            </li>
        </div>
    </ul>
</div>
</template>

<script>
import editor from './editor'
import sidebar from './sidebar'
import fs from 'fs'
import dirTree from 'directory-tree'
const { dialog, shell } = require('electron').remote

let temp_array

export default {
    name: 'sidebar',
    data: {
        project_name: '',
        doc_files: [],
        changelog_files: [],
        doc_file: '',
        changelog_file: '',
        doc_content: 'Documentation',
        changelog_content: 'Changelog',
        doc_expanded: true,
        changelog_expanded: true
    },
    methods: {
        github: (event) => {
            shell.openExternal('https://github.com/Sergix/Entryflow')
            // openLogin()
        },

        settings: (event) => {
            openSettings()
        },

        save: (event) => {
            fs.writeFileSync(editor.data.open_file, editor.data.file_editor.session.toString())
        },

        selectOption: (event) => {
            selectOption()
        },

        openDocFile: (event) => {
            let filename;
            if (event === null || event === undefined)
                filename = editor.data.project.doc_path
            else
                filename = editor.data.project.doc_path + '\\' + event.toElement.text

            editor.data.open_file = filename

            fs.readFile(
                filename,
                'utf8',
                (err, data) => {
                    editor.methods.insertData(data, 'doc')
            });
        },

        openChangelogFile: (event) => {
            let filename;
            if (event === null || event === undefined)
                filename = editor.data.project.changelog_path
            else
                filename = editor.data.project.changelog_path + '\\' + event.toElement.text

            editor.data.open_file = filename

            fs.readFile(
                filename,
                'utf8',
                (err, data) => {
                    editor.methods.insertData(data, 'changelog')
            });
        },

        openIfFile: (event) => {
            let name = event.toElement.innerText

            if (name === 'Documentation') {
                if (sidebar.data.doc_file !== '') {
                    sidebar.methods.openDocFile()
                    return
                }
                
                sidebar.data.doc_content = 'Documentation'

                sidebar.data.doc_expanded = !sidebar.data.doc_expanded
            } else if (name === 'Changelog') {
                if (sidebar.data.changelog_file !== '') {
                    sidebar.methods.openChangelogFile()
                    return
                }
                
                sidebar.data.changelog_content = 'Changelog'

                sidebar.data.changelog_expanded = !sidebar.data.changelog_expanded
            }
        },

        generateDocList: (tree) => {
            for (let i = 0; i < tree.children.length; i++) {
                if (tree.children[i].type === 'directory') {
                    sidebar.methods.generateDocList(tree.children[i])

                } else {
                    let path = tree.path.replace('\\', '/') + '/'
                    sidebar.data.doc_files.push(tree.path + tree.children[i].name)
                }
            }
        },

        generateFileList: () => {
            if (fs.statSync(editor.data.project.doc_path).isDirectory()) {
                let filteredTree = dirTree(editor.data.project.doc_path, {extensions:/(\.txt|\.md)/})
                sidebar.methods.generateDocList(filteredTree)
            }
            // if (fs.statSync(editor.data.project.doc_path).isFile()) {
            //     sidebar.data.doc_file = editor.data.project.doc_path
            //     sidebar.data.doc_content = 'Documentation'
            // } else {
            //     let doc_files = fs.readdirSync(editor.data.project.doc_path)
            //     console.log(doc_files)
            //     sidebar.data.doc_files = doc_files
            // }

            // if (fs.statSync(editor.data.project.changelog_path).isFile()) {
            //     sidebar.data.changelog_file = editor.data.project.changelog_path
            //     sidebar.data.changelog_content = 'Changelog'
            // } else {
            //     let changelog_files = fs.readdirSync(editor.data.project.changelog_path)
            //     sidebar.data.changelog_files = changelog_files
            // }
        }
    }
}
</script>
