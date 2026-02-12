
import { $t } from './services/i18n.js';

export const AppMenus = {
    
	navbarTopRight: [
  {
    "to": "/audits",
    "label": $t('audits'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/permissions",
    "label": $t('permissions'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  }
],
	navbarTopLeft: [
  {
    "to": "/audits",
    "label": $t('audits'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/permissions",
    "label": $t('permissions'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  }
],
	navbarSideLeft: [
  {
    "to": "/home",
    "label": $t('home'),
    "icon": "pi pi-bookmark-fill",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/certificates",
    "label": $t('certificates'),
    "icon": "pi pi-file-word",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/audits",
    "label": $t('audits'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/certificatenews",
    "label": $t('certificatenews'),
    "icon": "pi pi-comments",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/certificatecategories",
    "label": $t('certificatecategories'),
    "icon": "pi pi-book",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/users",
    "label": $t('users'),
    "icon": "pi pi-key",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/appstatus",
    "label": $t('appstatus'),
    "icon": "pi pi-android",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/roles",
    "label": $t('roles'),
    "icon": "pi pi-github",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/permissions",
    "label": $t('permissions'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  }
],

    exportFormats: {
        print: {
			label: 'Print',
            icon: 'pi pi-print',
            type: 'print',
            ext: 'print',
        },
        pdf: {
			label: 'Pdf',
			
            icon: 'pi pi-file-pdf',
            type: 'pdf',
            ext: 'pdf',
        },
        excel: {
			label: 'Excel',
            icon: 'pi pi-file-excel',
            type: 'excel',
            ext: 'xlsx',
        },
        csv: {
			label: 'Csv',
            icon: 'pi pi-table',
            type: 'csv',
            ext: 'csv',
        },
    },
    locales: {
  "fr": "French",
  "ru": "Russian",
  "zh-CN": "Chinese",
  "en-US": "English",
  "it": "Italian",
  "hi": "Hindi",
  "pt": "Portuguese",
  "de": "German",
  "es": "Spanish",
  "ar": "Arabic"
}
}