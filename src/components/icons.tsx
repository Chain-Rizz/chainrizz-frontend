import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  Aperture,
  LucideArrowRight,
  Phone,
  Receipt,
  Scan,
  Text,
  Wallet,
  Home,
  type Icon as LucideIcon,
  Send,
} from "lucide-react";

// @ts-ignore
export type Icon = LucideIcon;

export const Icons = {
  // logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  Aperture,
  LucideArrowRight,
  Phone,
  Receipt,
  Scan,
  Text,
  Wallet,
  Home,
  CreditCard,
  Send,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,

  logo: ({ ...props }: LucideProps) => (
    <svg
      viewBox="55 146.2656 89.1992 78"
      width="30"
      height="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="e156d06b34">
          <path
            d="M 84 146.265625 L 144.222656 146.265625 L 144.222656 224.265625 L 84 224.265625 Z M 84 146.265625 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="891a6be1d1">
          <path
            d="M 55 203 L 94 203 L 94 224.265625 L 55 224.265625 Z M 55 203 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g>
        <path
          fill="#0082a5"
          d="M 142.886719 223.1875 L 83.253906 197.039062 L 70.835938 197.398438 L 80.464844 179.425781 L 89.355469 179.425781 Z M 142.886719 223.1875 "
          fillOpacity="1"
          fillRule="evenodd"
        />
        <g clipPath="url(#e156d06b34)">
          <path
            fill="#02b4dd"
            d="M 144.199219 224.265625 L 91.214844 172.390625 L 84.921875 172.390625 L 99.914062 146.265625 Z M 144.199219 224.265625 "
            fillOpacity="1"
            fillRule="evenodd"
          />
        </g>
        <g clipPath="url(#891a6be1d1)">
          <path
            fill="#004f6d"
            d="M 81.671875 203.417969 L 93.074219 207.136719 L 55 224.074219 L 67.226562 203.144531 Z M 81.671875 203.417969 "
            fillOpacity="1"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  ),
};
