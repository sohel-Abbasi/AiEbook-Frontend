import { Type } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";

const SimpleMDEditor = ({ value, onChange, options }) => {
  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      data-color-mode="light"
    >
      {/* Header */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Type className="w-4 h-4" />
          <span className="text-gray-700 font-medium">Markdown Editor</span>
        </div>
      </div>
      {/* Editor */}
      <div className="p-0">
        <MDEditor
          height={400}
          preview="live"
          value={value}
          onChange={onChange}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.title,
            commands.quote,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.link,
            commands.image,
            commands.code,
            commands.hr,
          ]}
        />
      </div>
    </div>
  );
};

export default SimpleMDEditor;
