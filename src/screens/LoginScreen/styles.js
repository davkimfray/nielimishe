import {StyleSheet} from "react-native";

export default StyleSheet.create({
    buttonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 20,
        padding: 20,
    },
    button: {
        backgroundColor: 'white',
        elevation: 1,
        height: 48,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
marginVertical: 12,


    },
    buttonTitle: {
        color: '#BEBEBE',
        fontSize: 16,
        // fontWeight: 'bold'
       },
    buttonLogin: {
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
    buttonLoginTitle: {
        color: '#8962F8',
        fontSize: 16,
        fontWeight: 'bold'
    },
})
