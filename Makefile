
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

build: node_modules
	@browserify index.js -o bundle.js

watch: node_modules
	@watchify index.js -o bundle.js

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
clean-deps:
	@rm -rf node_modules

#
# Shorthands
#

install: node_modules

#
# Targets
#

node_modules: package.json
	@npm install

#
# Phony
#

.PHONY: develop clean clean-deps
