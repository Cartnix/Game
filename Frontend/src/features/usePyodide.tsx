import { useEffect, useRef, useState } from "react";

export default function usePyodide() {
    const pyodideRef = useRef<any>(null);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [pyodideReady, setPyodideReady] = useState(false);
    
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

    const runCode = async (code: string) => {
        if (!pyodideRef.current) {
            setError("Python еще не загружен");
            return;
        }

        setIsRunning(true);
        setOutput("");
        setError("");

        try {
            const pyodide = pyodideRef.current;

            let stdout = "";
            pyodide.setStdout({
                batched: (text: string) => { stdout += text + "\n"; }
            });

            await pyodide.runPythonAsync(code);

            setOutput(stdout || "Код выполнен успешно (без вывода)");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsRunning(false);
        }
    };

    return { output, error, isRunning, pyodideReady, runCode }
}