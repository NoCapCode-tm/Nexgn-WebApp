import { useState } from "react";
import MemberTemplatesList from "./MemberTemplatesList";
import MemberTemplates from "./MemberTemplates";

export default function MemberTemplatesPage() {
  const [view, setView] = useState("list");

  if (view === "create") {
    return <MemberTemplates onBack={() => setView("list")} />;
  }

  return <MemberTemplatesList onAddTemplate={() => setView("create")} />;
}
