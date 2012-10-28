$: << "."

require "lib/smart_asset/lib/smart_asset"

layout 'layout.html.erb'

ignore /\/_.*/
ignore /.*\.xcf$/
ignore /Gemfile.*/
ignore /\.project/
ignore /\.DS_Store/
ignore /\.git/
ignore /\.gitignore/
ignore /\README/

ignore /partials\//
ignore /script\//
ignore /lib\//
ignore /config\//

priority 'index.html.erb' => 9, /.*erb/ => 8, /.*css/ => 7

helpers do
  
  def content_for(key, val = false)
  	@content ||= {}
	  @content[key] = val if val
	  @content[key] || ""
  end

  def title(val = false)
    if val
      @title = val 
      @title += " | JavaZone" unless @title.include?("JavaZone")
    else
      @title || "JavaZone"
    end
  end

  def category(val = false)
    if val
      @category = val 
    else
      @category || "JavaZone"
    end
  end

  def robots (robots = nil)
    robots ? @robots = robots : @robots || "index, follow"
  end
  
  def redirect(path)
    robots "noindex, nofollow"
  	'<script type="text/javascript">window.location = window.location.protocol + "//" + window.location.hostname + "' + path + '";</script>'
  end

  def footer?(val = nil)
    if val.nil?
      @footer.nil? ? true : @footer
    else
      @footer = val
    end
  end

  def header?(val = nil)
    if val.nil?
      @header.nil? ? true : @header
    else
      @header = val
    end
  end

  def track?(val = nil)
    if val.nil?
      @track.nil? ? true : @track
    else
      @track = val
    end
  end

end
