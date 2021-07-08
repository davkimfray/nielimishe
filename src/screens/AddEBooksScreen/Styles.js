import {StyleSheet} from "react-native";

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#FCB97D',
        elevation: 6,
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'center',
        padding: 24,
        width: '80%',
        marginTop: 24,
        marginLeft: '10%',
        marginRight: '10%',

    },
    container: {
         flex: 1,
        width: '100%',
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    input: {
        borderColor: '#BEBEBE',
        borderRadius: 12,
        borderWidth: 1,
        height: 50,
        width: '80%',
        alignItems: 'center',
        paddingLeft: 10,
        // marginTop: 16,
        backgroundColor: 'white'
    },
    fab: {
        // marginTop: 25,
        marginLeft: 23,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',

    }
})
