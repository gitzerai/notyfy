/* 
 * Authors: Nedim Arabacı (http://ned.im), Muhittin Özer (http://muhittinozer.com) 
*/

var alert_note = 'Best check yo self, you\'re not looking too good.';
var error_note = 'Change a few things up and try submitting again.';
var success_note = 'You successfully read this important alert message.';
var information_note = 'This alert needs your attention, but it\'s not super important.';
var note = 'Do you want to continue?';

function getCode() {
	var optionsArray = $('#noty_creator').serializeArray();
	var options = {};
	var objects = ['onShow', 'onClose', 'animateOpen', 'animateClose', 'speed', 'timeout'];
	
	$.each(optionsArray, function(index, field) { 
		if (jQuery.inArray(field.name, objects) > -1) {
			options[field.name] = eval("(" + field.value + ')');
		} else {
			if (field.value == 'false') {
				options[field.name] = false;
			} else if (field.value == 'true') {
				options[field.name] = true;
			} else {
				options[field.name] = field.value;
			}
		}
	});
	return options;
}

$(document).ready(function() {
	
	$.getJSON('http://github.com/api/v2/json/commits/list/needim/noty/master?callback=?', function(json) {
		$.each(json.commits, function(i, commit) {
			var $col = $('<tr />');
			var $committer = $('<td />').html(commit.committer.name);
			var $link = $('<a />').attr('href', 'https://github.com/needim/noty/commit/' + commit.id).html(commit.message);
			var $url = $('<td />').append($link);
			var $date = $('<td />').html($.format.date(commit.committed_date, "dd.MM.yy hh:mm a"));
			
			$col.append($committer);
			$col.append($url);
			$col.append($date);
			
			$('#commit-history-json').append($col);
			
		});
	});
	$("select#theme_switcher").val('noty_theme_default');
	$("select#theme_switcher").change(function() {
		$.noty.defaultOptions.theme = $(this).val();
	});
	
	$(".cb-enable").click(function(){
		var parent = $(this).parents('.switch');
		$('.cb-disable',parent).removeClass('selected');
		$(this).addClass('selected');
		if ($(this).attr('title') == 'noty_theme_mitgux') {
			$.noty.defaultOptions.theme = 'noty_theme_mitgux';
		} else if ($(this).attr('title')) {
			$('#'+$(this).attr('title')).val('true');
		} else {
			$.noty.defaultOptions.modal = true;
		}
	});
	
	$(".cb-disable").click(function(){
		var parent = $(this).parents('.switch');
		$('.cb-enable',parent).removeClass('selected');
		$(this).addClass('selected');
		if ($(this).attr('title') == 'noty_theme_mitgux') {
			$.noty.defaultOptions.theme = 'noty_theme_default';
		} else if ($(this).attr('title')) {
			$('#'+$(this).attr('title')).val('false');
		} else {
			$.noty.defaultOptions.modal = false;
		}
	});
	
	$('#getCode').click(function() {
		var source = getCode();
		$('textarea#getCodeResult').html('noty('+ JSON.stringify(source) +');').slideDown();
	});
	
	$('a.show-div').click(function() {
		$('div.content .active').removeClass('active').hide();
		$($(this).attr('href')).fadeIn().addClass('active');
		$('ul a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	if (location.hash) {
		$('div.content .active').removeClass('active').hide();
		$(location.hash).fadeIn().addClass('active');
		$('ul a.active').removeClass('active');
		$('a[href='+location.hash+']').addClass('active');
	}
	
	$('#runIt').click(function() {
		var source = getCode();
		noty(source);
	});
	
	// EX 1 ======================	
	
	// ex1 - alert
	$('.ex1.alert').click(function() {
		noty({text: alert_note});
		return false;
	});
	
	// ex1 - error
	$('.ex1.error').click(function() {
		noty({text: error_note, type: 'error'});
		return false;
	});
	
	// ex1 - success
	$('.ex1.success').click(function() {
		noty({text: success_note, type: 'success'});
		return false;
	});
	
	// ex1 - information
	$('.ex1.information').click(function() {
		noty({text: information_note, type: 'information'});
		return false;
	});
	
	// ex1 - confirm
	$('.ex1.confirm').click(function() {
		noty({
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {
		    			
		    			// this = button element
		    			// $noty = $noty element
		    	
		    			$noty.close();
		    			noty({force: true, text: 'You clicked "Ok" button', type: 'success'});
		    	}
		    },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {
		    		$noty.close();
			    	noty({force: true, text: 'You clicked "Cancel" button', type: 'error'});
		    	}
		    }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 2 ======================
	
	// ex2 - alert
	$('.ex2.alert').click(function() {
		noty({layout: 'bottom', text: alert_note});
		return false;
	});
	
	// ex2 - error
	$('.ex2.error').click(function() {
		noty({layout: 'bottom', text: error_note, type: 'error'});
		return false;
	});
	
	// ex2 - success
	$('.ex2.success').click(function() {
		noty({layout: 'bottom', text: success_note, type: 'success'});
		return false;
	});
	
	// ex2 - information
	$('.ex2.information').click(function() {
		noty({layout: 'bottom', text: information_note, type: 'information'});
		return false;
	});
	
	// ex2 - confirm
	$('.ex2.confirm').click(function() {
		noty({
			layout: 'bottom',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottom', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottom', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 3 ======================
	
	// ex3 - alert
	$('.ex3.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: alert_note});
		return false;
	});
	
	// ex3 - error
	$('.ex3.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: error_note, type: 'error'});
		return false;
	});
	
	// ex3 - success
	$('.ex3.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: success_note, type: 'success'});
		return false;
	});
	
	// ex3 - information
	$('.ex3.information').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: information_note, type: 'information'});
		return false;
	});
	
	// ex3 - confirm
	$('.ex3.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'center',
			text: note, 
			buttons: [
		    {type: 'btn btn-mini btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-mini btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 4 ======================
	
	// ex4 - alert
	$('.ex4.alert').click(function() {
		noty({layout: 'topLeft', text: alert_note, textAlign: 'left'});
		return false;
	});
	
	// ex4 - error
	$('.ex4.error').click(function() {
		noty({layout: 'topLeft', text: error_note, type: 'error', textAlign: 'left'});
		return false;
	});
	
	// ex4 - success
	$('.ex4.success').click(function() {
		noty({layout: 'topLeft', text: success_note, type: 'success', textAlign: 'left'});
		return false;
	});
	
	// ex4 - information
	$('.ex4.information').click(function() {
		noty({layout: 'topLeft', text: information_note, type: 'information', textAlign: 'left'});
		return false;
	});
	
	// ex4 - confirm
	$('.ex4.confirm').click(function() {
		noty({
			layout: 'topLeft',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'topLeft', text: 'You clicked "Ok" button', type: 'success', textAlign: 'left'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'topLeft', text: 'You clicked "Cancel" button', type: 'error', textAlign: 'left'});} }
		    ],
		  closable: false,
		  timeout: false,
		  textAlign: 'left'
		});
		return false;
	});
	
	// EX 5 ======================
	
	// ex5 - alert
	$('.ex5.alert').click(function() {
		noty({layout: 'topRight', text: alert_note, textAlign: 'left'});
		return false;
	});
	
	// ex5 - error
	$('.ex5.error').click(function() {
		noty({layout: 'topRight', text: error_note, type: 'error', textAlign: 'left'});
		return false;
	});
	
	// ex5 - success
	$('.ex5.success').click(function() {
		noty({layout: 'topRight', text: success_note, type: 'success', textAlign: 'left'});
		return false;
	});
	
	// ex5 - information
	$('.ex5.information').click(function() {
		noty({layout: 'topRight', text: information_note, type: 'information', textAlign: 'left'});
		return false;
	});
	
	// ex5 - confirm
	$('.ex5.confirm').click(function() {
		noty({
			layout: 'topRight',
			textAlign: 'left',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'topRight', text: 'You clicked "Ok" button', type: 'success', textAlign: 'left'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'topRight', text: 'You clicked "Cancel" button', type: 'error', textAlign: 'left'});} }
		    ],
		  closable: false,
		  timeout: false,
		  textAlign: 'left'
		});
		return false;
	});
	
	// EX 6 ======================
	
	// ex6 - alert
	$('.ex6.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: alert_note});
		return false;
	});
	
	// ex6 - error
	$('.ex6.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: error_note, type: 'error'});
		return false;
	});
	
	// ex6 - success
	$('.ex6.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: success_note, type: 'success'});
		return false;
	});
	
	// ex6 - information
	$('.ex6.information').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: information_note, type: 'information'});
		return false;
	});
	
	// ex6 - confirm
	$('.ex6.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'topCenter',
			text: note, 
			buttons: [
		    {type: 'btn btn-mini btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-mini btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 7 ======================
	
	// ex7 - alert
	$('.ex7.alert').click(function() {
		noty({layout: 'bottomLeft', text: alert_note, textAlign: 'left'});
		return false;
	});
	
	// ex7 - error
	$('.ex7.error').click(function() {
		noty({layout: 'bottomLeft', text: error_note, type: 'error', textAlign: 'left'});
		return false;
	});
	
	// ex7 - success
	$('.ex7.success').click(function() {
		noty({layout: 'bottomLeft', text: success_note, type: 'success', textAlign: 'left'});
		return false;
	});
	
	// ex7 - information
	$('.ex7.information').click(function() {
		noty({layout: 'bottomLeft', text: information_note, type: 'information', textAlign: 'left'});
		return false;
	});	

	// ex7 - confirm
	$('.ex7.confirm').click(function() {
		noty({
			layout: 'bottomLeft',
			 textAlign: 'left',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottomLeft', text: 'You clicked "Ok" button', type: 'success', textAlign: 'left'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottomLeft', text: 'You clicked "Cancel" button', type: 'error', textAlign: 'left'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
// EX 8 ======================
	
	// ex8 - alert
	$('.ex8.alert').click(function() {
		noty({layout: 'bottomRight', text: alert_note, textAlign: 'left'});
		return false;
	});
	
	// ex8 - error
	$('.ex8.error').click(function() {
		noty({layout: 'bottomRight', text: error_note, type: 'error', textAlign: 'left'});
		return false;
	});
	
	// ex8 - success
	$('.ex8.success').click(function() {
		noty({layout: 'bottomRight', text: success_note, type: 'success', textAlign: 'left'});
		return false;
	});
	
	// ex8 - information
	$('.ex8.information').click(function() {
		noty({layout: 'bottomRight', text: information_note, type: 'information', textAlign: 'left'});
		return false;
	});
	
	// ex8 - confirm
	$('.ex8.confirm').click(function() {
		noty({
			animateOpen: {height: 'toggle'},
			animateClose: {height: 'toggle'},
			layout: 'bottomRight',
			textAlign: 'left',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'bottomRight', text: 'You clicked "Ok" button', type: 'success', textAlign: 'left'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'bottomRight', text: 'You clicked "Cancel" button', type: 'error', textAlign: 'left'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	$('.api-func').click(function(e) {
		
		try {
			var func = $(this).attr('title');
			eval(func);
		} catch (e) {
			// TODO: handle exception
		}
		
		e.preventDefault();
	});
	
});