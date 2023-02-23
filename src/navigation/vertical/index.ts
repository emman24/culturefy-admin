
// ** Icon imports
import EmailOutline from 'mdi-material-ui/EmailOutline'
import UserIcon from 'mdi-material-ui/AccountStar'
import WalletIcon from 'mdi-material-ui/WalletGiftcard'

import NotificationsIcon from 'mdi-material-ui/BellBadge'
import BannerAdsIcon from 'mdi-material-ui/Advertisements'
import ChallengesIcon from 'mdi-material-ui/VideoBox'
import VoterPrizesIcon from 'mdi-material-ui/CurrencyUsd'

import CogTransfer from 'mdi-material-ui/CogTransfer'
import AssignmentIcon from 'mdi-material-ui/ClipboardCheck'
import SchoolOutline from 'mdi-material-ui/SchoolOutline'
import Account from 'mdi-material-ui/Account'
import BookAccountOutline  from 'mdi-material-ui/BookAccountOutline';
import VideoIcon  from 'mdi-material-ui/Video';


// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Application Modules'
    },
    {
      title: 'Dashboard',
      icon: EmailOutline,
      path: '/dashboard',
      action: 'itsHaveAccess',
      subject: 'dashboard-page',
    },
    {
      title: 'Culture Check',
      icon: CogTransfer,
      action: 'itsHaveAccess',
      subject: 'dashboard-page',
      children: [
        {
          title: 'Admin',
          icon: UserIcon,
          // path: '/assignment-type',
          // action: 'itsHaveAccess',
          // subject: 'assignment-type-page',
          children: [
            {
              title: 'Position Goal',
              icon: AssignmentIcon,
              path: '/position-goals',
              action: 'itsHaveAccess',
              subject: 'assignment-type-page',
            },
            // {
            //   title: 'BCS Answers',
            //   icon: AssignmentIcon,
            //   // path: '/label',
            //   action: 'itsHaveAccess',
            //   subject: 'report-label-page',
            // },
            // {
            //   title: 'Brand Audit',
            //   icon: AssignmentIcon,
            //   // path: '/label',
            //   action: 'itsHaveAccess',
            //   subject: 'report-label-page',
            // },
            {
              title: 'Posses Card',
              icon: AssignmentIcon,
              path: '/possescards',
              action: 'itsHaveAccess',
              subject: 'report-label-page',
            },
            {
              title: 'Recommendation',
              icon: AssignmentIcon,
              path: '/recommendation?role=ADMIN',
              action: 'itsHaveAccess',
              subject: 'report-label-page',
            },
          ]
        },
        {
          title: 'User',
          icon: UserIcon,
          // path: '/label',
          // action: 'itsHaveAccess',
          // subject: 'report-label-page',
          children: [
            {
              title: 'Work Goal',
              icon: AssignmentIcon,
              path: '/work-goal',
              action: 'itsHaveAccess',
              subject: 'work-goal-page',
            },
            {
              title: 'Recommendation',
              icon: AssignmentIcon,
              path: '/recommendation?role=USER',
              action: 'itsHaveAccess',
              subject: 'report-label-page',
            },
            // {
            //   title: 'BCS Answers',
            //   icon: AssignmentIcon,
            //   // path: '/label',
            //   action: 'itsHaveAccess',
            //   subject: 'report-label-page',
            // },
          ]
        },
      ]
    },
    {
      title: 'Learning',
      icon: SchoolOutline,
      children: [
        {
          title: 'Course',
          icon: BookAccountOutline,
          path: '/course',
          action: 'itsHaveAccess',
          subject: 'course-page',
        },
        {
          title: 'Course Videos',
          icon: VideoIcon,
          path: '/course-video',
          action: 'itsHaveAccess',
          subject: 'course-video-page',
        },
      ]
    },

    // {
    //   title: 'Users',
    //   icon: UserIcon,
    //   path: '/users',
    //   action: 'itsHaveAccess',
    //   subject: 'dashboard-page',
    // },
    {
      title: 'Businesses',
      icon: UserIcon,
      action: 'itsHaveAccess',
      subject: 'dashboard-page',
      children: [
        {
          title: 'Users',
          icon: Account,
          path: '/business-user',
          action: 'itsHaveAccess',
          subject: 'assignment-type-page',
        },
        {    
          title: 'Businesses',
          icon: AssignmentIcon,
          path: '/businesses',
          action: 'itsHaveAccess',
          subject: 'assignment-type-page',
        },
        {
          title: 'Businesses Questions',
          icon: AssignmentIcon,
          path: '/business-questions',
          action: 'itsHaveAccess',
          subject: 'report-label-page',
        },
      ]
    },
    // {  
    //   title: 'Wallet',
    //   icon: WalletIcon,
    //   path: '/wallet',
    //   action: 'itsHaveAccess',
    //   subject: 'dashboard-page',
    // },
    // {
    //   title: 'Notifications',
    //   icon: NotificationsIcon,
    //   path: '/notifications',
    //   action: 'itsHaveAccess',
    //   subject: 'dashboard-page',
    // },
    // {
    //   title: 'Banner Ads',
    //   icon: BannerAdsIcon,
    //   path: '/banner-ads',
    //   action: 'itsHaveAccess',
    //   subject: 'dashboard-page',
    // },
    // {
    //   title: 'Challenges',
    //   icon: ChallengesIcon,
    //   path: '/challenges',
    //   action: 'itsHaveAccess',
    //   subject: 'dashboard-page',
    // },
    // {
    //   title: 'Voter Prizes',
    //   icon: VoterPrizesIcon,
    //   path: '/voter-prizes',
    //   action: 'itsHaveAccess',
    //   subject: 'dashboard-page',
    // },
    // {
    //   title: 'Employees',
    //   icon: EmailOutline,
    //   path: '/employee',
    //   action: 'itsHaveAccess',
    //   subject: 'employee-page',
    // },
    // {
    //   title: 'Clients',
    //   icon: EmailOutline,
    //   path: '/client',
    //   action: 'itsHaveAccess',
    //   subject: 'client-page',
    // },
    // {
    //   title: 'Projects',
    //   icon: EmailOutline,
    //   path: '/project',
    //   action: 'itsHaveAccess',
    //   subject: 'project-page',
    // },
    // {
    //   title: 'Setting',
    //   icon: CogTransfer,
    //   children: [
    //     {
    //       title: 'Assignment Type',
    //       icon: AssignmentIcon,
    //       path: '/assignment-type',
    //       action: 'itsHaveAccess',
    //       subject: 'assignment-type-page',
    //     },
    //     {
    //       title: 'Report Label',
    //       icon: AssignmentIcon,
    //       path: '/label',
    //       action: 'itsHaveAccess',
    //       subject: 'report-label-page',
    //     },
    //   ]
    // },

    // {
    //   title: 'Assignment',
    //   icon: EmailOutline,
    //   path: '/assignment'
    // },
    // {
    //   title: 'Assignment',
    //   icon: EmailOutline,
    //   path: '/assignment'
    // },
    // {
    //   title: 'Report',
    //   icon: EmailOutline,
    //   path: '/report'
    // },
    // {
    //   title: 'Invoice',
    //   icon: FileDocumentOutline,
    //   children: [
    //     {
    //       title: 'List',
    //       path: '/apps/invoice/list'
    //     },
    //     {
    //       title: 'Preview',
    //       path: '/apps/invoice/preview'
    //     },
    //     {
    //       title: 'Edit',
    //       path: '/apps/invoice/edit'
    //     },
    //     {
    //       title: 'Add',
    //       path: '/apps/invoice/add'
    //     }
    //   ]
    // },
    // {
    //   title: 'User',
    //   icon: AccountOutline,
    //   children: [
    //     {
    //       title: 'List',
    //       path: '/apps/user/list'
    //     },
    //     {
    //       title: 'View',
    //       path: '/apps/user/view'
    //     }
    //   ]
    // },
    // {
    //   title: 'Employee',
    //   icon: AccountOutline,
    //   children: [
    //     {
    //       title: 'List',
    //       path: '/apps/employee/list'
    //     },
    //     {
    //       title: 'View',
    //       path: '/apps/employee/view'
    //     }
    //   ]
    // },
    // {
    //   title: 'Roles & Permissions',
    //   icon: LockOutline,
    //   children: [
    //     {
    //       title: 'Roles',
    //       path: '/apps/roles'
    //     },
    //     {
    //       title: 'Permissions',
    //       path: '/apps/permissions'
    //     }
    //   ]
    // },
  ]
  // return [
  //   {
  //     title: 'Dashboards',
  //     icon: HomeOutline,
  //     badgeContent: 'new',
  //     badgeColor: 'error',
  //     children: [
  //       {
  //         title: 'CRM',
  //         path: '/dashboards/crm'
  //       },
  //       {
  //         title: 'Analytics',
  //         path: '/dashboards/analytics'
  //       },
  //       {
  //         title: 'eCommerce',
  //         path: '/dashboards/ecommerce'
  //       }
  //     ]
  //   },
  //   {
  //     sectionTitle: 'Apps & Pages'
  //   },
  //   {
  //     title: 'Email',
  //     icon: EmailOutline,
  //     path: '/apps/email'
  //   },
  //   {
  //     title: 'Chat',
  //     icon: MessageOutline,
  //     path: '/apps/chat'
  //   },
  //   {
  //     title: 'Calendar',
  //     icon: CalendarBlankOutline,
  //     path: '/apps/calendar'
  //   },
  // {
  //   title: 'Invoice',
  //   icon: FileDocumentOutline,
  //   children: [
  //     {
  //       title: 'List',
  //       path: '/apps/invoice/list'
  //     },
  //     {
  //       title: 'Preview',
  //       path: '/apps/invoice/preview'
  //     },
  //     {
  //       title: 'Edit',
  //       path: '/apps/invoice/edit'
  //     },
  //     {
  //       title: 'Add',
  //       path: '/apps/invoice/add'
  //     }
  //   ]
  // },
  // {
  //   title: 'User',
  //   icon: AccountOutline,
  //   children: [
  //     {
  //       title: 'List',
  //       path: '/apps/user/list'
  //     },
  //     {
  //       title: 'View',
  //       path: '/apps/user/view'
  //     }
  //   ]
  // },
  // {
  //   title: 'Roles & Permissions',
  //   icon: LockOutline,
  //   children: [
  //     {
  //       title: 'Roles',
  //       path: '/apps/roles'
  //     },
  //     {
  //       title: 'Permissions',
  //       path: '/apps/permissions'
  //     }
  //   ]
  // },
  //   {
  //     title: 'Pages',
  //     icon: FileDocumentOutline,
  //     children: [
  //       {
  //         title: 'Authentication',
  //         children: [
  //           {
  //             title: 'Login',
  //             children: [
  //               {
  //                 openInNewTab: true,
  //                 title: 'Login v1',
  //                 path: '/pages/auth/login-v1'
  //               },
  //               {
  //                 openInNewTab: true,
  //                 title: 'Login v2',
  //                 path: '/pages/auth/login-v2'
  //               },
  //               {
  //                 openInNewTab: true,
  //                 title: 'Login With AppBar',
  //                 path: '/pages/auth/login-with-appbar'
  //               }
  //             ]
  //           },
  //           {
  //             title: 'Register',
  //             children: [
  //               {
  //                 openInNewTab: true,
  //                 title: 'Register v1',
  //                 path: '/pages/auth/register-v1'
  //               },
  //               {
  //                 openInNewTab: true,
  //                 title: 'Register v2',
  //                 path: '/pages/auth/register-v2'
  //               }
  //             ]
  //           },
  //           {
  //             title: 'Forgot Password',
  //             children: [
  //               {
  //                 openInNewTab: true,
  //                 title: 'Forgot Password v1',
  //                 path: '/pages/auth/forgot-password-v1'
  //               },
  //               {
  //                 openInNewTab: true,
  //                 title: 'Forgot Password v2',
  //                 path: '/pages/auth/forgot-password-v2'
  //               }
  //             ]
  //           },
  //           {
  //             title: 'Reset Password',
  //             children: [
  //               {
  //                 openInNewTab: true,
  //                 title: 'Reset Password v1',
  //                 path: '/pages/auth/reset-password-v1'
  //               },
  //               {
  //                 openInNewTab: true,
  //                 title: 'Reset Password v2',
  //                 path: '/pages/auth/reset-password-v2'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         title: 'Account Settings',
  //         path: '/pages/account-settings'
  //       },
  //       {
  //         title: 'Pricing',
  //         path: '/pages/pricing'
  //       },
  //       {
  //         title: 'FAQ',
  //         path: '/pages/faq'
  //       },
  //       {
  //         title: 'Knowledge Base',
  //         path: '/pages/knowledge-base'
  //       },
  //       {
  //         title: 'Miscellaneous',
  //         children: [
  //           {
  //             openInNewTab: true,
  //             title: 'Coming Soon',
  //             path: '/pages/misc/coming-soon'
  //           },
  //           {
  //             openInNewTab: true,
  //             title: 'Under Maintenance',
  //             path: '/pages/misc/under-maintenance'
  //           },
  //           {
  //             openInNewTab: true,
  //             title: 'Page Not Found - 404',
  //             path: '/pages/misc/404-not-found'
  //           },
  //           {
  //             openInNewTab: true,
  //             title: 'Not Authorized - 401',
  //             path: '/pages/misc/401-not-authorized'
  //           },
  //           {
  //             openInNewTab: true,
  //             title: 'Server Error - 500',
  //             path: '/pages/misc/500-server-error'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     icon: VectorArrangeBelow,
  //     title: 'Dialog Examples',
  //     path: '/pages/dialog-examples'
  //   },
  //   {
  //     sectionTitle: 'User Interface'
  //   },
  //   {
  //     title: 'Typography',
  //     icon: FormatLetterCase,
  //     path: '/ui/typography'
  //   },
  //   {
  //     title: 'Icons',
  //     path: '/ui/icons',
  //     icon: GoogleCirclesExtended
  //   },
  //   {
  //     title: 'Cards',
  //     icon: CreditCardOutline,
  //     children: [
  //       {
  //         title: 'Basic',
  //         path: '/ui/cards/basic'
  //       },
  //       {
  //         title: 'Statistics',
  //         path: '/ui/cards/statistics'
  //       },
  //       {
  //         title: 'Advanced',
  //         path: '/ui/cards/advanced'
  //       },
  //       {
  //         title: 'Gamification',
  //         path: '/ui/cards/gamification'
  //       },
  //       {
  //         title: 'Actions',
  //         path: '/ui/cards/actions'
  //       },
  //       {
  //         title: 'Widgets',
  //         path: '/ui/cards/widgets'
  //       }
  //     ]
  //   },
  //   {
  //     badgeContent: '18',
  //     title: 'Components',
  //     icon: ArchiveOutline,
  //     badgeColor: 'primary',
  //     children: [
  //       {
  //         title: 'Accordion',
  //         path: '/components/accordion'
  //       },
  //       {
  //         title: 'Alerts',
  //         path: '/components/alerts'
  //       },
  //       {
  //         title: 'Avatars',
  //         path: '/components/avatars'
  //       },
  //       {
  //         title: 'Badges',
  //         path: '/components/badges'
  //       },
  //       {
  //         title: 'Buttons',
  //         path: '/components/buttons'
  //       },
  //       {
  //         title: 'Button Group',
  //         path: '/components/button-group'
  //       },
  //       {
  //         title: 'Chips',
  //         path: '/components/chips'
  //       },
  //       {
  //         title: 'Dialogs',
  //         path: '/components/dialogs'
  //       },
  //       {
  //         title: 'List',
  //         path: '/components/list'
  //       },
  //       {
  //         title: 'Menu',
  //         path: '/components/menu'
  //       },
  //       {
  //         title: 'Pagination',
  //         path: '/components/pagination'
  //       },
  //       {
  //         title: 'Ratings',
  //         path: '/components/ratings'
  //       },
  //       {
  //         title: 'Snackbar',
  //         path: '/components/snackbar'
  //       },
  //       {
  //         title: 'Swiper',
  //         path: '/components/swiper'
  //       },
  //       {
  //         title: 'Tabs',
  //         path: '/components/tabs'
  //       },
  //       {
  //         title: 'Timeline',
  //         path: '/components/timeline'
  //       },
  //       {
  //         title: 'Toasts',
  //         path: '/components/toast'
  //       },
  //       {
  //         title: 'Tree View',
  //         path: '/components/tree-view'
  //       },
  //       {
  //         title: 'More',
  //         path: '/components/more'
  //       },
  //     ]
  //   },
  //   {
  //     sectionTitle: 'Forms & Tables'
  //   },
  //   {
  //     title: 'Form Elements',
  //     icon: FormSelect,
  //     children: [
  //       {
  //         title: 'Text Field',
  //         path: '/forms/form-elements/text-field'
  //       },
  //       {
  //         title: 'Select',
  //         path: '/forms/form-elements/select'
  //       },
  //       {
  //         title: 'Checkbox',
  //         path: '/forms/form-elements/checkbox'
  //       },
  //       {
  //         title: 'Radio',
  //         path: '/forms/form-elements/radio'
  //       },
  //       {
  //         title: 'Textarea',
  //         path: '/forms/form-elements/textarea'
  //       },
  //       {
  //         title: 'Autocomplete',
  //         path: '/forms/form-elements/autocomplete'
  //       },
  //       {
  //         title: 'Date Pickers',
  //         path: '/forms/form-elements/pickers'
  //       },
  //       {
  //         title: 'Switch',
  //         path: '/forms/form-elements/switch'
  //       },
  //       {
  //         title: 'File Uploader',
  //         path: '/forms/form-elements/file-uploader'
  //       },
  //       {
  //         title: 'Editor',
  //         path: '/forms/form-elements/editor'
  //       },
  //       {
  //         title: 'Slider',
  //         path: '/forms/form-elements/slider'
  //       },
  //       {
  //         title: 'Input Mask',
  //         path: '/forms/form-elements/input-mask'
  //       },
  //     ]
  //   },
  //   {
  //     icon: CubeOutline,
  //     title: 'Form Layouts',
  //     path: '/forms/form-layouts'
  //   },
  //   {
  //     title: 'Form Validation',
  //     path: '/forms/form-validation',
  //     icon: CheckboxMarkedCircleOutline
  //   },
  //   {
  //     title: 'Form Wizard',
  //     path: '/forms/form-wizard',
  //     icon: PackageVariantClosed
  //   },
  //   {
  //     title: 'Table',
  //     icon: Table,
  //     path: '/tables/mui'
  //   },
  //   {
  //     title: 'Mui DataGrid',
  //     icon: Table,
  //     path: '/tables/data-grid'
  //   },
  //   {
  //     sectionTitle: 'Charts & Misc'
  //   },
  //   {
  //     title: 'Charts',
  //     icon: ChartDonut,
  //     children: [
  //       {
  //         title: 'Apex',
  //         path: '/charts/apex-charts'
  //       },
  //       {
  //         title: 'Recharts',
  //         path: '/charts/recharts'
  //       },
  //       {
  //         title: 'ChartJS',
  //         path: '/charts/chartjs'
  //       }
  //     ]
  //   },
  //   {
  //     path: '/acl',
  //     // action: 'read',
  //     // subject: 'acl-page',
  //     icon: ShieldOutline,
  //     title: 'Access Control'
  //   },
  //   {
  //     path: '/admin',
  //     // action: 'read',
  //     // subject: 'acl-page',
  //     icon: ShieldOutline,
  //     title: 'Admin'
  //   },
  //   {
  //     title: 'Others',
  //     icon: DotsHorizontal,
  //     children: [
  //       {
  //         title: 'Menu Levels',
  //         children: [
  //           {
  //             title: 'Menu Level 2.1'
  //           },
  //           {
  //             title: 'Menu Level 2.2',
  //             children: [
  //               {
  //                 title: 'Menu Level 3.1'
  //               },
  //               {
  //                 title: 'Menu Level 3.2'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         title: 'Disabled Menu',
  //         disabled: true
  //       },
  //       {
  //         title: 'Raise Support',
  //         externalLink: true,
  //         openInNewTab: true,
  //         path: 'https://pixinvent.ticksy.com/'
  //       },
  //       {
  //         title: 'Documentation',
  //         externalLink: true,
  //         openInNewTab: true,
  //         path: 'https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/documentation'
  //       }
  //     ]
  //   }
  // ]
}

export default navigation
