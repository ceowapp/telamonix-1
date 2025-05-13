"use client"
import React, { useEffect, useState } from 'react';
import { useField, Select, useDocumentInfo, useConfig } from '@payloadcms/ui';

type SelectComponentProps = {
  path: string;
  name: string;
  required?: boolean;
  label?: string;
  admin?: {
    description?: string;
    condition?: any;
  };
};

type SectionOption = {
  label: string;
  value: string;
};

export const SelectComponent: React.FC<CustomSectionSelectProps> = (props) => {
  const { path, required, label, admin } = props;
  const { value, setValue } = useField<string>({ path });
  const { id, currentEditor, publishedDoc } = useDocumentInfo();
  const { serverURL } = useConfig();
  const [options, setOptions] = useState<SectionOption[]>([
    { label: 'Loading sections...', value: '' }
  ]);
  console.log("this is currentEditor", currentEditor)
  const [pageId, setPageId] = useState<string | null>(null);
  useEffect(() => {
    const loadSections = async () => {
      const currentPageId = currentEditor?.page?.id || currentEditor?.page;
      
      // If no page is selected, or it's the same as before, do nothing
      if (!currentPageId || currentPageId === pageId) {
        if (!currentPageId) {
          setOptions([{ label: 'Please select a page first', value: '' }]);
        }
        return;
      }
      
      // Update the tracked page ID
      setPageId(currentPageId);
      
      // Show loading state
      setOptions([{ label: 'Loading sections...', value: '' }]);
      
      try {
        // Fetch the page to get its sections
        const response = await fetch(`${serverURL}/api/pages/${currentPageId}?depth=1`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch page data');
        }
        
        const pageData = await response.json();
        
        // Handle the sections from the page data
        if (pageData?.sections && Array.isArray(pageData.sections)) {
          const sectionOptions = pageData.sections.map(section => {
            const sectionId = typeof section === 'object' ? section.id : section;
            const sectionTitle = typeof section === 'object' ? (section.title || `Section ${sectionId}`) : `Section ${sectionId}`;
            
            return {
              label: sectionTitle,
              value: sectionId,
            };
          });
          
          if (sectionOptions.length > 0) {
            setOptions(sectionOptions);
            
            // If the current value is not in the new options, reset it
            if (value && !sectionOptions.find(option => option.value === value)) {
              setValue(undefined);
            }
          } else {
            setOptions([
              { label: 'No sections found for this page', value: 'main' },
              { label: 'Main Section', value: 'main' }
            ]);
          }
        } else {
          setOptions([
            { label: 'Main Section', value: 'main' },
            { label: 'Test Option 1', value: 'test1' },
            { label: 'Test Option 2', value: 'test2' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
        setOptions([
          { label: 'Error loading sections', value: 'error' },
          { label: 'Main Section', value: 'main' }
        ]);
      }
    };
    
    loadSections();
      const intervalId = setInterval(() => {
      const currentPageId = currentEditor?.page?.id || currentEditor?.page;
      if (currentPageId && currentPageId !== pageId) {
        loadSections();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [pageId, serverURL, setValue, value]);
  
  return (
    <div className="field-type">
      <Select
        label={label || 'Section'}
        name={path}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={options}
        admin={admin}
      />
    </div>
  );
};
