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
                'keyword': entry.split('\t')[0],
                'definition': entry.split('\t')[1]
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
    }
]

fill_talks(talks);