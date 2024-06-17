import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/tampa`);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching the weather data', error);
            setError('Error fetching the weather data');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Moon Phase App</h1>
                
                <button onClick={fetchWeatherData}>Get Phase</button>
                {error && <p>{error}</p>}
                {weatherData && (
                    <div>
                        <h2>The Current Moon Phase Is</h2>
                        <pre>{JSON.stringify(weatherData.astro.moon_phase, null, 2)}</pre>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
