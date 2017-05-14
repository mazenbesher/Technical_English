function read_anki(file_number, target_id) {
    // Read Anki text file
    var request = new XMLHttpRequest();
    request.open("GET", "res/voc/" + file_number + ".txt", false);
    request.send(null);
    var lines = request.responseText.split('\n');

    // put into data object
    var data = [];
    lines.forEach(
        function (entry, index) {
            data.push({
                'keyword': replaceDivs(decodeHtml(entry.split('\t')[0])),
                'definition': replaceDivs(decodeHtml(entry.split('\t')[1]))
            })
        }
    );

    // file the mustache template
    var template = document.getElementById('word_tmp').innerHTML;
    document.getElementById(target_id).innerHTML = '';
    Mustache.parse(template);
    data.forEach(
        function (entry, index) {
            document.getElementById(target_id).innerHTML += Mustache.render(template, entry);
        }
    )
}

function fill_talks(talks) {
    var talk_template = document.getElementById('talk_tmp').innerHTML;
    document.getElementById('talks').innerHTML = '';
    Mustache.parse(talk_template);
    talks.forEach(
        function (entry) {
            document.getElementById('talks').innerHTML += Mustache.render(talk_template, entry);
            read_anki(entry.num, 'ted' + entry.num + '_voc');
        }
    );
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function replaceDivs(txt){
    return txt.replace('<div>','').replace('</div>','');
}

var talks = [
    {
        'link': 'https://www.ted.com/talks/takaharu_tezuka_the_best_kindergarten_you_ve_ever_seen',
        'title': 'The best kindergarten you’ve ever seen',
        'num': '1'
    },
    {
        'link': 'https://www.ted.com/talks/natalie_panek_let_s_clean_up_the_space_junk_orbiting_earth',
        'title': 'Let\'s clean up the space junk orbiting Earth',
        'num': '2'
    },
    {
        'link': 'https://www.ted.com/talks/michael_shellenberger_how_fear_of_nuclear_power_is_hurting_the_environment',
        'title': 'How fear of nuclear power is hurting the environment',
        'num': '3'
    },
    {
        'link': 'https://www.ted.com/talks/eben_bayer_are_mushrooms_the_new_plastic',
        'title': 'Are mushrooms the new plastic?',
        'num': '4'
    },
    {
        'link': 'https://www.ted.com/talks/avi_reichental_what_s_next_in_3d_printing',
        'title': 'What\'s next in 3D printing',
        'num': '5'
    }
]

fill_talks(talks);