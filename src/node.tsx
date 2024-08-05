import {
  $applyNodeReplacement,
  DecoratorNode,
  NodeKey,
} from 'lexical';
import React from 'react';
import { FileItem } from './element';

export default class Node extends DecoratorNode<JSX.Element> {
  __id: string;
  __name: string;
  __url: string;
  __size?: string;
  __thumbnail?: string;

  static getType(): string {
    return 'file-manager';
  }

  static clone(node: Node): Node {
    return new Node(
      node.__id,
      node.__name,
      node.__url,
      node.__size,
      node.__thumbnail
    );
  }

  constructor(
    id: string,
    name: string,
    url: string,
    size?: string,
    thumbnail?: string,
    key?: NodeKey
  ) {
    super(key);
    this.__id = id;
    this.__name = name;
    this.__url = url;
    this.__size = size;
    this.__thumbnail = thumbnail;
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span');
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <a href={this.__url} target="_blank" className="me-1">
        {this.__name}
      </a>
    );
  }
}

export function $createNode(file: FileItem): Node {
  return $applyNodeReplacement(
    new Node(file.id, file.name, file.url, file.size, file.thumbnail, file.key)
  );
}
