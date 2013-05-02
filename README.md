# kerouac-parcel-appcast

This is middleware for [Kerouac](https://github.com/jaredhanson/kerouac) that
generates [Sparkle](http://sparkle.andymatuschak.org/)-compatible [appcasts](http://connectedflow.com/appcasting/)
from [Parcel](https://github.com/sifteo/parcel) package repositories.

Applications can poll appcasts to check for the latest version, prompting users
to update when a new version is available.

## Install

    $ npm install kerouac-parcel-appcast

Install for development:

    $ git clone git@bitbucket.org:sifteo/kerouac-parcel-appcast.git
    $ cd kerouac-parcel-appcast
    $ npm link

## Usage

To generate an appcast, use `appcast` middleware passing in a repository and
query as arguments.  In the example below, all versions of the package named
"sync" for Mac OS X will be selected and placed as items in the appcast.

Metadata about the appcast itself, including title and description is passed
as a hash in the third argument.

    var appcast = require('kerouac-parcel-appcast');

    var repo = parcel.createRepository('repo.json');
    
    site.page('/sync/macosx.xml', appcast(repo, { name: 'sync', os: 'macosx' },
                                          { title: 'Sifteo Sync',
                                            description: 'The latest updates to Sifteo Sync.',
                                            packageLink: 'http://sifteo.com/download' }));

## License

[Apache License, Version 2.0](http://opensource.org/licenses/Apache-2.0)

Copyright (c) 2013 Sifteo Inc. <[http://www.sifteo.com/](http://www.sifteo.com/)>
