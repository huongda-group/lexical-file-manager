import React, { useState } from 'react';
import { LexicalEditor, EditorState, $createEditor } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Modal from 'react-modal';

// Cấu hình Modal
Modal.setAppElement('#root');

const MyEditor = () => {
  const [showModal, setShowModal] = useState(false);

  // Hàm mở modal khi nhấn nút
  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={handleButtonClick}>Click Me</button>
      </div>

      {/* Modal hiển thị khi nút được nhấn */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Hello Modal"
      >
        <h2>Hello</h2>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>

      <div>
        <LexicalComposer initialConfig={{ editorState: EditorState.createEmpty() }}>
          <LexicalEditor />
        </LexicalComposer>
      </div>
    </div>
  );
};

export default MyEditor;
