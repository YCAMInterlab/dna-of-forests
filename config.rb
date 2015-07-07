set :css_dir, 'style'
set :js_dir, 'script'
set :images_dir, 'img'
set :partials_dir, 'partials'
# set :build_dir, 'build'

# htmlのattributesの囲みを「"」にする
set :haml, { :attr_wrapper => "\"" }

# 他言語化
# activate :i18n

# URL access xxx.hmtl -> /xxx/
activate :directory_indexes

# Build-specific configuration
configure :build do
  
  ignore "/**README*"
  
  # libフォルダをsprocketsの走査対象に
  sprockets.append_path 'lib/'
  
  # activate :minify_css
  # activate :minify_javascript
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  # リポジトリ名を host に設定しておく
  # こうすることで stylesheet_link_tag などで展開されるパスが
  # /my_project/stylesheets/normalize.css
  # のようになる
  # activate :asset_host, host:"/path/to"
end

configure :development do
    activate :livereload
end

###
# Compass
###

# Change Compass configuration
compass_config do |config|
  config.output_style = :compact
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

helpers do

  def nl2br(txt)
    txt.gsub(/(\r\n|\r|\n)/, "<br>")
  end

  # 現在のページの別言語のページヘのパスを取得する
  # http://forum.middlemanapp.com/t/i18n-list-of-language-siblings-and-links-to-them/978/2
  def translated_url(locale)
    # Assuming /:locale/page.html

    untranslated_path = @page_id.split("/", 2).last.sub(/\..*$/, '')

    if untranslated_path==="index"
      untranslated_path = ""
      path = (locale===:en) ? "/" : "/ja/"
    else
      begin
        translated = I18n.translate!("paths.#{untranslated_path}", locale: locale)
      rescue I18n::MissingTranslationData
        translated = untranslated_path
      end
      path = (locale===:en) ? "/#{translated}/" : "/#{locale}/#{translated}/"
    end

    asset_url(path)
  end

  def other_langs
    langs - [I18n.locale]
  end
end

# デプロイ設定
activate :deploy do |deploy|
  deploy.build_before = true
  deploy.method = :git
  deploy.branch = 'master'
end
