import { HTMLRenderer } from './HTMLRenderer';

export const HTMLPreviewComponent = ({ path, value }) => {
  if (!value) return null;
  return (
    <div className="html-preview-wrapper">
      <h4>HTML Preview</h4>
      <div className="html-preview-content">
        <HTMLRenderer data={{ codeField: value }} />
      </div>
    </div>
  );
};
