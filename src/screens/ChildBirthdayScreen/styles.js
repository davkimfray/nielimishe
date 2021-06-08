import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 40,
        padding: 20,
    },
    button: {
        backgroundColor: '#8962F8',
        elevation: 4,
        height: 48,
        width: '80%',
        marginBottom: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,

    },
    buttonTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    dateInput: {
        height: 54,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 16,
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 24,
        fontSize: 18
    },
})
