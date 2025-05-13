import { NextResponse } from 'next/server';
import { Page, Status } from '@/types/page';
import { revalidatePath } from 'next/cache';
import { ContentService } from './contentServices';

export class ContentOperation {
  static async getAllContent() {
    try {
      const contents = await ContentService.getAllContent();
      return NextResponse.json(contents);
    } catch (error) {
      console.error('Error getting all content:', error);
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      );
    }
  }

  static async getAllPages() {
    try {
      const pages = await ContentService.getAllPages();
      return NextResponse.json(pages);
    } catch (error) {
      console.error('Error getting all pages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pages' },
        { status: 500 }
      );
    }
  }

  static async getAllSections(pageId) {
    try {
      const sections = await ContentService.getAllSections(pageId);
      return NextResponse.json(sections);
    } catch (error) {
      console.error(`Error getting all sections for page with id ${pageId}:`, error);
      return NextResponse.json(
        { error: 'Failed to fetch sections' },
        { status: 500 }
      );
    }
  }

  static async createContent(request) {
    try {
      const body = await request.json();
      const content = await ContentService.createContent(body);
      return NextResponse.json(content, { status: 201 });
    } catch (error) {
      console.error('Error creating content:', error);
      if (error.code === 11000) {
        return NextResponse.json(
          { error: 'Content with that slug already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to create content' },
        { status: 500 }
      );
    }
  }

  static async getContentById(id: string, status: 'published' | 'archived' | 'drafted', slug?: string) {
    try {
      const content = await ContentService.getContentById(id, status, slug);
      if (!content) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(content);
    } catch (error) {
      console.error('Error getting content by ID:', error);
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      );
    }
  }

  static async getContentBySlug(slug: string, status: 'published' | 'archived' | 'drafted', pageId?: string) {
    try {
      const content = await ContentService.getContentBySlug(slug, status, pageId);
      if (!content) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(content);
    } catch (error) {
      console.error('Error getting content by slug:', error);
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      );
    }
  }

   static async updateContentById(id, request) {
    try {
      const body = await request.json();
      const updatedContent = await ContentService.updateContent(id, body);
      if (!updatedContent) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      if (updatedContent?.pageId) {
        const pageIdPath = updatedContent.pageId.toLowerCase();
        const isPublished = updatedContent.status === Status.PUBLISHED;
        const isDrafted = updatedContent.status === Status.DRAFTED;
        const hasSlug = !!updatedContent.slug;
        if (isPublished) {
          if (hasSlug) {
            revalidatePath(`/${pageIdPath}/${updatedContent.slug}`);
          } else {
            revalidatePath(pageIdPath === Page.HOME ? '/' : `/${pageIdPath}`);
          }
        } else if (isDrafted) {
          if (pageIdPath === Page.HOME.toLowerCase()) {
            revalidatePath('/preview');
          } else {
            revalidatePath(`/preview/${pageIdPath}${hasSlug ? `/${updatedContent.slug}` : ''}`);
          }
        }
      }
      return NextResponse.json(updatedContent);
    } catch (error) {
      console.log("this is error", error)
      console.error('Error updating content by ID:', error);
      if (error.code === 11000) {
        return NextResponse.json(
          { error: 'Content with that slug already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      );
    }
  }

  static async updateContentBySlug(slug, request) {
    try {
      const body = await request.json();
      const updatedContent = await ContentService.updateContentBySlug(slug, body);
      if (!updatedContent) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(updatedContent);
    } catch (error) {
      console.error('Error updating content by slug:', error);
      if (error.code === 11000) {
        return NextResponse.json(
          { error: 'Content with that slug already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      );
    }
  }

  static async deleteContentById(id) {
    try {
      const deletedContent = await ContentService.deleteContent(id);
      if (!deletedContent) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error deleting content by ID:', error);
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      );
    }
  }

  static async deleteContentBySlug(slug) {
    try {
      const deletedContent = await ContentService.deleteContentBySlug(slug);
      if (!deletedContent) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error deleting content by slug:', error);
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      );
    }
  }

  static async getContentForPage(pageId, status) {
    try {
      const contents = await ContentService.getContentForPage(pageId, status);
      return NextResponse.json(contents);
    } catch (error) {
      console.error('Error getting content for page:', error);
      return NextResponse.json(
        { error: 'Failed to fetch content for page' },
        { status: 500 }
      );
    }
  }

  static async getContentForSection(pageId, sectionId) {
    try {
      const contents = await ContentService.getContentForSection(pageId, sectionId);
      return NextResponse.json(contents);
    } catch (error) {
      console.error('Error getting content for section:', error);
      return NextResponse.json(
        { error: 'Failed to fetch content for section' },
        { status: 500 }
      );
    }
  }

  static async publishContent(id) {
    try {
      const publishedContent = await ContentService.publishContent(id);
      if (!publishedContent) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }
      if (publishedContent?.pageId) {
        const pageIdPath = publishedContent.pageId.toLowerCase();
        const hasSlug = !!publishedContent.slug;
        if (hasSlug) {
          revalidatePath(`/${pageIdPath}/${publishedContent.slug}`);
        } else {
          revalidatePath(pageIdPath === Page.HOME ? '/' : `/${pageIdPath}`);
        }
        if (pageIdPath === Page.HOME.toLowerCase()) {
          revalidatePath('/preview');
        } else {
          revalidatePath(`/preview/${pageIdPath}${hasSlug ? `/${publishedContent.slug}` : ''}`);
        }
      }
      return NextResponse.json(publishedContent);
    } catch (error) {
      console.error('Error publishing content:', error);
      return NextResponse.json(
        { error: 'Failed to publish content' },
        { status: 500 }
      );
    }
  }

  static async publishPage(pageId, status, slug) {
    try {
      const publishedPage = await ContentService.publishPage(pageId, status, slug);
      if (!publishedPage) {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        );
      }
      const hasSlug = !!slug;
      if (hasSlug) {
        revalidatePath(`/${pageId}/${slug}`);
      } else {
        revalidatePath(pageId === Page.HOME ? '/' : `/${pageId}`);
      }
      if (pageId === Page.HOME.toLowerCase()) {
        revalidatePath('/preview');
      } else {
        revalidatePath(`/preview/${pageId}${hasSlug ? `/${slug}` : ''}`);
      }
      return NextResponse.json(publishedPage);
    } catch (error) {
      console.error('Error publishing content:', error);
      return NextResponse.json(
        { error: 'Failed to publish content' },
        { status: 500 }
      );
    }
  }

  static async reorderContent(request) {
    try {
      const { pageId, sectionId, orderedIds } = await request.json();
      const results = await ContentService.reorderContent(pageId, sectionId, orderedIds);
      return NextResponse.json(results);
    } catch (error) {
      console.error('Error reordering content:', error);
      return NextResponse.json(
        { error: 'Failed to reorder content' },
        { status: 500 }
      );
    }
  }
}