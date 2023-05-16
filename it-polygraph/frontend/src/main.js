import './style.css';
import './app.css';

// import $ from 'jquery';
// import 'jquery-ui-dist/jquery-ui';

import {OnLoad} from "./menu";
import {SetupGoFunctions} from "./gofuncs";
import {LoadHandlers} from "./handlers";

SetupGoFunctions();
OnLoad();
LoadHandlers();
