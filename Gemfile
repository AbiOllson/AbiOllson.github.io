source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-seo-tag", "~> 2.8"
end

# Ruby 3 no longer bundles webrick, which `jekyll serve` needs.
gem "webrick", "~> 1.8"

# Windows does not ship zoneinfo files.
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
