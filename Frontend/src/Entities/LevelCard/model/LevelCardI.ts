export interface LevelCardI{
    id: number;
    title: string;
    difficult: string;
    scores: number;
    technologies: string[];
    task: string;
    onClick: () => void;
}