import React, { ReactNode } from 'react';
import Head from 'next/head';

import styles from './layout.module.scss';

const defaultDescription = '';

interface IProps {
  children?: ReactNode;
  title?: string;
  description?: string;
}

export default (props: IProps) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{props.title}</title>
        <meta
          name="description"
          content={(props.description ? props.description + ' | ' : '') + defaultDescription}
        />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <div className={styles.content}>
        {props?.children}
      </div>
    </div>
  );
}