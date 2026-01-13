import { io } from 'socket.io-client';
import Config from "config/index";

const baseInit = async () => {
    const token = localStorage.getItem('token');
    Config.Root.socket = io(Config.Root.socketServerUrl, {
        transports: ['websocket'],
        auth: { token }
    });
    console.log("websockect connected");
}

export default baseInit;