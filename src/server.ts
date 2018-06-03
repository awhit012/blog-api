import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';


class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    let port = process.env.PORT || 8080;
    this.app.listen(port);


  }
  
  // application config
  public config(): void {

    if (process.env.NODE_ENV == "production") {
      mongoose.connect(process.env.MLAB_URL, 
        { server: { 
          // sets how many times to try reconnecting
          reconnectTries: Number.MAX_VALUE,
          // sets the delay between every retry (milliseconds)
          reconnectInterval: 1000 
        } 
    })
    } else {
      mongoose.connect("mongodb://localhost/tes");
    }

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());


    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/v1/posts', PostRouter);
    this.app.use('/api/v1/users', UserRouter);

  }
}

// export
export default new Server().app;