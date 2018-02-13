const env = process.env;

export const NodeENV = env.NodeENV || 'development'

export default {
    port: env.port || '3000',
    host: env.host || '0.0.0.0',
    get serverUrl(){
        return `http://${this.host}:${this.port}`;
    }
}