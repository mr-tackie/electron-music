import React from 'react';
import './heading-text.css';

const HeadingText = ({children, to, more, subtitle}) => {
    let view_all = ``;

    if(more){
    view_all = <span className="veiw_all"><a href={to}>{more} song{more > 1? 's' : ''}</a></span>;
    }

    return (
        <div className="ms_heading">
            <h1>{children}</h1>
            {view_all}
            <div className="muted-text">
                {subtitle}
            </div>
        </div>
    );
}

export default HeadingText;