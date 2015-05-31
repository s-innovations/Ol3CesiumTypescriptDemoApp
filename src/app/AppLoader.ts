

import App = require("./App");



module AppLoader{

    export function getApplicationModel(){
                
        console.log("Initializing Application");
        return new App();
    }
}

export = AppLoader; 