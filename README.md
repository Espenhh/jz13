Dette repoet inneholder oppsettet for "statisk innhold" på JavaZone.no. Systemet er basert på stasis :)

# Generelt oppsett du kanskje har fra før (litt mac-retta :P)

## Installer homebrew

	http://mxcl.github.com/homebrew/

## Sørg for at du kjører Ruby 1.8.7

	ruby -v

og har oppdatert RubyGems

	sudo gem update --system

## Installer bundler for dependency management

	sudo gem install bundler

## Installer Node:

	brew install node

## Installer NPM (og legg til på path...):

	curl https://npmjs.org/install.sh | sh

Ved trøbbel, sjekk denne: http://stackoverflow.com/questions/9370552/brew-update-failure-while-executing-git-checkout

## Sjekk at npm ble installert

	npm

## Legg inn følgende i .bashrc eller .bash_profile:

	export PATH=/usr/local/lib/node_modules:$PATH

## Installer Uglifyjs:

	npm install uglify-js -g

# Oppsett av "JavaZone Stasis Awesomegenerator"

## Klon GIT-repoet herfra

	git clone https://github.com/Espenhh/jz13.git

## Installer gems

	bundle install

## Installer ønsket web-server

for utvikling lokalt. Pek den på mappa "public" (genereres første gang du kjører stasis). F.eks apache eller lighttpd

# Daglig utvikling

Start opp stasis i utviklingsmodus. Da bygger den ting kontinuerlig etterhvert som du endrer på filer. 

	bundle exec stasis -d

# Deploy og rollback

Sørg for at du har SSH-tilgang før du gjør dette, ellers funker det "inte alls!" (snakk med noen i JavaBin)

## Deploy

	cd scripts
	./deploy-javazone.sh [prod/test]

## Rollback

	cd scripts
	./rollback-javazone.sh [prod/test]