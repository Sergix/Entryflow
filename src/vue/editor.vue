<template>
<div id="content">
  <div id="file-editor"></div>
</div>
</template>

<script>
import str from 'underscore.string'
import editor from './editor'

export default {
  name: 'editor',
  data: {
    file_editor: '',
    project: {},
    open_file: '',
    input: "Open a project file to display here"
  },
  methods: {
    keyCheck: (event) => {
      if(event.keyCode === 13)
        editor.methods.insertNewEntry()
    },
    insertNewEntry: () => {
      let contents = editor.data.file_editor.session.toString()
      if (contents[contents.length - 1] !== '\n') return

      let date = new Date()
      let repl_header = ''
      let header = editor.data.project.changelog_header

      if (header === '')
        return;

      repl_header = header
        .replace("%d", date.getDate())
        .replace("%m", date.getMonth())
        .replace("%y", date.getFullYear())
        .replace("%h", date.getHours())
        .replace("%hm", date.getUTCHours())
        .replace("%mi", date.getMinutes())
        .replace("%s", date.getSeconds())
        .replace("%e", editor.data.project.entry_count)
        .replace("%v", editor.data.project.version)
        .replace("%u", editor.data.project.username)

      editor.data.file_editor.insert(repl_header)
      editor.data.project.entry_count += 1
    }
  }
}
</script>
