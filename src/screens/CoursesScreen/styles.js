import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        paddingTop: 50,
        paddingBottom: 50,
    },
    button: {
        // backgroundColor: '#8962F8',
        elevation: 3,
        height: 100,
        width: '80%',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        marginBottom: 20,

    },
    buttonTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
})
