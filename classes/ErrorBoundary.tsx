import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text } from 'react-native';

interface ErrorBoundaryProps {
    children?: ReactNode; // Explicitly define children prop
    fallbackUI?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // You can also log the error to a service like Sentry
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallbackUI || (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>An error occurred. Please try again later.</Text>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
