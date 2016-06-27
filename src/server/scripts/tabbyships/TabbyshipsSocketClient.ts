import * as events from "../../../common/SocketEvents";
import {IGame, IBoard, CellValue, IUser, IGuess, ISession} from "./../../../common/Models";
import {ISocketClient} from "../sockets/ISocketClient";
import { Db } from "mongodb";
import * as jwt from "jsonwebtoken";
import { default as config } from "../config";
import { ILogger } from "extension-services";

export class TabbyshipsSocketClient implements ISocketClient
{    
    socket: SocketIO.Socket;
    userId: string;
    
    constructor(private db : Db, private logger: ILogger)
    {        
    }
    
    init(socket : SocketIO.Socket)
    {
        this.socket = socket;
        this.socket.on('disconnect', () => this.onDisconnect());  
        this.socket.on('error', err => this.onError(err));  
        this.socket.on(events.INIT_SESSION, (session:ISession, callback) => this.onInitSession(session, callback));
        this.socket.on(events.MAKE_GUESS, (guess, callback) => this.onMakeGuess(guess, callback));
        this.socket.on(events.GET_USER, (callback) => this.onGetUser(callback));
    }    

    getFakeBoard() : IBoard
    {
        var board : IBoard = [];
        for(var yi=0; yi<10; yi++)
        {
            board.push([]);
            board[yi] = [];

            for(var xi=0; xi<10; xi++)
                board[yi].push(Math.random() < 0.2 ? (Math.random() < 0.2 ? CellValue.Hit : CellValue.Miss) : CellValue.Empty);
        }
        return board;
    }

    getFakeGame(playera:IUser, playerb:IUser) : IGame
    {
        return {
            id: Math.random() + "",
            players: [playera.id, playerb.id],
            turn: Math.random() < 0.5 ? playera.id : playerb.id,
            boards: [this.getFakeBoard(), this.getFakeBoard()]
        }
    }

    getFakeUser() : IUser
    {
        return {
            id: Math.random() + "",
            activeGames: [ ]
        }
    }

    getFakeMe() : IUser
    {
        var me = this.getFakeUser();
        var opp = this.getFakeUser();
        me.activeGames.push(this.getFakeGame(me,opp));
        me.activeGames.push(this.getFakeGame(me,opp));
        me.activeGames.push(this.getFakeGame(me,opp));
        return me;
    }

    async onInitSession(session:ISession, callback:(session:ISession)=>void)
    {
        this.logger.debug(this, "onInitSession", {session});       
        if (session==null)
        {
            this.logger.debug(this, "No session supplied, creating a new guest user and session");
            var user : IUser = {
                activeGames: []
            };
            var resp = await this.db.collection("users").insertOne(user);
            this.userId = user.id = resp.insertedId+"";
            var token = jwt.sign({ userId: user.id }, config.jwtSecret);                
            callback({ token });
        }
        else
        {
            // try {
            // var decoded = jwt.verify(token, 'wrong-secret');
            // } catch(err) {
            // // err
            // }
            throw new Error("token not implemented");
        }

        // var me = this.getFakeMe();
        // this.userId = me.id;
        // console.log("on extension initted, sending initial state", me);        
        // callback(me);
    }

    onGetUser(callback:(user:IUser)=>void)
    {
        this.logger.debug(this, "Getting user..");
        
    }
    
    onMakeGuess(guess:IGuess, callback:(value:CellValue)=> void)
    {
        this.logger.debug(this, "User making guess", guess);
        
    }

    onDisconnect()
    {
        this.logger.debug(this, 'user disconnected, should cleanup in here!!!!!');
    }

    onError(err)
    {
        this.logger.error(this, 'Whoops error...', err);
    }
}