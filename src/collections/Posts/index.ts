import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt', 'order', 'page', 'sectionId'],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
          language: data?.language || 'en',
          data,
        });
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
        language: data?.language || 'en',
        data,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Career', value: 'careers' },
        { label: 'News', value: 'news' },
      ],
      required: true,
      defaultValue: 'news',
      admin: {
        position: 'sidebar',
        description: 'Select the type of post'
      }
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Select which page this post belongs to'
      }
    },
    {
      name: 'sectionId',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Enter the section ID that this post belongs to',
        condition: (data) => Boolean(data?.page),
      },
      validate: async (value, { data, req, id, user, operation }) => {
        if (operation !== 'create' && operation !== 'update') return true;
        if (!value || !data?.page) return true;
        try {
          const pageId = typeof data.page === 'object' ? data.page.id : data.page;
          const page = await req.payload.findByID({
            collection: 'pages',
            id: pageId,
          });
          if (!page || !page?.sectionsTab?.sections || !Array.isArray(page?.sectionsTab?.sections)) {
            return 'Unable to verify section ID - page structure issue';
          }
          const sectionExists = page.sectionsTab.sections.some(
            section => section.sectionId === value
          );
          if (!sectionExists) {
            return `The section ID "${value}" does not exist on the selected page. Please enter a valid section ID.`;
          }
          return true;
        } catch (error) {
          console.error('Error validating section ID:', error);
          return 'Error validating section ID. Please try again.';
        }
      }
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order of this post (lower numbers appear first)'
      },
      defaultValue: 99,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'featureImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'featureImageLink',
              type: 'text',
            },
            {
              name: 'newsFields',
              type: 'group',
              admin: {
                condition: (data, siblingData) => {
                  return siblingData?.category === 'news';
                }
              },
              fields: [
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                        BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HorizontalRuleFeature(),
                      ]
                    },
                  }),
                  label: 'Content',
                  localized: true,
                  required: true,
                },
                {
                  name: 'publishDate',
                  type: 'date',
                  admin: {
                    description: 'News publish date'
                  },
                  defaultValue: () => new Date().toISOString(),
                }
              ]
            },
            {
              name: 'careerFields',
              type: 'group',
              admin: {
                condition: (data, siblingData, { blockData, path, user }) => {
                  return siblingData?.category === 'careers';
                }
              },
              fields: [
                {
                  name: 'jobId',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: {
                    description: 'Job unique identifier (auto-generated)'
                  },
                  hooks: {
                    beforeChange: [
                      async ({ value, data, req, operation }) => {
                        if (value && operation === 'update') return value;
                        const prefix = 'JOB';
                        const timestamp = Date.now().toString().slice(-6);
                        const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
                        const generatedId = `${prefix}-${timestamp}-${randomChars}`;
                        try {
                          const existingJobs = await req.payload.find({
                            collection: 'posts',
                            where: {
                              'careerFields.jobId': { equals: generatedId }
                            }
                          });
                          if (existingJobs.totalDocs > 0) {
                            const extraRandomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
                            return `${generatedId}-${extraRandomChars}`;
                          }
                          return generatedId;
                        } catch (error) {
                          console.error('Error validating job ID uniqueness:', error);
                          return generatedId;
                        }
                      }
                    ]
                  }
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Job title'
                  }
                },
                {
                  name: 'tags',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      localized: true,
                    },
                  ],
                },
                {
                  name: 'summary',
                  type: 'textarea',
                  localized: true,
                  admin: {
                    description: 'Card background'
                  }
                },
                {
                  name: 'responsibilities',
                  type: 'richText',
                  localized: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                        BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HorizontalRuleFeature(),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        ChecklistFeature()
                      ]
                    },
                  }),
                  admin: {
                    description: 'Key responsibilities'
                  }
                },
                {
                  name: 'qualifications',
                  type: 'richText',
                  localized: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                        BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HorizontalRuleFeature(),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        ChecklistFeature()
                      ]
                    },
                  }),
                  admin: {
                    description: 'Qualification'
                  }
                },
                {
                  name: 'address',
                  localized: true,
                  type: 'text',
                  admin: {
                    description: 'Job location address'
                  }
                },
                {
                  name: 'salaryRange',
                  localized: true,
                  type: 'text',
                  admin: {
                    description: 'Salary range for the position'
                  }
                },
                {
                  name: 'background',
                  type: 'text',
                  admin: {
                    description: 'Card background'
                  }
                },
              ]
            }
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              maxDepth: 2,
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              localized: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({
              localized: true,
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [
      revalidatePost,
      async ({ doc, req }) => {
        if (doc.page && doc.section) {
          await req.payload.update({
            collection: 'pages',
            id: doc.page,
            data: {}, 
          });
        }
      }
    ],
    afterDelete: [
      revalidateDelete,
      async ({ doc, req }) => {
        if (doc.page) {
          await req.payload.update({
            collection: 'pages',
            id: doc.page,
            data: {},
          });
        }
      }
    ],
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}