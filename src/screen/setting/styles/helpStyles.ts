import { StyleSheet } from "react-native";

const HelpStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',

        textAlign: 'center',
        marginTop:16
    },
    subtitle: {
        fontSize: 16,
        color: '#7b8ca6',
        marginTop: 24,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        padding: 24,
     marginTop:24,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        // backgroundColor: '#fffbe6',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#7b8ca6',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#111827',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginTop: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default HelpStyles;