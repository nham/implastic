include_dir = build
title = 'Implastic'

html:
	pandoc -s tutorial.md -t html5 -o index.html \
		    --include-in-header $(include_dir)/header.html \
		    --include-before-body $(include_dir)/top.html \
		    --include-after-body $(include_dir)/footer.html \
		    --title-prefix $(title) \
			--smart \
			--mathjax \
			--toc
