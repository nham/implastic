include_dir = build
title = 'Implastic'

html:
	pandoc -s tutorial.md -t html5 -o index.html \
		    --include-in-header $(include_dir)/header.html \
		    --title-prefix $(title) \
			--smart \
			--toc
		    #--include-before-body $(include_dir)/cover.html \
		    #--include-after-body $(include_dir)/footer.html \
