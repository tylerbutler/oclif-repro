oclif-hello-world
=================

This project reproduces problems with the `enableJsonFlag` property in oclif.

## Setup

To set up the repo to reproduce the problem:

- clone this repo
- run `pnpm i` (or use npm or yarn, it shouldn't matter)
- run `npm run build`

## Tests

### Working case

From the root of the repo, run:

```shell
$ node bin/dev.js hello Foo --from Bar --json
{
  "msg": "hello Foo from Bar! (./src/commands/hello/index.ts)"
}
```

This command does NOT inherit from the base class, and the JSON output works as expected.

### Broken case

From the root of the repo, run:

```shell
$ node bin/dev.js hello:world
hello world! (./src/commands/hello/world.ts)
```

Then add `--json` to the command:

```shell
$ node bin/dev.js hello:world --json
{
  "error": {
    "oclif": {
      "exit": 2
    },
    "parse": {
      "input": {
        "args": {},
        "argv": [
          "--json"
        ],
        "context": {
          "argv": [
            "--json"
          ],
          "config": {
            "options": {
              "root": "/home/tylerbu/code/oclif-repro/bin"
            },
            "arch": "x64",
            "bin": "oclif-repro",
            "cacheDir": "/home/tylerbu/.cache/oclif-repro",
            "channel": "stable",
            "configDir": "/home/tylerbu/.config/oclif-repro",
            "dataDir": "/home/tylerbu/.local/share/oclif-repro",
            "debug": 0,
            "dirname": "oclif-repro",
            "errlog": "/home/tylerbu/.cache/oclif-repro/error.log",
            "flexibleTaxonomy": false,
            "home": "/home/tylerbu",
            "name": "oclif-repro",
            "pjson": "<SNIPPED>",
      "output": {
        "args": {},
        "argv": [
          "--json"
        ],
        "flags": {},
        "metadata": {
          "flags": {}
        },
        "nonExistentFlags": [
          "--json"
        ],
        "raw": []
      }
    },
    "flags": [
      "--json"
    ]
  }
}
```

The `hello:world` command inherits from the `BaseCommand`, the code of which is from <https://oclif.io/docs/base_class>.
The `hello` command, on the other hand, does not. If you modify the hello command to inherit from the `BaseCommand`,
then it starts to blow up too:

```shell
$ node bin/dev.js hello Foo --from Bar --json
{
  "error": {
    "oclif": {
      "exit": 2
    },
    "parse": {
      "input": {
        "args": {},
        "argv": [
          "--json"
        ],
        "context": {
          "argv": [
            "--json"
          ],
          "config": {
            "options": {
              "root": "/home/tylerbu/code/oclif-repro/bin"
            },
            "arch": "x64",
            "bin": "oclif-repro",
            "cacheDir": "/home/tylerbu/.cache/oclif-repro",
            "channel": "stable",
            "configDir": "/home/tylerbu/.config/oclif-repro",
            "dataDir": "/home/tylerbu/.local/share/oclif-repro",
            "debug": 0,
            "dirname": "oclif-repro",
            "errlog": "/home/tylerbu/.cache/oclif-repro/error.log",
            "flexibleTaxonomy": false,
            "home": "/home/tylerbu",
            "name": "oclif-repro",
            "pjson": "<SNIPPED>",
      "output": {
        "args": {},
        "argv": [
          "--json"
        ],
        "flags": {},
        "metadata": {
          "flags": {}
        },
        "nonExistentFlags": [
          "--json"
        ],
        "raw": []
      }
    },
    "flags": [
      "--json"
    ]
  }
}
```

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g oclif-repro
$ oclif-repro COMMAND
running command...
$ oclif-repro (--version)
oclif-repro/0.0.0 linux-x64 node-v18.18.0
$ oclif-repro --help [COMMAND]
USAGE
  $ oclif-repro COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-repro foo [FILE]`](#oclif-repro-foo-file)
* [`oclif-repro hello PERSON`](#oclif-repro-hello-person)
* [`oclif-repro hello world`](#oclif-repro-hello-world)
* [`oclif-repro help [COMMANDS]`](#oclif-repro-help-commands)
* [`oclif-repro plugins`](#oclif-repro-plugins)
* [`oclif-repro plugins:install PLUGIN...`](#oclif-repro-pluginsinstall-plugin)
* [`oclif-repro plugins:inspect PLUGIN...`](#oclif-repro-pluginsinspect-plugin)
* [`oclif-repro plugins:install PLUGIN...`](#oclif-repro-pluginsinstall-plugin-1)
* [`oclif-repro plugins:link PLUGIN`](#oclif-repro-pluginslink-plugin)
* [`oclif-repro plugins:uninstall PLUGIN...`](#oclif-repro-pluginsuninstall-plugin)
* [`oclif-repro plugins:uninstall PLUGIN...`](#oclif-repro-pluginsuninstall-plugin-1)
* [`oclif-repro plugins:uninstall PLUGIN...`](#oclif-repro-pluginsuninstall-plugin-2)
* [`oclif-repro plugins update`](#oclif-repro-plugins-update)

## `oclif-repro foo [FILE]`

describe the command here

```
USAGE
  $ oclif-repro foo [FILE] [--json] [-f] [-n <value>]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  describe the command here

EXAMPLES
  $ oclif-repro foo
```

_See code: [src/commands/foo.ts](https://github.com/tylerbutler/oclif-repro/blob/v0.0.0/src/commands/foo.ts)_

## `oclif-repro hello PERSON`

Say hello

```
USAGE
  $ oclif-repro hello PERSON -f <value> [--json]

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/tylerbutler/oclif-repro/blob/v0.0.0/src/commands/hello/index.ts)_

## `oclif-repro hello world`

Say hello world

```
USAGE
  $ oclif-repro hello world [--json] [--log-level debug|error|info|warn]

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  Specify level for logging.
                        <options: debug|error|info|warn>

DESCRIPTION
  Say hello world

EXAMPLES
  $ oclif-repro hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/tylerbutler/oclif-repro/blob/v0.0.0/src/commands/hello/world.ts)_

## `oclif-repro help [COMMANDS]`

Display help for oclif-repro.

```
USAGE
  $ oclif-repro help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oclif-repro.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.4/src/commands/help.ts)_

## `oclif-repro plugins`

List installed plugins.

```
USAGE
  $ oclif-repro plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oclif-repro plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/index.ts)_

## `oclif-repro plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oclif-repro plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oclif-repro plugins add

EXAMPLES
  $ oclif-repro plugins:install myplugin 

  $ oclif-repro plugins:install https://github.com/someuser/someplugin

  $ oclif-repro plugins:install someuser/someplugin
```

## `oclif-repro plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oclif-repro plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oclif-repro plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/inspect.ts)_

## `oclif-repro plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oclif-repro plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oclif-repro plugins add

EXAMPLES
  $ oclif-repro plugins:install myplugin 

  $ oclif-repro plugins:install https://github.com/someuser/someplugin

  $ oclif-repro plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/install.ts)_

## `oclif-repro plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oclif-repro plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help      Show CLI help.
  -v, --verbose
  --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ oclif-repro plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/link.ts)_

## `oclif-repro plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-repro plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-repro plugins unlink
  $ oclif-repro plugins remove
```

## `oclif-repro plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-repro plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-repro plugins unlink
  $ oclif-repro plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/uninstall.ts)_

## `oclif-repro plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-repro plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-repro plugins unlink
  $ oclif-repro plugins remove
```

## `oclif-repro plugins update`

Update installed plugins.

```
USAGE
  $ oclif-repro plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.0.1/src/commands/plugins/update.ts)_
<!-- commandsstop -->
