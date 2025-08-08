
import { apiService } from "@/services/api";
import { runAllTests } from "@/services/api-test";
import { useQuery } from "@tanstack/react-query";
// adapte le chemin selon ton projet
import { useEffect, useState } from "react";

export default async function TestPage() {
  // const [testResults, setTestResults] = useState<any>(null);



  const stages = await apiService.offresDeStage.getAll()


  // useEffect(() => {
  //   runAllTests().then(setTestResults);
  // }, []);

  return (
    <div className="p-8 ">
      <pre className="bg-muted p-4 rounded-lg text-black overflow-auto text-sm border border-border">
        {/* {JSON.stringify(testResults, null, 2)} */}

        {JSON.stringify(stages, null, 2)}
      </pre>
    </div>
  );
}
