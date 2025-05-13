import type { TextField } from 'payload'
import SelectComponent from './SelectComponent';

export const customSectionSelectField = (overrides = {}): TextField => {
  return {
    name: 'sectionId',
    type: 'text',
    admin: {
      components: {
        Field: {
          path: '@/fields/customSelect/SelectComponent#SelectComponent',
        },
      },
      position: 'sidebar',
      description: 'Select the section that this post belongs to',
      condition: (data) => Boolean(data?.page),
    },
    required: true,
    ...overrides,
  };
};