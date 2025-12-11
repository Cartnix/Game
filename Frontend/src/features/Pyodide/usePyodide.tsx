import { useEffect, useRef, useState } from "react";

export interface TestResult {
    passed: boolean;
    input: any;
    expected: any;
    output?: any;
    error?: string;
}

export default function usePyodide() {
    const pyodideRef = useRef<any>(null);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [pyodideReady, setPyodideReady] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[]>([]);

    const parseError = (errMessage: string): string => {
        // Найти позицию первого File "<exec>"
        const execFileMatch = errMessage.match(/File "<exec>", line \d+/);
        if (!execFileMatch) {
            // Если нет "<exec>", вернуть последние 3 строки
            return errMessage.split('\n').slice(-3).join('\n').trim();
        }

        // Получить индекс, с которого начинается File "<exec>"
        const startIdx = errMessage.indexOf(execFileMatch[0]);
        const relevantPart = errMessage.substring(startIdx);
        
        // Взять только нужные строки (до конца ошибки)
        const lines = relevantPart.split('\n');
        const result: string[] = [];
        
        for (let i = 0; i < Math.min(lines.length, 10); i++) {
            const line = lines[i];
            result.push(line);
            
            // Остановиться после строки с типом ошибки
            if (line.match(/^(SyntaxError|ValueError|TypeError|NameError|KeyError|IndexError|AttributeError|RuntimeError|Exception):/)) {
                break;
            }
        }
        
        return result.join('\n').trim();
    };
    
    useEffect(() => {
        const loadPyodide = async () => {
            try {
                const pyodide = await (window as any).loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
                });
                pyodideRef.current = pyodide;
                setPyodideReady(true);
            } catch (err: any) {
                setError("Ошибка загрузки Python: " + err.message);
            }
        };

        loadPyodide();
    }, []);

    const runCode = async (code: string, testcases?: any[]) => {
        if (!pyodideRef.current) {
            setError("Python еще не загружен");
            return;
        }

        setIsRunning(true);
        setOutput("");
        setError("");
        setTestResults([]);

        try {
            const pyodide = pyodideRef.current;

            let stdout = "";
            pyodide.setStdout({
                batched: (text: string) => { stdout += text + "\n"; }
            });

            if (!testcases || testcases.length === 0) {
                await pyodide.runPythonAsync(code);
                setOutput(stdout || "Код выполнен успешно (без вывода)");
            } else {
                const testsJson = JSON.stringify(testcases).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                
                const harness = `
import json
import sys
import types

_tests = json.loads('''${testsJson}''')
results = []

_user_functions = []
for name in dir():
    obj = globals()[name]
    if isinstance(obj, types.FunctionType) and not name.startswith('_') and obj.__module__ == '__main__':
        _user_functions.append(name)

if not _user_functions:
    raise Exception('Не найдена ни одна функция в коде')

fn = globals()[_user_functions[0]]

for tc in _tests:
    inp = tc.get('input')
    expected = tc.get('expected')
    try:
        # Если input — список, сначала пробуем распаковать как аргументы
        if isinstance(inp, list):
            try:
                out = fn(*inp)
            except Exception:
                out = fn(inp)
        else:
            out = fn(inp)

        # Нормализуем типы для сравнения
        if hasattr(out, 'item'):  # numpy scalar
            out = out.item()
        if hasattr(expected, 'item'):
            expected = expected.item()

        passed = out == expected
        results.append({
            'passed': passed,
            'input': inp,
            'expected': expected,
            'output': out
        })
    except Exception as e:
        results.append({
            'passed': False,
            'input': inp,
            'expected': expected,
            'error': str(e)
        })

print('__TEST_RESULTS_START__')
print(json.dumps(results))
print('__TEST_RESULTS_END__')
`;

                const codeToRun = code + '\n' + harness;
                await pyodide.runPythonAsync(codeToRun);
                
                const startMarker = '__TEST_RESULTS_START__';
                const endMarker = '__TEST_RESULTS_END__';
                
                if (stdout.includes(startMarker) && stdout.includes(endMarker)) {
                    const startIdx = stdout.indexOf(startMarker) + startMarker.length;
                    const endIdx = stdout.indexOf(endMarker);
                    const jsonStr = stdout.substring(startIdx, endIdx).trim();
                    
                    try {
                        const results = JSON.parse(jsonStr);
                        setTestResults(results);
                        
                        const passedCount = results.filter((r: TestResult) => r.passed).length;
                        setOutput(`Тесты: ${passedCount}/${results.length} пройдено`);
                    } catch (parseErr: any) {
                        const shortError = parseError(parseErr.message || String(parseErr));
                        setError(shortError);
                    }
                } else {
                    setOutput(stdout);
                }
            }

            } catch (err: any) {
                const shortError = parseError(err.message || String(err));
                setError(shortError);
            } finally {
                setIsRunning(false);
            }
        };

    return { output, error, isRunning, pyodideReady, runCode, testResults }
}