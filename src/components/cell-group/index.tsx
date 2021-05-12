import React, { useMemo } from 'react';
import { CellGroupProps } from './props';
import classnames from 'classnames';
import './style/index.scss';

const baseClass = 'r-cell-group';

const CellGroup: React.FC<CellGroupProps> = (props) => {
    const { title, border = true, children } = props;

    const renderGroup = useMemo(() => {
        return (
            <div
                className={classnames(baseClass, {
                    [`${baseClass}--top-bottom`]: border
                })}
            >
                {children}
            </div>
        );
    }, [border, children]);

    const renderTitle = useMemo(() => {
        return <div className={classnames(`${baseClass}__title`)}>{title}</div>;
    }, [title]);

    return (
        <>
            {title ? (
                <>
                    {renderTitle}
                    {renderGroup}
                </>
            ) : (
                <>{renderGroup}</>
            )}
        </>
    );
};

export default CellGroup;
