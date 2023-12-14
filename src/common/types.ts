/* eslint-disable prettier/prettier */
export type connectUsers = {
    idSocket?: string;
    idUser?: number;
    name?: string;
};

export interface ChatMessagerie {
    chat_id: number;
    user_id: number;
    content: string;
    username:string; 
    online?:boolean; 
    source?:string;
    created_at?: string;
    delivered_at?: string | null;
    id?: number;
    seen_at?: string | null ;
    updated_at?: string;
}
export type ChatResult = ChatMessagerie[];