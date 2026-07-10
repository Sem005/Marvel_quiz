import React from 'react';
import type Firebase from './firebase';

const FirebaseContext = React.createContext<Firebase | null>(null);

export default FirebaseContext;
