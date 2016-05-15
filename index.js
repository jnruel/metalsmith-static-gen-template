var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var sass 		= require('metalsmith-sass');


Metalsmith(__dirname)
    .metadata({
		// title: "Process Documentation",
		// description: "A collection of process documentation",
    })
    .source('./src')
    .destination('./build')
    .clean(true)
	.use(markdown())	// converts md to html
	.use(collections({
		corePages:{
			pattern: '*.html'
		},
		projects: {
			pattern: 'projects/*.html'
		}
	}))
    .use(permalinks({
		pattern: ':title/',
		linksets:[{
			match: {collection: 'corePages'},
			pattern: ':title/'
		}],
		linksets:[{
			match: {collection: 'project'},
			pattern: 'projects/:title/'
		}]
	}))
    .use(layouts({
		engine: 'handlebars',
		directory: 'templates/layouts',
		partials: 'templates/partials'
    }))
	.use(sass({
		outputDir: 'css/',
		sourceMap:true,
		sourceMapContents:true
	}))
    .build(function(err, files) {
		if (err) { throw err; }
    });
