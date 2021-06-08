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
        width: '70%',
        marginTop: 20,
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
    input: {
        width: '70%',
        height: 48,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingRight: 16,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 20,
    },
})
