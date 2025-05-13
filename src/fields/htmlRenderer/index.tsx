import { HTMLRenderer } from '@/components/shared/HTMLRenderer';

export const htmlRendererField = {
  name: 'htmlContent',
  type: 'custom',
  admin: {
    description: 'Preview of the HTML code entered above',
    components: {
      Field: ({ path, value, onChange, data }) => {
        const htmlCode = data?.codeField || '';
        return (
          <div className="html-renderer-field">
            <div className="preview-section">
              <h4>HTML Preview</h4>
              <HTMLRenderer data={{ codeField: htmlCode }} />
            </div>
          </div>
        );
      }
    }
  }
};