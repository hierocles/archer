'use strict';

$(function(){
	var useNation;
	var useLocalID;
	function populate() {
		$.getJSON('https://nationstatesplusplus.net/api/nation/missingendo/?fullData=false&name=' + useNation, function(data) {
				$.each(data, function(key, val) {
					$('#nation_buttons_field').append('<button name="nation-button" type="button" class="btn btn-primary" style="margin: 5px" data-nation="' + val + '">' + val + '</button>');
				});
			}
		);
	}

	$('#set_nation').submit(
		function(e) {
			useNation = $('#set_nation').find('input[name="nation_name"]').val();
			$('#nsframe').attr('src', 'http://www.nationstates.net/page=settings');
			$('#step_one').fadeOut('fast');
			$('#step_two').fadeIn('fast');
			e.preventDefault();
		}
	);

	$('#find_localid').submit(
		function(e) {
			var html = $('#find_localid').find('textarea').val();
			useLocalID = $('input[name="localid"]', $(html)).val();
			populate();
			$('#step_two').fadeOut('fast');
			$('#step_three').fadeIn('fast');
			e.preventDefault();
		}
	);

	$('#nation_buttons_field').on('click', 'button',
		function() {
			var target = $(this).attr('data-nation');
			$('#nsframe').attr('src', 'http://www.nationstates.net/cgi-bin/endorse.cgi?nation=' + target + '&localid=' + useLocalID + '&action=endorse');
			$(this).fadeOut('fast', function(){
				$(this).remove();
			});
		}
	);
});
