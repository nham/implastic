include_dir = build
title = 'Implastic'

html:
	pandoc -s tutorial.md -t html5 -o index.html \
			--smart \
			--toc
		    #--include-in-header $(include_dir)/header.html \
		    #--include-before-body $(include_dir)/cover.html \
		    #--include-after-body $(include_dir)/footer.html \
		    #--title-prefix $(title) \
