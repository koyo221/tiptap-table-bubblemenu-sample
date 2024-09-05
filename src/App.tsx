import "./App.css";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";

function App() {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
    <caption>list of countries</caption>
    <table>
      <tbody>
        <tr>
          <th>country</th>
          <th colspan="2">good places to visit</th>  
        </tr>
        <tr>
          <td>Japan</td>
          <td>houses</td>
          <td>woods</td>
        </tr>
        <tr>
          <td>France</td>
          <td>parks</td>
          <td>towers</td>
        </tr>
      </tbody>
    </table>
  `,
  });

  return (
    <main className="main">
      <EditorContent editor={editor} />

      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor, state }) => {
            const isEmptyCursorInTable =
              state.selection.empty &&
              (editor.isActive("table") ||
                editor.isActive("tableRow") ||
                editor.isActive("tableCell"));
            const isCellSelection =
              // @ts-expect-error ライブラリ側で型定義されていない
              state.selection.$headCell && state.selection.$anchorCell;
            return isCellSelection || isEmptyCursorInTable;
          }}
        >
          <div className="bubble-menu-wrapper">
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              add column
            </button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()}>
              add row
            </button>
            <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
              merge or split
            </button>
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <BubbleMenu
          className="sample-bubble-menu"
          editor={editor}
          shouldShow={({ state }) => {
            const isCellSelection =
              // @ts-expect-error ライブラリ側で型定義されていない
              state.selection.$headCell && state.selection.$anchorCell;
            return !state.selection.empty && !isCellSelection;
          }}
        >
          sample bubble menu
        </BubbleMenu>
      )}
    </main>
  );
}

export default App;
