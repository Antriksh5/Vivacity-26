import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/apiConfig';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [config, setConfig] = useState({
        title: '',
        message: '',
        isVisible: true,
        eventName: '',
        eventDescription: '',
        date: '',
        time: '',
        venue: ''
    });
    const [saveStatus, setSaveStatus] = useState('');

    // Hardcoded credentials
    const ADMIN_EMAIL = "vivacity.admin@lnmiit.ac.in";
    const ADMIN_PASS = "vivacity26";

    useEffect(() => {
        // Fetch current config if logged in
        if (isLoggedIn) {
            fetchConfig();
        }
    }, [isLoggedIn]);

    const fetchConfig = async () => {
        try {
            const res = await fetch(getApiUrl('/popup'));
            const data = await res.json();
            setConfig(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveStatus('Saving...');
        try {
            await fetch(getApiUrl('/popup'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            setSaveStatus('Saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (err) {
            console.error(err);
            setSaveStatus('Failed to save.');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/20">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Popup Admin</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/30 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                placeholder="Enter admin email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/30 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                placeholder="Enter password"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm p-2 bg-red-900/20 rounded">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4 bg-gray-900">
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-white">Popup Configuration</h1>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        Logout
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Header Title Removed */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Event Name</label>
                            <input
                                type="text"
                                value={config.eventName || ''}
                                onChange={(e) => setConfig({ ...config, eventName: e.target.value })}
                                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="e.g. Tech Summit 2026"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Date</label>
                            <input
                                type="text"
                                value={config.date || ''}
                                onChange={(e) => setConfig({ ...config, date: e.target.value })}
                                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="e.g. 15 Feb"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Time</label>
                            <input
                                type="time"
                                value={config.time || ''}
                                onChange={(e) => setConfig({ ...config, time: e.target.value })}
                                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Venue</label>
                            <input
                                type="text"
                                value={config.venue || ''}
                                onChange={(e) => setConfig({ ...config, venue: e.target.value })}
                                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="e.g. LNMIIT Campus"
                            />
                        </div>
                    </div>

                    {/* Message Body Removed */}



                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Event Description</label>
                        <textarea
                            value={config.eventDescription || ''}
                            onChange={(e) => setConfig({ ...config, eventDescription: e.target.value })}
                            rows={4}
                            className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Detailed description..."
                        />
                    </div>

                    <div className="flex items-center space-x-3 bg-black/20 p-4 rounded-lg">
                        <input
                            type="checkbox"
                            id="isVisible"
                            checked={config.isVisible}
                            onChange={(e) => setConfig({ ...config, isVisible: e.target.checked })}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="isVisible" className="text-white cursor-pointer select-none">
                            Enable Popup (Show on website)
                        </label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5"
                        >
                            Save Changes
                        </button>
                        {saveStatus && (
                            <p className="mt-4 text-center text-green-400 font-medium animate-pulse">
                                {saveStatus}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;
