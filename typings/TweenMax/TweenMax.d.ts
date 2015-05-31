

declare module "greensock/TweenMax" {
    
    module TweenMax {
        export function to();
    }
    export = TweenMax;
} 
declare module "greensock/TimelineLite" {
    class TimelineLite {
        to(arg1,arg2,arg3,arg4);
    }
    export = TimelineLite;
}
declare module "greensock/Back" {
    module Back {
        export module easeOut {
            function config(arg1);
        }
        export module easeIn {
            function config(arg1);
        }
        export module easeInOut { }
    }
    export = Back;
}
declare module "greensock/Bounce" {
    module Back {
        export module easeOut {
            function config(arg1);
        }
        export module easeIn { }
        export module easeInOut { }
    }
    export = Back;
}
declare module "greensock/Circ" {
    module Back {
        export module easeOut {
            function config(arg1);
        }
        export module easeIn { }
        export module easeInOut { }
    }
    export = Back;
}