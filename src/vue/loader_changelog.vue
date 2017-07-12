<template>
    <div id="loader" class="container">
        <h2 class="row">Project Directory: {{ project_dir }}</h2>
        <h1 class="row">Changelog Options</h1>
        <div id="form">
            <label><span class="col-sm-4">Single changelog file (optional):</span><input disabled class="col-sm-4" :value="file_path" type="text"><button v-on:click="selectFile" type="button">Browse</button></label>
            <label><span class="row">Entry header format (%d = day, %m = month, %y = year, %h = hour, %hm = hour (24-hour format), %mi = minute, %s = second, %e = entry number, %v = project version, %u = user name) (optional):</span><textarea class="col-sm-12 row" v-model="header_format" type="text"></textarea></label>
            <label><span class="row">Select entry insert direction (for single file) (optional unless using single file):</span><input type="radio" id="entry-up" value="up" name="entry" v-model="entry_direction"><label for="entry-up">Up</label><input type="radio" id="entry-down" value="down" name="entry" v-model="entry_direction"><label for="entry-down">Down</label></label>
            <p id="error-text">{{ err }}</p>
            <button id="next" v-on:click="next">Next</button>
        </div>
    </div>
</template>

<script>
import loader from './loader_changelog';
const { dialog } = require('electron').remote;

export default {
    name: 'loader_changelog',
    data: {
        header_format: '',
        file_path: '',
        entry_direction: '',
        err: ''
    },
    methods: {
        selectFile: (event) => {
            let path = dialog.showOpenDialog({
                title: 'Select Changelog File',
                buttonLabel: 'Use',
                properties: ['openFile'],
                filters: [
                    {name: 'Plain Text', extensions: ['txt']},
                    {name: 'Markdown', extensions: ['md']},
                    {name: 'All Files', extensions: ['*']}
                ]
            });

            loader.data.file_path = path !== undefined ? path[0] : null;
        },
        next: (event) => {
            if (loader.data.entry_direction === '' && loader.data.file_path !== '') {
                loader.data.err = 'Select an entry direction';
                return 0;
            }
            nextLoaderPage(2);
        }
    }
}
</script>
