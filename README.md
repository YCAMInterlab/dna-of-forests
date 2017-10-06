![](./source/dna-of-forests/img/share-en.png)

# Field Guide “DNA of Forests”

The middleman project for the website **Field Guide “DNA of Forests”**.

- English ver. [http://dna-of-forests.ycam.jp/en/](http://dna-of-forests.ycam.jp/en/)
- Japanese ver. [http://dna-of-forests.ycam.jp/](http://dna-of-forests.ycam.jp/)

## Table of Contents

<!-- MarkdownTOC depth="0" bracket="round" autolink="true" indent="    " -->

- [Branches](#branches)
- [Getting started](#getting-started)
    - [Set up environments and install dependencies](#set-up-environments-and-install-dependencies)
    - [Start middleman server](#start-middleman-server)
    - [Doesn't work?](#doesnt-work)
- [Licenses](#licenses)
    - [Exception List](#exception-list)

<!-- /MarkdownTOC -->


## Branches

This repository includes these branches below.

| Branch        | Description                 |
|:--------------|:----------------------------|
| master        | Static files                |
| source        | Source of `master`          |
| teaser        | Static files of teaser site |
| source-teaser | Source of `teaser`          |

## Getting started

### Set up environments and install dependencies

This instruction shows a strict way for the users who are not familiar with the ruby and node. If you are an expert, please skip these instructions.

First of all, please install [rbenv](https://github.com/rbenv/rbenv) and [ndenv](https://github.com/riywo/ndenv) by yourself.

Then follow this instruction.

```sh
# clone this repository and checkout 'source' branch
git clone --recursive -b source https://github.com/YCAMInterlab/dna-of-forests.git

# move into project dirctory
cd dna-of-forests

# node setup --------

# check the version of node
# this command will show you target node version in this project
cat .node-version

# installl node of specific version
# you must replace 'x.x.x' part with the result above
ndenv install x.x.x

# check you are using correct version in case
ndenv versions

# install dependencies
npm installl

# ruby setup --------

# check the version of ruby
# this command will show you target ruby version in this project
cat .ruby-version

# installl ruby of specific version
# you must replace 'x.x.x' part with the result above
rbenv install x.x.x

# check you are using correct version in case
rbenv versions

# install bundler
rbenv exec gem install bundler

# install dependencies
rbenv exec bundle install --path=vendor/bundle --binstubs=vendor/bin
```

### Start middleman server

```sh
rbenv exec bundle exec middleman
```

Then you can preview site on these URLs

- English ver. [http://localhost:4567/dna-of-forests/en/](http://localhost:4567/dna-of-forests/en/)
- Japanese ver. [http://localhost:4567/dna-of-forests/](http://localhost:4567/dna-of-forests/)

Now you can modify files under `source` directory.

Ref: [Middleman](https://middlemanapp.com/)

### Doesn't work?

Please try updating dependencies.

```sh
rbenv exec bundle update
npm update
```


## Licenses

Field Guide “DNA of Forests” by [YCAM InterLab](https://github.com/YCAMInterlab) and [Karappo Inc.](https://github.com/karappo) is licensed under the [Apache License, Version2.0](http://www.apache.org/licenses/LICENSE-2.0.html) (**except the files in [the list](#exception-list) below**)

### Exception List

- [Font files licensed from "Google Fonts"](https://github.com/YCAMInterlab/dna-of-forests/tree/source/source/dna-of-forests/font)
- [Images files in slide](https://github.com/YCAMInterlab/dna-of-forests/tree/source/source/dna-of-forests/img/about/slides)
- [Vendor files](https://github.com/YCAMInterlab/dna-of-forests/tree/source/source/dna-of-forests/vendor)

```
Copyright 2016-2017 YCAM InterLab and Karappo Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
