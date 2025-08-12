import React from 'react';

// Base Icon component with consistent styling
const Icon = ({ children, size = 20, color = 'currentColor', className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const LockIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </Icon>
);

export const DownloadIcon = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </Icon>
);

export const UploadIcon = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </Icon>
);

export const PlayIcon = (props) => (
  <Icon fill="currentColor" stroke="none" {...props}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </Icon>
);

export const StopIcon = (props) => (
  <Icon fill="currentColor" stroke="none" {...props}>
    <rect x="6" y="6" width="12" height="12" rx="2"/>
  </Icon>
);

export const TrashIcon = (props) => (
  <Icon {...props}>
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
  </Icon>
);

export const ChevronRightIcon = (props) => (
  <Icon strokeWidth="3" {...props}>
    <polyline points="9 18 15 12 9 6"/>
  </Icon>
);

export const ChevronDownIcon = (props) => (
  <Icon strokeWidth="3" {...props}>
    <polyline points="6 9 12 15 18 9"/>
  </Icon>
);

export const RobotIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </Icon>
);

export const TemperatureIcon = (props) => (
  <Icon {...props}>
    <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
  </Icon>
);

export const MessageIcon = (props) => (
  <Icon {...props}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </Icon>
);

export const PlusIcon = (props) => (
  <Icon strokeWidth="2.5" {...props}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </Icon>
);

export const XIcon = (props) => (
  <Icon strokeWidth="2.5" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </Icon>
);

export const AlertTriangleIcon = (props) => (
  <Icon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </Icon>
);

export const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </Icon>
);

export const SunIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </Icon>
);

export const MoonIcon = (props) => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </Icon>
);

export const PlusCircleIcon = (props) => (
  <Icon size={28} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </Icon>
);

export const CopyIcon = (props) => (
  <Icon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </Icon>
);

export const CheckIcon = (props) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12"/>
  </Icon>
);

export const DuplicateIcon = (props) => (
  <Icon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    <line x1="13" y1="14" x2="18" y2="14"/>
    <line x1="13" y1="17" x2="18" y2="17"/>
  </Icon>
);

export const MenuIcon = (props) => (
  <Icon {...props}>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </Icon>
);

export const CircleIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8"/>
  </Icon>
);

export const InfoIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </Icon>
);

// Export all icons as a collection for backward compatibility
export const Icons = {
  Lock: LockIcon,
  Download: DownloadIcon,
  Upload: UploadIcon,
  Play: PlayIcon,
  Stop: StopIcon,
  Trash: TrashIcon,
  ChevronRight: ChevronRightIcon,
  ChevronDown: ChevronDownIcon,
  Robot: RobotIcon,
  Temperature: TemperatureIcon,
  Message: MessageIcon,
  Plus: PlusIcon,
  X: XIcon,
  AlertTriangle: AlertTriangleIcon,
  Sparkles: SparklesIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  PlusCircle: PlusCircleIcon,
  Circle: CircleIcon
};