import React from 'react';
import { Link } from 'react-router-dom';
import comingSoonImg from '../assets/landingPage/comingSoon.png';

const ComingSoon = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#1a0b2e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Link to="/" style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'Public Sans, sans-serif',
                fontWeight: '700',
                fontSize: '1.2rem',
                zIndex: 10,
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease'
            }}>
                ← BACK TO HOME
            </Link>

            <img
                src={comingSoonImg}
                alt="Coming Soon"
                style={{
                    maxWidth: '90%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
                }}
            />
        </div>
    );
};

export default ComingSoon;
