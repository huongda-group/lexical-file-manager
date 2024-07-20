import { $applyNodeReplacement, DecoratorNode, NodeKey } from 'lexical';
import { FileManagerPayload } from '../FileManager.d';

export class FileManagerNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __name: string;

  static getType(): string {
    return 'file-manager';
  }

  static clone(node: FileManagerNode): FileManagerNode {
    return new FileManagerNode(node.__src, node.__name);
  }

  constructor(src: string, name: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__name = name;
  }

  createDOM(): // config: EditorConfig
  HTMLElement {
    const span = document.createElement('span');
    return span;
  }

  updateDOM(): // prevNode: FileManagerNode,
  // dom: HTMLElement,
  // config: EditorConfig
  false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <a href={this.__src} target="_blank">
        {this.__name}
      </a>
    );
  }
}

export function $createFileManagerNode({
  src,
  name,
  key,
}: FileManagerPayload): FileManagerNode {
  return $applyNodeReplacement(new FileManagerNode(src, name, key));
}
