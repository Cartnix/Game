import { Terminal, XCircle } from "lucide-react";
import Countdown from "../../../../features/Timer/ui/Timer";

interface CodeOutputProps {
  output: string;
  error: string;
}

export const CodeOutput = ({ output, error }: CodeOutputProps) => {
  return (
    <div className="w-1/2 bg-[#0d1021] p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Результаты</h2>

      {output && (
        <div className="mb-6 bg-gray-900 rounded-xl p-4 border border-gray-700">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Вывод программы:
          </h3>
          <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-900/30 rounded-xl p-4 border border-red-500">
          <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Ошибка:
          </h3>
          <pre className="text-red-300 text-sm font-mono whitespace-pre-wrap">
            {error}
          </pre>
        </div>
      )}

      {!output && !error && (
        <div className="text-center text-gray-500 mt-12">
          <Terminal className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>Запустите код, чтобы увидеть результаты</p>
          <Countdown start={10}/>
        </div>
      )}
    </div>
  );
};