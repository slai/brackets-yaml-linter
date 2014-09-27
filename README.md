brackets-yaml-linter
====================

This is an extension for the [Brackets](http://brackets.io) editor that provides linting functionality for YAML files.

To install, simply look for this extension in the Brackets extension manager.

This extension uses a modified, bundled version of [js-yaml](https://github.com/nodeca/js-yaml) to parse the YAML file. The modification makes js-yaml emit a warning when a key is re-defined in a mapping, e.g.

```yaml
days_of_the_week:
  Monday: 1
  Tuesday: 2
  Wednesday: 3
  Thursday: 4
  Friday: 5
  Saturday: 6
  Sunday: 7
  Monday: 1
```

will cause a warning to be emitted because `Monday` has been defined twice. This was added because it is a common mistake that can be frustrating to trouble-shoot.
