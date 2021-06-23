import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        borderRadius: 20,
    },
    image: {
        height: 300,
        width: '100%',
        borderRadius: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 30,
        width: '70%',
        elevation: 6,
        borderRadius: 20,

    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})
