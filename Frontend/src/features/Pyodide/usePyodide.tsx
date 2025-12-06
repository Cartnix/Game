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

# Загружаем тесты
_tests = json.loads('''${testsJson}''')
results = []

# Находим функции, определённые пользователем
_user_functions = []
for name in dir():
    obj = globals()[name]
    if isinstance(obj, types.FunctionType) and not name.startswith('_') and obj.__module__ == '__main__':
        _user_functions.append(name)

if not _user_functions:
    raise Exception('Не найдена ни одна функция в коде')

fn = globals()[_user_functions[0]]

# Запускаем тесты
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
                    } catch (parseErr) {
                        setError("Ошибка парсинга результатов тестов");
                    }
                } else {
                    setOutput(stdout);
                }
            }

        } catch (err: any) {
            setError(err.message || String(err));
        } finally {
            setIsRunning(false);
        }
    };

    return { output, error, isRunning, pyodideReady, runCode, testResults }
}