import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    title: {

    },
    screenTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 40,
    },
    screenTitle: {
        backgroundColor: '#8962F8',
        color: '#fff',
        width: '50%',
        padding: 16,
        paddingLeft: 32,
        marginBottom: 30,
        marginLeft: 'auto',
        fontSize: 18,
        fontWeight: 'bold',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

    },
    logo: {
        // flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
    },
    logoText: {
        // flex: 1,
        height: 48,
        alignSelf: "center",
        marginBottom: 24,
        fontSize: 24,
        color:  '#788eec',
        fontWeight: 'bold'
    },
    input: {
        height: 48,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingRight: 16,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 20,
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
