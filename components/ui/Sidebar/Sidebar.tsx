'use client';
import { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Users,
  Briefcase,
  Calendar,
  FileText,
  BarChart2,
  ArrowRightFromLine,
  Settings,
  Images,
  ImagePlus
} from 'lucide-react';
import Link from 'next/link';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isOpen: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  isOpen
}) => (
  <div className="flex items-center w-44 text-gray-700 hover:bg-blue-200 hover:text-blue-800 p-2 rounded-md">
    <Link href={path}>
      <div className="w-5 h-5">{icon}</div>
    </Link>
    <Link href={path}>
      <span
        className={`ml-3 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 ease-in-out`}
      >
        {label}
      </span>
    </Link>
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div
        className="bg-white transition-width duration-500 ease-in-out"
        style={{
          width: isOpen ? '220px' : '50px',
          boxShadow:
            '8px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <nav className="overflow-hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="transition transform hover:scale-110 duration-300"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              // Moved `ml-auto` to `mr-auto` to align the icon to the left when sidebar is open
              <X className="w-7 h-7 " color="#0096FF" />
            ) : (
              // Aligns the icon to the left when sidebar is closed
              <ArrowRightFromLine className="w-7 h-7 " color="#0096FF" />
            )}
          </button>
          <div>
            <SidebarItem
              isOpen={isOpen}
              icon={<Home />}
              label="Dashboard"
              path="/dashboard"
            />
            <SidebarItem
              isOpen={isOpen}
              icon={<Users />}
              label="Team"
              path="/"
            />
            <SidebarItem
              isOpen={isOpen}
              icon={<Briefcase />}
              label="Projects"
              path="/"
            />
            <SidebarItem
              isOpen={isOpen}
              icon={<ImagePlus />}
              label="Generate Image"
              path="/"
            />
            <SidebarItem
              isOpen={isOpen}
              icon={<Images />}
              label="Gallery"
              path="/dashboard/gallery"
            />
            <SidebarItem
              isOpen={isOpen}
              icon={<Settings />}
              label="Settings"
              path="/dashboard/settings"
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
