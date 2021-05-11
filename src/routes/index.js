import ButtonComponent from '@/examples/button';
import LoadingComponent from '@/examples/loading';
import IconComponent from '@/examples/icon';
import BadgeComponent from '@/examples/badge';
import OverlayComponent from '@/examples/overlay';
import PopupComponent from '@/examples/popup';
import DialogComponent from '@/examples/dialog';
import ToastComponent from '@/examples/toast';
import ActionSheetComponent from '@/examples/action-sheet';
import ActionBarComponent from '@/examples/action-bar';
const routes = [
    {
        name: 'ActionBarComponent',
        path: '/action-bar',
        component: ActionBarComponent,
        exact: true
    },
    {
        name: 'ActionSheetComponent',
        path: '/action-sheet',
        component: ActionSheetComponent,
        exact: true
    },
    {
        name: 'ToastComponent',
        path: '/toast',
        component: ToastComponent,
        exact: true
    },
    {
        name: 'DialogComponent',
        path: '/dialog',
        component: DialogComponent,
        exact: true
    },
    {
        name: 'PopupComponent',
        path: '/popup',
        component: PopupComponent,
        exact: true
    },
    {
        name: 'OverlayComponent',
        path: '/overlay',
        component: OverlayComponent,
        exact: true
    },
    {
        name: 'ButtonComponent',
        path: '/button',
        component: ButtonComponent,
        exact: true
    },
    {
        name: 'LoadingComponent',
        path: '/loading',
        component: LoadingComponent,
        exact: true
    },
    {
        name: 'IconComponent',
        path: '/icon',
        component: IconComponent,
        exact: true
    },
    {
        name: 'BadgeComponent',
        path: '/badge',
        component: BadgeComponent,
        exact: true
    }
];

export default routes;
