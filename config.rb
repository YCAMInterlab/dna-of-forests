###
# Page options, layouts, aliases and proxies
###

set :css_dir, 'style'
set :js_dir, 'script'
set :images_dir, 'img'
# set :build_dir, '../html'

# htmlのattributesの囲みを「"」にする
set :haml, { :attr_wrapper => "\"" }

# 他言語化
# activate :i18n

# URL access xxx.hmtl -> /xxx/
activate :directory_indexes

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
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
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


