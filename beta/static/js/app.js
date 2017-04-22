$(document).ready(function(){

    var api_url = 'https://openlibrary.org';

    $('.search_text').focusin(function(e) {
	$('.searchbar').addClass('active');
	$('#search-dropdown').toggle();
    });

    $('.search_text').blur(function(e) {
	$('.searchbar').removeClass('active');
	$('#search-dropdown').toggle();
    });

    var carousel = function(selector, a, b, c, d, e) {
	$(selector).slick({
	    dots: true,
	    infinite: false,
	    speed: 300,
	    slidesToShow: a,
	    slidesToScroll: a,
	    responsive: [
		{
		    breakpoint: 1200,
		    settings: {
			slidesToShow: b,
			slidesToScroll: b,
			infinite: true,
			dots: true
		    }
		},
		{
		    breakpoint: 1024,
		    settings: {
			slidesToShow: c,
			slidesToScroll: c,
			infinite: true,
			dots: true
		    }
		},
		{
		    breakpoint: 600,
		    settings: {
			slidesToShow: d,
			slidesToScroll: d
		    }
		},
		{
		    breakpoint: 480,
		    settings: {
			slidesToShow: e,
			slidesToScroll: e
		    }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	    ]


	});
    }

    var Subject = {	
        count: function (subject, callback) {
	    var url = api_url + '/subjects/' + subject + '.json';
	    $.ajax({
                type: "GET",
                url: url, 
                success: function(result) {		    
		    var cnt = result.work_count || 0;
		    if (callback) {
                        return callback(subject, cnt);
		    }
		    return cnt;
		}
	    });
        },
	render: function(subject, key) {
	    return '<a class="nostyle" href="' + api_url + '/subjects/' + key +
		'#ebooks=true&sort=' + subject.sort + '">' +
	    '<div class="category-item">' +
		'<div class="category-icon">' +
		'<img class="category-img" src="/static/imgs/' + key + '.svg">' +
		'</div>' +
		'<p class="upper category-title">' + subject.name + '</p>' +
		'<p class="category-count" name="' + key + '">0 books</p>' +
		'</div></a>';
	}
    };
    
    var Categories = {
	featured: {
	    'art': {'name': 'Art', 'sort': 'date_published'},
	    'science_fiction': {'name': 'Sci-Fi', 'sort': 'date_published'},
	    'fantasy': {'name': 'Fantasy', 'sort': 'date_published'},
	    'biographies': {'name': 'Biographies', 'sort': 'date_published'},
	    'recipes': {'name': 'Recipes', 'sort': 'date_published'},
	    'romance': {'name': 'Romance', 'sort': 'date_published'},
	    'textbooks': {'name': 'Textbooks', 'sort': 'date_published'},
	    'children': {'name': 'Children', 'sort': 'date_published'},
	    'history': {'name': 'History', 'sort': 'date_published'},
	    'medicine': {'name': 'Medicine', 'sort': 'date_published'},
	    'religion': {'name': 'Religion', 'sort': 'date_published'},
	    'mystery_and_detective_stories': {'name': 'Mysteries', 'sort': 'date_published'},
	    'plays': {'name': 'Plays', 'sort': 'edition_count'},
	    'music': {'name': 'Music', 'sort': 'date_published'},
	    'science': {'name': 'Science', 'sort': 'date_published'}
	},
	get: function(category) {
	    var url = api_url + '/subjects/' + category + '.json';
	},
	setup: function(categories) {
	    for (var key in categories) {
		var category = categories[key];
		$('.categories').append(Subject.render(category, key));
	    }
	    carousel('.categories', 10, 7, 5, 4, 3);
	    for (var cat in categories) {
		Subject.count(cat, function(subject, count) {
		    $('[name="' + subject + '"]').text(count + ' books');
		});
	    }
	}
    }
    Categories.setup(Categories.featured);

    
    var Authors = {
	featured: ["OL1458877A", "OL594217A", "OL2703437A", "OL716700A", "OL35524A", "OL29614A", "OL34221A", "OL27695A", "OL9388A", "OL28255A", "OL4361397A", "OL19482A", "OL24662A", "OL5460455A", "OL329907A", "OL32939A", "OL161317A", "OL21059A", "OL6890242A", "OL896337A", "OL30317A", "OL21219A", "OL67947A", "OL4452558A", "OL7099704A"],
	works: function() {

	},
	getProlific: function() {
	    
	}
    };

    var requests = {
	get: function(url, callback) {
	    $.ajax({
                type: "GET",
                url: url, 
                success: function(results) {
		    if (callback) {
			return callback(results);
		    }
		    return results;
		}
	    });
	}
    };
    
    var Books = {
	getClassics: function() {
	    var url = api_url + '/search?q=first_publish_year%3A%5B200+TO+2017%5D&has_fulltext=true&subject_facet=Accessible+book';
	}
    };
    
    var AudioBooks = {
	get: function(callback) {
	    var url = 'https://api.archivelab.org/items?q=collection:librivoxaudio&sorts=downloads%20desc&v=v2';
	    requests.get(url, function(results) {
		var ids = results.items.slice(0,20);
                return callback(ids);
	    });
	},
	render: function(abid) {
	    return '<div class="audiobook-item">' +
		'<a href="//archive.org/details/' + abid +'"><img src="https://archive.org/services/img/' + abid + '"/></a>' +
		'<div name="' + abid + '" >' +
		'</div>' +
 		'</div>';
	},
	metadata: function(abid) {
	    var url = "https://archive.org/metadata/" + abid;
	    requests.get(url, function(metadata) {
		$('[name="' + abid + '"]').text(metadata.metadata.title);
	    });
	}
    };
	    
    AudioBooks.get(function(audiobooks) {
	for (ab in audiobooks) {
	    var abid = audiobooks[ab];
	    $('.audiobooks').append(AudioBooks.render(abid.identifier));
	    //AudioBooks.metadata(abid.identifier);
	}
	carousel('.audiobooks', 6, 5, 4, 3, 2);
    });


    carousel('.modernbooks', 10, 7, 5, 4, 3);
    carousel('.prolificauthors', 10, 7, 5, 4, 3);

    var olid = Browser.extractOlidFromUrl(window.location.pathname);
    console.log(olid);
    if (olid) {
	Work.get(olid, function(work) {
	    var authors = work.authors;
	    for (var author_id in work.authors) {
		Author.get(Browser.extractOlidFromUrl(
		    work.authors[author_id].author.key), function(author) {
			$('.authors').append('<a href="" class="author">' + author.personal_name + '</a>');
		})
	    }

	    $('.subtitle').text(work.subtitle);
	    $('.title').text(work.title);
	    $('.description').text(work.description.value);
	    $('.number-of-editions').text(work.number_of_editions);
	    $('.number-of-subjects').text(work.subjects.length);
	    $('.bookcover').attr('src', 
		'https://covers.openlibrary.org/w/id/' + work.covers[0] + '-M.jpg');

	    for (var subject in work.subjects) {
		var sj = work.subjects[subject];
		$('.work-subjects').append('<a class="link-label" href="">' + sj + "</a>, ");
	    }
	    $('.work-subjects').append(' <a href="" class="link-label link-label-cta"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> add subject?</a>');
	});
    }
});
