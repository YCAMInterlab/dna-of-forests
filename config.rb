###
# Page options, layouts, aliases and proxies
###

set :css_dir, 'style'
set :js_dir, 'script'
set :images_dir, 'img'
# set :build_dir, '../html'

ignore '*.git*'
ignore '**/README*'

# htmlのattributesの囲みを「"」にする
set :haml, { :attr_wrapper => "\"" }

# 他言語化
# activate :i18n

# URL access xxx.hmtl -> /xxx/
activate :directory_indexes

# デプロイ設定
activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.build_before = true
  deploy.branch = 'master'
end

activate :external_pipeline,
   name: :webpack,
   command: build? ?
   "./node_modules/webpack/bin/webpack.js --bail -p" :
   "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
   source: ".tmp/dist",
   latency: 1


# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Build-specific configuration
configure :build do

  ignore "/**README*"
  # buildに時間がかかる場合は、build不要なディレクトリをここで指定する

  # activate :minify_css
  # activate :minify_javascript
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  # リポジトリ名を host に設定しておく
  # こうすることで stylesheet_link_tag などで展開されるパスが
  # /my_project/stylesheets/normalize.css
  # のようになる
  activate :asset_host, host: '/dna-of-forests'
end

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


