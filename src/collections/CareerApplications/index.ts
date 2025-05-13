import { CollectionConfig } from 'payload/types';
import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';

export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  admin: {
    useAsTitle: 'name',
    description: 'Job applications submitted through the careers page',
  },
  access: {
    read: authenticatedOrPublished,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'availableTime',
      type: 'date',
      label: 'Time Available',
    },
    {
      name: 'job',
      type: 'text',
      required: true,
      label: 'Position Applied For',
    },
    {
      name: 'salaryBottom',
      type: 'text',
      label: 'Minimum Salary Expectation',
    },
    {
      name: 'salaryTop',
      type: 'text',
      label: 'Maximum Salary Expectation',
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Attachments',
      fields: [
        {
          name: 'file',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        }
      ]
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      admin: {
        readOnly: true,
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'status',
      type: 'select',
      label: 'Application Status',
      defaultValue: 'received',
      options: [
        { label: 'Received', value: 'received' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Interview Scheduled', value: 'interview' },
        { label: 'Hired', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Notes about the candidate (only visible to admins)',
      },
    },
  ],
};