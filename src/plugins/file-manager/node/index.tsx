import { $applyNodeReplacement, DecoratorNode, NodeKey } from 'lexical';
import { FileManagerPayload } from '../FileManager.d';

export class FileManagerNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __name: string;

  static getType(): string {
    return 'file-manager';
  }

  constructor(src: string, name: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__name = name;
  }
}

export function $createFileManagerNode({
  src,
  name,
  key,
}: FileManagerPayload): FileManagerNode {
  return $applyNodeReplacement(new FileManagerNode(src, name, key));
}
