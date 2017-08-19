<template>
<div id="content">
    <div id="loader" class="active">
        <h1 class="text-center col-sm-12">Changelog Options</h1>
        <div class="form">
            <div class="row form-group">
                <label for="changelog-file" class="col-sm-2 control-label text-right">Project file</label>
                <input disabled class="col-sm-6 form-control" id="changelog-file" type="text" placeholder="Click Browse..." :value="file_path">
                <button type="button" class="col-sm-2 btn btn-default" v-on:click="selectFile">Browse</button>
            </div>
            <label>
                Entry header format (optional)
                <span class="row" id="header-format">%d = day, %m = month, %y = year, %h = hour, %hm = hour (24-hour format), %mi = minute, %s = second, %e = entry number, %v = project version, %u = user name</span>
                <textarea class="col-sm-12 row form-control" rows="1" v-model="header_format" type="text"></textarea>
            </label>
            <p id="error-text">{{ err }}</p>
            <button class="btn btn-default" id="next" v-on:click="next">Next</button>
        </div>
    </div>
</div>
</template>

<script>
import loader from './loader_changelog'
const { dialog } = require('electron').remote

export default {
    name: 'loader_changelog',
    data: {
        header_format: '',
        file_path: '',
        username: '',
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
            })

            loader.data.file_path = path !== undefined ? path[0] : null
        },
        next: (event) => {
            nextLoaderPage(2)
        }
    }
}
</script>
