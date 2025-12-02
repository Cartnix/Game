export interface LevelCardI{
    id: number;
    title: string;
    difficult: string;
    scores: number;
    technologies: string[];
    onClick: () => void;
}