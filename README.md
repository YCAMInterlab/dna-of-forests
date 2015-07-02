#Middleman Template

____


##Branches


***master***

Static files build from 'source' branch by [middleman](http://middlemanapp.com/jp/) gem.

***source***

Source files

##Development

***Install [bundler](http://bundler.io/) gem at first***

```
gem install bundler
```

###Get to start

```
# checkout `source` branch.
git clone git@github.com:naokazuterada/middleman-template.git mysite
cd mysite

# setup
git submodule update --init
bundle install --path=vendor/bundle --binstubs=vendor/bin

# start server
bundle exec middleman
```

Open [http://0.0.0.0:4567](http://0.0.0.0:4567) with browser.


###Middleman commands

You can leave out `bundle exec` if you have added `./vendor/bin` to your $PATH in shell.

***Develop***

```
bundle exec middleman
```

Then you can preview site on [http://0.0.0.0:4567](http://0.0.0.0:4567)

Modify files under `source` directory.


***Build***

Build files in `source` to `build` dirctory

```
bundle exec middleman build
```

***Deploy***

Build files to `build` dirctory, and auto commit these files to specific branch (configured in config.rb).

```
bundle exec middleman deploy
```
