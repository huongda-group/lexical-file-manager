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
Usage:
```jsx
import { CONFIG_FILE_MANAGER_COMMAND, OPEN_FILE_MANAGER_COMMAND } from "@huongda-group/lexical-file-manager";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
````
```jsx
const [editor] = useLexicalComposerContext();
...
<button
  onClick={() => {
    // Open modal
    editor.dispatchCommand(OPEN_FILE_MANAGER_COMMAND, true);
    // Update list files and folders 
    editor.dispatchCommand(CONFIG_FILE_MANAGER_COMMAND,{
      files: [
        {
          name: "Documents",
          isDirectory: true, // Folder
          path: "/Documents", // Located in Root directory
          updatedAt: "2024-09-09T10:30:00Z", // Last updated time
        },
        {
          name: "Pictures",
          isDirectory: true,
          path: "/Pictures", // Located in Root directory as well
          updatedAt: "2024-09-09T11:00:00Z",
        },
        {
          name: "Pic.png",
          isDirectory: false, // File
          path: "/Pictures/Pic.png", // Located inside the "Pictures" folder
          url: 'https://dummyimage.com/600x400/000/fff',
          updatedAt: "2024-09-08T16:45:00Z",
          size: 2048, // File size in bytes (example: 2 KB)
        },
      ]
    })
  }}
  aria-label="Show File Manager Modal">
  <i className="format file-icon" />
</button>
```
## 📂 File Structure

The `files` prop accepts an array of objects, where each object represents a file or folder. You can
customize the structure to meet your application needs. Each file or folder object follows the
structure detailed below:

```typescript
type File = {
  name: string;
  isDirectory: boolean;
  path: string;
  updatedAt?: string; // Optional: Last update timestamp in ISO 8601 format
  size?: number; // Optional: File size in bytes (only applicable for files)
};
```

## ⚙️ Props

| Name                   | Type                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `acceptedFileTypes`    | string                                                                                                                          | (Optional) A comma-separated list of allowed file extensions for uploading specific file types (e.g., `.txt, .png, .pdf`). If omitted, all file types are accepted.                                                                                                                                                                                                                                                                                                                                                             |
| `collapsibleNav`       | boolean                                                                                                                         | Enables a collapsible navigation pane on the left side. When `true`, a toggle will be shown to expand or collapse the navigation pane. `default: false`.                                                                                                                                                                                                                                                                                                                                                                        |
| `defaultNavExpanded`   | boolean                                                                                                                         | Sets the default expanded (`true`) or collapsed (`false`) state of the navigation pane when `collapsibleNav` is enabled. This only affects the initial render. `default: true`.                                                                                                                                                                                                                                                                                                                                                 |
| `enableFilePreview`    | boolean                                                                                                                         | A boolean flag indicating whether to use the default file previewer in the file manager `default: true`.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `filePreviewPath`      | string                                                                                                                          | The base URL for file previews e.g.`https://example.com`, file path will be appended automatically to it i.e. `https://example.com/yourFilePath`.                                                                                                                                                                                                                                                                                                                                                                               |
| `filePreviewComponent` | (file: [File](#-file-structure)) => React.ReactNode                                                                             | (Optional) A callback function that provides a custom file preview. It receives the selected file as its argument and must return a valid React node, JSX element, or HTML. Use this prop to override the default file preview behavior. Example: [Custom Preview Usage](#custom-file-preview).                                                                                                                                                                                                                                 |
| `fileUploadConfig`     | { url: string; method?: "POST" \| "PUT"; headers?: { [key: string]: string } }                                                  | Configuration object for file uploads. It includes the upload URL (`url`), an optional HTTP method (`method`, default is `"POST"`), and an optional `headers` object for setting custom HTTP headers in the upload request. The `method` property allows only `"POST"` or `"PUT"` values. The `headers` object can accept any standard or custom headers required by the server. Example: `{ url: "https://example.com/fileupload", method: "PUT", headers: { Authorization: "Bearer " + TOKEN, "X-Custom-Header": "value" } }` |
| `files`                | Array<[File](#-file-structure)>                                                                                                 | An array of file and folder objects representing the current directory structure. Each object includes `name`, `isDirectory`, and `path` properties.                                                                                                                                                                                                                                                                                                                                                                            |
| `fontFamily`           | string                                                                                                                          | The font family to be used throughout the component. Accepts any valid CSS font family (e.g., `'Arial, sans-serif'`, `'Roboto'`). You can customize the font styling to match your application's theme. `default: 'Nunito Sans, sans-serif'`.                                                                                                                                                                                                                                                                                   |
| `height`               | string \| number                                                                                                                | The height of the component `default: 600px`. Can be a string (e.g., `'100%'`, `'10rem'`) or a number (in pixels).                                                                                                                                                                                                                                                                                                                                                                                                              |
| `initialPath`          | string                                                                                                                          | The path of the directory to be loaded initially e.g. `/Documents`. This should be the path of a folder which is included in `files` array. Default value is `""`                                                                                                                                                                                                                                                                                                                                                               |
| `isLoading`            | boolean                                                                                                                         | A boolean state indicating whether the application is currently performing an operation, such as creating, renaming, or deleting a file/folder. Displays a loading state if set `true`.                                                                                                                                                                                                                                                                                                                                         |
| `language`             | string                                                                                                                          | A language code used for translations (e.g., `"en"`, `"fr"`, `"tr"`). Defaults to `"en"` for English. Allows the user to set the desired translation language manually.                                                                                                                                                                                                                                                                                                                                                         |
| `layout`               | "list" \| "grid"                                                                                                                | Specifies the default layout style for the file manager. Can be either "list" or "grid". Default value is "grid".                                                                                                                                                                                                                                                                                                                                                                                                               |
| `maxFileSize`          | number                                                                                                                          | For limiting the maximum upload file size in bytes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `onCopy`               | (files: Array<[File](#-file-structure)>) => void                                                                                | (Optional) A callback function triggered when one or more files or folders are copied providing copied files as an argument. Use this function to perform custom actions on copy event.                                                                                                                                                                                                                                                                                                                                         |
| `onCut`                | (files: Array<[File](#-file-structure)>) => void                                                                                | (Optional) A callback function triggered when one or more files or folders are cut, providing the cut files as an argument. Use this function to perform custom actions on the cut event.                                                                                                                                                                                                                                                                                                                                       |
| `onCreateFolder`       | (name: string, parentFolder: [File](#-file-structure)) => void                                                                  | A callback function triggered when a new folder is created. Use this function to update the files state to include the new folder under the specified parent folder using create folder API call to your server.                                                                                                                                                                                                                                                                                                                |
| `onDelete`             | (files: Array<[File](#-file-structure)>) => void                                                                                | A callback function is triggered when one or more files or folders are deleted.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `onDownload`           | (files: Array<[File](#-file-structure)>) => void                                                                                | A callback function triggered when one or more files or folders are downloaded.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `onError`              | (error: { type: string, message: string }, file: [File](#-file-structure)) => void                                              | A callback function triggered whenever there is an error in the file manager. Where error is an object containing `type` ("upload", etc.) and a descriptive error `message`.                                                                                                                                                                                                                                                                                                                                                    |
| `onFileOpen`           | (file: [File](#-file-structure)) => void                                                                                        | A callback function triggered when a file or folder is opened.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `onFileUploaded`       | (response: { [key: string]: any }) => void                                                                                      | A callback function triggered after a file is successfully uploaded. Provides JSON `response` holding uploaded file details, use it to extract the uploaded file details and add it to the `files` state e.g. `setFiles((prev) => [...prev, JSON.parse(response)]);`                                                                                                                                                                                                                                                            |
| `onFileUploading`      | (file: [File](#-file-structure), parentFolder: [File](#-file-structure)) => { [key: string]: any }                              | A callback function triggered during the file upload process. You can also return an object with key-value pairs that will be appended to the `FormData` along with the file being uploaded. The object can contain any number of valid properties.                                                                                                                                                                                                                                                                             |
| `onLayoutChange`       | (layout: "list" \| "grid") => void                                                                                              | A callback function triggered when the layout of the file manager is changed.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `onPaste`              | (files: Array<[File](#-file-structure)>, destinationFolder: [File](#-file-structure), operationType: "copy" \| "move") => void  | A callback function triggered when when one or more files or folders are pasted into a new location. Depending on `operationType`, use this to either copy or move the `sourceItem` to the `destinationFolder`, updating the files state accordingly.                                                                                                                                                                                                                                                                           |
| `onRefresh`            | () => void                                                                                                                      | A callback function triggered when the file manager is refreshed. Use this to refresh the `files` state to reflect any changes or updates.                                                                                                                                                                                                                                                                                                                                                                                      |
| `onRename`             | (file: [File](#-file-structure), newName: string) => void                                                                       | A callback function triggered when a file or folder is renamed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `onSelect`             | (files: Array<[File](#-file-structure)>) => void                                                                                | (Optional) A callback function triggered whenever a file or folder is selected. The function receives an array of selected files or folders, allowing you to handle selection-related actions, such as displaying file details, enabling toolbar actions, or updating the UI accordingly.                                                                                                                                                                                                                                       |
| `permissions`          | { create?: boolean; upload?: boolean; move?: boolean; copy?: boolean; rename?: boolean; download?: boolean; delete?: boolean; } | An object that controls the availability of specific file management actions. Setting an action to `false` hides it from the toolbar, context menu, and any relevant UI. All actions default to `true` if not specified. This is useful for implementing role-based access control or restricting certain operations. Example: `{ create: false, delete: false }` disables folder creation and file deletion.                                                                                                                   |
| `primaryColor`         | string                                                                                                                          | The primary color for the component's theme. Accepts any valid CSS color format (e.g., `'blue'`, `'#E97451'`, `'rgb(52, 152, 219)'`). This color will be applied to buttons, highlights, and other key elements. `default: #6155b4`.                                                                                                                                                                                                                                                                                            |
| `width`                | string \| number                                                                                                                | The width of the component `default: 100%`. Can be a string (e.g., `'100%'`, `'10rem'`) or a number (in pixels).                                                                                                  
***

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/huongda-group/lexical-file-manager/blob/main/LICENSE)
