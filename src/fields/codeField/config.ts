export const codeFieldConfig = {
  name: 'codeField',
  type: 'code',
  required: false,
  admin: {
    language: 'html',
    description: 'Enter HTML code that will be sanitized before rendering',
    editorOptions: {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'dracula',
      tabSize: 2,
      styleActiveLine: true,
      foldGutter: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      highlightSelectionMatches: true,
      scrollbarStyle: 'overlay',
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      smartIndent: true,
      indentWithTabs: false,
      autoRefresh: true,
      viewportMargin: Infinity,
      placeholder: "Enter HTML code here..."
    },
    style: {
      height: '500px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: '"Fira Code", monospace',
      fontSize: '14px',
      marginBottom: '20px'
    }
  },
  localized: true,
};
