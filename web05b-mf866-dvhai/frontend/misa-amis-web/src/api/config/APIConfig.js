var APIConfig = {
    development: 'https://localhost:44364/',
    production: 'local:8081'
}

export default APIConfig[process.env.NODE_ENV];