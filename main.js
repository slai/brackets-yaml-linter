/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, yaml, Mustache */
define(function (require, exports, module) {
    'use strict';
    var AppInit = brackets.getModule("utils/AppInit"),
        CodeInspection = brackets.getModule("language/CodeInspection");
    var yaml = require("js-yaml");

    function buildLinterErrorObject(ex, type) {
        var o = {
            pos: {line: ex.mark.line, ch: ex.mark.column},
            type: type
        };
        var message = ex.toString();
        if (message.indexOf('JS-YAML: ') === 0) {
            message = message.substring('JS-YAML: '.length);
        }
        o.message = message;

        return o;
    }

    function yamlLinter(text, fullPath) {
        var warnings = [];
        var error = null;
        var i = 0;

        try {
            yaml.safeLoad(text, {
                'onWarning': function (w) { warnings.push(w); }
            });
        } catch (e) {
            error = e;
        }

        var result = { errors: [] };
        if (warnings) {
            for (i = 0; i < warnings.length; i++) {
                result.errors.push(buildLinterErrorObject(warnings[i], CodeInspection.Type.WARNING));
            }
        }
        if (error) {
            result.errors.push(buildLinterErrorObject(error, CodeInspection.Type.ERROR));
        }

        if (result.errors) {
            return result;
        }
        else {
            return null;
        }
    }

    AppInit.appReady(function () { CodeInspection.register("yaml", { name: "YamlLint", scanFile: yamlLinter }); });
});
