'use strict'

/*global angular*/
;
angular.module('app.helpers', []).factory('RecursionHelper', ['$compile', function ($compile) {
    "use strict";

    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns {pre: *, post: RecursionHelper.post} object containing the linking functions.
         */
        compile: function compile(element, link) {
            // Normalize the link parameter
            if (angular.isFunction(link)) {
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            //noinspection JSValidateTypes
            return {
                pre: link && link.pre ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function post(scope, element) {
                    // Compile the contents
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function (clone) {
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if (link && link.post) {
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);

//# sourceMappingURL=recursionHelper-compiled.js.map

//# sourceMappingURL=recursionHelper-compiled-compiled.js.map