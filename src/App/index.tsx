import { Box, Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import Row from "../Components/Row";
import { IJogador, initialValue, ITime, sortearTimes } from "../Resolver";

function App() {
    const [shuffle, setShuffle] = useState<IJogador[]>(initialValue);
    const [shuffleIsActive, setShuffleIsActive] = useState<ITime[]>();

    const getSortear = () => {
        sortearTimes(shuffle);
        setShuffleIsActive(sortearTimes(shuffle));
    };

    const boxSx = {
        width: "400px",
        border: "1px solid #ccc",
        borderRadius: "1rem",
        padding: "1rem",
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
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignContent: "center",
                            flexWrap: "wrap",
                            gap: "1rem",
                            alignItems: "start",
                        }}
                    >
                        <Box sx={{ width: "440px" }}>
                            <Box sx={boxSx}>
                                {shuffleIsActive
                                    ? JSON.stringify(shuffleIsActive)
                                    : "-"}
                            </Box>
                            <Button
                                sx={{
                                    backgroundColor: "#000",
                                    color: "#ccc",
                                    fontWeight: "bold",
                                    width: "100%",
                                    marginTop: "1rem",
                                    marginBottom: "1rem",
                                }}
                                onClick={() => getSortear()}
                            >
                                Sortear time
                            </Button>
                        </Box>
                        <Box sx={{ width: "440px" }}>
                            <Box sx={boxSx}>
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
