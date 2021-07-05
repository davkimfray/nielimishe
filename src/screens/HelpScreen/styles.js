import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 20,
        padding: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#FCB97D',
        elevation: 3,
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        width: '80%',
        margin: 'auto'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
})
