export interface IExperiment
{
    id: number;
    description: string;
    url: string;
    site: string;
    title: string;    
    author: string;
}

export interface IGetExperimentsResponse
{
    experiments: IExperiment[];
    total: number;
}

export interface IAppState
{
    totalExperiments?: number;
    isLoadingExperiements?: boolean;
    experiments?: IExperiment[];
    timeOfLastUpdateUnix?: number;
}