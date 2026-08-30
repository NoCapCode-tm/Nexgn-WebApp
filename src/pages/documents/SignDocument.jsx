import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import ReactQuill from "react-quill-new";
import SignatureCanvas from "react-signature-canvas";
import "react-quill-new/dist/quill.bubble.css";
import "../../styles/BaseLayout.css";
import "../templates/TemplateEditor.css";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/Layout/LoadingScreen";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


function SignDocument() {

   const DUMMY_MODE = true;

const dummyRequest = {
  _id: "request_demo_001",

  overallStatus: "pending",

  senderId: {
    _id: "sender_001",
    name: "MOHAMMAD ZIYA",
    email: "ziya@nocapcode.cloud",
  },

  recipient: {
    userId: {
      _id: "recipient_001",
      name: "Rahul Sharma",
      email: "rahul@example.com",
    },
    signedAt: null,
  },

  documentId: {
    _id: "doc_demo_001",
    title: "Employment Offer Letter",
  },

  senderip: "49.43.113.165",

  expiresat:
    "2026-09-04T19:21:52.422Z",
};

const dummyDocument = {
  _id: "doc_demo_001",

  title: "Employment Offer Letter",

  status: "sent",

  templateId: {
    _id: "template_demo_001",

    name: "Employment Offer Letter",

    file: {
      fileId: "YOUR_FILE_ID",

      fileName:
        "Employment-Offer-Letter.pdf",

      webViewLink:
        "https://drive.google.com/file/d/1bUYnZxMVARRu75KzcomQpV-FVbsuNLiW/preview",

      downloadLink:
        "https://drive.google.com/uc?export=download&id=1bUYnZxMVARRu75KzcomQpV-FVbsuNLiW",
    },

    htmlcontent: null,
  },

  assignedto: [
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
    },
  ],

  createdBy: {
    _id: "sender_001",
    name: "MOHAMMAD ZIYA",
    email: "ziya@nocapcode.cloud",
  },

  note:
    "Please review and sign the offer letter.",
};

const dummyWidgets = [
  {
    _id: "widget_1",
    widgetname: "name",
    page: 1,
    x: 90,
    y: 130,
    width: 0,
    height: 0,
  },

  {
    _id: "widget_2",
    widgetname: "email",
    page: 1,
    x: 90,
    y: 200,
    width: 0,
    height: 0  },

  {
    _id: "widget_3",
    widgetname: "date",
    page: 1,
    x: 410,
    y: 200,
    width: 0,
    height: 0,
  },

  {
    _id: "widget_4",
    widgetname: "text",
    page: 1,
    x: 90,
    y: 280,
    width: 0,
    height: 0,
  },

  {
    _id: "widget_5",
    widgetname: "number",
    page: 1,
    x: 90,
    y: 370,
    width: 0,
    height: 0,
  },

  {
    _id: "widget_6",
    widgetname: "signature",
    page: 1,
    x: 90,
    y: 460,
    width: 0,
    height: 0,
  },

  {
    _id: "widget_7",
    widgetname: "text",
    page: 2,
    x: 90,
    y: 160,
    width: 0,
    height: 0,
  },

  {
    _id: "widget_8",
    widgetname: "signature",
    page: 2,
    x: 90,
    y: 320,
    width: 0,
    height: 0,
  },
];

const dummyValues = {
  0: "Rahul Sharma",
  1: "rahul@example.com",
  2: "2026-08-30",
  3: "Software Engineer",
  4: "75000",
  5: "",
  6: "",
  7: "",
};
  const {id} = useParams();

  // const [request, setRequest] = useState(null);
  // const [document, setDocument] = useState(null);
  // const [widgets, setWidgets] = useState([]);
  // const [values, setValues] = useState({}); 

  const [request, setRequest] = useState(
  DUMMY_MODE ? dummyRequest : null
);

const [document, setDocument] = useState(
  DUMMY_MODE ? dummyDocument : null
);

const [widgets, setWidgets] = useState(
  DUMMY_MODE ? dummyWidgets : []
);

const [values, setValues] = useState(
  DUMMY_MODE ? dummyValues : {}
);

  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [zoom] = useState(1.2);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const canvasRef = useRef(null);


  //dummy data

 



  // Load the signature request + widgets
//   useEffect(() => {
//   async function load() {
//     setLoading(true)
//     try {
//       // 1. Get signature request
//       const reqRes = await axios.get(
//         `${API_URL}sign/getrequest/${id}`,
//         {
//           withCredentials: true,
//         }
//       );

//       // Axios already parses JSON
//       const req = reqRes.data.message;

//       setRequest(req);

//       // 2. Completed
//       if (req.overallStatus === "completed") {
//         setSuccess(true);
//         return;
//       }

//       // 3. Update/check request status
//       if (req.overallStatus === "pending") {
//         await axios.post(
//           `${API_URL}sign/statuschange`,
//           { id },
//           {
//             withCredentials: true,
//           }
//         );
//       }

//       // 4. Get document ID
//       const docId = req.documentId._id;

//       // 5. Get document widgets
//       const widgetRes = await axios.get(
//         `${API_URL}document/widgets/${docId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       const widgetData = widgetRes.data.message;

//       setDocument(widgetData.document);
//       setWidgets(widgetData.widgets || []);

//     } catch (err) {
//       console.error("API ERROR:", err);

//       // Exact backend message
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         "Something went wrong";

//       setError(message);
//       toast.error(message)
//     } finally {
//       setLoading(false);
//     }
//   }

//   load();
// }, [id]);

  const sigCanvasRefs = useRef({}); // { [widgetIndex]: SignatureCanvas instance }

function clearSignature(index) {
  sigCanvasRefs.current[index]?.clear();
  setValues((prev) => {
    const copy = { ...prev };
    delete copy[index];
    return copy;
  });
}

function handleSignatureEnd(index) {
  const canvas = sigCanvasRefs.current[index];
  if (!canvas || canvas.isEmpty()) return;

  const dataUrl = canvas.toDataURL("image/png"); // skip getTrimmedCanvas entirely
  setValues((prev) => ({ ...prev, [index]: dataUrl }));
}

  // Load PDF if the underlying template has a file
  // useEffect(() => {
  //   if (!document?.templateId?.file) return;

  //   async function loadPdf() {
  //     setLoading(true)
  //     try {
      
  //       const loadingTask = pdfjsLib.getDocument(
  //         `${API_URL}template/template/${document.templateId._id}/pdf`
  //       );
  //       const pdf = await loadingTask.promise;
  //       setPdfDoc(pdf);
  //       setPages(Array.from({ length: pdf.numPages }, (_, i) => i + 1));
  //       setActivePage(1);
  //     } catch (err) {
  //       console.error("PDF ERROR:", err);
  //     }finally{
  //       setLoading(false)
  //     }
  //   }
  //   loadPdf();
  // }, [document]);

  //dummy
  useEffect(() => {
  if (!document?.templateId?.file) return;

  async function loadPdf() {
    setLoading(true);

    try {
      const pdfUrl = DUMMY_MODE
        ? "/dummy/offer.pdf"
        : `${API_URL}template/template/${document.templateId._id}/pdf`;

      console.log("PDF URL:", pdfUrl);

      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
      });

      const pdf = await loadingTask.promise;

      console.log("PDF loaded:", pdf.numPages);

      setPdfDoc(pdf);

      setPages(
        Array.from(
          { length: pdf.numPages },
          (_, i) => i + 1
        )
      );

      setActivePage(1);
    } catch (err) {
      console.error("PDF ERROR:", err);

      setError(
        err?.message || "Failed to load PDF"
      );
    } finally {
      setLoading(false);
    }
  }

  loadPdf();
}, [document]);

  // useEffect(() => {
  //   if (!pdfDoc || !canvasRef.current) return;

  //   async function renderPage() {
  //     const page = await pdfDoc.getPage(activePage);
  //     const viewport = page.getViewport({ scale: zoom });
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = viewport.width;
  //     canvas.height = viewport.height;
  //     await page.render({ canvasContext: ctx, viewport }).promise;
  //   }
  //   renderPage();
  // }, [pdfDoc, activePage, zoom]);

  //dummy

  useEffect(() => {
  if (!pdfDoc || !canvasRef.current) return;

  async function renderPage() {
    try {
      const page = await pdfDoc.getPage(activePage);

      const viewport = page.getViewport({
        scale: zoom,
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;

    } catch (error) {
      console.error(
        "PDF PAGE RENDER ERROR:",
        error
      );
    }
  }

  renderPage();
}, [pdfDoc, activePage, zoom]);
  function handleChange(index, value) {
    setValues((prev) => ({ ...prev, [index]: value }));
  }

  function getMissingFields() {
  return widgets
    .map((w, i) => ({ ...w, index: i }))
    .filter((w) => !(values[w.index] && values[w.index].trim().length > 0));
}

function allFieldsFilled() {
  return getMissingFields().length === 0;
}

async function getClientIPs() {
  const [ipv4Res, ipv6Res] = await Promise.allSettled([
    fetch("https://api.ipify.org?format=json"),
    fetch("https://api6.ipify.org?format=json"),
  ]);

  const ipv4 =
    ipv4Res.status === "fulfilled"
      ? (await ipv4Res.value.json()).ip
      : null;

  const ipv6 =
    ipv6Res.status === "fulfilled"
      ? (await ipv6Res.value.json()).ip
      : null;

  return { ipv4, ipv6 };
}

  async function handleSubmit() {
    setError(null);

    if (!allFieldsFilled()) {
  const missing = getMissingFields();
  setError(
    `Please fill in: ${missing.map((w) => `${w.widgetname} (page ${w.page})`).join(", ")}`
  );
  return;
}

    setSubmitting(true);
    setLoading(true)
    try {
      const filledWidgets = widgets.map(
    (w, i) => ({
        index: i,

        widgetname:
            w.widgetname,

        page:
            w.page,

        x:
            w.x,

        y:
            w.y,

        width:
            w.width,

        height:
            w.height,

        value:
            values[i] || ""
    })
);
      const { ipv4, ipv6 } = await getClientIPs();
      console.log("IPv4:", ipv4);
      console.log("IPv6:", ipv6);
      const res = await fetch(`${API_URL}sign/requestsubmit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sign: id,
          widget: filledWidgets,
          ipv4: ipv4,
          ipv6:ipv6 // backend actually uses req.ip; this just satisfies validation
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Submission failed");

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false)
      setSubmitting(false);
    }
  }



  // if (loading) {
  //   return (
  //     <div className="template-editor-overlay">
  //       <div className="template-editor-modal">Loading document…</div>
  //     </div>
  //   );
  // }

  if (success) {
    return (
      <div className="template-editor-overlay">
        <div className="template-editor-modal" style={{ padding: 40, textAlign: "center" }}>
          <h2>Document Signed ✅</h2>
          <p>Thanks — this document has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="template-editor-overlay">
        <div className="template-editor-modal" style={{ padding: 40 }}>
          {error || "Document not found."}
        </div>
      </div>
    );
  }

  console.log(widgets);

  return (
    <>
    <div className="template-editor-overlay">
      <div className="template-editor-modal">
        <div className="template-editor-topbar">
          <span className="template-editor-title">
            {document.title}
          </span>
        </div>

        <div className="template-editor-body">
          <div className="template-editor-pages">
            {pages.map((page) => (
              <div
                key={page}
                className={`template-editor-page-thumb ${
                  activePage === page ? "template-editor-page-thumb--active" : ""
                }`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </div>
            ))}
          </div>

          <div className="template-editor-canvas">
            {document?.templateId?.file?.fileId ? (
              <>
                <canvas ref={canvasRef} className="template-editor-pdf-canvas" />

                {widgets
                  .map((w, index) => ({ ...w, index }))
                  .filter((w) => w.page === activePage)
                  .map((w) => (
                    <div
                      key={w.index}
                      className="template-editor-placed-widget"
                      style={{
                        left: w.x,
                        top: w.y,
                        width: w.width,
                        height: w.height,
                      }}
                    >
                      {w.widgetname === "signature" ? (
                        <div
    style={{
      border: "1px solid #d1d5db",
      borderRadius: 6,
      background: "#fff",
      position: "relative",
      width: "100%",
      height: "100%",
    }}
  >
    <SignatureCanvas
      ref={(ref) => (sigCanvasRefs.current[w.index] = ref)}
      penColor="black"
      canvasProps={{
        width: w.width,
        height: w.height,
        style: { width: "100%", height: "100%" },
      }}
      onEnd={() => handleSignatureEnd(w.index)}
    />
    <button
      type="button"
      onClick={() => clearSignature(w.index)}
      style={{
        position: "absolute",
        top: 2,
        right: 2,
        fontSize: 10,
        border: "none",
        background: "transparent",
        color: "#6b7280",
        cursor: "pointer",
      }}
    >
      Clear
    </button>
  </div>
                      ) : (
                        <input
                          className="template-editor-widget-input"
                          type={
                            w.widgetname === "date"
                              ? "date"
                              : w.widgetname === "number"
                              ? "number"
                              : w.widgetname === "email"
                              ? "email"
                              : "text"
                          }
                          placeholder={w.widgetname}
                          value={values[w.index] || ""}
                          onChange={(e) => handleChange(w.index, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <>
              <ReactQuill value={document?.templateId?.htmlcontent} readOnly theme="bubble" />
               {widgets
                  .map((w, index) => ({ ...w, index }))
                  .filter((w) => w.page === activePage)
                  .map((w) => (
                    <div
                      key={w.index}
                      className="template-editor-placed-widget"
                      style={{
                        left: w.x,
                        top: w.y,
                        width: w.width,
                        height: w.height,
                      }}
                    >
                      {w.widgetname === "signature" ? (
                        <div
    style={{
      border: "1px solid #d1d5db",
      borderRadius: 6,
      background: "#fff",
      position: "relative",
      width: "100%",
      height: "100%",
    }}
  >
    <SignatureCanvas
      ref={(ref) => (sigCanvasRefs.current[w.index] = ref)}
      penColor="black"
      canvasProps={{
        width: w.width,
        height: w.height,
        style: { width: "100%", height: "100%" },
      }}
      onEnd={() => handleSignatureEnd(w.index)}
    />
    <button
      type="button"
      onClick={() => clearSignature(w.index)}
      style={{
        position: "absolute",
        top: 2,
        right: 2,
        fontSize: 10,
        border: "none",
        background: "transparent",
        color: "#6b7280",
        cursor: "pointer",
      }}
    >
      Clear
    </button>
  </div>
                      ) : (
                        <input
                          className="template-editor-widget-input"
                          type={
                            w.widgetname === "date"
                              ? "date"
                              : w.widgetname === "number"
                              ? "number"
                              : w.widgetname === "email"
                              ? "email"
                              : "text"
                          }
                          placeholder={w.widgetname}
                          value={values[w.index] || ""}
                          onChange={(e) => handleChange(w.index, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  </>
            )}
          </div>

          <div className="template-editor-sidebar">
            <div className="template-editor-section">
              <span className="template-editor-section-label">Document Details</span>

              <div className="viewer-detail">
                <span>Name</span>
                <strong>{document.templateId?.name || document.title}</strong>
              </div>
              <div className="viewer-detail">
                <span>Status</span>
                <strong>{request?.overallStatus}</strong>
              </div>
            </div>

            {error && (
              <div className="template-editor-section" style={{ color: "red" }}>
                {error}
              </div>
            )}

            <div className="template-editor-section">
              <button
                className="template-editor-zoom-btn"
                style={{ width: "100%" }}
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Submitting…" : "Sign & Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
     {loading && (
                            <LoadingScreen
                              state="listening"
                              size={64}
                              theme="dark"
                              message="Signing Up"
                            />
                          )}
    </>
  );
}

export default SignDocument;