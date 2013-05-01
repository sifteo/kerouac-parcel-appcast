var parcel = require('parcel')
  , builder = require('xmlbuilder');


module.exports = function(repo, qstr, options) {
  options = options || {};
  
  var q = new parcel.Query(qstr);
  var title = options.title || q.params.name
    , desc = options.description
    , packageLink = options.packageLink;
  
  
  return function render(page, next) {
    repo.query(q, function(err, pkgs) {
      if (err) { return next(err); }
      
      var rss = builder.create('rss', { version: '1.0', encoding: 'UTF-8' });
      rss.a('version', '2.0');
      rss.a('xmlns:sparkle', 'http://www.andymatuschak.org/xml-namespaces/sparkle');
      var chan = rss.e('channel')
      chan.e('title', title);
      chan.e('link', page.url);
      chan.e('description', desc);
      
      
      // TODO: semver sort the packabges
      
      var spkgs = pkgs
        , pkg;
      for (var i = 0, len = spkgs.length; i < len; i++) {
        pkg = spkgs[i];
        
        var item = chan.e('item');
        item.e('title', title + ' ' + pkg.version);
        
        if (packageLink) {
          if (typeof packageLink == 'string') { item.e('link', packageLink); }
          else if (typeof packageLink == 'function' ) { item.e('link', packageLink(pkg)); }
        }
        
        var attrs = {};
        attrs['sparkle:version'] = pkg.version;
        attrs.url = pkg.publicURL || pkg.url;
        attrs.length = pkg.size;
        attrs.type = 'application/octet-stream';
        if (pkg.md5) {
          var b = new Buffer(pkg.md5, 'base64');
          attrs['sparkle:md5Sum'] = b.toString('hex');
        }
        item.e('enclosure', attrs);
        
        if (pkg.minOSVersion) {
          item.e('sparkle:minimumSystemVersion', pkg.minOSVersion);
        }
      }
      
      var xml = rss.end({ pretty: true });
      page.write(xml);
      page.end();
    });
  }
}
