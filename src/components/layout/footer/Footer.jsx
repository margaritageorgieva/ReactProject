import React from 'react';

const styles = {
    backgroundColor: 'lightgray',
    height: '30px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    marginTop:'10px'

};
export function Footer() {
    return(

        <div className="footer" style={styles}>
           footer works !
        </div>
    );
}