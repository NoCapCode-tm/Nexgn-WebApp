import { useState } from "react";
import TemplatesList from "./TemplatesList";
import Templates from "./Templates";
import TemplateEditor from "./TemplateEditor";

export default function TemplatesPage() {
  const [view, setView] = useState("list");
  const [templateName, setTemplateName] = useState("");
  const [templateFile, setTemplateFile] = useState(null);

  if (view === "editor") {
    return (
      <TemplateEditor
        templateName={templateName}
        templateFile={templateFile}
        onBack={() => setView("list")}
      />
    );
  }

  if (view === "create") {
    return (
      <Templates
        onBack={() => setView("list")}
        onCreate={(name, file) => {
          setTemplateName(name);
          setTemplateFile(file || null);
          setView("editor");
        }}
      />
    );
  }

  return <TemplatesList onAddTemplate={() => setView("create")} />;
}
