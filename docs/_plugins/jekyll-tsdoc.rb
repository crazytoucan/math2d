module Jekyll
  module TSDocFilter
    def tsdoc(input)
      site = @context.registers[:site]
      input.gsub(/\{\@link\s+([^\}]+)\s*\}/, "[\\1](/#{site.config["baseurl"]}api/#\\1)")
    end
  end
end

Liquid::Template.register_filter(Jekyll::TSDocFilter)
