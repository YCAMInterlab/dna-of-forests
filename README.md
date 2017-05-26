![](assets/logo.png)

# Field Guide “DNA of Forests”

This is the source of website [Field Guide “DNA of Forests”](http://dna-of-forests.ycam.jp).


## Branches

| Branch        | Description                 |
|:--------------|:----------------------------|
| master        | Static files                |
| source        | Source of `master`          |
| teaser        | Static files of teaser site |
| source-teaser | Source of `teaser`          |

## Getting started

Using [rbenv](https://github.com/rbenv/rbenv) for ruby version control is recomended.
Otherwise you install specific ruby version according to [.ruby-version](./blob/source/.ruby-version) file.

Install [bundler](http://bundler.io/) and [yarn](https://yarnpkg.com/en/) for package management.

```
gem install bundler
brew install yarn
```

Clone this repository and install gems and npm packages.

```
git clone https://github.com/YCAMInterlab/dna-of-forests.git
cd dna-of-forests
git checkout source
bundle install --path=vendor/bundle --binstubs=vendor/bin
yarn
```

### Middleman commands

You can leave out `bundle exec` if you have added `./vendor/bin` to your `$PATH` in shell.

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

#### Deploying

Build files to `build` directory, and auto commit these files to specific branch (configured in config.rb).

```
bundle exec middleman deploy
```

Other usages are available in the ducuments of [middleman](https://middlemanapp.com/) and [middleman-deploy](https://github.com/middleman-contrib/middleman-deploy)
