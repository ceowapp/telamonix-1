interface CareerFields {
  jobId?: string;
  title?: string;
  tags?: Array<{name?: string}> | string;
  date?: string | Date;
  address?: string;
  salaryRange?: string;
  background?: string;
  summary?: string;
  responsibilities?: { root?: any } | string;
  qualifications?: { root?: any } | string;
}

interface JobData {
  id: string;
  jobId: string;
  date: string;
  title: string;
  tags: string[];
  salaryRange: string;
  address: string;
  background: string;
  summary: string;
  responsibilities: any;
  qualifications: any;
}

/**
 * Processes a single career item with comprehensive type guards and safety checks
 * 
 * @param item - The career item to process
 * @returns Processed JobData or null if invalid input
 */
export const processCareerData = (item: any): JobData | null => {
  // Check if item exists and is an object
  if (!item || typeof item !== 'object') {
    return null;
  }

  // Initialize with default values
  const jobData: JobData = {
    id: typeof item.id === 'string' ? item.id : '',
    jobId: '',
    date: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    title: 'Untitled Position',
    tags: [],
    salaryRange: 'Not specified',
    address: 'Location not specified',
    background: 'linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)',
    summary: '',
    responsibilities: null,
    qualifications: null
  };

  // Ensure careerFields exists
  const careerFields: CareerFields = item.careerFields && typeof item.careerFields === 'object' 
    ? item.careerFields 
    : {};

  // Extract fields with type guards
  jobData.jobId = typeof careerFields.jobId === 'string' && careerFields.jobId.trim() 
    ? careerFields.jobId.trim() 
    : jobData.id;
    
  jobData.title = typeof careerFields.title === 'string' && careerFields.title.trim() 
    ? careerFields.title.trim() 
    : jobData.title;
    
  jobData.salaryRange = typeof careerFields.salaryRange === 'string' && careerFields.salaryRange.trim() 
    ? careerFields.salaryRange.trim() 
    : jobData.salaryRange;
    
  jobData.address = typeof careerFields.address === 'string' && careerFields.address.trim() 
    ? careerFields.address.trim() 
    : jobData.address;
    
  jobData.background = typeof careerFields.background === 'string' && careerFields.background.trim() 
    ? careerFields.background.trim() 
    : jobData.background;
    
  // Process summary
  jobData.summary = typeof careerFields.summary === 'string' && careerFields.summary.trim() 
    ? careerFields.summary.trim() 
    : '';

  // Process responsibilities
  if (careerFields.responsibilities) {
    if (typeof careerFields.responsibilities === 'string') {
      jobData.responsibilities = careerFields.responsibilities.trim();
    } else if (typeof careerFields.responsibilities === 'object' && careerFields.responsibilities !== null) {
      // Handle rich text format with root object
      jobData.responsibilities = careerFields.responsibilities;
    }
  }

  // Process qualifications
  if (careerFields.qualifications) {
    if (typeof careerFields.qualifications === 'string') {
      jobData.qualifications = careerFields.qualifications.trim();
    } else if (typeof careerFields.qualifications === 'object' && careerFields.qualifications !== null) {
      // Handle rich text format with root object
      jobData.qualifications = careerFields.qualifications;
    }
  }

  // Process date
  if (careerFields.date) {
    let parsedDate: Date;
    
    if (careerFields.date instanceof Date) {
      parsedDate = careerFields.date;
    } else if (typeof careerFields.date === 'string') {
      parsedDate = new Date(careerFields.date);
    } else {
      parsedDate = new Date();
    }
    
    if (!isNaN(parsedDate.getTime())) {
      jobData.date = parsedDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  }

  // Process tags with multiple formats
  try {
    if (Array.isArray(careerFields.tags)) {
      jobData.tags = careerFields.tags
        .map(tag => typeof tag === 'object' && tag !== null ? tag.name?.trim() : 
             typeof tag === 'string' ? tag.trim() : null)
        .filter((name): name is string => typeof name === 'string' && name.length > 0);
    } else if (typeof careerFields.tags === 'string') {
      const tagsStr = careerFields.tags.trim();
      
      if (tagsStr.includes(',')) {
        // Handle comma-separated format
        jobData.tags = tagsStr
          .split(',')
          .map(tag => tag.trim().replace(/^"|"$/g, ''))
          .filter(Boolean);
      } else if (tagsStr.startsWith('[') && tagsStr.endsWith(']')) {
        // Handle JSON array format
        try {
          const parsedTags = JSON.parse(tagsStr);
          if (Array.isArray(parsedTags)) {
            jobData.tags = parsedTags
              .map(item => typeof item === 'object' && item !== null ? item.name?.trim() : 
                   typeof item === 'string' ? item.trim() : null)
              .filter((name): name is string => typeof name === 'string' && name.length > 0);
          }
        } catch {
          jobData.tags = [tagsStr];
        }
      } else if (tagsStr) {
        // Handle single tag
        jobData.tags = [tagsStr];
      }
    }
  } catch (error) {
    console.error('Error parsing career tags:', error);
    jobData.tags = [];
  }

  // Process publishedAt date if available
  if (item.publishedAt && typeof item.publishedAt === 'string') {
    try {
      const publishDate = new Date(item.publishedAt);
      if (!isNaN(publishDate.getTime())) {
        jobData.date = publishDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch (error) {
      console.error('Error parsing publishedAt date:', error);
    }
  }

  // Process newsFields.publishDate if available (as a fallback)
  if (item.newsFields && 
      typeof item.newsFields === 'object' && 
      item.newsFields.publishDate && 
      typeof item.newsFields.publishDate === 'string') {
    try {
      const publishDate = new Date(item.newsFields.publishDate);
      if (!isNaN(publishDate.getTime())) {
        jobData.date = publishDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch (error) {
      console.error('Error parsing newsFields.publishDate:', error);
    }
  }

  return jobData;
};

/**
 * Process multiple career items
 * 
 * @param items - Array of career items to process
 * @returns Array of processed JobData objects
 */
export const processCareerDataArray = (items: any[]): JobData[] => {
  if (!Array.isArray(items)) {
    return [];
  }
  
  return items
    .map(processCareerData)
    .filter((item): item is JobData => item !== null);
};