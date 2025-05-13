import Content from '@/models/Content';
import { dbConnect } from '@/lib/mongodb';

export class ContentService {
  static async getContentById(id) {
    await dbConnect();
    return await Content.findById(id);
  }

  static async getContentBySlug(slug: string, status: string, pageId?: string) {
    await dbConnect();
    const query = pageId 
      ? { slug, pageId } 
      : { slug };

    if (status) {
      query.status = status;
    }
    return await Content.find(query).sort({ sectionId: 1, order: 1 });
  }

  static async getAllContent() {
    await dbConnect();
    return await Content.find({}).sort({ pageId: 1, sectionId: 1, order: 1 });
  }

  static async getAllPages() {
    await dbConnect();
    const pages = await Content.distinct('pageId');
    return pages.sort();
  }

  static async getAllSections(pageId) {
    await dbConnect();
    return await Content.distinct('sectionId', { pageId, sectionId: { $nin: [null, ''] } });
  }
  
  static async getContentForPage(pageId: string, status: string, slug?: string) {
    await dbConnect();
    const query = slug 
      ? { slug, pageId } 
      : { pageId };

    if (status) {
      query.status = status;
    }
    return await Content.find(query).sort({ sectionId: 1, order: 1 });
  }

  static async getContentForSection(pageId, sectionId) {
    await dbConnect();
    return await Content.find({ pageId, sectionId }).sort({ order: 1 });
  }

  static async createContent(contentData) {
    await dbConnect();
    if (contentData.slug && contentData.sectionId) {
      const existingContent = await Content.findOne({ 
        pageId: contentData.pageId, 
        sectionId: contentData.sectionId,
        slug: contentData.slug 
      });
      if (existingContent) {
        const error = new Error('Content with this combination of pageId, sectionId, and slug already exists');
        error.code = 11000;
        throw error;
      }
    }
    const content = new Content(contentData);
    return await content.save();
  }
  
  static async updateContent(id, updateData) {
    await dbConnect();
    const existingContent = await Content.findById(id);
    if (!existingContent) {
      return null;
    }
    const pageId = updateData.pageId || existingContent.pageId;
    const slug = updateData.slug || existingContent.slug;
    const sectionId = updateData.sectionId || existingContent.sectionId;
    if (updateData.pageId || updateData.slug || updateData.sectionId) {
      const existingDoc = await Content.findOne({
        _id: { $ne: id },
        pageId: pageId,
        sectionId: sectionId,
        slug: slug
      });
      if (existingDoc) {
        const error = new Error('Content with this combination of pageId, sectionId, and slug already exists');
        error.code = 11000;
        throw error;
      }
    }
    return await Content.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
  }

  static async updateContentBySlug(slug, updateData) {
    await dbConnect();
    const existingContent = await Content.findOne({ slug });
    if (!existingContent) {
      return null;
    }
    if (updateData.slug && updateData.slug !== slug) {
      const pageId = updateData.pageId || existingContent.pageId;
      const existingSlug = await Content.findOne({ 
        _id: { $ne: existingContent._id },
        pageId: pageId,
        slug: updateData.slug 
      });
      if (existingSlug) {
        const error = new Error('A content with this slug already exists for this page');
        error.code = 11000;
        throw error;
      }
    }
    if (updateData.sectionId && updateData.sectionId !== existingContent.sectionId) {
      const pageId = updateData.pageId || existingContent.pageId;
      const existingSectionId = await Content.findOne({ 
        _id: { $ne: existingContent._id },
        pageId: pageId,
        sectionId: updateData.sectionId 
      });
      if (existingSectionId) {
        const error = new Error('A content with this sectionId already exists for this page');
        error.code = 11000;
        throw error;
      }
    }
    
    return await Content.findOneAndUpdate({ slug }, updateData, { new: true, runValidators: true });
  }
  
  static async deleteContent(id) {
    await dbConnect();
    return await Content.findByIdAndDelete(id);
  }
  
  static async deleteContentBySlug(slug) {
    await dbConnect();
    return await Content.findOneAndDelete({ slug });
  }
  
  static async publishContent(id) {
    await dbConnect();
    return await Content.findByIdAndUpdate(id, { status: 'published' }, { new: true });
  }

  static async publishPage(pageId) {
    try {
      await dbConnect();
      const draftedContent = await Content.find({ 
        pageId: pageId, 
        status: 'drafted' 
      });
      if (draftedContent.length === 0) {
        return { 
          success: true, 
          message: 'No drafted content to publish',
          updatedCount: 0 
        };
      }
      const updateResult = await Content.updateMany(
        { pageId: pageId, status: 'drafted' },
        { $set: { status: 'published' } }
      );
      return { 
        success: true, 
        message: 'Page published successfully',
        updatedCount: updateResult.modifiedCount 
      };
    } catch (error) {
      console.error('Error publishing page:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to publish page' 
      };
    }
  }
  
  static async reorderContent(pageId, sectionId, orderedIds) {
    await dbConnect();
    const updates = orderedIds.map((id, index) => {
      return Content.findByIdAndUpdate(id, { order: index }, { new: true });
    });
    return await Promise.all(updates);
  }
  
  static async addContentField(id, fieldPath, value) {
    await dbConnect();
    const updateQuery = {};
    updateQuery[fieldPath] = value;
    return await Content.findByIdAndUpdate(id, { $set: updateQuery }, { new: true, runValidators: true });
  }
  
  static async getPublishedContent() {
    await dbConnect();
    return await Content.find({ status: 'published' }).sort({ pageId: 1, sectionId: 1, order: 1 });
  }
}