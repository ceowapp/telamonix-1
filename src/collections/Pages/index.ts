import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { codeFieldConfig } from '../../fields/codeField/config'
import { CodeBlock } from '../../fields/codeBlock/config'
import { slugField } from '@/fields/slug'
import { htmlRendererField } from '@/fields/htmlRenderer'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
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

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    pageId: true
  },
  admin: {
    defaultColumns: ['title', 'slug', 'pageId', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
          language: data?.language || 'en',
          pageId: data?.pageId || '',
          data,
        });
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
        language: data?.language || 'en',
        pageId: data?.pageId || '',
        data,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'pageId',
      type: 'text',
      required: true,
      validate: async (value, { req, id, data }) => {
        if (!value) return 'Page ID is required';
        const slug = data?.slug || '';
        const existingPage = await req.payload.find({
          collection: 'pages',
          where: { 
            and: [
              { pageId: { equals: value } },
              { slug: { equals: slug } },
              { id: { not_equals: id } }
            ]
          },
        });
        if (existingPage.docs.length > 0) {
          return 'The combination of Page ID and slug must be unique';
        }
        return true;
      },
      admin: {
        position: 'sidebar',
        description: 'Identifier for this page (can be reused with different slugs)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'sectionsTab',
          label: 'Sections',
          fields: [
            {
              name: 'sections',
              type: 'array',
              fields: [
                {
                  name: 'sectionId',
                  type: 'text',
                  required: true,
                  validate: (value, { siblingData, data }) => {
                    if (!value) return 'Section ID is required';
                    const sections = data?.sections || [];
                    const duplicates = sections.filter(section => 
                      section.sectionId === value && 
                      section.id !== siblingData.id
                    );
                    if (duplicates.length > 0) {
                      return 'Section ID must be unique within this page';
                    }
                    return true;
                  },
                  admin: {
                    description: 'Unique identifier for this section (for programmatic access)',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'sectionContent',
                  type: 'richText',
                  localized: true,
                },
                {
                  name: 'sectionjson',
                  type: 'json',
                  localized: true,
                },
                codeFieldConfig,
               {
                  name: 'contentBlocks',
                  type: 'blocks',
                  blocks: [
                    Banner, 
                    CodeBlock, 
                    MediaBlock,
                  ],
                  admin: {
                    description: 'Add various content blocks'
                  },
                },
                {
                  name: 'contentArray',
                  type: 'array',
                  label: 'Content Groups Array',
                  admin: {
                    description: 'Multiple content field groups',
                  },
                  fields: [
                    {
                      name: 'groupId',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Unique identifier for this content group',
                      },
                    },
                    {
                      name: 'contentFields',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'titleClassName',
                          type: 'text',
                        },
                        {
                          name: 'titlePosition',
                          type: 'select',
                          required: true,
                          options: [
                            { label: 'Start', value: 'start' },
                            { label: 'Center', value: 'center' },
                            { label: 'End', value: 'end' },
                          ],
                        },
                        {
                          name: 'subtitle',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'description',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'contentItems',
                          type: 'array',
                          required: false,
                          fields: [
                            {
                              name: 'id',
                              type: 'text',
                            },
                            {
                              name: 'title',
                              type: 'text',
                              localized: true,
                            },
                            {
                              name: 'titleClassName',
                              type: 'text',
                            },
                            {
                              name: 'subtitle',
                              type: 'text',
                              localized: true,
                            },
                            {
                              name: 'subtitleClassName',
                              type: 'text',
                            },
                            {
                              name: 'description',
                              type: 'textarea',
                              localized: true,
                            },
                            {
                              name: 'descriptionClassName',
                              type: 'text',
                            },
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
                                    UnorderedListFeature(),
                                    OrderedListFeature(),
                                    ChecklistFeature()
                                  ]
                                },
                              }),
                              label: 'Content',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'contentClassName',
                              type: 'text',
                            },
                            {
                              name: 'order',
                              type: 'select',
                              required: true,
                              options: [
                                { label: 'Image First', value: 'imageFirst' },
                                { label: 'Content First', value: 'infoFirst' },
                              ],
                            },
                            {
                              name: 'showButton',
                              type: 'select',
                              options: [
                                { label: 'False', value: 'false' },
                                { label: 'True', value: 'true' },
                              ],
                            },
                            {
                              name: 'buttonText',
                              localized: true,
                              type: 'text',
                            },
                            {
                              name: 'image',
                              type: 'upload',
                              relationTo: 'media',
                            },
                            {
                              name: 'imageLink',
                              type: 'text',
                            },
                            {
                              name: 'imageClassName',
                              type: 'text',
                            },
                            {
                              name: 'link',
                              localized: true,
                              type: 'text',
                            },
                            {
                              name: 'date',
                              type: 'date',
                            },
                            {
                              name: 'customFields',
                              type: 'array',
                              fields: [
                                {
                                  name: 'fieldName',
                                  type: 'text',
                                  required: true,
                                },
                                {
                                  name: 'fieldType',
                                  type: 'select',
                                  required: true,
                                  options: [
                                    { label: 'Text', value: 'text' },
                                    { label: 'Rich Text', value: 'richText' },
                                    { label: 'Number', value: 'number' },
                                    { label: 'Date', value: 'date' },
                                    { label: 'Image', value: 'image' },
                                    { label: 'Link', value: 'link' },
                                  ],
                                },
                                {
                                  name: 'textValue',
                                  type: 'text',
                                  admin: {
                                    condition: (data, siblingData) => siblingData?.fieldType === 'text',
                                  },
                                  localized: true,
                                },
                                {
                                  name: 'richTextValue',
                                  type: 'richText',
                                  admin: {
                                    condition: (data, siblingData) => siblingData?.fieldType === 'richText',
                                  },
                                  localized: true,
                                },
                                {
                                  name: 'numberValue',
                                  type: 'number',
                                  admin: {
                                    condition: (data, siblingData) => siblingData?.fieldType === 'number',
                                  },
                                },
                                {
                                  name: 'dateValue',
                                  type: 'date',
                                  admin: {
                                    condition: (data, siblingData) => siblingData?.fieldType === 'date',
                                  },
                                },
                                {
                                  name: 'imageValue',
                                  type: 'upload',
                                  relationTo: 'media',
                                  admin: {
                                    condition: (data, siblingData) => siblingData?.fieldType === 'image',
                                  },
                                },
                                {
                                  name: 'linkValue',
                                  type: 'group',
                                  admin: {
                                    condition: (data, siblingData) => siblingData?.fieldType === 'link',
                                  },
                                  fields: [
                                    {
                                      name: 'url',
                                      type: 'text',
                                      localized: true,
                                    },
                                    {
                                      name: 'label',
                                      type: 'text',
                                      localized: true,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          name: 'groupVisibility',
                          type: 'select',
                          options: [
                            { label: 'Visible', value: 'visible' },
                            { label: 'Hidden', value: 'hidden' },
                          ],
                          defaultValue: 'visible',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
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
            {
              name: 'keywords',
              type: 'text',
              localized: true,
              admin: {
                description: 'Comma-separated keywords for search engine optimization',
              }
            },
            {
              name: 'canonical',
              type: 'text',
              admin: {
                description: 'Canonical URL (leave blank to use the page URL)',
              }
            },
            {
              name: 'robots',
              type: 'select',
              defaultValue: 'index, follow',
              options: [
                { label: 'Index, Follow', value: 'index, follow' },
                { label: 'Index, No Follow', value: 'index, nofollow' },
                { label: 'No Index, Follow', value: 'noindex, follow' },
                { label: 'No Index, No Follow', value: 'noindex, nofollow' },
              ],
              admin: {
                description: 'Control how search engines crawl and index this page',
              }
            },
            {
              name: 'twitter',
              type: 'group',
              fields: [
                {
                  name: 'card',
                  type: 'select',
                  defaultValue: 'summary_large_image',
                  options: [
                    { label: 'Summary', value: 'summary' },
                    { label: 'Summary with Large Image', value: 'summary_large_image' },
                    { label: 'App', value: 'app' },
                    { label: 'Player', value: 'player' },
                  ],
                },
                {
                  name: 'site',
                  type: 'text',
                  admin: {
                    description: 'Twitter handle for the website (e.g., @naiscorp)',
                  }
                },
                {
                  name: 'creator',
                  type: 'text',
                  admin: {
                    description: 'Twitter handle for content creator (e.g., @authorname)',
                  }
                },
              ],
              admin: {
                description: 'Configure Twitter card information',
              }
            },
            {
              name: 'additionalMetaTags',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Add custom meta tags (name-content pairs)',
              }
            },
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
        position: 'sidebar',
      },
    },
    {
      name: 'parentPage',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
      validate: async (value, { data, req, id }) => {
        if (value === id) {
          return 'A page cannot be its own parent';
        }
        if (value) {
          try {
            const parentPage = await req.payload.findByID({
              collection: 'pages',
              id: value,
            });
            let currentParentId = parentPage.parentPage;
            while (currentParentId) {
              if (currentParentId === id) {
                return 'Circular reference detected - this would create a loop in the page hierarchy';
              }
              const nextParent = await req.payload.findByID({
                collection: 'pages',
                id: currentParentId,
              });
              currentParentId = nextParent.parentPage;
            }
          } catch (error) {
            console.error('Error checking parent page hierarchy:', error);
          }
        }
        return true;
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [
      populatePublishedAt,
      async ({ data, operation }) => {
        if (operation === 'create' && !data.pageId) {
          data.pageId = `page-${Date.now()}`;
        }
        return data;
      }
    ],
    afterDelete: [revalidateDelete],
    beforeDelete: [
      async ({ req, id }) => {
        console.log(`Deleting page ${id}`);
        return true;
      }
    ],
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
