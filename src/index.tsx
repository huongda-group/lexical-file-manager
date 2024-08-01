import ButtonComponent from './button';
import Plugin, { INSERT_FILE_COMMAND as COMMAND } from './plugin';
import Node from './node';

// import './styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

export const FileManager = ButtonComponent;
export const FileManagerPlugin = Plugin;
export const FileManagerNode = Node;
export const INSERT_FILE_COMMAND = COMMAND;
export * from './element';
