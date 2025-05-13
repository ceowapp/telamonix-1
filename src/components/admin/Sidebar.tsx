'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOut } from '@/actions/auth';
import { useState } from 'react';
import { 
  UserIcon, 
  DocumentTextIcon, 
  Bars3Icon, 
  XMarkIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const navigation = [
    { name: 'User Management', href: '/admin/users', icon: UserIcon },
    { name: 'Content Management', href: '/admin/content', icon: DocumentTextIcon },
  ];

  return (
    <>
      <div className={`${sidebarOpen ? 'lg:hidden' : ''} fixed top-0 left-0 right-0 z-40 flex items-center p-4 bg-white border-b`}>
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="ml-3 text-xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
      
      <div
        className={`fixed inset-0 z-40 flex lg:hidden transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
          <div className="absolute top-0 right-0 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center px-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`${
                    pathname.startsWith(item.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      pathname.startsWith(item.href)
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    } mr-4 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="px-4 py-4 border-t">
            <button
              onClick={SignOut}
              className="group w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              <ArrowLeftOnRectangleIcon
                className="h-6 w-6 mr-3 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Log Out
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true" />
      </div>
      
      <div className={`lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0 block' : '-translate-x-full hidden'
        }`}>
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname.startsWith(item.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      pathname.startsWith(item.href)
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-4 border-t">
              <button
                onClick={SignOut}
                className="group w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
              >
                <ArrowLeftOnRectangleIcon
                  className="h-6 w-6 mr-3 text-red-400 group-hover:text-red-500"
                  aria-hidden="true"
                />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}