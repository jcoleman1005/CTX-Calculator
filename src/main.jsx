import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Catches any render-time error so a thrown exception shows a visible
// message instead of a silent blank screen.
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, message: '' }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, message: error && error.message ? error.message : String(error) }
    }
    componentDidCatch(error, info) {
        console.error('Rocephin Calculator crashed:', error, info)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="max-w-md mx-auto p-6">
                    <div className="bg-red-50 border border-red-300 rounded-xl p-5 text-red-800">
                        <p className="font-bold mb-2">The calculator hit an error</p>
                        <p className="text-sm">Do not rely on any value on screen. Please reload the page and try again.</p>
                        <p className="text-xs mt-2 text-red-500 font-mono break-words">{this.state.message}</p>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

const rootEl = document.getElementById('root')
ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
)
