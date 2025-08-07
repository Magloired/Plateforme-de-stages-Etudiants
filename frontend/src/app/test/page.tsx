"use client";
import { runAllTests } from "@/services/api-test";
// adapte le chemin selon ton projet
import { useEffect, useState } from "react";

export default function TestPage() {
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    runAllTests().then(setTestResults);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">🧪 Tests API en cours...</h1>
      <pre>
        {JSON.stringify(testResults, null, 2)}
      </pre>
    </div>
  );
}
