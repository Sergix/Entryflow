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
    open_file: ''
  },
  methods: {
    keyCheck: (event) => {
      if(event.keyCode === 13)
        editor.methods.insertNewEntry()
    },
    insertData: (data, type) => {
      editor.data.file_editor.setValue(data)
      editor.data.file_editor.gotoLine(editor.data.file_editor.session.getLength())

      if (type === 'changelog')
        editor.methods.getEntries()
    },
    getEntries: () => {
      let new_entry_count = 0
      let contents = editor.data.file_editor.session.getLines(0, editor.data.file_editor.session.getLength())

      let header = editor.data.project.changelog_header
      let repl_header = header
        .replace('\\', '\\\\')
        .replace('(', '\\(')
        .replace(')', '\\)')
        .replace('[', '\\[')
        .replace(']', '\\]')
        .replace('.', '\\.')
        .replace('{', '\\{')
        .replace('}', '\\}')
        .replace('$', '\\$')
        .replace('^', '\\^')
        .replace("%d", '\\d{1,2}')
        .replace("%mi", '\\d{1,2}')
        .replace("%m", '\\d{1,2}')
        .replace("%y", '\\d{1,4}')
        .replace("%hm", '\\d{1,2}')
        .replace("%h", '\\d{1,2}')
        .replace("%s", '\\d{1,2}')
        .replace("%e", '\\d{1,}')
        .replace("%v", '\\d{1,}\\.\\d{1,}\\.\\d{1,}')
        .replace("%u", '.{1,}')

      for (let i = 0; i < editor.data.file_editor.session.getLength(); i++)
        if (editor.data.file_editor.session.getLine(i).match(repl_header))
          new_entry_count += 1;

      editor.data.project.entry_count = new_entry_count
    },
    insertNewEntry: () => {
      let contents = editor.data.file_editor.session.toString()
      if (contents[contents.length - 1] !== '\n') return

      editor.data.project.entry_count += 1

      let date = new Date()
      let repl_header = ''
      let header = editor.data.project.changelog_header

      if (header === '')
        return;

      repl_header = header
        .replace("%d", date.getDate())
        .replace("%mi", date.getMinutes())
        .replace("%m", date.getMonth())
        .replace("%y", date.getFullYear())
        .replace("%hm", date.getUTCHours())
        .replace("%h", date.getHours())
        .replace("%s", date.getSeconds())
        .replace("%e", editor.data.project.entry_count)
        .replace("%v", editor.data.project.version)
        .replace("%u", editor.data.project.username)
        + '\n\t'

      editor.data.file_editor.insert(repl_header)
    }
  }
}
</script>
