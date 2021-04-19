import ButtonComponent from '@/examples/Button';
import LoadingComponent from '@/examples/Loading';
import IconComponent from '@/examples/Icon';
import BadgeComponent from '@/examples/Badge';

const routes = [
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
