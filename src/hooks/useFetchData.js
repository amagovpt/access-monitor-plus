// import { useEffect, useState } from "react";
// import { api } from "../config/api";
// import { processData } from "../services";

// export const useFetchData = (content, contentHtml, decodedUrl) => {
//   const [dataProcess, setDataProcess] = useState([]);
//   const [loadingProgress, setLoadingProgress] = useState(true);
//   const [originalData, setOriginalData] = useState([]);
//   const [pageCode, setPageCode] = useState();
//   const [tot, setTot] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoadingProgress(true);

//       try {
//         const storedData = localStorage.getItem("evaluation");
//         const storedUrl = localStorage.getItem("evaluationUrl");

//         const currentUrl = content === "html" ? contentHtml : decodedUrl;

//         if (storedData && storedUrl === currentUrl) {
//           const parsedStoredData = JSON.parse(storedData);
//           setOriginalData(parsedStoredData);
//           setDataProcess(processData(parsedStoredData?.result?.data?.tot));
//           setPageCode(parsedStoredData?.result?.pagecode || "html");
//           setTot(parsedStoredData?.result?.data?.tot);
//           setLoadingProgress(false);
//           return;
//         }

//         const response =
//           content === "html"
//             ? await api.post("/eval/html", { html: contentHtml })
//             : await api.get(`/eval/${decodedUrl}`);

//         if (content !== "html") {
//           localStorage.setItem("evaluation", JSON.stringify(response.data));
//           localStorage.setItem("evaluationUrl", currentUrl);
//         }

//         setTot(response?.data?.result?.data.tot);
//         setOriginalData(response.data);
//         setDataProcess(processData(response.data?.result?.data?.tot));
//         setPageCode(response.data?.result?.pagecode || "html");
//         setLoadingProgress(false);
//       } catch (error) {
//         console.error("Erro", error);
//         setLoadingProgress(false);
//       }
//     };

//     fetchData();
//   }, [content, contentHtml, decodedUrl]);

//   return { dataProcess, loadingProgress, originalData, pageCode, tot };
// };

import { useEffect, useState } from "react";
import { api } from "../config/api";
import { processData } from "../services";

let tot;

const useFetchData = (content, contentHtml, decodedUrl) => {
  const [dataProcess, setDataProcess] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [pageCode, setPageCode] = useState();
  const [tot, setTot] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(true);

      try {
        const storedData = localStorage.getItem("evaluation");
        const storedUrl = localStorage.getItem("evaluationUrl");

        const currentUrl = content === "html" ? contentHtml : decodedUrl;

        if (storedData && storedUrl === currentUrl) {
          const parsedStoredData = JSON.parse(storedData);
          setOriginalData(parsedStoredData);
          setTot(parsedStoredData?.result?.data?.tot);
          setDataProcess(processData(parsedStoredData?.result?.data?.tot));
          setPageCode(parsedStoredData?.result?.pagecode || "html");
          setLoadingProgress(false);
          return;
        }

        const response =
          content === "html"
            ? await api.post("/eval/html", { html: contentHtml })
            : await api.get(`/eval/${decodedUrl}`);

        if (content !== "html") {
          localStorage.setItem("evaluation", JSON.stringify(response.data));
          localStorage.setItem("evaluationUrl", currentUrl);
        }

        const fetchedTot = response?.data?.result?.data.tot;
        setTot(fetchedTot);
        setOriginalData(response.data);
        setDataProcess(processData(fetchedTot));
        setPageCode(response.data?.result?.pagecode || "html");
        setLoadingProgress(false);
      } catch (error) {
        console.error("Erro", error);
        setLoadingProgress(false);
      }
    };

    fetchData();
  }, [content, contentHtml, decodedUrl]);

  return { dataProcess, loadingProgress, originalData, pageCode, tot };
};

export { useFetchData, tot };
