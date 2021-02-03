import { config } from './index.js';

let origins;
if (config.modeEnv === 'production') {
  origins = ['https://delivery.tars.dev','http://localhost:8080'];
}
else{
  origins = ['https://delivery.tars.dev','http://localhost:8080'];
}

const corsOptions = {
  origin: origins,
  credentials: true ,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

export default corsOptions;
