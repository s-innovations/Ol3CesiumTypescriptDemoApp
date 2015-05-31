
import ko = require("knockout");
import ol = require("ol3");

ko.bindingHandlers.ol3Map = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        var map: ol.Map;
        if (map = ko.unwrap(valueAccessor())) {
            map.setTarget(element);
        }
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        console.log(arguments);
        var map: ol.Map;
        if (map = ko.unwrap(valueAccessor())) {
            setTimeout(() => { map.setTarget(element); }, 100);
        }
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.

        //  logger.logVerbose("ko.bindingHandlers.horizontalScroll update", arguments);
    }
};  