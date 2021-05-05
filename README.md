# eternia
Eternia Static Site Generator

## Usage

run ```eternia build profile-name``` in the directory containing your content database.

## How does it work?

Eternia works in three simple steps:

1. Read the index.json of all the records in the database directory.
2. Invoke a series of middleware plugins that transform the record into its cache directory.
3. Write the results to a destination directory!

## TODO

- [ ] add progress tracking to copying files, audio etc.
- [x] Dependency Resolver, create a stack of projects that lead up to the final one
- [x] add pre and post middleware set
- [x] place strong emphasis on validating input data (use invariant)
- [x] Make .text version of content based on .print version to perserve the links.
