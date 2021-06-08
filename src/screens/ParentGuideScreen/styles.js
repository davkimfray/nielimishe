import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'space-evenly',
        justifyContent: 'space-between',
        width: '100%',
        padding: 30,
    },
    button: {
        backgroundColor: '#fff',
        elevation: 6,
        height: 120,
        width: '47%',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        marginBottom: 20,
        overflow: 'hidden',

    },
    buttonTitle: {
        color: '#000',
        fontSize: 14,
        textAlign: "center",

    },
})
