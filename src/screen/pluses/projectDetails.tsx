//import liraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { IMAGES } from '../../constants';
import { FS, LH, FF } from '../../constants/fonts';
import COLORS from '../../constants/colors';
import { RWidth, RHeight, RFont } from '../../utils/responsiveStyle';
import { Container, HeaderComponent } from '../../components/common';
import { stripHtmlTags } from '../../utils/helper';

// create a component
const ProjectDetails = ({ navigation, route }: any) => {
    const { projectData, imagePath } = route.params || {};

    const data = projectData;
    const [webViewHeight, setWebViewHeight] = React.useState(400);

    console.log("data", data);

    // Helper function to generate HTML content for WebView
    const generateHTMLContent = (htmlContent: string) => {
        if (!htmlContent) {
            return `
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: system-ui, -apple-system, sans-serif;
                                font-size: 16px;
                                line-height: 1.5;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            p {
                                margin: 0 0 16px 0;
                            }
                            h1, h2, h3, h4, h5, h6 {
                                margin: 0 0 16px 0;
                                font-weight: bold;
                            }
                            ul, ol {
                                margin: 0 0 16px 0;
                                padding-left: 20px;
                            }
                            li {
                                margin-bottom: 8px;
                            }
                        </style>
                    </head>
                    <body>
                        <p>No description available</p>
                    </body>
                </html>
            `;
        }

        return `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: system-ui, -apple-system, sans-serif;
                            font-size: 16px;
                            line-height: 1.5;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        p {
                            margin: 0 0 16px 0;
                        }
                        h1, h2, h3, h4, h5, h6 {
                            margin: 0 0 16px 0;
                            font-weight: bold;
                        }
                        ul, ol {
                            margin: 0 0 16px 0;
                            padding-left: 20px;
                        }
                        li {
                            margin-bottom: 8px;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                        a {
                            color: #007AFF;
                            text-decoration: none;
                        }
                        blockquote {
                            margin: 16px 0;
                            padding-left: 16px;
                            border-left: 4px solid #ddd;
                            font-style: italic;
                        }
                    </style>
                </head>
                <body>
                    ${htmlContent}
                </body>
            </html>
        `;
    };



    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSharePress = async () => {
        try {
            const title = data.title || 'Check out this project!';
            const description = data.descriptions ? stripHtmlTags(data.descriptions) : '';
            const imageUrl = imagePath && data.image ? imagePath + data.image : null;

            // Create a well-formatted message with title, description, and image info
            let message = `🏗️ ${title}`;

            if (description && description.trim()) {
                // Truncate description if it's too long for sharing
                const truncatedDesc = description.length > 200
                    ? description.substring(0, 200) + '...'
                    : description;
                message += `\n\n📝 ${truncatedDesc}`;
            }

            if (imageUrl) {
                message += `\n\n🖼️ View project image: ${imageUrl}`;
            }

            // message += '\n\n📱 Shared from rOS App';

            const shareContent: any = {
                title: `rOS Project: ${title}`,
                message: message,
            };

            // Add URL if image exists (some platforms support this better)
            if (imageUrl) {
                shareContent.url = imageUrl;
            }

            await Share.share(shareContent, {
                dialogTitle: 'Share Project Details',
                subject: `rOS Project: ${title}`, // For email sharing
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.Print',
                    'com.apple.UIKit.activity.AssignToContact',
                    'com.apple.UIKit.activity.AddToReadingList'
                ],
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        // <SafeAreaView style={styles.container}>
        <Container>


            <HeaderComponent Title="Detail" onPress={handleBackPress}  />

            {/* Header */}
            {/* <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={IMAGES.BACK} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail</Text>
                <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
                    <Image source={IMAGES.SHARE} style={styles.shareIcon} />
                </TouchableOpacity>
            </View> */}

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Date and Share Button Row */}
                <View style={styles.dateShareContainer}>
                    <Text style={styles.dateText}>
                        {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : data.createdAt}
                    </Text>
                    <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
                        <Image source={IMAGES.SHARE} style={styles.shareIcon} />
                    </TouchableOpacity>
                </View>

                {/* Headline */}
                <Text style={styles.headline}>{data.title}</Text>

                {/* Project Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={imagePath && data.image ?
                            { uri: imagePath + data.image } :
                            require('../../assets/images/project.png')
                        }
                        style={styles.projectImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Article Content */}
                <View style={styles.contentContainer}>
                    <WebView
                        source={{ html: generateHTMLContent(data.descriptions) }}
                        style={[styles.webView, { height: webViewHeight }]}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        scalesPageToFit={false}
                        onMessage={(event) => {
                            const height = parseInt(event.nativeEvent.data, 10);
                            if (height > 0) {
                                setWebViewHeight(height + 20); // Add some padding
                            }
                        }}
                        onLoadEnd={() => {
                            // Auto-resize WebView based on content
                        }}
                        injectedJavaScript={`
                            function getContentHeight() {
                                return Math.max(
                                    document.body.scrollHeight,
                                    document.body.offsetHeight,
                                    document.documentElement.clientHeight,
                                    document.documentElement.scrollHeight,
                                    document.documentElement.offsetHeight
                                );
                            }

                            window.ReactNativeWebView.postMessage(getContentHeight().toString());
                            true;
                        `}
                    />
                </View>
            </ScrollView>
            </Container>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: RWidth(5),
        paddingVertical: RHeight(2),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
    },
    backButton: {
        padding: RWidth(2),
    },
    backIcon: {
        width: RWidth(5),
        height: RWidth(5),
        tintColor: COLORS.BLACK_TEXT,
    },
    headerTitle: {
        fontSize: RFont(FS.FS18),
        fontFamily: FF[600],
        color: COLORS.BLACK_TEXT,
        lineHeight: RFont(LH.LH22),
    },
    shareButton: {
        padding: RWidth(2),
        backgroundColor: COLORS.BG_GREY,
        borderRadius: RWidth(2),
    },
    shareIcon: {
        width: RWidth(5),
        height: RWidth(5),
        tintColor: COLORS.BLACK_TEXT,
    },
    scrollView: {
        flex: 1,
    },
    dateShareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: RHeight(2),
        marginBottom: RHeight(1),
    },
    dateText: {
        fontSize: RFont(FS.FS14),
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
    },
    headline: {
        fontSize: RFont(FS.FS24),
        fontFamily: FF[700],
        color: COLORS.BLACK_TEXT,
        lineHeight: RFont(LH.LH30),
        marginBottom: RHeight(3),
    },
    imageContainer: {
        width: '100%',
        height: RHeight(25),
        marginBottom: RHeight(3),
        borderRadius: RWidth(2),
        overflow: 'hidden',
    },
    projectImage: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        // paddingBottom: RHeight(5),
    },
    webView: {
        minHeight: 200, // Minimum height to prevent layout issues
        backgroundColor: 'transparent',
        borderRadius: RWidth(1),
    },
    articleText: {
        fontSize: RFont(FS.FS16),
        fontFamily: FF[400],
        color: COLORS.BLACK_TEXT,
        lineHeight: RFont(LH.LH24),
        // marginBottom: RHeight(2),
    },
    metaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: RHeight(3),
        paddingVertical: RHeight(1),
    },
    metaText: {
        fontSize: RFont(FS.FS14),
        fontFamily: FF[500],
        color: COLORS.GREY_TEXT,
    },
});

//make this component available to the app
export default ProjectDetails;
