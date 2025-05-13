import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    maxLoginAttempts: 5, 
    lockTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    tokenExpiration: 7200, // seconds
    verify: false, // set to true if you want email verification
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    // Add these explicit field definitions
    {
      name: 'loginAttempts',
      type: 'number',
      defaultValue: 0,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'lockUntil',
      type: 'date',
      admin: {
        hidden: true,
      },
    }
  ],
  timestamps: true,
}