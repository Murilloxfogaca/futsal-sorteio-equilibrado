import { Box, Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import Row from "../Components/Row";
import { IJogador, initialValue, ITime, sortearTimes } from "../Resolver";
import {
    _boxIntern,
    _box,
    paragraphMargin,
    stackSx,
    marginBottom,
    marginO,
    _button,
} from "./styled";

function App() {
    const [shuffle, setShuffle] = useState<IJogador[]>(initialValue);
    const [shuffleIsActive, setShuffleIsActive] = useState<ITime[]>();

    const getSortear = () => {
        sortearTimes(shuffle);
        setShuffleIsActive(sortearTimes(shuffle));
    };

    const teamsDOM = (teams: ITime[]): JSX.Element[] => {
        return teams.map((team: { time: IJogador[] }, index: number) => (
            <div key={index} style={marginBottom}>
                <h3 style={marginO}>Time {index + 1}</h3>
                {team.time.map((player, playerIndex) => (
                    <p style={paragraphMargin} key={playerIndex}>
                        {player.nome} ( {player.position} )
                    </p>
                ))}
            </div>
        ));
    };

    const updatePlayer = (index: number, playersUpdated: IJogador) => {
        const newsPlayers = [...shuffle];
        newsPlayers[index] = playersUpdated;
        setShuffle(newsPlayers);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Stack direction="row" spacing={1} sx={stackSx}>
                        <Box sx={_boxIntern}>
                            <Box sx={_box}>
                                {shuffleIsActive ? (
                                    <>{teamsDOM(shuffleIsActive)}</>
                                ) : (
                                    "Clique em Sortear"
                                )}

                                <Button
                                    sx={_button}
                                    onClick={() => getSortear()}
                                >
                                    Sortear time
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={_box}>
                            <Box sx={_boxIntern}>
                                {initialValue.map((item, index) => (
                                    <Row
                                        {...item}
                                        key={index}
                                        setPlayer={(
                                            jogadorAtualizado: IJogador
                                        ) =>
                                            updatePlayer(
                                                index,
                                                jogadorAtualizado
                                            )
                                        }
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </header>
        </div>
    );
}

export default App;
