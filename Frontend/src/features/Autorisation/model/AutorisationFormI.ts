export interface LoginFormProps {
    onClose: () => void,
    switchForm: () => void;
}

export interface UserI {
    id: number,
    username: string,
    password: string,
    email: string
}