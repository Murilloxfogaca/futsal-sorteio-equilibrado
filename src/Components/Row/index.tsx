import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IJogador } from "../../Resolver";
import { ChangeEvent, useState } from "react";
import { _stack, _textField, width100 } from "./styled";

interface IJogadorExtend extends IJogador {
    setPlayer: (jogador: IJogador) => void;
}

function Row(props: IJogadorExtend) {
    const { nome, skill, position, setPlayer } = props;
    const [role, setRole] = useState(position);
    const [name, setName] = useState(nome);
    const [skills, setSkills] = useState(skill);

    const handleChangeRole = (event: SelectChangeEvent) => {
        const newPosition = event.target.value;
        if (["ala", "pivô", "fixo", "goleiro"].includes(newPosition)) {
            setRole(newPosition as "ala" | "pivô" | "fixo" | "goleiro");
            setPlayer({
                nome: name,
                skill: skills,
                position: newPosition as "ala" | "pivô" | "fixo" | "goleiro",
            });
        }
    };

    const handleChangeName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setName(value);

        setPlayer({ nome: value, skill: skills, position: role });
    };

    const handleChangeSkill = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = Number(event.target.value);
        setSkills(value);
        setPlayer({ nome: name, skill: value, position: role });
    };

    return (
        <Stack direction="row" spacing={1} sx={_stack}>
            <Box>
                <TextField
                    id="name-basic"
                    label="Nome do jogador"
                    variant="outlined"
                    value={name}
                    onChange={(e) => handleChangeName(e)}
                />
            </Box>
            <Box>
                <TextField
                    sx={_textField}
                    id="skills-basic"
                    label="Habilidade do jogador"
                    variant="outlined"
                    value={skills}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    onChange={(e) => handleChangeSkill(e)}
                />
            </Box>
            <Box>
                {position === "goleiro" ? (
                    <TextField
                        value={"Goleiro"}
                        type="text"
                        disabled
                        style={width100}
                    />
                ) : (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Função
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="role"
                            onChange={handleChangeRole}
                        >
                            <MenuItem value={"pivô"}>Pivô</MenuItem>
                            <MenuItem value={"ala"}>Ala</MenuItem>
                            <MenuItem value={"fixo"}>Fixo</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </Box>
        </Stack>
    );
}

export default Row;
