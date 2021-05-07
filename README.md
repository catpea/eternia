# eternia
Eternia Static Site Generator

## Installation

```
npm -g i eternia
```

## Usage

```shell

eternia build profile-name #run it the directory containing your content database.

eternia create furkies-purrkies html # to create html record.

eternia create furkies-purrkies md # to create markdown record.

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

- [ ] .attachments, respect .attachments in index.json... add attachments to bowel/import, considering converting bowel to de-compiler...

## ROADMAP

- [ ] configuration must contain order: "latest",
- [ ] Make a stand-alone build of WARRIOR using the catpea template, this will replace the existing site.
- [ ] compiler/convert-audio-to-video is just touching files, it is not creating the videos, fix it when this program goes live
- [ ] Introduce the software tutorial Book
- [ ] check for indexes that point to removed record-directories and remove them (put use the trash bin, not rimraf)
- [ ] Add the Audiobook compiler, and remember that it just concatetantes files so it is very fast.
- [ ] Add Cover Image to mp4 files
- [ ] Setup Audiobook With Amazon/similar

## ATTACHMENTS FYI
```JavaScript

"attachments": [
  {"dir":"image", "name":"poetry-cover.jpg"},
  {"dir":"audio", "name":"audio-jogger.mp3"},
  {"dir":"audio", "name":"bird-pecking-complaint.mp3"},
  {"dir":"audio", "name":"emergence.mp3"}
],

```

## DONE

- [x] new entry creation! ... possible event interface...
- [x] optimize crawler skip files that have already been downloaded, check file-name time stamps...
- [x] Dependency Resolver, create a stack of projects that lead up to the final one
- [x] add pre and post middleware set
- [x] place strong emphasis on validating input data (use invariant)
- [x] Make .text version of content based on .print version to perserve the links.
- [x] add progress tracking to copying narrations
- [x] add progress tracking to copying images
