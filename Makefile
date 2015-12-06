
#
# Binaries
#

BIN := ./node_modules/.bin

#
# Variables
#

PORT    = 8080

REPO    = rosszurowski/polysoph.github.io
DOMAIN  = poly.sh
BRANCH  = $(shell git rev-parse --abbrev-ref HEAD)


#
# Tasks
#

build: node_modules assets styles scripts

watch: node_modules
	@make -j3 watch-assets watch-js
watch-assets:
	@watch make assets styles
watch-js:
	@budo index.js:bundle.js \
		--dir build \
		--port $(PORT) \
		--live | garnish

deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Github pages..."
	@make clean
	@NODE_ENV=production make build
	@(cd build && \
		echo $(DOMAIN) > build/CNAME
		git init -q . && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		echo "\033[0;90m" && \
		git push "git@github.com:$(REPO).git" HEAD:master --force && \
		echo "\033[0m")
	@make clean
	@echo "Deployed to \033[0;32mhttp://$(DOMAIN)/\033[0m"

clean:
	@rm -rf build

#
# Shorthands
#

install: node_modules
assets: build/index.html build/mark.svg
	@true
styles: build/bundle.css
	@true
scripts: build/bundle.js
	@true

#
# Targets
#

node_modules: package.json
	@npm install

build/%: %
	@mkdir -p $(@D)
	@cp -r $< $@

build/bundle.js: index.js
	@mkdir -p $(@D)
	@browserify index.js -o build/bundle.js

build/bundle.css: index.css
	@mkdir -p $(@D)
	@cp -r $< $@

#
# Phony
#

.PHONY: develop clean clean-deps
