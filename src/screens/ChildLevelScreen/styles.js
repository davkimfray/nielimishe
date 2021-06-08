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
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 4,
        height: 100,
        width: '80%',
        marginBottom: 20,
        borderRadius: 20,
        alignItems: "center",
        // justifyContent: 'center',
        padding: 20,

    },
    buttonTitle: {
        color: '#BEBEBE',
        fontSize: 16,
        // fontWeight: 'bold'
    },
    indicatorWrapper: {
        marginLeft: 30,
        marginRight: 20,
        height: 34,
        width: 34,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#BEBEBE",
    },
    indicatorLow: {
        backgroundColor: '#FFEB6D',
        height: 24,
        width: 24,
        borderRadius: 50,
    },
    indicatorMedium: {
        backgroundColor: '#FD820B',
        height: 24,
        width: 24,
        borderRadius: 50,
    },
    indicatorHigh: {
        backgroundColor: '#DF1125',
        height: 24,
        width: 24,
        borderRadius: 50,
    },
})
