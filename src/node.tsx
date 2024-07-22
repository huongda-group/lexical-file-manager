import React from 'react';
import { $applyNodeReplacement, DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from 'lexical';
import { File } from './element';

export default class Node extends DecoratorNode<JSX.Element> {
  __src: string;
  __name: string;

  static getType(): string {
    return 'file-manager';
  }

  static clone(node: Node): Node {
    return new Node(node.__src, node.__name);
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

  updateDOM():
    false {
    return false;
  }

  decorate(_editor: LexicalEditor, _config: EditorConfig): JSX.Element {
    return (
      <a href={this.__src} target="_blank">
        {this.__name}
      </a>
    );
  }
}

export function $createNode(file: File): Node {
  // TODO: update this to use the file.url
  return $applyNodeReplacement(new Node(file.url, file.name, file.id));
}
