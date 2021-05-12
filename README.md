# eternia
Eternia Static Site Generator

## Installation

```
npm -g i eternia
```

## Example

```shell

eternia create furkies-purrkies md
eternia build catpea.com
hs -o -c-1 ./dist/furkies-purrkies/wwwroot/

```

## Usage

```shell

eternia build <task-name> #run it the directory containing your content database.

eternia create furkies-purrkies [md] # to create markdown record.

eternia create furkies-purrkies [html] # to create html record.

eternia create --name "The Philosopher" westland-warrior # to create a new yaml record.

```

## How does it work?

Eternia works in three simple steps:

1. Read the index.json of all the records in the database directory.
2. Invoke a series of middleware plugins that transform the record into its cache directory.
3. Write the results to a destination directory!

## Notes

Because of aggressive caching it is recommended that you preserve time-stamps, use the ```-p``` flag with scp and ```-H posix``` with tar to store high resolution timestamps.

```shell

# tar using -H posix
tar -c -H posix -f furkies-purrkies.tar --exclude='*.mp4' furkies-purrkies

# scp using -p
scp -p -r bork:code/furkies-purrkies .

```

## TODO

- [x] both website and homepage should run in parallel for testing.
- [x] configuration must contain order: "latest",
- [x] add artwork link in the views of the server (credit the image owner)
- [x] new entry creation! ... possible event interface...
- [x] optimize crawler skip files that have already been downloaded, check file-name time stamps...
- [x] Dependency Resolver, create a stack of projects that lead up to the final one
- [x] add pre and post middleware set
- [x] place strong emphasis on validating input data (use invariant)
- [x] Make .text version of content based on .print version to perserve the links.
- [x] add progress tracking to copying narrations
- [x] add progress tracking to copying images
- [x] resolve dependencies (from configuration file ex catpea has both warrior and poetry) prior to compilation
- [x] use https://www.npmjs.com/package/rc for configuration
- [x] move website configuration out of /home/meow/Universe/Development/bowel/src/compiler/plugins/create-website/index.mjs
- [x] changing description: 'Home of Furkies Purrkies and Westland Warrior', in src/compiler/plugins/create-website/index.mjs
- [x] For now both configuration and server-objects contaion links to social network titles and subtitles this needs to be fixed.
- [x] List transformation architecture with middleware support (v3)
- [x] the v1 decompiler is allowed to be hacky as v1 directory structures are still a little bit messy
- [x] Add fallback image if record is missing an image (poetry-cover.jpg)
- [x] Should record injection (add new post) be internalized? .... YEAH, it is currently shelled out
- [x] Connect the build-in server with the crawler.
- [x] Add printable version generator
- [x] BUG http://black:7468/read/furkies-purrkies/25 Has no card interface
- [x] Images mentioned in posts no longer get a sm-/xl- versions as that creates too many files, and creates ambiguity
- [x] Do not create audio/images if not needed
- [x] During import remove the prefixes in content.html <img src="..." alt="X"> rename md-poetry-0025-x.jpg to poetry-0025-x.jpg
- [x] Setup a plugin-system, plugins should be listed in server object files.
- [x] Add print field
- [x] Convert standard HTML to bootstrap formatting using cheerio. This needs cards, should this happen in the server?
- [x] Copy audio extras, and dependencies... dependencies.json?
- [x] Image credit is missing in bowel and server-objects, this only applies to poetry.
- [x] Add YouTube video thumbnail downloader to the compiler.
- [x] Create an Apache like "Index Of" for poems that will double as a website mirror.
- [x] Failure to detect links in yaml database
- [x] Warrior is missing images.
- [x] Warrior is missing the audio linked in the introduction poem
- [x] Remove unused yid-* files to force a new download and thus timestamp, to signal cover image rebuild.
- [x] There need to be two decompilers one for v1 format and the second for v2.
- [x] v1 decompiler
- [x] Tag server objects with a format: 'v1'/'v2' markers to automaticaly tell them apart.
- [x] Divide code for compiler and recompiler, they should live in separate files.
- [x] HTML: Standardize html from md and yaml, but do not create a bootstrap variant here, just well written html.
- [x] HTML: YAML Database is already standardized witht the HTML template
- [x] HTML: Existing poetry is in .section/p format and this is acceptable
- [x] HTML: Markdown format needs .section class (in md \n is ignored it makes a p in content html, but is easily readable in content.md state)
- [x] Add New, a sophisticated template system, that us used for a "Add New Post", this may need to be a commander based CLI rather than a menu.
- [x] Finish the wget --mirror repacement
- [x] Internalize the server/wget build system, use the server in a sub module mode, and then shell out the wget.
- [x] links need to be rewritten in the html being saved.
- [x] Adapt catpea/server to import the extended v2 dist folder, server uses a shell script to copy those files, easy fix.
- [x] .attachments, respect .attachments in index.json... add attachments to bowel/import, considering converting bowel to de-compiler...
- [x] rename index.json/.dependencies to index.json/data[0].attachements
- [x] put bowel in compiler mode, remove content.html in favor of html.html pattern.
