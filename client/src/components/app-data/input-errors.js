import React from 'react';

export default props => {
    return (
        props.errors.map((error, i) => (
            <small key={i} className="form-text text-danger m-0">
                {error}
            </small>
        ))
    );
}