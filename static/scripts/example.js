$(function () {
  let state = ''
  let country = ''

/*  anime({
    targets: 'div.container#form h1, div.container form#wishform, div#bottom div>h3',
    opacity: 1,
    easing: 'easeInBack'
  });
*/
  // Checks if browser has geolocation api support and creates success and failure callback functions
  if ("geolocation" in navigator) {
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    function geo_success (position) {
      // To whomever is looking at this code, please don't under no circumstances not not mess with the api key.
      let api_request = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCOvWp1NsDCLHO9e8ynCuIFVio4c6E2_NA`
      $.get(api_request, function (data) {
	if (data.status == "OK") {
	  state = data['results'][0]['formatted_address'].split(', ')[1]
	  country = data['results'][0]['formatted_address'].split(', ')[3]
	}
      });
    }
    function geo_failure (err) {
      console.log(err)
      $('#statefieldcontainer').show(800)
      $('#countryfieldcontainer').show(800)
    }
  }
  // Call to geolocation api
  navigator.geolocation.getCurrentPosition(geo_success, geo_failure, options);

  // Get request to grab all stars from MySQL via flask
  $.ajax({
    type: "GET",
    url: "https://hopeful-cosmos.me/api/wish/all",
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      // RNG (Random Number Generator)
      function rand_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const length = Object.keys(data).length
      let dimension_arr = []
      let size_arr = ['2px', '4px', '8px']
      let num = 0
      let idx = 0

      // Loop to fill dimension_arr with unique arrays containing two integers
      for (idx = 0; idx < length; idx++) {
	let element = JSON.stringify([rand_int(5, 95), rand_int(5, 95)])
	while (dimension_arr.includes(element) == true) {
	  element = JSON.stringify([rand_int(5, 95), rand_int(5, 95)])
	}
	dimension_arr[idx] = JSON.parse(element)
      }
      idx = 0

      // Fill universe container with div containing all its corresponding attributes
      for (const key in data) {
      	let a_div = `<div class='starcontainer' style='position: absolute; z-index: 1; height: 25px; width: 25px; margin: 0; display: flex; justify-content: center; align-items: center; top: ${dimension_arr[idx][0]}%; left: ${dimension_arr[idx][1]}%;' wish_id="${key}" name="${data[key].name}" star_name="${data[key].star_name}" wish="${data[key].wish}" country="${data[key].country}" state="${data[key].state}" creation_time="${data[key].creation_time}"><div class='star' id='card' wish_id="${key}""</div></div>`
      	$('#universe').append(a_div)
	num = size_arr[rand_int(0, 2)]
	$(`.starcontainer>[wish_id=${key}]`).css({"background": "white", "height": `${num}`, "width": `${num}`, "border-radius": "50%", "z-index": "0"})
      	idx++
      }

      $('div.container#universe .starcontainer').click(function() {
      	if (!$('div.container#universe .container#cardcontainer').is(':visible')) {
      	  $('.container#universe .container#cardcontainer :first-child h1').append($(this).attr('star_name'))
      	  $('.container#universe .container#cardcontainer :nth-child(2) :nth-child(1) p').append($(this).attr('name'))
      	  $('.container#universe .container#cardcontainer :nth-child(2) :nth-child(2) p').append($(this).attr('wish'))
	  if ($(this).attr('state') != '' && $(this).attr('country') != '') {
	    $('.container#universe .container#cardcontainer #location').show()
      	    $('.container#universe .container#cardcontainer :nth-child(2) div:nth-child(3) p').append($(this).attr('state') + ', ' + $(this).attr('country'))
	  } else {
	    $('.container#universe .container#cardcontainer #location').hide()
	  }
      	  $('div.container#universe .container#cardcontainer').css("display", "flex")
      	}
      });
      $('div.container#universe .container#cardcontainer :last-child button').click(function() {
      	$('div.container#universe .container#cardcontainer').css("display", "none")
      	$('.container#universe .container#cardcontainer :first-child h1').empty()
      	$('.container#universe .container#cardcontainer :nth-child(2) :nth-child(1) p').empty()
      	$('.container#universe .container#cardcontainer :nth-child(2) :nth-child(2) p').empty()
      	$('.container#universe .container#cardcontainer :nth-child(2) div:nth-child(3) p').empty()
      });
    },
    error: function(XMLHttpRequest, textStatus, error) {
      alert("Oh no, a desolate universe.")
      console.log(XMLHttpRequest)
      console.log(textStatus)
      console.log(error)
    }
  });

  $.validator.methods.naughtyblock = function( value, element ) {
    let blacklist = /.*(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck |cocksucked |cocksucker|cocksucking|cocksucks |cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick |cuntlicker |cuntlicking |cunts|cyalis|cyberfuc|cyberfuck |cyberfucked |cyberfucker|cyberfuckers|cyberfucking |d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates |ejaculating |ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck |fingerfucked |fingerfucker |fingerfuckers|fingerfucking |fingerfucks |fistfuck|fistfucked |fistfucker |fistfuckers |fistfucking |fistfuckings |fistfucks |flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme |fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged |gangbangs |gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex |hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off |jackoff|jap|jerk-off |jism|jiz |jizm |jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i+ch|l3itch|labia|lmfao|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked |mothafucker|mothafuckers|mothafuckin|mothafucking |mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers |nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim |orgasims |orgasm|orgasms |p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses |pissflaps|pissin |pissing|pissoff |poop|porn|porno|pornography|pornos|prick|pricks |pron|pube|pusse|pussi|pussies|pussy|pussys |rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters |shitting|shittings|shitty |skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx).*/;
    return this.optional( element ) || !blacklist.test( value.toLowerCase() );
  }

  // Wish form validation plugin
  $("#wishform").validate({
    rules: {
      name: {
	required: true,
	minlength: 2,
	maxlength: 120,
	letterswithbasicpunc: true,
	naughtyblock: true
      },
      wish: {
	required: true,
	minlength: 2,
	maxlength: 120,
	letterswithbasicpunc: true,
	naughtyblock: true
      },
      state: {
	minlength: 2,
	maxlength: 120,
	letterswithbasicpunc: true,
	naughtyblock: true
      },
      country: {
	minlength: 2,
	maxlength: 120,
	letterswithbasicpunc: true,
	naughtyblock: true
      },
      star_name: {
	required: true,
	minlength: 2,
	maxlength: 120,
	letterswithbasicpunc: true,
	naughtyblock: true
      }
    },
    messages: {
      name: {
	required: "Name required.",
	minlength: "1 character min.",
	maxlength: "120 character max.",
	letterswithbasicpunc: "Letters only.",
	naughtyblock: 'Don\'t be naughty.'
      },
      wish: {
	required: "Wish required.",
	minlength: "1 character min.",
	maxlength: "120 character max.",
	letterswithbasicpunc: "Letters only.",
	naughtyblock: 'Don\'t be naughty.'
      },
      state: {
	require: "Wish required.",
	minlength: "1 character min.",
	maxlength: "120 character max.",
	letterswithbasicpunc: "Letters only.",
	naughtyblock: 'Don\'t be naughty.'
      },
      country: {
	require: "Country required.",
	minlength: "1 character min.",
	maxlength: "120 character max.",
	letterswithbasicpunc: "Letters only",
	naughtyblock: 'Don\'t be naughty.'
      },
      star_name: {
	require: "Star name required.",
	minlength: "1 character min",
	maxlength: "120 character max.",
	letterswithbasicpunc: "Letters only",
	naughtyblock: 'Don\'t be naughty.'
      }
    },
    submitHandler: function(form) {
      let wish_array = $(form).serializeArray()
      let obj = {}
      obj['name'] = wish_array[0].value
      obj['wish'] = wish_array[1].value
      obj['star_name'] = wish_array[4].value
      if (state === '' && country === '') {
	obj['state'] = wish_array[2].value
	obj['country'] = wish_array[3].value
      } else {
	obj['state'] = state
	obj['country'] = country
      }
      $.ajax({
	type: "POST",
	url: "https://hopeful-cosmos.me/api/wish/make",
	contentType: 'application/json',
	data: JSON.stringify(obj),
	success: function (data) {
	  alert('We received your wish.')},
	error: function(XMLHttpRequest, textStatus, error) {
	  alert("Your wish got lost somewhere.")}
      });
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
	var message = errors == 1
            ? 'You missed 1 field. It has been highlighted'
            : 'You missed ' + errors + ' fields. They have been highlighted';
	$("div.error span").html(message);
	$("div.error").show();
      } else {
	$("div.error").hide();
      }
    }
  });
});
