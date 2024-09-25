import React, { useState } from "react";
import { initialValue, ITime, sortearTimes } from "../Resolver";

function App() {
    const [shuffle, setShuffle] = useState(initialValue);
    const [shuffleIsActive, setShuffleIsActive] = useState<ITime[]>();

    const getSortear = () => {
        sortearTimes(JSON.parse(shuffle));
        setShuffleIsActive(sortearTimes(JSON.parse(shuffle)));
    };

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setShuffle(event.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <textarea value={shuffle} onChange={handleChange}></textarea>
                <button type="button" onClick={() => getSortear()}>
                    Sortear time
                </button>
            </header>
            {shuffleIsActive ? JSON.stringify(shuffleIsActive) : "-"}
        </div>
    );
}

export default App;
