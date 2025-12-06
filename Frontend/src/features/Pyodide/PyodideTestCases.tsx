export interface TestCase {
  input: any;
  expected: any;
}

export const runUserCode = async (
  pyodide: any,
  code: string
): Promise<string> => {
  let stdout = "";
  pyodide.setStdout({
    batched: (text: string) => { stdout += text + "\n"; }
  });
  await pyodide.runPythonAsync(code);
  return stdout || "Код выполнен успешно (без вывода)";
};

export const runWithTests = async (
  pyodide: any,
  userCode: string,
  testCases: TestCase[]
) => {
  await pyodide.runPythonAsync(userCode);
  let results: { input: any; expected: any; output: any; pass: boolean }[] = [];

  for (let test of testCases) {
    const inputStr = Array.isArray(test.input) ? `[${test.input.join(", ")}]` : `"${test.input}"`;
    const codeToRun = `user_func(${inputStr})`;
    const output = await pyodide.runPythonAsync(codeToRun);

    results.push({
      input: test.input,
      expected: test.expected,
      output,
      pass: output === test.expected
    });
  }

  return results;
};