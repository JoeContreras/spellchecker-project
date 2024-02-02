import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SuggestionsTable = ({ suggestions }) => {
  const [copied, setCopied] = useState(false);
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Suggestion</th>
          <th className="border border-slate-600 rounded-md">
            Copy Suggestion
          </th>
        </tr>
      </thead>
      <tbody>
        {suggestions.map((suggestion, index) => (
          <tr key={`${suggestion}${index}`} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {suggestion}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <CopyToClipboard
                  text={suggestion}
                  onCopy={() => setCopied(true)}
                >
                  <MdContentCopy className="text-2xl text-blue-600 cursor-pointer" />
                </CopyToClipboard>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SuggestionsTable;
