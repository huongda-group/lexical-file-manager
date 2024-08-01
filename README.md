# <p align="center">Power by Hương Đá Group 🇻🇳 </p>
<p align="center">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/huongda-group/lexical-file-manager/tests.yml"/>
  <a href="https://www.npmjs.com/package/lexical">
    <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@huongda-group/lexical-file-manager"/>
  </a>
</p>

## File manager for Lexical (React) editor

This package provides a set of components and hooks for Lexical that allow for manage files (like Wordpress media) in React applications.
<br />
<b>Pull requests are welcome.</b>
***

See full [example](https://github.com/huongda-group/lexical-file-manager/tree/main/example).

![Hương Đá Group Lexical file manager](https://github.com/huongda-group/lexical-file-manager/blob/main/preview/1.png?raw=true "Hương Đá Group Lexical file manager")

***
## Features
- [x] List files.
- [x] Upload file.
- [x] Delete file.
- [x] Loading status.
- [ ] View file text.
- [ ] Multiple language.
- [ ] View file audio.
- [ ] View file image
- [ ] View file video
- [ ] Folder manager
***
## Getting started
Install `lexical` and `@lexical/react`:

```
npm install --save lexical @lexical/react
```
Install `@huongda-group/lexical-file-manager`:
```
npm install --save @huongda-group/lexical-file-manager
```

Add Node & Plugin to config:
```jsx
import { FileManagerPlugin, FileManagerNode } from '@huongda-group/lexical-file-manager';

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [FileManagerNode], // Add node
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme
};
```
```jsx
<LexicalComposer initialConfig={editorConfig}>
  <div className="editor-container">
    <ToolbarPlugin />
    <div className="editor-inner">
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="editor-input"
            aria-placeholder={placeholder}
          />
        }
        placeholder={
          <div className="editor-placeholder">{placeholder}</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <TreeViewPlugin />
      <FileManagerPlugin /> {/*Add plugin here*/}
    </div>
  </div>
</LexicalComposer>
```
Add Button to Toolbar:
```jsx
import { FileManager } from '@huongda-group/lexical-file-manager';
````
```jsx
<FileManager
  title="Multiple Files Manager"
  editor={editor}
  files={[
    {
      id: '1',
      name: 'Image 1',
      url: 'https://placehold.co/600x400/orange/white',
      size: '150x150',
      thumbnail: 'https://placehold.co/600x400/orange/white',
    },
    {
      id: '2',
      name: 'Image 2',
      url: 'https://placehold.co/600x400/black/white',
      size: '150x150',
      thumbnail: 'https://placehold.co/600x400/black/white',
    },
    {
      id: '3',
      name: 'Image 3',
      url: 'https://placehold.co/600x400/green/white',
      size: '150x150',
      thumbnail: 'https://placehold.co/600x400/green/white',
    },
    {
      id: '4',
      name: 'Image 4',
      url: 'https://placehold.co/600x400/green/white',
      size: '150x150',
    },
  ].map((item, index) => ({ ...item, index }))}
  aria-label="File Manager Multiple"
>
  <button className="toolbar-item" aria-label="File Manager">
    Upload
  </button>
</FileManager>
```
### Props
| Name     |      Type                             |  Default value                                |  Description                                  |
|:--------:|:-------------------------------------:|:----------------------------------------------|:----------------------------------------------|
| editor   | LexicalEditor                         | const [editor] = useLexicalComposerContext(); | Editor from useLexicalComposerContext()       |
| files    | File                                  | []                                            | List of files to add                          |
| upload   | {multiple: boolean; onUpload: (f: File/File[]) => void}                  | -                                            | callback when upload                          |
| onClose  | () => void - optional                 | -                                             | callback when close modal                     |
| onInsert | (f: File/File[]) => void - optional   | -                                             | callback when insert file/files               |
| onDelete | (f: File) => void - optional          | -                                             | callback when delete file                     |
| multiple | boolean - optional                    | false                                         | config upload simple or multiple files        |
| title    | string - optional                     | -                                             | title of modal                                |

***
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/huongda-group/lexical-file-manager/blob/main/LICENSE)
