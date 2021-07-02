import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        // alignItems: 'center',
        width: '100%',
        // borderRadius: 20,
        marginTop: 20
    },
    image: {
        height: 300,
        width: '100%',
        borderRadius: 20,
    },
    button: {
        // backgroundColor: '#8962F8',
        elevation: 3,
        height: 100,
        width: 300,
        borderRadius: 20,
        // position:'absolute',
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})
