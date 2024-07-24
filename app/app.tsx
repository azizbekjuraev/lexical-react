"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { isDevPlayground } from "@/components/editor/lib/appSettings";
import {
  SettingsContext,
  useSettings,
} from "@/components/editor/context/SettingsContext";
import { SharedAutocompleteContext } from "@/components/editor/context/SharedAutocompleteContext";
import { SharedHistoryContext } from "@/components/editor/context/SharedHistoryContext";
import PlaygroundNodes from "@/components/editor/nodes/PlaygroundNodes";
import DocsPlugin from "@/components/editor/plugins/DocsPlugin";
import PasteLogPlugin from "@/components/editor/plugins/PasteLogPlugin";
import { TableContext } from "@/components/editor/plugins/TablePlugin";
import Settings from "@/components/editor/lib/Settings";
import PlaygroundEditorTheme from "@/components/editor/themes/PlaygroundEditorTheme";
import Editor from "@/components/editor/editor";
import { getPrepopulatedRichText } from "@/components/editor/utils/getPrepopulatedRichText";
import LocalStoragePlugin from "@/components/editor/plugins/LocalStoragePlugin";

export default function LexicalEditor(): JSX.Element {
  const {
    settings: { emptyEditor },
  } = useSettings();

  const initialConfig = {
    editorState: emptyEditor ? undefined : getPrepopulatedRichText,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  const content = localStorage.getItem(initialConfig.namespace) || '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={{...initialConfig, editorState: content}}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className="editor-shell">
                <Editor />
              </div>
              <Settings />
              {isDevPlayground ? <DocsPlugin /> : null}
              {isDevPlayground ? <PasteLogPlugin /> : null}
              <LocalStoragePlugin namespace={initialConfig.namespace}/>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  );
}
