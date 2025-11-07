import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container } from '../../components/common';
import PrefManager from '../../utils/prefManager';
import { STRING } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthToken } from '../../store/actions/auth/loginAction';

const Territory = () => {
  const dispatch = useDispatch();
  const [appToken, setAppToken] = useState<string>('');
  const [isWebViewReady, setIsWebViewReady] = useState(false);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const { userData } = useSelector((state: any) => state.otp);
  const webViewRef = useRef<any>(null);
  const injectionAttempts = useRef(0);
  const maxInjectionAttempts = 3;

  useEffect(() => {
    const loadToken = async () => {
      const token = await PrefManager.getValue(STRING.TOKEN);
      if (token) setAppToken(token);
      setIsTokenReady(true);
    };

    loadToken();
    setIsWebViewReady(false);
    injectionAttempts.current = 0;
  }, []);

  useEffect(() => {
    if (isWebViewReady && isTokenReady && appToken && webViewRef.current) {
      console.log('useeffect');

      injectTokenJS(appToken, userData || {});
    }
  }, []);

  const injectTokenJS = (token: string, userData: any) => `
    (function() {
      try {
        const payload = JSON.stringify({
          type: 'token-injected',
          token: '${token}',
          userInfo: ${JSON.stringify(userData || {})},
          timestamp: Date.now()
        });

        window.postMessage(payload, '*');

        try {
          const customEvent = new CustomEvent('tokenInjected', { detail: JSON.parse(payload) });
          window.dispatchEvent(customEvent);
        } catch (e) {}

        window.tokenInjectionComplete = true;
      } catch (e) {
        console.error('Token injection failed:', e.message);
      }
    })();
  `;

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'token-injected') {
        const { token, userInfo } = data;
        if (token && userInfo) {
          console.log('handleWebViewMessage');

          PrefManager.setValue(STRING.TOKEN, token);
          PrefManager.setValue('userData', userInfo);
          dispatch(setAuthToken({ accessToken: token, userData }));
          injectionAttempts.current = 0;
        }
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const injectTokenIfReady = () => {
    if (isWebViewReady && isTokenReady && appToken && webViewRef.current) {
      if (injectionAttempts.current < maxInjectionAttempts) {
        console.log('injecting token redy');

        injectionAttempts.current += 1;
        webViewRef.current.injectJavaScript(injectTokenJS(appToken, userData || {}));
        // setTimeout(injectTokenIfReady, 2000); // Retry
      }
    }
  };

  useEffect(() => {
    injectTokenIfReady();
  }, [isWebViewReady, isTokenReady, appToken]);

  const onWebViewLoad = () => setIsWebViewReady(true);

  const handleNavigationStateChange = (navState: any) => {
    if (navState.url.includes('admin-core.realestateos.io') && appToken && webViewRef.current) {
      injectionAttempts.current = 0;
      webViewRef.current.injectJavaScript(injectTokenJS(appToken, userData || {}));
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://admin-core.realestateos.io' }}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          onLoadEnd={onWebViewLoad}
          onMessage={handleWebViewMessage}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Territory;
