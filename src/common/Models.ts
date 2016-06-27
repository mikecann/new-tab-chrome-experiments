export interface IUser
{
    id?: string;
    activeGames: IGame[];
}

export interface IGame
{
    id: string;
    players: string[];
    turn: string;
    boards: IBoard[];
}

export interface IBoard extends Array<Array<CellValue>>
{
}

export enum CellValue
{
    Empty,
    Miss,
    Hit
}

export interface IGuess
{
    gameId: string;
    x: number;
    y: number;
}

export interface ISession
{
    token: string;
}