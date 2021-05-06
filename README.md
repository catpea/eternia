# eternia
Eternia Static Site Generator

## Usage

run ```eternia build profile-name``` in the directory containing your content database.

## How does it work?

Eternia works in three simple steps:

1. Read the index.json of all the records in the database directory.
2. Invoke a series of middleware plugins that transform the record into its cache directory.
3. Write the results to a destination directory!

## Notes

Because of aggressive caching it is recommended that you preserve time-stamps, use the ```-p``` flag with scp and ```-H posix``` with tar to store high resolution timestamps.

```shell

tar -c -H posix -f furkies-purrkies.tar --exclude='*.mp4' furkies-purrkies

```

```shell

scp -p -r bork:code/furkies-purrkies .

```


## TODO

- [ ] new entry creation! ... possible event interface...
- [ ] .attachments!


## URGENT
- [ ] respect .attachments in index.json...
- [ ] add attacjements to bowel/import, considering converting bowel to decompiler...


```JavaScript

"attachments": [
  {"dir":"image", "name":"poetry-cover.jpg"},
  {"dir":"audio", "name":"audio-jogger.mp3"},
  {"dir":"audio", "name":"bird-pecking-complaint.mp3"},
  {"dir":"audio", "name":"emergence.mp3"}
],

```


## DONE

- [x] optimize crawler skip files that have already been downloaded, check file-name time stamps...
- [x] Dependency Resolver, create a stack of projects that lead up to the final one
- [x] add pre and post middleware set
- [x] place strong emphasis on validating input data (use invariant)
- [x] Make .text version of content based on .print version to perserve the links.
- [x] add progress tracking to copying narrations
- [x] add progress tracking to copying images
