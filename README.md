![](./source/dna-of-forests/img/share-en.png)

# Field Guide “DNA of Forests”

This is the source of website [Field Guide “DNA of Forests”](http://dna-of-forests.ycam.jp).

## Table of Contents

<!-- MarkdownTOC depth="0" bracket="round" autolink="true" -->

- [Branches](#branches)
- [Getting started](#getting-started)
  - [Middleman basic commands](#middleman-basic-commands)
    - [Developing](#developing)
    - [Building](#building)
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

Using [rbenv](https://github.com/rbenv/rbenv) for ruby version control is recomended.
Otherwise you install specific ruby version according to [.ruby-version](https://github.com/YCAMInterlab/dna-of-forests/blob/source/.ruby-version).

Install [bundler](http://bundler.io/) and [yarn](https://yarnpkg.com/en/) for package management.

```
gem install bundler
brew install yarn
```

Clone this repository and install gems and npm packages.

```
git clone --recursive https://github.com/YCAMInterlab/dna-of-forests.git

cd dna-of-forests

# This is not needed because you may be in source branch already by default
git checkout source

bundle install --path=vendor/bundle --binstubs=vendor/bin

yarn
```

### Middleman basic commands

These are the basic commands, other usages are available in the ducuments of [middleman](https://middlemanapp.com/).

*You can leave out `bundle exec` if you have added `./vendor/bin` to your `$PATH` in shell.*

#### Developing

```
bundle exec middleman
```

Then you can preview site on [http://localhost:4567](http://localhost:4567)

Modify files under `source` directory.


#### Building

Build files in `source` directory to `build` directory

```
bundle exec middleman build
```

## Licenses

Field Guide “DNA of Forests” by YCAM InterLab and [Karappo Inc.](http://karappo.net) is licensed under the [Apache License, Version2.0](http://www.apache.org/licenses/LICENSE-2.0.html) (**except the files in [the list](#exception-list) below**)

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

### Exception List

- [Roboto-Bold.ttf](https://github.com/YCAMInterlab/dna-of-forests/blob/source/source/dna-of-forests/style/Roboto-Bold.ttf)
- [Roboto-Medium.ttf](https://github.com/YCAMInterlab/dna-of-forests/blob/source/source/dna-of-forests/style/Roboto-Medium.ttf)
- [images in slide](https://github.com/YCAMInterlab/dna-of-forests/tree/source/source/dna-of-forests/img/about/slides)
- [vendor files](https://github.com/YCAMInterlab/dna-of-forests/tree/source/source/dna-of-forests/vendor)
