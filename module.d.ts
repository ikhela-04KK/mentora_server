// creation d'une déclaration de type pour typer ces éléments .env 

declare namespace NodeJS{
    export interface ProcessEnv{
        DATABASE_URL: string; 
        jwtSecretKey :string; 
        jwtRefreshTokenKey:string;
    }
}