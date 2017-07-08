# Entryflow
[![Entryflow](https://sergix.github.io/img/entryflow.png)](https://sergix.github.io/projects/entryflow/index.html)

## Definition
Entryflow is a program designed to help ease project documentation and changelog writing.

## Implementation
This project is written in [TypeScript](http://www.typescriptlang.org/index.html) using [Visual Studio Code](https://code.visualstudio.com/) and the [Electron framework](https://electron.atom.io).

## Contributing
View the [Contributing Guidelines](https://github.com/Sergix/Entryflow/blob/master/CONTRIBUTING.md) for more information. The Entryflow project is open to anyone and any code!

## Builds
Once you build a file from the source code to an executable (.exe), push it to the /build/windows folder, along with the associated changelog (see Changelog section), source code (see Source Code section), and documentation (see Documentation section.)
The format of the archive's filename is as follows: "entryflow-v(build version).jar"

## Source Code
Keep all updated and current source code in the /src directory, which should be updated with every build.  
Please review the [Source Code Style Guide](https://github.com/Sergix/Entryflow/blob/master/docs/SourceStyleGuide.md) for more information.  
When pushing the source code with a build, DO NOT change the filenames.
As mentioned in the "Builds" section, package the source code with every build into a ".zip" file and a Wrapfile that should be placed in the /build/src directory when pushing a build. Subfolders in the /src directory (e.g. /src/app/...) should be included in packaged source.  
The format for the file should be as follows: `entryflow-src-v(version).zip`, and `entryflow-src-v(version).wrap`.

## Changelog
Every time an update is pushed, the changelog will be updated and pushed as well.
It is highly recommended that every time you build you update the changelog. Once you add something to the changelog, DO NOT remove the entry, unless if, and only if, it is incorrect (such as a typo in the version number.) If you change a previous entry you must include a statement stating your change in a seperate entry.
The global changelog file is in the root folder of the project and is named "changelog.txt"; EVERY note will go into this file. It is also required that when you push a build you push an associated changelog file, formatted "entryflow-changelog-(build version).txt". This file should be pushed to the /build/changelog directory.
Changelog entry headings must be formatted as shown in the given example below.
New changelog entries in the global "changelog.txt" file should be placed at the _top_ of the file, not the bottom. Simply create a few newlines before the latest entry and use the newlines to enter the new entry information. Entries must also be tab-indented.
The format for a changelog entry is as follows:
```
(#(entry))[MM/DD/YYYY-HH:MM (version) (username)]   
	(entry contents)   
	(entry contents)  
	(blank newline)  
```
Here is an example changelog:  
```
(#1)[1/1/2017-3:33 1.0 Sergix]
	README uploaded.  
	Pushed to github.  

```
Of course, a real changelog would be more descriptive in its entries.

Timestamps should be in 24-hour (aka military) time.

## Versioning
Version numbers should use [Semantic Versioning](https://github.com/mojombo/semver/blob/master/semver.md).  
Numbering versions on files (such as released builds) should take the format of "vX.Y.Z", where "X.Y.Z" is the version.

## Documentation
Documentation is published with every:
- Major and minor release ([Documentation Style Guide](https://github.com/Sergix/Entryflow/blob/master/docs/DocStyleGuide.md))
- Patch ([Patch Notes Documentation Style Guide](https://github.com/Sergix/Entryflow/blob/master/docs/PatchDocStyleGuide.md))

## Slack
The JTerm project now has a Slack messaging group! Request to join the [Sergix](https://sergix.slack.com/) team to recieve notifications on updates, Travis CI build status, and more on the #jterm channel.

> Entryflow pre-alpha 
> `nullversion`  
> This project and its source are held under the GNU General Public License, located in the LICENSE file in the project's directory.  
> (c) 2017
