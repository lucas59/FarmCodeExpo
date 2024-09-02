import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import Scanner from './Scanner';

// Componente funcional que usa el hook y pasa la prop `navigation`
const mapStateToProps = (state) => {
    return state;
};

function ScannerWrapper(props) {
    const navigation = useNavigation();

    return <Scanner {...props} navigation={navigation} />;
}

export default connect(mapStateToProps)(ScannerWrapper);
