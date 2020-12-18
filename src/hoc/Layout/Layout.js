import React from 'react';
import Aux from '../Auxi/Auxi';
import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={styles.content}>
            {props.children}
        </main>
    </Aux>
    

);

export default layout;