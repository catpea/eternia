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
