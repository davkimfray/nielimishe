import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: '100%'
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
        marginTop: 4,
        marginBottom: 20,
        marginLeft: '10%',
        marginRight: '10%',
        paddingRight: 16,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 16,
        width: '80%'
    },
    selectInput: {
        backgroundColor: 'white',
        height: 48,
        marginTop: 4,
        marginLeft: '10%',
        marginRight: '10%',
        paddingRight: 24,
        paddingLeft: 24,
        borderWidth: 1,
        borderColor: "#aaaaaa",
        borderRadius: 16,
        width: '80%',
        alignItems: 'center'
    },
    textArea: {
        // minHeight: 96,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '10%',
        marginRight: '10%',
        paddingRight: 16,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 20,
    },
    button: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 20,
        height: 64,
        alignItems: "center",
        justifyContent: 'center',


        backgroundColor: '#8962F8',
        elevation: 3,
        width: '80%',
        borderRadius: 16,
        padding: 20,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
})
