import { useState } from "react";
import MemberTemplatesList from "./MemberTemplatesList";
import MemberTemplates from "./MemberTemplates";
import MemberTemplateEditor from "./MemberTemplateEditor";

export default function MemberTemplatesPage() {
  const [view, setView] = useState("list");
  const [templateName, setTemplateName] = useState("");
  const [templateFile, setTemplateFile] = useState(null);

  if (view === "editor") {
    return (
      <MemberTemplateEditor
        templateName={templateName}
        templateFile={templateFile}
        onBack={() => setView("list")}
      />
    );
  }

  if (view === "create") {
    return (
      <MemberTemplates
        onBack={() => setView("list")}
        onCreate={(name, file) => {
          setTemplateName(name);
          setTemplateFile(file || null);
          setView("editor");
        }}
      />
    );
  }

  return <MemberTemplatesList onAddTemplate={() => setView("create")} />;
}
