declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

// declare module 'vant-react';

// interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> { }

// declare module '*.svg' {
//     const svgUrl: string;
//     const svgComponent: SvgrComponent;
//     export default svgUrl;
//     export { svgComponent as ReactComponent }
// }
