// creation d'une déclaration de type pour typer ces éléments .env 
// sert à informer des types des déclarations d'environnement 
declare namespace NodeJS{
    export interface ProcessEnv{
        DATABASE_URL: string; 
        jwtSecretKey :string; 
        jwtRefreshTokenKey:string;
    }
}