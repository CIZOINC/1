/*global angular*/
angular
    .module('app.directives')
    .directive("videoSrc", videoSrc);

/* @ngInject */
function videoSrc() {
    "use strict";
    return {
        restrict: "A",
        link: {
            pre: function (scope, elem, attr) {
                var element = elem;
                var sources;
                var canPlay;

                function changeSource() {
                    if (!sources || !sources.length) {
                        return;
                    }
                    for (var i = 0, l = sources.length; i < l; i++) {
                        canPlay = element[0].canPlayType(sources[i].type);

                        if (canPlay == "maybe" || canPlay == "probably") {
                            element.attr("src", sources[i].src);
                            element.attr("type", sources[i].type);
                            break;
                        }
                    }

                    if (canPlay == "") {
                        scope.$emit("onVideoError", {type: "Can't play file"})
                    }
                }

                scope.$watch(attr.videoSrc, function (newValue, oldValue) {
                    if (!sources || newValue != oldValue) {
                        sources = newValue;
                        changeSource();
                    }
                });
            }
        }
    }
}
videoSrc.$inject = [];