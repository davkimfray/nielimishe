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
        backgroundColor: '#8962F8',
        elevation: 3,
        height: 72,
        width: '80%',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        margin: 'auto'

    },
    buttonTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonRegister: {
        backgroundColor: '#DF1125',
        marginLeft: 'auto',
        marginRight: 40,
        marginTop: 20,
        marginBottom: 30,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height: 48,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonRegisterTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
})
