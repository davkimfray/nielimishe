import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        alignItems: 'center',
        width: 300,
        // borderRadius: 20,
        // height: 300,
        borderRadius: 20,
        // margin: 20
    },
    image: {
        height: 350,
        backgroundColor: 'white',
        elevation: 6,
        width: '100%',
        borderRadius: 20,
        elevation: 6,

        margin: 20

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
