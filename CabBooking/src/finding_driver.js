import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress(prevProgress => prevProgress + 1);
            } else {
                clearInterval(interval);
                // Redirect or navigate to another page or component
                // Example: history.push('/13');
            }
        }, 100);

        return () => clearInterval(interval);
    }, [progress]);

    return (
        <div style={styles.container}>
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Finding driver</div>
                <div style={styles.progressBarContainer}>
                    <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
                </div>
                <div style={styles.progressPercentage}>{progress}%</div>
                <div style={styles.circle}></div>
            </div>
        </div>
    );
};

// Internal CSS styles
const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url('GoogleMapTA.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    loadingContainer: {
        textAlign: 'center',
        position: 'relative',
    },
    loadingText: {
        fontSize: '24px',
        marginBottom: '20px',
        color: 'black',
        textShadow: '2px 2px 4px #000000',
    },
    progressBarContainer: {
        width: '300px',
        height: '30px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
        transition: 'width 0.2s',
    },
    progressPercentage: {
        marginTop: '10px',
        fontSize: '18px',
        color: 'black',
        textShadow: '2px 2px 4px #000000',
    },
    circle: {
        width: '100px',
        height: '100px',
        border: '5px solid rgba(0, 0, 255, 0.5)',
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'expandCircle 3s infinite',
    },
    '@keyframes expandCircle': {
        '0%': {
            width: '100px',
            height: '100px',
            opacity: '1',
        },
        '100%': {
            width: '300px',
            height: '300px',
            opacity: '0',
        },
    },
};

export default LoadingScreen;
