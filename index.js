var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var sass 		= require('metalsmith-sass');
var serve 		= require('metalsmith-serve');
var watch		= require('metalsmith-watch');




Metalsmith(__dirname)
    .metadata({
		site_title: "Template",
		site_description: "This is a template site made with Metalsmith",
    })
    .source('./src')
    .destination('./build')
    .clean(true)
	.use(sass({
		outputDir: 'css/',
		sourceMap:true,
		sourceMapContents:true
	}))
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
	.use(serve({
		port: 8080,
		verbose: true
	}))
	.use(watch({
		paths: {
			"${source}/**/*": true,
			"templates/**/*": "**/*.html",
		},
		livereload: true,
	}))
    .build(function(err, files) {
		if (err) { throw err; }
    });
