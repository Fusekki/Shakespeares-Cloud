module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-replace');
	grunt.initConfig({
		replace: {
			dist: {
				options: {
					patterns: [{
							match: /(<\?xml).+/,
							replacement: ''
						}, {
							match: /(<\?xml-).+/,
							replacement: ''
						}, {
							match: /(<play).+/,
							replacement: '<div class="play">'
						}, {
							match: /(<\/play.+)/g,
							replacement: '</div>'
						}, {
							match: /<dropcap type=".+">/g,
							replacement: ''
						}, {
							match: /<\/dropcap>/g,
							replacement: ''
						}, {
							match: /<title short="/g,
							replacement: '<div class="title">'
						}, {
							match: /\">.+<\/title>/,
							replacement: '</div>'
						}, {
							match: /<playwright>/g,
							replacement: '<div class="playwright">'
						}, {
							match: /<\/playwright>/g,
							replacement: '</div>'
						}, {
							match: /<edition>/g,
							replacement: '<div class="edition">'
						}, {
							match: /<\/edition>/g,
							replacement: '</div>'
						}, {
							match: /<act>/g,
							replacement: '<div class="act">'
						}, {
							match: /<\/act>/g,
							replacement: '</div>'
						}, {
							match: /<acttitle>/g,
							replacement: '<div class="acttitle">'
						}, {
							match: /<\/acttitle>/g,
							replacement: '</div>'
						}, {
							match: /<scene>/g,
							replacement: '<div class="scene">'
						}, {
							match: /<\/scene>/g,
							replacement: '</div>'
						}, {
							match: /<scenetitle type=.+/g,
							replacement: ''
						},
						{
							match: /<stagedir>/g,
							replacement: '<div class="stagedir" change-on-tooltip tooltip-append-to-body="false"  tooltip-trigger="&#39;outsideClick&#39;" tooltip-placement="top" tooltip-class="tooltipClass" uib-tooltip-template="&#39;templates/tooltip.tmpl.htm&#39;">'
						}, 
						{
							match: /<\/stagedir>/g,
							replacement: '</div>'
						}, {
							match: /<speech>/g,
							replacement: '<div class="speech">'
						}, {
							match: /<\/speech>/g,
							replacement: '</div>'
						}, {
							match: /<speaker>/g,
							replacement: '<div class="speaker">'
						}, {
							match: /<\/speaker>/g,
							replacement: '</div>'
						}, {
							match: /<line order="\w+">/g,
							replacement: '<div class="line" change-on-tooltip tooltip-append-to-body="false"  tooltip-trigger="&#39;outsideClick&#39;" tooltip-placement="top" tooltip-class="tooltipClass" uib-tooltip-template="&#39;templates/tooltip.tmpl.htm&#39;">'
						}, {
							match: /<\/line>/,
							replacement: '</div>'
						}, {
							match: /<line>/g,
							replacement: '<div class="line" change-on-tooltip tooltip-append-to-body="false"  tooltip-trigger="&#39;outsideClick&#39;" tooltip-placement="top" tooltip-class="tooltipClass" uib-tooltip-template="&#39;templates/tooltip.tmpl.htm&#39;">'
						}, {
							match: /<\/line>/g,
							replacement: '</div>'
						}, {
							match: /<finis>/g,
							replacement: '<div class="finis">'
						}, {
							match: /<\/finis>/g,
							replacement: '</div>'
						}, {
							match: /<epilogue>/g,
							replacement: '<div class="epilogue">'
						}, {
							match: /<\/epilogue>/g,
							replacement: '</div>'
						}, {
							match: /<sourcedetails>/g,
							replacement: '<!-- <sourcedetails>'
						}, {
							match: /<\/sourcedetails>/g,
							replacement: '</sourcedetails> -->'
						}, {
							match: /^\s*\n/gm,
							replacement: ''
						}, {
							match: /<finistitle>/g,
							replacement: ''
						}, {
							match: /<\/finistitle>/g,
							replacement: ''
						}
					]
				},
				files: [{
						expand: true,
						flatten: true,
						src: ['xml/*.xml'],
						dest: 'xml/build/',
						rename: function (dest, src) {
							return dest + src.replace(/\.xml$/, ".htm");
						}

					}
				]
			}
		}
	});
	grunt.registerTask('default', 'replace');
};

// Replace items
// <?xml ... ?> with ""
// <play .. > with "<div class='play'>
// </play> with "</div>"
// <title ... > with "<div class='title>"
// <playwright> with "<div class='playwright'>"
// </playwright> with "</div>"
// <edition> with "<div class='edition'>"
// </edition> with "</div>"
// <act> with "<div class='act'>"
// </act> with "</div>"
// <acttitle> with "<div class='acttitle'>"
// </acttitle> with "</div>"
// <scene> with "<div class='scene'>"
// </scene> with "</div>"
// <scenetitle> with "<div class='scenetitle'>"
// </scenetitle> with "</div>"
// <stagedir> with "<div class='stagedir'>"
// </stagedir> with "</div>"
// <speech> with "<div class='speech'>"
// </speech> with "</div>"
// <speaker> with "<div class='speaker'>"
// </speaker> with "</div>"
// <line ... > with "<div class='line'>"
// </speaker> with "</div>"
// <dropcap> with  "<span class=dropcap>"
// </dropcap> with "</span>"
//<dropcap type="floral"> with "<span class='dropcap_floral'>"
// <nameref> with "<span class='nameref'>"
// </nameref> with "</span>"
// <finis> with "<div class='finis'>"
// </finis> with "</div>"
// <sourcedetails> ... </sourcedetails> with ""
// <epilogue> with "<div class='epilogue'>"
// </epilogue> with "</div>"
// <finistitle> with "<div class=finistitle>"
// </finistitle> with "</div>"