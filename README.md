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
<br />
[Demo](https://lexical-file-manager.huongda.dev)

![Hương Đá Group Lexical file manager](https://github.com/huongda-group/lexical-file-manager/blob/main/preview/1.png?raw=true "Hương Đá Group Lexical file manager")

***
## Features
- [x] List files.
- [x] Upload file.
- [x] Delete file.
- [x] Loading status.
- [ ] View file text.
- [ ] Multiple language.
- [x] View file audio.
- [x] View file image
- [x] View file video
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
      size: 1024,
      mimetype: 'image/jpeg',
    },
    {
      id: '2',
      name: 'Audio 1',
      url: 'https://www.kozco.com/tech/LRMonoPhase4.mp3',
      size: 1024,
      mimetype: 'audio/mpeg',
    },
    {
      id: '3',
      name: 'Video 1',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      size: 1024,
      mimetype: 'video/mp4',
    },
    {
      id: '4',
      name: 'File 1',
      url: 'https://example-files.online-convert.com/document/txt/example.txt',
      size: 1024,
      mimetype: 'text/plain'
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
| Name     |  Required   |                          Type                           |  Default value                                |  Description                                  |
|:--------:|:-----------:|:-------------------------------------------------------:|:----------------------------------------------|:----------------------------------------------|
| editor   | ```true```  |                      LexicalEditor                      | - | Editor from useLexicalComposerContext()       |
| files    | ```true```  |                          FileItem                           | []                                            | List of files to add                          |
| onUpload   | ```true```  | {multiple: boolean; onUpload: (f: FileItem/FileItem[]) => void} | -                                            | callback when upload                          |
| onClose  | ```false``` |                  () => void - optional                  |                            -                             | callback when close modal                     |
| onInsert | ```false``` |           (f: FileItem/FileItem[]) => void - optional           |                            -                            | callback when insert file/files               |
| onDelete | ```false``` |              (f: FileItem) => void - optional               |                            -                            | callback when delete file                     |
| multiple | ```false``` |                   boolean - optional                    |                          false                          | config upload simple or multiple files        |
| title    | ```false``` |                    string - optional                    |                            -                            | title of modal                                |

### FileItem interface
| Name     |  Required   |                          Type                           |  Default value                                |  Description                                  |
|:--------:|:-----------:|:-------------------------------------------------------:|:----------------------------------------------|:----------------------------------------------|
| id   | ```true```  |                      string                      | - | Identify each file |
| name   | ```true```  |                      string                      | - | Name |
| url   | ```true```  |                      string                      | - | Url of file |
| size   | ```true```  |                      number                      | - | Size of file in bytes |
| mimetype   | ```true```  |                      Mimetype                      | - | Mimetype of file |
| index   | ```true```  |                      number                      | - | Order of file |
| key   | ```false```  |                      NodeKey                      | - | NodeKey of lexical |

### Mimetype type
Mimetype includes file types such as: 
- Image 
  - image/jpeg
  - image/png
  - image/gif
  - image/bmp
  - image/webp
  - image/tiff
  - image/svg+xml
- Audio
  - audio/mpeg
  - audio/wav
  - audio/ogg
  - audio/mp4
  - audio/aac
  - audio/flac
  - audio/amr
  - audio/x-ms-wma
- Video
  - video/mp4
  - video/webm
  - video/x-msvideo
  - video/quicktime
  - video/x-ms-wav
  - video/x-flv
  - video/x-matroska
  - video/mpeg
- Other file
  - string
  ...
***
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/huongda-group/lexical-file-manager/blob/main/LICENSE)
