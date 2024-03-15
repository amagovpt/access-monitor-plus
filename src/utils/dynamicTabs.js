import { InsertHtml } from "../pages/Home/_components/insert-html";
import { InsertHtmlUpload } from "../pages/Home/_components/insert-upload-html";
import { InsertUrl } from "../pages/Home/_components/insert-url";

export const dynamicTabs = [
  {
    eventKey: "tab1",
    title: "Insert URL",
    component: <InsertUrl />,
  },
  {
    eventKey: "tab2",
    title: "Insert HTML code",
    component: <InsertHtml />,
  },
  {
    eventKey: "tab3",
    title: "Upload HTML file",
    component: <InsertHtmlUpload />,
  },
];

export const detailsTabs = [
  {
    eventKey: "tab1",
    title: "Elements",
    component: (
      <>
        <div style={{ background: "white", padding: 30 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </>
    ),
  },
];
