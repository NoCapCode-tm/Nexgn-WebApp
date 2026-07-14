import { useState } from "react";
import MemberTemplatesList from "./MemberTemplatesList";
import MemberTemplates from "./MemberTemplates";
import MemberTemplateEditor from "./MemberTemplateEditor";

export default function MemberTemplatesPage() {
  const [view, setView] = useState("list");
  const [templateName, setTemplateName] = useState("");

  if (view === "editor") {
    return (
      <MemberTemplateEditor
        templateName={templateName}
        onBack={() => setView("list")}
      />
    );
  }

  if (view === "create") {
    return (
      <MemberTemplates
        onBack={() => setView("list")}
        onCreate={(name) => {
          setTemplateName(name);
          setView("editor");
        }}
      />
    );
  }

  return <MemberTemplatesList onAddTemplate={() => setView("create")} />;
}
