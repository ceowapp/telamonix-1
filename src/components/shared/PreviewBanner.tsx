'use client';
import React, { useState, useCallback } from 'react';
import { Status, type PageData } from '@/types/page';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ContentService } from '@/utils/api/content';
import { toast } from 'sonner';
import { type ContentProps } from "@/types/content";
import { findSection, isValidSection } from '@/utils/content/contentUtils';

interface PreviewBannerProps {
  data: ContentProps | null;
  loading?: boolean;
  error?: string | null;
  returnUrl?: string;
}

const PreviewBanner: React.FC<PreviewBannerProps> = ({ 
  data, 
  loading = false,
  error = null,
  returnUrl 
}) => {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="fixed top-0 w-full bg-amber-600 text-white px-4 py-3 shadow-md z-[99999]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex-1 mb-3 sm:mb-0">
            <div className="flex items-center">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                PREVIEW ERROR
              </span>
              <h3 className="text-lg font-medium">No content data available</h3>
            </div>
            <p className="text-amber-100 text-sm mt-1">
              Unable to load content information for this preview. The content may have been deleted or you may not have access.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push('/admin/content')}
            className="inline-flex items-center px-3 py-2 border border-amber-300 shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
          >
            <ArrowLeftIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
            Back to Content List
          </button>
        </div>
      </div>
    );
  }
  const pageId = data[0]?.pageId;

  const handlePublish = useCallback(async () => {
    if (!pageId) {
      toast.error('Page ID is missing. Cannot publish.');
      return;
    }
    try {
      setPublishing(true);
      const result = await ContentService.publishPage(pageId);
      if (result && result.success) {
        toast.success(`Page published successfully! (${result.updatedCount || 0} items updated)`);
        router.push(returnUrl || `/admin/content`);
        router.refresh();
      } else {
        toast.error(result?.error || 'Failed to publish page');
      }
    } catch (err) {
      console.error('Error publishing page:', err);
      toast.error('An error occurred while publishing page.');
    } finally {
      setPublishing(false);
    }
  }, [pageId, returnUrl, router]);

  return (
    <div className="fixed top-0 w-full bg-indigo-700 text-white px-4 py-3 shadow-md z-[99999]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex-1 mb-3 sm:mb-0">
          <div className="flex items-center">
            <span className="bg-yellow-400 text-indigo-900 px-2 py-1 rounded text-xs font-bold mr-2">
              PREVIEW MODE
            </span>
            <h3 className="text-lg font-medium capitalize">
              {pageId ? `${pageId} Page Preview` : "Page Preview"}
            </h3>
          </div>
          <p className="text-indigo-200 text-sm mt-1">
            You are viewing this page in preview mode. Content changes will not be visible to visitors until published.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => router.push(returnUrl || `/admin/content`)}
            className="inline-flex items-center px-3 py-2 border border-indigo-300 shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            <ArrowLeftIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
            Back to Editor
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            {publishing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-700 mr-2"></div>
                Publishing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Go Live
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewBanner;