export interface IJogadores {
    jogadores: IJogador[];
}

export interface IRodada {
    times: ITime[];
    nome: string;
}

export interface IJogador {
    nome: string;
    skill: number;
    position: "ala" | "pivô" | "fixo" | "goleiro";
}

export interface ITime {
    time: IJogador[];
}

export const initialValue: IJogador[] = [
    { nome: "Jogador 1", skill: 90, position: "goleiro" },
    { nome: "Jogador 2", skill: 85, position: "goleiro" },
    { nome: "Jogador 3", skill: 88, position: "goleiro" },
    { nome: "Jogador 4", skill: 75, position: "ala" },
    { nome: "Jogador 5", skill: 80, position: "ala" },
    { nome: "Jogador 6", skill: 78, position: "ala" },
    { nome: "Jogador 7", skill: 82, position: "ala" },
    { nome: "Jogador 8", skill: 79, position: "pivô" },
    { nome: "Jogador 9", skill: 77, position: "pivô" },
    { nome: "Jogador 10", skill: 81, position: "fixo" },
    { nome: "Jogador 11", skill: 73, position: "fixo" },
    { nome: "Jogador 12", skill: 84, position: "ala" },
    { nome: "Jogador 13", skill: 76, position: "fixo" },
    { nome: "Jogador 14", skill: 80, position: "ala" },
    { nome: "Jogador 15", skill: 70, position: "fixo" },
    { nome: "Jogador 16", skill: 80, position: "ala" },
    { nome: "Jogador 17", skill: 80, position: "ala" },
    { nome: "Jogador 18", skill: 80, position: "ala" },
];

function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function sortearTimes(jogadores: IJogador[]): ITime[] {
    if (jogadores.length < 15) {
        throw new Error("É necessário ter pelo menos 15 jogadores.");
    }

    const goleiros: IJogador[] = jogadores.filter(
        (j) => j.position === "goleiro"
    );
    const alas: IJogador[] = jogadores.filter((j) => j.position === "ala");
    const pivôs: IJogador[] = jogadores.filter((j) => j.position === "pivô");
    const fixos: IJogador[] = jogadores.filter((j) => j.position === "fixo");

    if (goleiros.length < 3) {
        throw new Error("É necessário ter pelo menos 3 goleiros.");
    }

    const times: ITime[] = [{ time: [] }, { time: [] }, { time: [] }];

    shuffle(goleiros);
    shuffle(alas);
    shuffle(pivôs);
    shuffle(fixos);

    times[0].time.push(goleiros.pop()!);
    times[1].time.push(goleiros.pop()!);
    times[2].time.push(goleiros.pop()!);

    for (let i = 0; i < 2; i++) {
        times[0].time.push(alas.pop()!);
        times[1].time.push(alas.pop()!);
        times[2].time.push(alas.pop()!);
    }

    for (let i = 0; i < 3 && pivôs.length > 0; i++) {
        times[i].time.push(pivôs.pop()!);
    }

    const restantes = [...alas, ...fixos];
    restantes.sort((a, b) => b.skill - a.skill);
    function totalskill(time: IJogador[]): number {
        return time.reduce((acc, jogador) => acc + jogador.skill, 0);
    }

    for (const jogador of restantes) {
        const timeMaisFraco = times.reduce((prev, curr) =>
            totalskill(prev.time) < totalskill(curr.time) ? prev : curr
        );
        timeMaisFraco.time.push(jogador);
    }

    return times;
}
