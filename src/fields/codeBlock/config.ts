import { codeFieldConfig } from '../codeField/config';

export const CodeBlock = {
  slug: 'code',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'blockId',
      type: 'text',
      required: true,
    },
    {
      name: 'codeContent',
      ...codeFieldConfig, 
      admin: {
        ...codeFieldConfig.admin,
        description: 'Enter code for this block'
      }
    }
  ]
};

